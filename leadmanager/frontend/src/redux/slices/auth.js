import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { returnErrors } from "./errors";
import { createMessage } from "./messages";
import { tokenConfig } from "./helpers";

export const loadUser = createAsyncThunk(
  "auth/loadUser",
  async (_, thunkAPI) => {
    thunkAPI.dispatch(userLoading());

    const config = tokenConfig(thunkAPI); // has the header and token

    try {
      const res = await axios.get("/api/auth/user", config);
      console.log(res.data);

      thunkAPI.dispatch(userLoaded(res.data.username));
    } catch (error) {
      thunkAPI.dispatch(
        returnErrors({
          msg: error.response.data,
          status: error.response.status,
        })
      );
      thunkAPI.dispatch(authError());
      throw new Error(error);
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  const config = tokenConfig(thunkAPI);
  try {
    await axios.post("/api/auth/logout", null, config);

    thunkAPI.dispatch(logoutSucces());
  } catch (error) {
    thunkAPI.dispatch(
      returnErrors({
        msg: error.response.data,
        status: error.response.status,
      })
    );

    console.error(error);
  }
});

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
      thunkAPI.dispatch(loginSucces(res.data));
      // thunkAPI.dispatch(createMessage());
    } catch (error) {
      thunkAPI.dispatch(
        returnErrors({
          msg: error.response.data,
          status: error.response.status,
        })
      );
      thunkAPI.dispatch(loginFailed());
      throw new Error(error);
    }
  }
);

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (payload, thunkAPI) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify({ ...payload });
    // console.log("registeruser body", body);
    try {
      const res = await axios.post("/api/auth/register", body, config);
      console.log("resdata register", res.data);
      thunkAPI.dispatch(registerSuccess(res.data));
      // thunkAPI.dispatch(createMessage());
    } catch (error) {
      console.error(error);
      thunkAPI.dispatch(
        returnErrors({
          msg: error.response.data,
          status: error.response.status,
        })
      );
      // thunkAPI.dispatch(registerFailed());
      // throw new Error(error);
    }
  }
);

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  isLoading: false,
  user: null,
};

const clearState = () => {
  localStorage.removeItem("token");
  return {
    token: null,
    user: null,
    isAuthenticated: false,
    isLoading: false,
  };
};

const userAccessed = (state, action) => {
  console.log("el user entro");
  localStorage.setItem("token", action.payload.token);
  state.isAuthenticated = true;
  state.isLoading = false;
  state.token = localStorage.getItem("token");
  // state.user = ;
  state.user = action.payload.user.username;
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
    authError: clearState,
    loginSucces: userAccessed,
    loginFailed: clearState,
    logoutSucces: clearState,
    registerSuccess: userAccessed,
    registerFailed: clearState,
  },
  extraReducers(builder) {
    builder
      .addCase(loadUser.fulfilled, (state) => {
        return state;
      })
      .addCase(registerUser.fulfilled, (state) => {
        return state;
      });
  },
});

export const {
  userLoading,
  userLoaded,
  authError,
  loginSucces,
  loginFailed,
  logoutSucces,
  registerSuccess,
} = authSlice.actions;

export default authSlice.reducer;
