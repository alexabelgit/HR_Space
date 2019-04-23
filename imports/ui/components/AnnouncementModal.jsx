import React from 'react';
import PropTypes from 'prop-types';
import { Button, Row, Col, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import moment from 'moment';

const propTypes = {
    announcement: PropTypes.object,
    show: PropTypes.bool.isRequired,
    onHide: PropTypes.func.isRequired,
    onDocumentRead: PropTypes.func.isRequired
};

class AnnouncementModal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        const { announcement, onDocumentRead, ...props } = this.props;

        return (
            <Modal {...props}>
                <Modal.Header>
                    <Modal.Title>{announcement && announcement.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div style={{ overflow: 'hidden', textAlign: 'center' }} dangerouslySetInnerHTML={{ __html: announcement && announcement.detail }}></div>
                </Modal.Body>
                <Modal.Footer>
                    <div style={{ display: 'inline-block', float: 'right', marginLeft: '15px' }}>
                        <Button 
                            style={{ width: 'auto' }} 
                            bsClass='button-secondary' 
                            onClick={this.props.onHide}
                        >
                            Close
                        </Button>
                    </div>
                    <div style={{ display: 'inline-block', float: 'right' }}>
                    {
                        (announcement && announcement.mandatory)
                        &&
                        <Button 
                            style={{ width: 'auto' }} 
                            bsClass='button-primary' 
                            disabled={announcement && !!~announcement.readBy.indexOf(Meteor.userId())}
                            onClick={e => this.props.onDocumentRead(announcement)}
                        >
                        {
                            announcement && !!~announcement.readBy.indexOf(Meteor.userId()) ?
                                'You marked this document as read'
                                :
                                'I have read this document'
                        }
                        </Button>
                    }
                    </div>
                </Modal.Footer>
            </Modal>
        );
    }
}

AnnouncementModal.propTypes = propTypes;

export default AnnouncementModal;