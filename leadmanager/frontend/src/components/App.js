import React, { Fragment } from "react";
import ReactDOM from "react-dom/client";

import Header from "./layout/Header";
import Dashboard from "./leads/Dashboard";

import store from "../redux/store";
import { Provider } from "react-redux";

import Alerts from "./layout/Alerts";

// function toastHandler() {
//   const reduxState = store.getState();
//   console.log(reduxState);
//   toast("Hello World", {
//     duration: 5000,
//   });
// }

function App() {
  // const subscription = store.subscribe(toastHandler);

  return (
    <Provider store={store}>
      <Fragment>
        <Header />
        <div className='container'>
          <Dashboard />
        </div>
        <Alerts />
      </Fragment>
    </Provider>
  );
}

// class App extends Component {

//   render() {
//     return (
//       <Provider store={store}>
//         <Fragment>
//           <Header />
//           <div className='container'>
//             <Dashboard />
//             {toast("Hello World", {
//               duration: 5000,
//             })}
//           </div>
//           <Toaster position='bottom-center' />
//         </Fragment>
//       </Provider>
//     );
//   }
// }

const app = ReactDOM.createRoot(document.getElementById("app"));
app.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
// ReactDOM.render(<App />, document.getElementById('app'));
