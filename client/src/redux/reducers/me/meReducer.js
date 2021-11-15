import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchProfile = createAsyncThunk(
    'meAsync',
    async(id) => {
        const response = await fetch('https://hipopituitarism.herokuapp.com/users/me', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(id)
        });
        return await response.json();
    }
)

export const profileSlice = createSlice({
    name: 'profile',
    initialState: {
        isLogged: false,
        user: {}
    },
    reducers: {
        changeLoggedStatus: (state, action) => {
          state.isLogged  = action.payload;
        },
    },
    extraReducers: {
        [fetchProfile.pending]: (payload) => {
            console.log('pending')
        },

        [fetchProfile.fulfilled]: (state, action) => {
            state.user = action.payload;
        },

        [fetchProfile.rejected]: () => {
            console.log('rejected')
        }
    }
});

export const { changeLoggedStatus } = profileSlice.actions;