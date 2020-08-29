import React, { useEffect } from 'react'
import styles from './SimplePost.module.css'
import Tags from '../../../Components/Tags/Tags'
import { useHistory } from "react-router-dom";

const SimplePost = ({ post }) => {

    const history = useHistory()

    return (
        <div className={styles.container} onClick={() => history.push(`/post/${post._id}`)}>
            <div>
                <img className={styles.image} src={post.imageURL} />
            </div>
            <div className={styles.textContainer}>
                <h1>{post.title}</h1>
                <h4>{post.description}</h4>
                {post.tags.length > 0 && <Tags tags={post.tags} />}
            </div>
        </div>
    )
}

export default SimplePost