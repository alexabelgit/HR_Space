import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    document: PropTypes.object.isRequired,
    onClose: PropTypes.func.isRequired
};

class DocumentViewer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true
        };

        this.handleOnLoad = this.handleOnLoad.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    handleOnLoad(event) {
        event.preventDefault();

        this.setState({ loading: false });
    }

    handleClose(event) {
        event.preventDefault();

        this.props.onClose();
    }

    render() {
        const url = `https://docs.google.com/viewer?embedded=true&url=${this.props.document.url}`;
        const name = this.props.document.name;

        return (
            <div className='document-viewer'>
                <div className='document-viewer-header'>
                    <div></div>
                    <div>{this.state.loading ? `Loading document: ${name}...` : name}</div>
                    <div>
                        <i onClick={this.handleClose} className='fa fa-times'></i>
                    </div>
                </div>
                <iframe
                    onLoad={this.handleOnLoad} 
                    src={url} 
                    frameBorder='0' 
                    style={{ opacity: this.state.loading ? 0 : 1 }}
                />
            </div>
        );
    }
}

DocumentViewer.propTypes = propTypes;

export default DocumentViewer;