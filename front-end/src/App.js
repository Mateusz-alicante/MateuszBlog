import React from 'react';
import Editor from './user/publishing/Editor/Editor'
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <div className="App">
      <Editor/>
      <ToastContainer />
    </div>
  );
}

export default App;
