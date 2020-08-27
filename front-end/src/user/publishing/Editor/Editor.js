import React, { useState } from 'react'
import EditorSource from '../../publishing/Config/Editor/EditorSource'
const axios = require('axios').default

const Editor = () => {

    const [editorData, setEditorData] = useState("")

    const sendData = () => {
        console.log(editorData)
    }

    const request = () => {
        axios.get('/api/test')
            .then(function (response) {
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
            <EditorSource data={editorData} onChange={data => setEditorData(data)} />
            <button onClick={sendData}>Save</button>
            <button onClick={request}>Request</button>
        </div>
    )
}

export default Editor