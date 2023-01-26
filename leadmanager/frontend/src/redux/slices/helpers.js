import { getCookies } from "../../helpers/cookies";

export const tokenConfig = (thunkAPI) => {
  const cookies = getCookies();
  const config = {
    headers: {
      ...cookies,
      "Content-Type": "application/json",
    },
  };

  const token = thunkAPI.getState().auth.token;

  if (token) {
    config.headers["Authorization"] = `Token ${token}`;
  }

  return config;
};
