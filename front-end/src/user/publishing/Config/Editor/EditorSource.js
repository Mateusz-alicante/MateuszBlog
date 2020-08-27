import React from 'react'

import CKEditor from '@ckeditor/ckeditor5-react'
import ClassicEditor from "@ckeditor/ckeditor5-editor-classic/src/classiceditor";
import editorConfiguration from './EditorConfig'




class EditorSource extends React.Component {
  state = {
    editorConfig: undefined,
    data: this.props.data
  }

  componentWillMount() {
    this.setState({editorConfig: editorConfiguration('test')})
  }
  render() {

    return (
      <div>
        <CKEditor
          editor={ClassicEditor}
          config={this.state.editorConfig}
          onChange={(event, editor) => this.props.onChange(editor.getData())}
          data={this.props.data}
        />

      </div>
    )
  }
}

export default EditorSource
