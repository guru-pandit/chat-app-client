import { useSelector } from "react-redux";
import { Switch, Route } from "react-router-dom";

import { Dashboard, Login, Register } from './pages';


const Routes = () => {
    const authState = useSelector((state) => state.auth);

    return (
        <>
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
                            <Route exact path="/login">
                                <Login />
                            </Route>
                            <Route exact path="/register">
                                <Register />
                            </Route>
                        </>
                    )
                }
            </Switch>
        </>
    )
}

export default Routes
