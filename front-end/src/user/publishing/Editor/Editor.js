import React, { useState } from 'react'
import EditorSource from '../../publishing/Config/Editor/EditorSource'
import FileUpload from '../Components/FileUpload/FileUpload'
import { connect } from 'react-redux'
const axios = require('axios').default

const Editor = (props) => {

    const [body, setBody] = useState("")
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [imageURL, setImageURL] = useState("")
    const [tags, setTags] = useState([])


    const request = () => {
        axios.post('/api/posts/savePost', {
            title,
            description,
            imageURL,
            tags,
            body
        }, {
            headers: {
                authorization: props.redux.auth.token
            }}).then(function (response) {
                // handle success
                console.log(response);
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
    }

    return (
        <div className="App">
            <div>
                <label>Title:</label>
                <input type='text' onChange={(event) => setTitle(event.target.value)} />
                <label>Description:</label>
                <input type='textarea' onChange={(event) => setDescription(event.target.value)} />
                <label>Image:</label>
                <FileUpload url='/api/imageUpload/upload' handleImageUploaded={(url) => setImageURL(url)} />
                <label>Tags:</label>
                <input type="text" onChange={(event) => setTags(event.target.value.split(', '))} />
                <label>body:</label>
                <EditorSource data={body} onChange={data => setBody(data)} />
                <button onClick={request}>Save</button>
            </div>

            <button onClick={request}>Request</button>
        </div>
    )
}

const mapStateToProps = (state) => ({
    redux: state
})

export default connect(mapStateToProps)(Editor)