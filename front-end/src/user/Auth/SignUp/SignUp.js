import React, {useState} from 'react'
import axios from 'axios'

import setAuthInfo from '../../../utils/Redux/Actions/Auth'
import { connect } from 'react-redux'

const SignUp = (props) => {

    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')

    const SignUp = async (e) => {
        e.preventDefault()
        const response = await axios.post('/api/auth/signup', {
            email,
            name,
            password
        })
        if (response && response.status === 200) {
            props.dispatch(setAuthInfo({ token: response.headers['x-auth-token'], ...response.data }))
        }
    }

    return(
        <div>
            <form onSubmit={SignUp}>
                <label>E-mail:</label>
                <input onChange={(e) => setEmail(e.target.value)} type='email' />
                <label >Name:</label>
                <input onChange={(e) => setName(e.target.value)} type='text' />
                <label>password:</label>
                <input onChange={(e) => setPassword(e.target.value)} type='text' />
                <button>SignUp</button>
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