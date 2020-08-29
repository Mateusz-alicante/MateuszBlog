import React from "react";
import {
    Route,
} from "react-router-dom";

import Editor from '../../user/publishing/Editor/Editor'

const App = () => {
    return (
        <>
            <Route path='/user/writePost'>
                <Editor />
            </Route>
        </>
    )
}

export default App