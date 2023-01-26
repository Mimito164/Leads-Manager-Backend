export const tokenConfig = (thunkAPI) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const token = thunkAPI.getState().auth.token;

  if (token) {
    config.headers["Authorization"] = `Token ${token}`;
  }

  return config;
};
