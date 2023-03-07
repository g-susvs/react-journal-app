import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth";
import { FirebaseAuth } from "./config";

const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
    try {

        const resul = await signInWithPopup(FirebaseAuth, googleProvider)
        const { displayName, email, photoURL, uid } = resul.user

        return {
            ok: true,
            // User info
            displayName, email, photoURL, uid,
        }
    } catch (error) {
        const errorCode = error.code
        const errorMessage = error.message

        return {
            ok: false,
            errorCode,
            errorMessage
        }
    }
}

export const registerUserWithEmailPassword = async ({ email, password, displayName }) => {
    try {

        const resp = await createUserWithEmailAndPassword(FirebaseAuth, email, password)
        const { uid, photoURL } = resp.user

        // TODO: Actualizar displayName
        updateProfile(FirebaseAuth.currentUser, { displayName })

        return {
            ok: true,
            uid, photoURL, email, displayName
        }
    } catch (error) {
        return { od: false, errorMessage: error.message }
    }
}

export const loginWithEmailPassword = async ({ email, password }) => {
    try {

        const resp = await signInWithEmailAndPassword(FirebaseAuth, email, password)
        const { uid, displayName, photoURL } = resp.user

        return {
            ok: true,
            uid, email, displayName, photoURL
        }

    } catch (error) {
        return { ok: false, errorMessage: error.message }
    }
}

export const logoutFirebase = async () => {
    return await FirebaseAuth.signOut()
}