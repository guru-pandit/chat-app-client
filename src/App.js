import { Dashboard, Login, Message, Register } from './components';
import { useSelector } from "react-redux";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useEffect } from 'react';

function App() {
  const navigate = useNavigate();
  const authState = useSelector((state) => state.auth);
  console.log("App.js:autoState:- ", authState);

  useEffect(() => {
    if (authState.isLoggedIn) {
      navigate("/dashboard");
    } else {
      navigate("/login");
    }
  }, [])

  return (
    <div className='w-full h-screen'>
      {/* <Routes>
        {
          authState.isLoggedIn ? (
            <>
              <Route exact path="/dashboard" element={<Dashboard />} />
            </>
          ) : (
            <>
              <Route exact path="/" element={<Login />} />
              <Route exact path="/register" element={<Register />} />
            </>
          )
        }

      </Routes> */}
      <Routes>
        <Route exact path="/dashboard" element={<Message />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
