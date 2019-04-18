import { Meteor } from 'meteor/meteor';
import React from 'react';
import { Row, Col, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import moment from 'moment';

import AnnouncementModal from './AnnouncementModal';
import ErrorAlert from './ErrorAlert';

class AnnouncementsBox extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            announcement: null,
            error: null
        };

        this.handleClick = this.handleClick.bind(this);
        this.handleHide = this.handleHide.bind(this);
        this.handleAnnouncementRead = this.handleAnnouncementRead.bind(this);
        this.handleAnnouncementDelete = this.handleAnnouncementDelete.bind(this);
    }

    handleClick(announcement) {
        this.setState({ announcement });
    }

    handleHide() {
        this.setState({ announcement: null });
    }

    handleAnnouncementRead(announcement) {
        const userId = Meteor.userId();

        Meteor.call('announcements.markRead', announcement._id, (error, response) => {
            if (error) {
                setTimeout(() => this.setState({ error: null }), 3000);

                this.setState({ error: error.reason });
            } else {
                this.setState({ announcement: null });
            }
        });
    }

    handleAnnouncementDelete(announcement) {
        Meteor.call('announcements.deleteForUser', announcement, (error, response) => {
            if (error) {
                setTimeout(() => this.setState({ error: null }), 3000);

                this.setState({ error: error.details });
            }
        });
    }

    render() {
        const announcements = this.props.announcements;

        return (
            <div className='box' style={{ height: '550px' }}>
                <div className='custom-border'></div>
                <Col sm={12}>
                    <h3>Announcements</h3>
                </Col>
                <Col sm={12}><div className='custom-divider'></div></Col>
                {
                    !announcements.length
                    &&
                    <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '30px', fontSize: '28px', color: '#ececec' }}>No announcements</div>
                }
                <div className='announcements-wrapper'>
                {announcements.map(announcement => {
                    let iconClass = announcement.type === 'Staff update' ? 'bullhorn' :
                                    announcement.type === 'Policy update' ? 'file-text' :
                                    announcement.type === 'Social update' ? 'thumbs-up' : 'info-circle';

                    let date = moment(announcement.startDate).format('DD/MM/YYYY');

                    let detail = announcement.detail.length > 220 ? announcement.detail.slice(0, 217) + '...' : announcement.detail;

                    return (
                        <Col className='announcement' sm={12} key={announcement._id}>
                            <div className='announcement-icon'>
                                <i className={`fa fa-${iconClass}`}></i>
                            </div>
                            <div className='announcement-type'>
                                {announcement.type.toUpperCase() + ' - ' + date}
                            </div>
                            <div className='announcement-link'>
                                <Link to='#' className='button-link' onClick={e => this.handleClick(announcement)}>Read more</Link>
                            </div>
                            <div className='announcement-title'>
                                {announcement.title}
                                <span className='announcement-delete'>
                                    <i onClick={e => this.handleAnnouncementDelete(announcement)} className='fa fa-times' style={{ color: '#b64a4a' }}></i>
                                </span>
                            </div>
                        </Col>
                    );
                })}
                </div>
                <AnnouncementModal
                    announcement={this.state.announcement}
                    show={!!this.state.announcement}
                    onHide={this.handleHide}
                    onDocumentRead={this.handleAnnouncementRead}
                />
                <ErrorAlert text={this.state.error} visible={!!this.state.error} />
            </div>
        );
    }
}

export default AnnouncementsBox;