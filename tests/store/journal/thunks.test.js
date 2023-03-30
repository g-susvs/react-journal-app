import { collection, deleteDoc, getDocs } from "firebase/firestore/lite"
import { FirebaseDB } from "../../../src/firebase/config"
import { addNewEmtyNote, savingNote, setActiveNote, setNotes, startLoadingNotes, startNewNote } from "../../../src/store/journal"

describe('Pruebas en journal thunks', () => {

    const dispatch = jest.fn()
    const getState = jest.fn()

    beforeEach(() => jest.clearAllMocks())

    test('startNewNote debe de crear una nueva nota en blanca', async () => {

        const uid = 'TEST-UID'
        getState.mockReturnValue({ auth: { uid: uid } })

        await startNewNote()(dispatch, getState)

        expect(dispatch).toHaveBeenCalledWith(savingNote())
        expect(dispatch).toHaveBeenCalledWith(addNewEmtyNote({
            "body": "",
            "date": expect.any(Number),
            "id": expect.any(String),
            "imgsURL": [],
            "title": "",
        }))
        expect(dispatch).toHaveBeenCalledWith(setActiveNote({
            "body": "",
            "date": expect.any(Number),
            "id": expect.any(String),
            "imgsURL": [],
            "title": "",
        }))

        //Borrar de firebase

        const collectionRef = collection(FirebaseDB, `${uid}/journal/notes`)
        const docs = await getDocs(collectionRef)

        const deletePromises = []

        docs.forEach( doc => deletePromises.push(deleteDoc(doc.ref)))

        await Promise.all(deletePromises)
    },15000)

})