import { createSlice } from '@reduxjs/toolkit';

export const drawerSlice = createSlice({
    name: 'drawer',
    initialState: {
     displayDrawer: 'none' // block - none
    },
    reducers: {
        setDisplayDrawer: (state, action) => {
            state.displayDrawer = action.payload
        }
    }
});

export const { setDisplayDrawer } = drawerSlice.actions;