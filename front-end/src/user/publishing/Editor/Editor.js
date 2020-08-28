import React, { useState } from 'react'
import EditorSource from '../../publishing/Config/Editor/EditorSource'
import FileUpload from '../Components/FileUpload/FileUpload'
const axios = require('axios').default

const Editor = () => {

    const [editorData, setEditorData] = useState("")
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [url, setUrl] = useState("")
    const [tags, setTags] = useState([])


    const request = () => {
        axios.post('/api/posts/savePost', {
            title,
            description,
            url,
            tags,
            editorData
        }).then(function (response) {
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
                <FileUpload url='/api/imageUpload/upload' handleImageUploaded={(url) => setUrl(url)} />
                <label>Tags:</label>
                <input type="text" onChange={(event) => setTags(event.target.value.split(', '))} />
                <label>body:</label>
                <EditorSource data={editorData} onChange={data => setEditorData(data)} />
                <button onClick={request}>Save</button>
            </div>

            <button onClick={request}>Request</button>
        </div>
    )
}

export default Editor