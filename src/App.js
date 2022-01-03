import { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { Container, Loader, LoadingBar, Navbar } from "./components";
import Routes from "./Routes";
import { home } from "./services/auth";
import { homeAction } from "./actions/auth.action";

function App() {
  const history = useHistory();

  // Redux selector and dispatch
  const dispatch = useDispatch()
  const commonState = useSelector((state) => state.common);

  // Following method run on first render
  useEffect(() => {
    home().then((res) => {
      dispatch(homeAction(res.data));
      history.push("/dashboard");
    }).catch((err) => {
      history.push("/login");
    })
  }, [])

  return (
    <div className='w-full h-screen relative'>
      {
        commonState.showLoader && <Loader />
      }
      <LoadingBar>
        <Routes />
      </LoadingBar>
      <ToastContainer autoClose={3000} />
    </div>
  );
}

export default App;
