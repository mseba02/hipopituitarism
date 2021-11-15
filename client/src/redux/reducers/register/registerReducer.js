import {createAsyncThunk, createDraftSafeSelector, createSlice} from "@reduxjs/toolkit";
import {fetchAuth} from "../auth/authReducer";

export const fetchRegister = createAsyncThunk(
    'registerAsync',
        async (dataUser) => {
            const response = await fetch('https://hipopituitarism.herokuapp.com/users/signup', {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dataUser)
            });
            console.log(response);
            return response.json();
        }
)

export const registerSlice = createSlice({
   name: 'register',
   initialState: {},
   extraReducers: {
        [fetchRegister.pending]: () => {
            console.log('pending')
        },

        [fetchRegister.fulfilled]: (state, action) => {
            if(action.payload?.message){
                state.error = action.payload.message
            } else {
                state.registerData = action.payload;
            }
        },

        [fetchRegister.rejected]: () => {
            console.log('pending')
        }
    }
});

export const registerAuth = (state) => state.registerInfo;
