import styles from './SinglePost.module.css'
import React from 'react'
import moment from 'moment'
import { useHistory } from 'react-router-dom'


const SinglePost = ({ post }) => {
    const history = useHistory()
    return (
    <div className={styles.container} onClick={() => history.push(`/user/writePost?id=${post._id}`)}>
        <span className={styles.circle} style={{backgroundColor: (post.isPublic ? "green" : "red")}} />
        <p>{post.title}</p>
        <p>{moment(post.createdAt).format("MMM Do YYYY")}</p>
    </div>
    )
}

export default SinglePost