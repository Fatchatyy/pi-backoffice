import { createSlice } from '@reduxjs/toolkit';
import { setAuthToken } from '../axiosServices'; // Import the setAuthToken function

export const user = createSlice({
  name: 'user',
  initialState: {
    name: null,
    username: null,
    token: null,
    role: null,
    id: null,
    // other state properties
  },
  reducers: {
    loginStore: (state, action) => {
        console.log('logging in to the backoffice',action.payload)
      const { token, ...rest } = action.payload;

      state.token = token;
      state.role = action.payload.role;
      // Save other state properties
      setAuthToken(token); // Set token in Axios instance
    },
    logoutStore: (state) => {
      state.token = null;
      state.role = null;
      setAuthToken(null); // Remove token from Axios instance
    },
    // Other reducers
  }
});

export const { loginStore, logoutStore } = user.actions;
export default user.reducer;
