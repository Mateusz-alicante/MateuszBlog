import React from "react";
import {
    Switch,
    Route,
} from "react-router-dom";
import UserRouter from './NestedRouters/User'
import AuthRouter from './NestedRouters/Auth'
import FrontPage from '../Posts/FrontPage/FrontPage'
import styles from './MainRouter.module.css'
import SinglePost from '../Posts/SinglePost/SinglePost'
import About from '../Components/About/About'

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
                <Route path="/post/:id" exact={false}>
                    <SinglePost />
                </Route>
                <Route path='/about'>
                    <About />
                </Route>
            </Switch>
        </div>
    )
}

export default App