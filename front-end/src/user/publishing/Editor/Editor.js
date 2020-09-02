import React, { useState, useEffect } from 'react'
import EditorSource from '../../publishing/Config/Editor/EditorSource'
import FileUpload from '../Components/FileUpload/FileUpload'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { toast } from 'react-toastify';
import styles from './Editor.module.css'

const axios = require('axios').default


const Editor = (props) => {

    const history = useHistory()
    const [body, setBody] = useState("")
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [imageURL, setImageURL] = useState("")
    const [tags, setTags] = useState([])
    const [isPublic, setPublic] = useState(false)
    const [id, setId] = useState(undefined)
    const [createdAt, setCreatedAt] = useState(undefined)
    const queryString = require('query-string');

    useEffect(() => {
        const id = queryString.parse(history.location.search).id
        if (id) {
            fetchData(id)
        }
    }, [])

    useEffect(() => {
        const interval = setInterval(post, 180000, { preventDefault: () => { } })
        return () => clearInterval(interval)
    })

    const fetchData = async (id) => {
        const response = await axios.get(`/api/posts/fetchPostEditor?id=${id}`, {
            headers: {
                authorization: props.redux.auth.token
            }
        }).catch(e => {
            toast.error(`An error ocurred: ${e}`, {
                position: toast.POSITION.BOTTOM_RIGHT,
            })
        })
        if (response && response.status === 200) {
            const post = response.data
            setTitle(post.title)
            setBody(post.body)
            setImageURL(post.imageURL)
            setDescription(post.description)
            setTags(post.tags)
            setPublic(post.isPublic)
            setId(post._id)
            setCreatedAt(post.createdAt)

            toast.success(`Post data loaded`, {
                position: toast.POSITION.BOTTOM_RIGHT,
            })
        }
    }


    const post = (e) => {
        e.preventDefault()
        const url = id ? '/api/posts/updatePost' : '/api/posts/savePost'
        axios.post(url, {
            title,
            description,
            imageURL,
            tags,
            body,
            isPublic,
            createdAt
        }, {
            headers: {
                authorization: props.redux.auth.token,
                id
            }
        }).then(function (response) {
            toast.success('Post successfully saved', {
                position: toast.POSITION.BOTTOM_RIGHT,
            })
        })
            .catch(function (error) {
                toast.error(`Got error when trying to save post: ${error}`, {
                    position: toast.POSITION.BOTTOM_RIGHT,
                })
            })
    }

    const saveAndFinish = async (e) => {
        post(e)
        if (isPublic) {
            history.push(`/post/${id}`)
        } else {
            history.push('/')
        }
    }

    const handleResetDate = (e) => {
        e.preventDefault()
        setCreatedAt(Date.now())
    }


    return (
        <div className={styles.outerContainer}>
            <div className={styles.innerContainer}>
                <div className={styles.commonContainer}>
                    <label>Title:</label>
                    <input type='text' value={title} onChange={(event) => setTitle(event.target.value)} />
                </div>
                <div className={styles.commonContainer}>
                    <label>Description:</label>
                    <textarea value={description} onChange={(event) => setDescription(event.target.value)} />
                </div>
                <div className={styles.image} >
                    <label className={styles.image__label}>Image:</label>
                    <FileUpload url='/api/imageUpload/upload' imageURL={imageURL} handleImageUploaded={(url) => setImageURL(url)} />
                </div>
                <div className={styles.commonContainer} style={{marginTop: "1em"}}>
                    <label>Tags:</label>
                    <input type="text" value={tags.join(', ')} onChange={(event) => setTags(event.target.value.split(', '))} />
                </div>
                <div className={styles.editorContainer} >
                    <label style={{fontSize: "3em"}} >body:</label>
                    <EditorSource data={body} onChange={data => setBody(data)} className={styles.Editor} />
                </div>
                <div className={styles.commonContainer} style={{marginTop: "1em"}}>
                    <label>Make publically visible:</label>
                    <input type="checkbox" checked={isPublic} onClick={() => setPublic(!isPublic)}></input>
                </div>
                <div>
                    <label>Reset date published:</label>
                    <button onClick={handleResetDate}>Reset</button>
                </div>
                <div className={styles.buttonContainer}>
                    <button onClick={post}>Quicksave</button>
                    <button onClick={saveAndFinish}>Save and finish</button>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    redux: state
})

export default connect(mapStateToProps)(Editor)