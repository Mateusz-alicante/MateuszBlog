import React from 'react'
import {
    NavLink
} from "react-router-dom";
import styles from './Header.module.css'
import { connect } from 'react-redux'

const Header = (props) => {
    return (
        <div className={styles.outerContainer}>
            <div className={styles.innerContainer}>
                <NavLink className={styles.navlink} exact activeClassName={styles.navlinkActive} to='/'>Home</NavLink>
                <NavLink className={styles.navlink} exact activeClassName={styles.navlinkActive} to='/about'>about</NavLink>
            </div>
            <div className={styles.innerContainer}>
                <NavLink className={styles.navlink} exact activeClassName={styles.navlinkActive} to={props.redux.auth.isLoggedIn ? "/user" : "/auth/login"}>{props.redux.auth.isLoggedIn ? "My Account" : "Login"}</NavLink>
            </div>
        </div>
    )
}


const mapStateToProps = (state) => ({
    redux: state
})

export default connect(mapStateToProps)(Header)