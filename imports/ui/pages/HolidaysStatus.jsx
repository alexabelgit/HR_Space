import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import React from 'react';
import { Grid, Row, Col, Button } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';

import PendingHolidaysTable from '../components/tables/PendingHolidaysTable';
import UpcomingHolidaysTable from '../components/tables/UpcomingHolidaysTable';
import UserHolidaysTable from '../components/tables/UserHolidaysTable';
import CancelledHolidaysTable from '../components/tables/CancelledHolidaysTable';
import HolidayForm from '../components/forms/HolidayForm';

import Holiday from '../../api/collections/holiday';

class HolidaysStatus extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            holidayForm: null,
        };
    }

    componentDidMount() {
        var nodes = document.querySelectorAll('html, div#root');

        nodes.forEach(node => node.style.background = '#ffffff');
    }

    openHolidayForm = event => {
        event.preventDefault();

        this.setState({ holidayForm: true });
    }

    handleSubmit = holiday => {
        Meteor.call('holiday.create', holiday, (error, response) => {
            if (error) {
                switch (error.reason) {
                    case 'MISSING_FIELD':
                        let fieldName = error.details.capitalize();

                        toast.error(`${fieldName} is required`);

                        break
                    default:
                        toast.error(error.reason);

                        break;
                }
            } else {
                this.setState({ holidayForm: null });
            }
        });
    }

    handleHolidayCancel = holiday => {
        Meteor.call('holiday.cancel', holiday._id, (error, response) => {
            if (error) {
                toast.error(error.reason);
            }
        });
    }

    render() {
        return (
            <Grid className='holidays-status page' fluid>
                <Row>
                    <Col sm={12}>
                        <Row>
                            <Col sm={5}>
                                <h2>
                                {
                                    !this.state.holidayForm ? 'Holiday Status' : 'Holiday Requests'
                                }
                                </h2>
                            </Col>
                            <Col smOffset={4} sm={3}>
                            {
                                !this.state.holidayForm
                                &&
                                <Button
                                    onClick={this.openHolidayForm}
                                    bsClass='button-primary'
                                    style={{ marginTop: '20px', marginBottom: '10px' }}
                                >
                                    Request a Holiday
                                </Button>
                            }
                            </Col>
                            {
                                this.state.holidayForm ?
                                    <HolidayForm 
                                        userInfo={this.props.userInfo}
                                        onSubmit={this.handleSubmit} />
                                    :
                                    <Col sm={12}>
                                        <Row>
                                            <Col sm={6}>
                                                <PendingHolidaysTable 
                                                    data={this.props.holidays.filter(holiday => holiday.status === 'pending')} 
                                                    onCancel={this.handleHolidayCancel} 
                                                />
                                            </Col>
                                            <Col sm={6}>
                                                <UpcomingHolidaysTable 
                                                    data={this.props.holidays.filter(holiday => (Date.now() < +holiday.startDate) && (holiday.status === 'approved'))} 
                                                    onCancel={this.handleHolidayCancel} 
                                                />
                                            </Col>
                                            <Col sm={6}>
                                                <UserHolidaysTable 
                                                    data={this.props.holidays.filter(holiday => (Date.now() > +holiday.startDate) && (holiday.status === 'approved'))} 
                                                />
                                            </Col>
                                            <Col sm={6}>
                                                <CancelledHolidaysTable 
                                                    data={this.props.holidays.filter(holiday => holiday.status === 'cancelled')} 
                                                />
                                            </Col>
                                        </Row>
                                    </Col>
                            }
                        </Row>
                    </Col>
                </Row>
                <ToastContainer autoClose={3000} position={toast.POSITION.TOP_CENTER} />
            </Grid>
        );
    }
}

export default withTracker(props => {
    const userId = props.userInfo.userId || Meteor.userId();
    const holidaysHandle = Meteor.subscribe('holidays.user', userId);
    const loading = !holidaysHandle.ready();

    return {
        loading,
        holidays: Holiday.find().fetch(),
    }
})(HolidaysStatus);