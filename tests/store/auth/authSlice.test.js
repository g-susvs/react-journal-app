import {authSlice, checkingCredential, login, logout} from "../../../src/store/auth/authSlice"
import { demoUser, initialState, notAuthenticatedState } from "../../fixtures/authFixtures"

describe('Pruebas en authSlice', () => { 
    test('debe regresar el estado inicial y tener el nombre', () => { 
    
        expect(authSlice.name).toBe('auth')

        const state = authSlice.reducer(initialState,{})
        expect(state).toEqual(initialState)
    })

    test('debe de realizar la authenticación', () => { 
        
        const state = authSlice.reducer(initialState, login(demoUser))
        expect(state).toEqual({
            status: 'authenticated',
            uid: demoUser.uid,
            displayName: demoUser.displayName,
            email: demoUser.email,
            photoURL: demoUser.photoURL,
            errorMessage: null
        })

     })
     
    test('debe de realizar el logout sin argumentos', () => { 
        
        const state = authSlice.reducer(initialState, logout())

        expect(state).toEqual(notAuthenticatedState)
    })
    
    test('debe de realizar el logout y mostrar un mensaje de error', () => {
        const msgError = 'Falla la contraseña' 
        const state = authSlice.reducer(initialState, logout({errorMessage: msgError}))
    
        expect(state.errorMessage).toBe(msgError)
        
    })
    
    test('debe cambiar el estado a checking', () => { 
        const state = authSlice.reducer(initialState, checkingCredential())
    
        expect(state.status).toBe('checking')
        
      })
 })