import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { getErrors } from "./errors";
import { createMessage } from "./messages";

const parseCookie = (str) =>
  str
    .split(";")
    .map((v) => v.split("="))
    .reduce((acc, v) => {
      acc[decodeURIComponent(v[0].trim())] = decodeURIComponent(v[1].trim());
      return acc;
    }, {});

const allCookies = document.cookie;
const parsedCookies = parseCookie(allCookies);

axios.defaults.headers.common = {
  csrftoken: parsedCookies.csrftoken,
  "X-CSRFToken": parsedCookies.csrftoken,
};

export const getLeads = createAsyncThunk("leads/getLeads", async () => {
  try {
    const res = await axios.get("api/leads/");
    // console.log("Get leads res: ", res);
    return res.data;
  } catch (error) {
    console.log(error);
  }
});

export const deleteLead = createAsyncThunk(
  "leads/deleteLead",
  async (id, thunkAPI) => {
    try {
      await axios.delete(`api/leads/${id}/`);
      thunkAPI.dispatch(
        createMessage({ leadDeleted: "Lead deleted Succesfully" })
      );
      // console.log("delete leds res: ", res);
      return id;
    } catch (error) {
      console.log(error);
    }
  }
);

export const addLead = createAsyncThunk(
  "leads/addLead",
  async (lead, thunkAPI) => {
    try {
      const res = await axios.post("api/leads/", lead);
      // console.log("Get leads res: ", res);
      thunkAPI.dispatch(createMessage({ leadAdded: "Lead added Succesfully" }));
      return res.data;
    } catch (error) {
      const errors = {
        msg: error.response.data,
        status: error.response.status,
      };
      thunkAPI.dispatch(getErrors(errors));
      throw new Error(error);
    }
  }
);

const leadsSlice = createSlice({
  name: "leads",
  initialState: [],
  reducers: {}, // el reducer ta vacio
  extraReducers(builder) {
    builder
      .addCase(getLeads.fulfilled, (state, action) => {
        return action.payload;
      })
      .addCase(deleteLead.fulfilled, (state, action) => {
        // state.leads = action.payload
        const deletedId = action.payload;
        // console.log("delete en el builder", state, action.payload);
        return state.filter((lead) => lead.id !== deletedId);
      })
      .addCase(addLead.fulfilled, (state, action) => {
        state.push(action.payload);
      });
  },
});

// export { no tenes actions regulares pq tu reducer ta vacio } = leadsSlice.actions

export default leadsSlice.reducer;
