import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import React from 'react';
import { Grid, Button, Modal, FormControl } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import moment from 'moment';
import classnames from 'classnames';
import { toast, ToastContainer } from 'react-toastify';
import { Roles } from 'meteor/alanning:roles'

import FlexDiv from '../components/FlexDiv';
import MainMenuItem from '../components/MainMenuItem';
import AnnouncementsBox from '../components/AnnouncementsBox';
import HolidaysBox from '../components/HolidaysBox';
import AbsenceBox from '../components/AbsenceBox';
import Alert from '../components/Alert';

import Announcements from '../../api/collections/announcements';
import Tasks from '../../api/collections/tasks';
const meteorCall = (methodName, ...args) => new Promise((resolve, reject) => {
    Meteor.call(methodName, ...args, (error, response) => {
        if (error) reject(error.reason);
        else resolve(response);
    });
});

class Main extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            holidayEntitlement: 0,
            daysTaken: 0,
            bradfordFactor: 0,
            recogniseModal: false,
            cancelHolidayId: '',
        };
    }

    async componentWillReceiveProps(nextProps) {
        var userId;

        if (nextProps.location.state) {
            userId = nextProps.location.state.userId;

            this.props.onLoginUserInfoChange({ userId, isNew: false });

            this.props.history.replace({
                pathname: this.props.history.location.pathname,
                state: undefined,
            });
        } else {
            userId = nextProps.userInfo.userId || Meteor.userId();
        }

        try {
            const holidayAllowance = await meteorCall('getHolidayAllowanceDashboard.user', userId);
            const bradfordFactor = await meteorCall('getBradfordFactor.userId', userId);

            console.log('bradford factor: ', bradfordFactor);

            this.setState((prevState, props) => ({ ...holidayAllowance, bradfordFactor }));
        } catch (error) {
            toast.error(error);
        }
        //TODO: move bradford factor outside absence box
    }

    componentDidMount() {
        var nodes = document.querySelectorAll('html, div#root');

        nodes.forEach(node => node.style.background = '#ececec');

        // Meteor.call('test', (err, res) => console.log(res));
    }

    handleTaskDismiss = alertId => {
        Meteor.call('completeTask', alertId, (error, response) => {
            if (error) {
                toast.error(error.reason);
            }
        });
    }

    handleModalShow = event => {
        event.preventDefault();

        this.setState({ recogniseModal: true });
    }

    handleCancelModalSubmit = event => {
        event.preventDefault();

        const reason = this.cancelReasonInput.value.trim();

        if (!reason) {
            toast.error('Reason is required');
        } else {
            Meteor.call('holiday.cancel', { holidayId: this.state.cancelHolidayId, cancelReason: reason }, (error, response) => {
                if (error) {
                    toast.error(error.reason);
                } else {
                    this.setState({ cancelHolidayId: '' });
                }
            });
        }
    }

    handleCancelModalClose = event => {
        event.preventDefault();

        this.setState({ cancelHolidayId: '' });
    }

    handleModalSubmit = event => {
        event.preventDefault();

        const announcement = {
            title: this.modalInput.value.trim(),
            detail: this.modalInput.value.trim(),
            startDate: new Date(),
            endDate: new Date(Date.now() + 86400000), // Date.now() + 1 day
            type: 'Social update',
            mandatory: false,
            business: Meteor.user().profile.businessId,
        };

        Meteor.call('announcements.create', announcement, (error, response) => {
            if (error) {
                toast.error(error.reason);
            } else {
                this.setState({ recogniseModal: false });
            }
        });
    }

    handleModalClose = event => {
        event.preventDefault();

        this.setState({ recogniseModal: false });
    }

    handleHolidayApprove = holidayId => {
        Meteor.call('holiday.approve', holidayId, (error, response) => {
            if (error) {
                toast.error(error.reason);
            }
        });
    }

    handleHolidayDecline = holidayId => {
        this.setState({ cancelHolidayId: holidayId });
        // Meteor.call('holiday.cancel', holidayId, (error, response) => {
        //     if (error) {
        //         toast.error(error.reason);
        //     }
        // });
    }

    render() {
        const isEmployee = Roles.userIsInRole(Meteor.userId(), 'employee');
        const isManager =  Roles.userIsInRole(Meteor.userId(), 'manager');
        const isHr = Roles.userIsInRole(Meteor.userId(), 'hr');

        return (
            <Grid className='main' style={{ paddingTop: '20px' }} fluid>
                <div>
                    {this.props.tasks.map(task => (
                            <Alert 
                                key={task._id} 
                                task={task}
                                onTaskDismiss={this.handleTaskDismiss} 
                                onHolidayApprove={this.handleHolidayApprove}
                                onHolidayDecline={this.handleHolidayDecline}
                            />
                        )
                    )}
                </div>
                <FlexDiv>
                    <MainMenuItem 
                        icon='clipboard' 
                        text='Personal Details' 
                        to='/personal_details/summary' 
                    />
                    <MainMenuItem 
                        icon='clock-o' 
                        text='Holidays and Absences' 
                        to='/holidays_status' 
                    />
                    <MainMenuItem 
                        icon='file-text-o' 
                        text='My HR Documents' 
                        to='/hr_documents' 
                    />
                    <MainMenuItem 
                        icon='calendar' 
                        text='View Calendar' 
                        to='/calendar' 
                    />
                    {
                        !isEmployee 
                        && 
                        !isManager
                        &&
                        <MainMenuItem 
                            icon='trophy' 
                            text='Recognise a colleague' 
                            to='#' 
                            onClick={this.handleModalShow}
                        />
                    }
                </FlexDiv>
                <FlexDiv>
                    <div style={{ height: '550px', width: '59.2%' }}>
                        <AnnouncementsBox announcements={this.props.announcements} />
                    </div>
                    <div style={{ width: '38.875%' }}>
                        <HolidaysBox holidayEntitlement={this.state.holidayEntitlement} daysTaken={this.state.daysTaken} />
                    {
                        !isEmployee 
                        && 
                        <AbsenceBox bradfordFactor={this.state.bradfordFactor} />
                    }
                    </div>
                </FlexDiv>
                <Modal show={!!this.state.cancelHolidayId}>
                    <Modal.Header>
                        <Modal.Title>Reason</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <FormControl
                            componentClass='textarea'
                            rows={4}
                            bsClass='input'
                            inputRef={node => this.cancelReasonInput = node}
                        />
                    </Modal.Body>
                    <Modal.Footer>
                        <div style={{ display: 'inline-block', float: 'right', marginLeft: '15px' }}>
                            <Button
                                bsClass='button-secondary'
                                onClick={this.handleCancelModalClose}
                            >
                                Close
                            </Button>
                        </div>
                        <div style={{ display: 'inline-block', float: 'right' }}>
                            <Button
                                bsClass='button-primary'
                                onClick={this.handleCancelModalSubmit}
                            >
                                Post
                            </Button>
                        </div>
                    </Modal.Footer>
                </Modal>
                <Modal show={this.state.recogniseModal}>
                    <Modal.Header>
                        <Modal.Title>Recognise a colleague</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <FormControl 
                            componentClass='textarea'
                            rows={4}
                            bsClass='input'
                            inputRef={node => this.modalInput = node}
                        />
                    </Modal.Body>
                    <Modal.Footer>
                        <div style={{ display: 'inline-block', float: 'right', marginLeft: '15px' }}>
                            <Button 
                                bsClass='button-secondary' 
                                onClick={this.handleModalClose}
                            >
                                Close
                            </Button>
                        </div>
                        <div style={{ display: 'inline-block', float: 'right' }}>
                            <Button 
                                bsClass='button-primary' 
                                onClick={this.handleModalSubmit}
                            >
                                Post
                            </Button>
                        </div>
                    </Modal.Footer>
                </Modal>
                <ToastContainer autoClose={3000} position={toast.POSITION.TOP_CENTER} />
            </Grid>
        );
    }
}

export default withTracker(props => {
    const announcementsHandle = Meteor.subscribe('announcements.filterDeleted');
    const tasksHandle = Meteor.subscribe('tasks.user');
    const loading = !announcementsHandle.ready() || !tasksHandle.ready();

    return {
        loading,
        announcements: Announcements.find().fetch(),
        tasks: Tasks.find().fetch(),
    };
})(Main);