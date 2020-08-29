import React from "react";
import {
    Switch,
    Route,
} from "react-router-dom";
import UserRouter from './NestedRouters/User'
import AuthRouter from './NestedRouters/Auth'
import FrontPage from '../Posts/FrontPage/FrontPage'
import styles from './MainRouter.module.css'

const App = () => {
    return (
        <div className={styles.container}>
            <Switch>
                <Route path='/user'>
                    <UserRouter />
                </Route>
                <Route path="/auth">
                    <AuthRouter />
                </Route>
                <Route path="/" exact>
                    <FrontPage />
                </Route>
            </Switch>
        </div>
    )
}

export default App