import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./auth";
import { drawerSlice } from "./drawer/drawerSlice";
import { journalSlice } from "./journal";

export const store = configureStore({
    reducer:{
        auth: authSlice,
        journal: journalSlice.reducer,
        drawer: drawerSlice.reducer
    },
    // middleware: getDefaultMiddleware =>
    //     getDefaultMiddleware({
    //         serializableCheck: {
    //             ignoreActions:['journal/setNotes'],
    //             ignoredActionPaths: ['journal.notes./*'],
    //             ignoredPaths: [
    //                 'payload.0._firestore', 
    //                 'journal.notes.0._firestore',
    //                 'journal.notes.0._userDataWriter',
    //                 'journal.notes.0._key',
    //                 'journal.notes.0._document',
    //                 'journal.notes.1._firestore',
    //                 'journal.notes.1._userDataWriter',
    //                 'journal.notes.1._key',
    //                 'journal.notes.1._document',
    //             ]
    //         }
    //     }),
})