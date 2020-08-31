import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import Posts from './Posts/Postst'

const Dashboard = (props) => {

    return (
        <div>
            <h1>Dashboard:</h1>
            <Link to='/user/writePost'>Write Post</Link>
            <Posts />
        </div>
    )
}

const mapStateToProps = (state) => ({
    redux: state
})

export default connect(mapStateToProps)(Dashboard)