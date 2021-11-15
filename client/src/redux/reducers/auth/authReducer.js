import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchAuth = createAsyncThunk(
    'authAsync',
    async(dataUser) => {
        const response = await fetch('https://hipopituitarism.herokuapp.com/users/login', {
          method: 'POST',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(dataUser)
        });

        return response.json();
    }
)

export const authSlice = createSlice({
  name: 'auth',
  initialState: {},
  reducers: {
    // increment: (state) => {
    //   state.value += 1;
    // },
  },
   extraReducers: {
    [fetchAuth.pending]: () => {
      console.log('pending')
    },

    [fetchAuth.fulfilled]: (state, action) => {
        if(action.payload?.message){
            state.error = action.payload.message
        } else {
            state.user = action.payload;
        }
    },
    [fetchAuth.rejected]: () => {
      console.log('pending')
    }
  }
});

export const loginAuth = (state) => state.loginInfo;

// export const { login, logout } = authSlice.actions;
