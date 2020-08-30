import React, { useState } from 'react'
import axios from 'axios'
import { Link, useHistory } from 'react-router-dom'
import setAuthInfo from '../../../utils/Redux/Actions/Auth'
import { connect } from 'react-redux'
import styles from './Login.module.css'
import { toast } from 'react-toastify';


const Login = (props) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [status, setStatus] = useState(undefined)
    const history = useHistory()

    const Login = async (e) => {
        e.preventDefault()
        setStatus('loading')
        const response = await axios.post('/api/auth/login', {
            email,
            password
        })
        if (response && response.status === 200 && response.data.token) {
            props.dispatch(setAuthInfo({ token: response.headers['x-auth-token'], ...response.data }))
            setStatus(undefined)
            history.push('/')
            toast.success('Login successful')
        } else {
            toast.error('Login unsuccessful, check the credencials and try again')
        }
    }

    return (
        <div>
            <form onSubmit={Login} className={styles.form} >
                <div>
                    <label>E-mail:</label>
                    <input type='email' onChange={(event) => setEmail(event.target.value)} />
                </div>
                <div>
                    <label>password:</label>
                    <input type='password' onChange={(event) => setPassword(event.target.value)} />
                </div>
                <button disabled={() => status == 'loading'}>Login</button>
                <Link to='/auth/signup'>Sign up</Link>
            </form>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        redux: state
    }
}

export default connect(mapStateToProps)(Login)