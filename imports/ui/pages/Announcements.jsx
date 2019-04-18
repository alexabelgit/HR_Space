import React from 'react';
import { Grid, Row, Col, Button } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

import AnnouncementsCollection from '../../api/collections/announcements';

import AnnouncementsTable from '../components/tables/AnnouncementsTable';
import AnnouncementForm from '../components/forms/AnnouncementForm';

class Announcements extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            announcementForm: null,
            error: null
        };

        this.openAnnouncementForm = this.openAnnouncementForm.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleAnnouncementEdit = this.handleAnnouncementEdit.bind(this);
        this.handleAnnouncementDelete = this.handleAnnouncementDelete.bind(this);
        this.submitCallback = this.submitCallback.bind(this);
    }

    componentDidMount() {
        var nodes = document.querySelectorAll('html, div#root');

        nodes.forEach(node => node.style.background = '#ffffff');
    }

    submitCallback(error, response) {
        console.log(response);
        if (error) {
            switch (error.reason) {
                case 'MISSING_FIELD':
                    let fieldName = error.details.capitalize();

                    setTimeout(() => this.setState({ error: null }), 3000);

                    this.setState({ error: { field: error.details, message: `${fieldName} is required` } });

                    break;
                case 'DATES_MISMATCH':
                    setTimeout(() => this.setState({ error: null }), 3000);

                    this.setState({ error: { field: 'startDate', message: error.details } });

                    break;
                default:
                    setTimeout(() => this.setState({ error: null }), 3000);

                    this.setState({ error: { field: '', message: error.reason } });

                    break;
            }
        } else {
            this.setState({ announcementForm: null });
        }
    }

    openAnnouncementForm(event) {
        event.preventDefault();

        this.setState({
            announcementForm: {
                title: '',
                detail: '',
                startDate: new Date(),
                endDate: new Date(),
                type: '',
                mandatory: true,
                business: Meteor.user().profile.businessId,
                readBy: [],
                deletedFor: []
            }
        });
    }

    handleSubmit(announcement) {
        var index = this.props.announcements.findIndex(a => a._id === announcement._id);

        if (index === -1) Meteor.call('announcements.create', announcement, this.submitCallback);
        else Meteor.call('announcements.update', announcement, this.submitCallback);
    }

    handleCancel() {
        this.setState({ announcementForm: null });
    }

    handleAnnouncementEdit(announcement) {
        this.setState({ announcementForm: announcement });
    }

    handleAnnouncementDelete(announcement) {
        Meteor.call('announcements.remove', announcement, this.submitCallback);
    }

    render() {
        return (
            <Grid className='announcements page' fluid>
                <Row>
                    <Col sm={12}>
                        <Row>
                            <Col sm={5}>
                                <h2>{!this.state.announcementForm ? 'All announcements' :
                                    this.state.announcementForm.title ? 'Edit announcement' : 'New announcement'}</h2>
                            </Col>
                            <Col smOffset={4} sm={3}>
                                {
                                    !this.state.announcementForm
                                    &&
                                    <Button
                                        onClick={this.openAnnouncementForm}
                                        bsClass='button-primary'
                                        style={{ marginTop: '20px', marginBottom: '10px' }}
                                    >
                                        Add new announcement
                                </Button>
                                }
                            </Col>
                            {
                                this.state.announcementForm ?
                                    <AnnouncementForm
                                        onSubmit={this.handleSubmit}
                                        onClose={this.handleCancel}
                                        announcement={this.state.announcementForm}
                                        error={this.state.error}
                                    />
                                    :
                                    <AnnouncementsTable
                                        data={this.props.announcements}
                                        onAnnouncementEdit={this.handleAnnouncementEdit}
                                        onAnnouncementDelete={this.handleAnnouncementDelete}
                                    />
                            }
                        </Row>
                    </Col>
                </Row>
            </Grid>
        );
    }
}

export default withTracker(() => {
    const handle =  Meteor.subscribe('announcements.all');
    const loading = !handle.ready();

    return {
        loading,
        announcements: AnnouncementsCollection.find().fetch()
    };
})(Announcements);