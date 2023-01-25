import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PrivateRoute() {
  const auth = useSelector((state) => state.auth);

  if (auth.isLoading) return <h2>Loading...</h2>;

  if (!auth.token) return <Navigate to='/login' />;

  return <Outlet />;
}
