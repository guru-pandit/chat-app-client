import { Dashboard, Login, Message, Register } from './components';
import { useSelector } from "react-redux";
import { Switch, Route, useHistory } from "react-router-dom";
import { useEffect } from 'react';

function App() {
  const history = useHistory();
  const authState = useSelector((state) => state.auth);
  console.log("App.js:autoState:- ", authState);

  useEffect(() => {
    if (authState.isLoggedIn) {
      history.push("/dashboard");
    } else {
      history.push("/");
    }
  }, [])

  return (
    <div className='w-full h-screen'>
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
    </div>
  );
}

export default App;
