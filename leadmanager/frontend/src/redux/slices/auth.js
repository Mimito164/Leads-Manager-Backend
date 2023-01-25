import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { returnErrors } from "./errors";

export const loadUser = createAsyncThunk(
  "auth/loadUser",
  async (_, thunkAPI) => {
    thunkAPI.dispatch(userLoading());

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const token = thunkAPI.getState().auth.token;

    if (token) {
      config.headers["Authorization"] = `Token ${token}`;
    }

    try {
      const res = await axios.get("/api/auth/user", config);

      thunkAPI.dispatch(userLoaded());
    } catch (error) {
      thunkAPI.dispatch(
        returnErrors({
          msg: err.response.data,
          status: err.response.status,
        })
      );
      thunkAPI.dispatch(authError());
      throw new Error(error);
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (payload, thunkAPI) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify({ ...payload });

    try {
      const res = await axios.post("/api/auth/login", body, config);
      console.log("resDAta", res.data);
      thunkAPI.dispatch(loginSucces(res.data));
    } catch (error) {
      console.log("el error", error);
      thunkAPI.dispatch(
        returnErrors({
          msg: err.response.data,
          status: err.response.status,
        })
      );
      thunkAPI.dispatch(authError());
      throw new Error(error);
    }
  }
);

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  isLoading: false,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userLoading: (state) => {
      state.isLoading = true;
    },
    userLoaded: (state, action) => {
      state.isAuthenticated = true;
      state.isLoading = false;
      state.user = action.payload;
    },
    authError: (state) => {
      localStorage.removeItem("token");
      return {
        token: null,
        user: null,
        isAuthenticated: false,
        isLoading: false,
      };
    },
    loginSucces: (state, action) => {
      localStorage.setItem("token", action.payload.token);
      state.isAuthenticated = true;
      state.isLoading = false;
      state.token = localStorage.getItem("token");
    },
    // loginFailed: authError
  },
  extraReducers(builder) {
    builder.addCase(loadUser.fulfilled, () => {
      return state;
    });
  },
});

export const { userLoading, userLoaded, authError, loginSucces } =
  authSlice.actions;

export default authSlice.reducer;
