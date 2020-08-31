import styles from './Posts.module.css'
import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { toast } from 'react-toastify';
import SinglePost from './SinglePost/SinglePost'



const Posts = (props) => {
    const [posts, setPosts] = useState(undefined)
    useEffect(() => {
        axios.get('/api/posts/getUserPosts', {
            headers: {
                authorization: props.redux.auth.token
            }}).then(function (response) {
                setPosts(response.data)
            })
            .catch(function (error) {
                toast.error(`Unable to fetch posts: ${error}` ,{
                    position: toast.POSITION.BOTTOM_RIGHT,
                  })
            })
    }, [])

    if (posts) {
        return (
            <div>
                <h2>Your Posts:</h2>
                <div className={styles.innerContainer}>
                    <div className={styles.toolbarContainer}>
                        <h4>Public</h4>
                        <h4>Title</h4>
                        <h4>Date</h4>
                    </div>
                    {posts.map((post) => <SinglePost post={post} key={post._id} />)}
                </div>
            </div>
        )
    } else return (
        <p>Loading...</p>
    )
}

const mapStateToProps = (state) => ({
    redux: state
})

export default connect(mapStateToProps)(Posts)
