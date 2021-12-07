import { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Switch, Route, useHistory } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import Loader from "react-loader-spinner";

import { Dashboard, Login, Register } from './pages';
import socket from "./services/socket";
import { setConnection } from "./services/chat";
import { connectionFailAction, connectionSuccessAction } from "./actions/auth.action";

const toastOptions = {
  position: "top-right",
  autoClose: 2000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
}


function App() {
  const history = useHistory();
  const authState = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  // console.log("App.js-authState:- ", authState);

  useEffect(() => {
    if (authState.isLoggedIn) {
      // Connect to the socket
      socket.connect();

      // on connect listener
      socket.on("connect", () => {
        console.log("Connected:- ", socket.id);
        setConnection(authState.user.id, socket.id).then((response) => {
          // console.log("Connected-Response:- ", response.data);
          dispatch(connectionSuccessAction())
          history.push("/dashboard");
        }).catch((err) => {
          console.log("Connected-Response-err", err);
          dispatch(connectionFailAction());
        })
      });

      // on disconnect listener
      socket.on("disconnect", () => {
        console.log("Disconnected... ");
        toast.error("Disconnected...", toastOptions);
        dispatch(connectionFailAction());
      });
    } else {
      history.push("/");
    }
  }, [])

  return (
    <div className='w-full h-screen'>
      <ToastContainer />
      <Switch>
        {/* <Loader type="Puff" color="#4338CA" height={80} width={80} /> */}
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
    </div>
  );
}

export default App;
