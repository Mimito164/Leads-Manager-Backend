import React, { Fragment, useEffect } from "react";
import ReactDOM from "react-dom/client";
import {
  HashRouter as Router,
  Route,
  BrowserRouter,
  Routes,
  Redirect,
} from "react-router-dom";

import Header from "./layout/Header";
import Dashboard from "./leads/Dashboard";

import store from "../redux/store";
import { connect, Provider } from "react-redux";

import Alerts from "./layout/Alerts";
import Login from "./accounts/Login";
import Register from "./accounts/Register";

import PrivateRoute from "./common/PrivateRoute";
import { loadUser } from "../redux/slices/auth";

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Fragment>
          <Header />
          <div className='container'>
            <Routes>
              <Route element={<PrivateRoute />}>
                <Route exact path='/' element={<Dashboard />} />
              </Route>
              <Route exact path='/register' element={<Register />} />
              <Route exact path='/login' element={<Login />} />
            </Routes>
          </div>
          <Alerts />
        </Fragment>
      </BrowserRouter>
    </Provider>
  );
}

const app = ReactDOM.createRoot(document.getElementById("app"));
app.render(
  // <React.StrictMode>
  <App />
  /* </React.StrictMode> */
);
// ReactDOM.render(<App />, document.getElementById('app'));
