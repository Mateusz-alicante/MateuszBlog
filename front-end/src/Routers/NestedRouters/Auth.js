import React from "react";
import {
    Route,
} from "react-router-dom";

import Login from '../../user/Auth/Login/Login'
import Signup from '../../user/Auth/SignUp/SignUp'

const App = () => {
    return (
        <>
            <Route path='/auth/login'>
                <Login />
            </Route>

            <Route path='/auth/signup'>
                <Signup />
            </Route>
        </>
    )
}

export default App