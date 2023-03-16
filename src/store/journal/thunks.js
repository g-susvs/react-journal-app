import { async } from "@firebase/util"
import { addDoc, collection, deleteDoc, doc, setDoc } from "firebase/firestore/lite"
import { FirebaseDB } from "../../firebase/config"
import { loadNotes } from "../../helpers"
import { uploadFile } from "../../helpers/uploadFile"
import { addNewEmtyNote, deleteNoteById, savingNote, setActiveNote, setNotes, setPhotosUrlToActiveNote, setSaving, updatedNote } from "./journalSlice"

export const startNewNote = () => {
    return async (dispatch, getState) => {
        dispatch(savingNote())

        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime(),
            imgsURL: []
        }
        const { uid } = getState().auth


        // para que esto pueda función debemos cambiar la regla establecida en firestore
        // de - allow read, write: if false;
        // a - allow read, write: if request.auth != null;
        const newDoc = await addDoc(collection(FirebaseDB, `${uid}/journal/notes`), newNote)

        newNote.id = newDoc.id
        // dispatch
        dispatch(addNewEmtyNote(newNote))
        dispatch(setActiveNote(newNote))
    }
}

export const startLoadingNotes = () => {
    return async (dispatch, getState) => {

        const { uid } = getState().auth
        if (!uid) throw new Error('No se está enviando el UID')


        const notes = await loadNotes(uid)
        // console.log('=================')
        // console.log(notes)
        // console.log('=================')

        // console.log21(notes)
        dispatch(setNotes(notes))
    }
}

export const startSavingNote = () => {
    return async (dispatch, getState) => {

        dispatch(setSaving())
        const { uid } = getState().auth
        const { active: note } = getState().journal

        const noteToFirebase = { ...note }
        delete noteToFirebase.id

        const docRef = doc(FirebaseDB, `${uid}/journal/notes/${note.id}`)

        await setDoc(docRef, noteToFirebase, { merge: true })


        dispatch(updatedNote(note))

    }
}

export const startUploadingFile = (files = []) => {
    return async (dispatch) => {
        dispatch(setSaving())


        const fileUploadPromises = []

        for (const file of files) {
            fileUploadPromises.push(uploadFile(file))
        }

        const photosUrl = await Promise.all(fileUploadPromises)

        dispatch(setPhotosUrlToActiveNote(photosUrl))
    }
}

export const startDeletingNote = () => async (dispatch, getState) => {

    const { uid } = getState().auth
    const { active: note } = getState().journal

    const docRef = doc(FirebaseDB, `${uid}/journal/notes/${note.id}`)

    await deleteDoc(docRef)

    dispatch(deleteNoteById(note.id))

}