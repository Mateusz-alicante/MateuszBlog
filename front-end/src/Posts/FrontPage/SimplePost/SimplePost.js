import React, { useEffect } from 'react'
import styles from './SimplePost.module.css'
import Tags from '../../../Components/Tags/Tags'

const SimplePost = ({ post }) => {

    useEffect(() => console.log(post))

    return (
        <div className={styles.container}>
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