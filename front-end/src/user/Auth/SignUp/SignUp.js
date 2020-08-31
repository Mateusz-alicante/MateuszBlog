import React, {useState} from 'react'
import axios from 'axios'

import setAuthInfo from '../../../utils/Redux/Actions/Auth'
import { connect } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import styles from './SignUp.module.css'
import { toast } from 'react-toastify';

const SignUp = (props) => {

    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [status, setStatus] = useState(undefined)
    const history = useHistory()

    const SignUp = async (e) => {
        e.preventDefault()
        setStatus('loading')
        const response = await axios.post('/api/auth/signup', {
            email,
            name,
            password
        })
        if (response && response.status === 200 && response.data.token) {
            props.dispatch(setAuthInfo({ token: response.headers['x-auth-token'], ...response.data }))
            setStatus(undefined)
            history.push('/user')
            toast.success('Login successful' ,{
                position: toast.POSITION.BOTTOM_RIGHT,
              })
        } else {
            toast.error('Login unsuccessful, check the credencials and try again' ,{
                position: toast.POSITION.BOTTOM_RIGHT,
              })
        }
    }

    return(
        <div>
            <form className={styles.form} onSubmit={SignUp}>
                <label>E-mail:</label>
                <input onChange={(e) => setEmail(e.target.value)} type='email' />
                <label >Name:</label>
                <input onChange={(e) => setName(e.target.value)} type='text' />
                <label>password:</label>
                <input onChange={(e) => setPassword(e.target.value)} type='text' />
                <button disabled={status == 'loading'}>SignUp</button>
                <Link to='/auth/login'>Login</Link>
            </form>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        redux: state
    }
}

export default connect(mapStateToProps)(SignUp)