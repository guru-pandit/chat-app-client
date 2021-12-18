import { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { Loader } from "./components";
import Routes from "./Routes";
import { home } from "./services/auth";
import { homeAction } from "./actions/auth.action";
import { loaderToggleAction } from './actions/common.action';

function App() {
  const history = useHistory();

  // Redux selector and dispatch
  const dispatch = useDispatch()
  const authState = useSelector((state) => state.auth);
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
      <Routes />
      <ToastContainer autoClose={3000} />
    </div>
  );
}

export default App;
