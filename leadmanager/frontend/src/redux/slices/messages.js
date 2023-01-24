import { createSlice } from "@reduxjs/toolkit";

const messagesSlice = createSlice({
  name: "messages",
  initialState: {
    message: "{}",
  },
  reducers: {
    createMessage: (state, action) => {
      state.message = action.payload.message;
    },
  },
  extraReducers(builder) {},
});

export const { createMessage } = messagesSlice.actions;

export default messagesSlice.reducer;
