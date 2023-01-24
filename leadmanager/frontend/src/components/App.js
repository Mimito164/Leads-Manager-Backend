import React, { Component, Fragment } from "react";
import ReactDOM from "react-dom/client";

import Header from "./layout/Header";
import Dashboard from "./leads/Dashboard";

import store from "../redux/store";
import { Provider } from "react-redux";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Fragment>
          <Header />
          <div className='container'>
            <Dashboard />
          </div>
        </Fragment>
      </Provider>
    );
  }
}

const app = ReactDOM.createRoot(document.getElementById("app"));
app.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
// ReactDOM.render(<App />, document.getElementById('app'));
