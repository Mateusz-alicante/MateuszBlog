import React, { useState, useEffect } from 'react'
import EditorSource from '../../publishing/Config/Editor/EditorSource'
import FileUpload from '../Components/FileUpload/FileUpload'
import { connect } from 'react-redux'
import {useHistory} from 'react-router-dom'
import { toast } from 'react-toastify';
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
    const queryString = require('query-string');

    useEffect(() => {
        const id = queryString.parse(history.location.search).id
        if (id) {
            fetchData(id)
        }
    }, [])

    useEffect(() => {
        const interval = setInterval(post, 180000, {preventDefault: () => {}})
        return () => clearInterval(interval)
    })

    const fetchData = async (id) => {
        const response = await axios.get(`/api/posts/fetchPostEditor?id=${id}`, {
            headers: {
                authorization: props.redux.auth.token
        }}).catch(e => {
            toast.error(`An error ocurred: ${e}` ,{
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

            toast.success(`Post data loaded` ,{
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
            isPublic
        }, {
            headers: {
                authorization: props.redux.auth.token,
                id
            }}).then(function (response) {
                toast.success('Post successfully saved' ,{
                    position: toast.POSITION.BOTTOM_RIGHT,
                  })
                console.log('saved data')
            })
            .catch(function (error) {
                toast.error(`Got error when trying to save post: ${error}` ,{
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


    return (
        <div className="App">
            <div>
                <label>Title:</label>
                <input type='text' value={title} onChange={(event) => setTitle(event.target.value)} />
                <label>Description:</label>
                <input type='textarea' value={description} onChange={(event) => setDescription(event.target.value)} />
                <label>Image:</label>
                <FileUpload url='/api/imageUpload/upload' imageURL={imageURL} handleImageUploaded={(url) => setImageURL(url)} />
                <label>Tags:</label>
                <input type="text" value={tags.join(', ')} onChange={(event) => setTags(event.target.value.split(', '))} />
                <label>body:</label>
                <EditorSource data={body} onChange={data => setBody(data)} />
                <input type="checkbox" checked={isPublic} onClick={() => setPublic(!isPublic)}></input>
                <button onClick={post}>Quicksave</button>
                <button onClick={saveAndFinish}>Save and finish</button>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    redux: state
})

export default connect(mapStateToProps)(Editor)