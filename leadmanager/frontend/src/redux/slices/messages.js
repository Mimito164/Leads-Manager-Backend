import { createSlice } from "@reduxjs/toolkit";

const messagesSlice = createSlice({
  name: "messages",
  initialState: {},
  reducers: {
    createMessage: (state, action) => {
      return action.payload;
    },
  },
  extraReducers(builder) {},
});

export const { createMessage } = messagesSlice.actions;

export default messagesSlice.reducer;
