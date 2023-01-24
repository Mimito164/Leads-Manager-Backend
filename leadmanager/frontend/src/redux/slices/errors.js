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
  }, // el reducer ta vacio
  extraReducers(builder) {},
});

export const { getErrors } = errorsSlice.actions;

export default errorsSlice.reducer;
