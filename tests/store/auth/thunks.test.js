import { checkingCredential, login, logout } from "../../../src/store/auth/authSlice"
import { checkingAuthentication, startGoogleSignIn, startLoginWithEmailPassword, startLogout } from "../../../src/store/auth/thunks"
import { demoUser } from "../../fixtures/authFixtures"
import { loginWithEmailPassword, logoutFirebase, signInWithGoogle } from "../../../src/firebase/providers";
import { clearNotesLogout } from "../../../src/store/journal";

jest.mock("../../../src/firebase/providers")
describe('Pruebas AuthThunks', () => {

    const dispatch = jest.fn()

    beforeEach(() => jest.clearAllMocks())

    test('debe llamar las acciones', async () => {
        await checkingAuthentication()(dispatch)
        expect(dispatch).toHaveBeenCalledWith(checkingCredential())
    })

    test('startGoogleSignIn debe llamar checkingCredential y login - Exito', async () => {

        const loginData = { ok: true, ...demoUser }
        await signInWithGoogle.mockResolvedValue(loginData)

        await startGoogleSignIn()(dispatch)

        expect(dispatch).toHaveBeenCalledWith(checkingCredential())
        expect(dispatch).toHaveBeenCalledWith(login(loginData))
    })

    test('startGoogleSignIn debe llamar checkingCredential y logout - Error', async () => {

        const loginData = { ok: false, errorMessage: 'Un error en google' }

        await signInWithGoogle.mockResolvedValue(loginData)
        await startGoogleSignIn()(dispatch)

        expect(dispatch).toHaveBeenCalledWith(checkingCredential())
        expect(dispatch).toHaveBeenCalledWith(logout(loginData))

    })

    test('startLoginWithEmailPassword debe llamar checkingCredential y login - Exito', async () => {
    
        const loginData = { ok: true, ...demoUser }
        const formData = {email: demoUser.email, password: '123456'}
    
        await loginWithEmailPassword.mockResolvedValue(loginData)
        await startLoginWithEmailPassword(formData)(dispatch)
    
        expect(dispatch).toHaveBeenCalledWith(checkingCredential())
        expect(dispatch).toHaveBeenCalledWith(login(demoUser))
    
    })
    test('startLogout debe llamar logouFirebas, clearNotes y logout - Error', async () => {
    
        await startLogout()(dispatch)

        expect(logoutFirebase).toHaveBeenCalled()
        expect(dispatch).toHaveBeenCalledWith(logout())
        expect(dispatch).toHaveBeenCalledWith(clearNotesLogout())
    
    })
})