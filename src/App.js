import { useEffect } from 'react';
import { useSelector } from "react-redux";
import { Switch, Route, useHistory } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { Dashboard, Login, Register } from './pages';
import { Loader } from "./components"

function App() {
  const history = useHistory();

  // Redux selector and dispatch
  const authState = useSelector((state) => state.auth);
  const commonState = useSelector((state) => state.common);

  // Following method run on first render
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
