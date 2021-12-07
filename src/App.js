import { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Switch, Route, useHistory } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

import { Dashboard, Login, Register } from './pages';
import socket from "./services/socket";
import { setConnection } from "./services/chat";
import { connectionFailAction, connectionSuccessAction } from "./actions/auth.action";
import { Loader } from "./components"

// const toastOptions = { position: "top-right", autoClose: 2000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined }


function App() {
  const history = useHistory();
  const authState = useSelector((state) => state.auth);
  const commonState = useSelector((state) => state.common);
  const dispatch = useDispatch();
  // console.log("App.js-authState:- ", authState);

  useEffect(() => {
    if (authState.isLoggedIn) {
      history.push("/dashboard");
    } else {
      history.push("/");
    }
  }, [])

  return (
    <div className='w-full h-screen relative'>
      {
        commonState.showLoader && <Loader />
      }
      <Switch>
        {
          authState.isLoggedIn ? (
            <>
              <Route exact path="/dashboard" >
                <Dashboard />
              </Route>
            </>
          ) : (
            <>
              <Route exact path="/">
                <Login />
              </Route>
              <Route exact path="/register">
                <Register />
              </Route>
            </>
          )
        }
      </Switch>
      <ToastContainer autoClose={3000} />
    </div>
  );
}

export default App;
