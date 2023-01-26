import { createSlice } from "@reduxjs/toolkit";

const errorsSlice = createSlice({
  name: "errors",
  initialState: {
    msg: {},
    status: null,
  },
  reducers: {
    getErrors: (state, action) => {
      state.msg = action.payload.msg;
      state.status = action.payload.status;
    },
    returnErrors: (state, action) => {
      state.msg = action.payload.msg;
      state.status = action.payload.status;
    },
  },
  extraReducers(builder) {},
});

export const { getErrors, returnErrors } = errorsSlice.actions;

export default errorsSlice.reducer;
