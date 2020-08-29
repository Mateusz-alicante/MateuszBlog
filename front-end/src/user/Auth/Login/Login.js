import React, {useState} from 'react'
import axios from 'axios'

import setAuthInfo from '../../../utils/Redux/Actions/Auth'
import { connect } from 'react-redux'

const Login = (props) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const Login = async (e) => {
        e.preventDefault()
        const response = await axios.post('/api/auth/login', {
            email,
            password
        })
        if (response && response.status === 200) {
            props.dispatch(setAuthInfo({ token: response.headers['x-auth-token'], ...response.data }))
        }
    }

const getState = () => console.log(props.redux)

    return(
        <div>
            <form onSubmit={Login} >
                <label>E-mail:</label>
                <input type='email' onChange={(event) => setEmail(event.target.value)} />
                <label>password:</label>
                <input type='password' onChange={(event) => setPassword(event.target.value)} />
                <button>Login</button>
            </form>
            <button onClick={getState}>test</button>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        redux: state
    }
}

export default connect(mapStateToProps)(Login)