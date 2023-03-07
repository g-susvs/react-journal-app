import { loginWithEmailPassword, logoutFirebase, registerUserWithEmailPassword, signInWithGoogle } from "../../firebase/providers"
import { checkingCredential, login, logout } from "./authSlice"

export const checkingAuthentication = (email, password) => {
    return async (dispatch) => {
        dispatch(checkingCredential())
    }
}

export const startGoogleSignIn = () => {
    return async (dispatch) => {

        dispatch(checkingCredential())

        const result = await signInWithGoogle()

        if (!result.ok) {
            console.log(result)
            dispatch(logout(result))
            return
        }

        dispatch(login(result))

    }
}

export const startCreatingUserWithEmailPassword = ({ email, password, displayName }) => {
    return async (dispatch) => {

        dispatch(checkingCredential())

        const { ok, uid, photoURL, errorMessage } = await registerUserWithEmailPassword({ email, password, displayName })

        if (!ok) return dispatch(logout({ errorMessage }))

        dispatch(login({ uid, email, displayName, photoURL }))
    }
}

export const startLoginWithEmailPassword = ({email, password}) => {
    return async (dispatch) => {
        dispatch(checkingCredential())

        const {ok, uid, displayName, photoURL, errorMessage} = await loginWithEmailPassword({email, password})

        if(!ok) return dispatch(logout({errorMessage}))

        dispatch(login({uid, email, displayName, photoURL}))
    }
}

export const startLogout = () => {
    return async (dispatch) => {

        await logoutFirebase()

        dispatch(logout())
    }
}