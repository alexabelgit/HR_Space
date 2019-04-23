import React from 'react';
import PropTypes from 'prop-types';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';

import '../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { HelpBlock } from 'react-bootstrap';

const propTypes = {
    html: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    onImageUpload: PropTypes.func.isRequired
};

class CustomEditor extends React.Component {
    constructor(props) {
        super(props);

        const contentBlock = htmlToDraft(props.html);

        if (contentBlock) {
            const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);

            const editorState = EditorState.createWithContent(contentState);

            this.state = {
                editorState,
            };
        }

        this.handleChange = this.handleChange.bind(this);
    }

    handleEditorFocus() {
        document.querySelector('.editor-wrapper').style.border = '2px solid #8fc510';
    }

    handleEditorBlur() {
        document.querySelector('.editor-wrapper').style.border = '2px solid #eeeeee';
    }

    handleChange(editorState) {
        this.setState({ editorState });

        var html = draftToHtml(convertToRaw(editorState.getCurrentContent()));

        this.props.onChange(html);
    }

    render() {
        const toolbarOptions = {
            options: ['inline', 'blockType', 'fontSize', 'fontFamily', 'list', 'textAlign', 'colorPicker', 'link', 'image', 'remove', 'history'],
            image: { 
                inputAccept: 'image/jpeg,image/jpg,image/png',
                uploadEnabled: true, 
                uploadCallback: this.props.onImageUpload, 
                previewImage: true,
                alignmentEnabled: true
            },
        };

        const { editorState } = this.state;

        return (
            <Editor
                editorState={editorState}
                toolbar={toolbarOptions}
                wrapperClassName='editor-wrapper input'
                editorClassName='editor'
                toolbarClassName='editor-toolbar'
                onFocus={this.handleEditorFocus}
                onBlur={this.handleEditorBlur}
                onEditorStateChange={this.handleChange}
            />
        )
    }
}

CustomEditor.propTypes = propTypes;

export default CustomEditor;