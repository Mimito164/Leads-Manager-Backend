// import { createStore, applyMiddleware } from "redux";
// import { composeWithDevTools } from "redux-devtools-extension";
import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import reducer from "./slices";

// const store = createStore()

const store = configureStore({
  reducer,
  middleware: [thunk],
  devTools: true,
});

export default store;
