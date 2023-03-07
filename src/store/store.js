import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./auth";
import { drawerSlice } from "./drawer/drawerSlice";

export const store = configureStore({
    reducer:{
        auth: authSlice,
        drawer: drawerSlice.reducer
    }
})