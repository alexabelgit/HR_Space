import React from 'react';
import { Grid, Row, Col, Button } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

import HolidayDates from '../../api/collections/holidayDates';

import BlockedDatesTable from '../components/tables/BlockedDatesTable';
import BlockedDateForm from '../components/forms/BlockedDateForm';

class BlockedDates extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            dateForm: null,
            error: null
        };

        this.openDateForm = this.openDateForm.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSubmitAndStay = this.handleSubmitAndStay.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleDateEdit = this.handleDateEdit.bind(this);
        this.handleDateDelete = this.handleDateDelete.bind(this);
        this.submitCallback = this.submitCallback.bind(this);
        this.submitAndStayCallback = this.submitAndStayCallback.bind(this);
    }

    componentDidMount() {
        var nodes = document.querySelectorAll('html, div#root');

        nodes.forEach(node => node.style.background = '#ffffff');
    }

    openDateForm(event) {
        event.preventDefault();

        this.setState({
            dateForm: {
                _id: '',
                name: '',
                date: new Date(),
                endDate: null,
                isActive: true,
            }
        });
    }

    submitCallback(error, response) {
        if (error) {
            switch (error.reason) {
                case 'DUPLICATE_DOCUMENT':
                    setTimeout(() => this.setState({ error: null }), 3000);

                    this.setState({ error: { field: 'name', message: error.details } });
                    break;
                case 'MISSING_FIELD':
                    let fieldName = error.details.capitalize();
    
                    setTimeout(() => this.setState({ error: null }), 3000);
                    
                    this.setState({ error: { field: error.details, message: `${fieldName} is required` }});
                    break
                default:
                    setTimeout(() => this.setState({ error: null }), 3000);

                    this.setState({ error: { field: '', message: error.reason } });
                    break;
            }
        } else {
            this.setState({ dateForm: null });
        }
    }

    submitAndStayCallback(error, response) {
        if (error) {
            switch (error.reason) {
                case 'DUPLICATE_DOCUMENT':
                    setTimeout(() => this.setState({ error: null }), 3000);

                    this.setState({ error: { field: 'name', message: error.details } });
                    break;
                case 'MISSING_FIELD':
                    let fieldName = error.details.capitalize();
    
                    setTimeout(() => this.setState({ error: null }), 3000);
                    
                    this.setState({ error: { field: error.details, message: `${fieldName} is required` }});
                    break
                default:
                    setTimeout(() => this.setState({ error: null }), 3000);

                    this.setState({ error: { field: '', message: error.reason } });
                    break;
            }
        }
    }

    handleSubmit(date) {
        var index = this.props.blockedDates.findIndex(item => item._id === date._id);

        if (index === -1) Meteor.call('blockedDates.create', date, this.submitCallback);
        else Meteor.call('blockedDates.update', date, this.submitCallback);
    }

    handleSubmitAndStay(date) {
        var index = this.props.blockedDates.findIndex(item => item._id === date._id);

        if (index === -1) Meteor.call('blockedDates.create', date, this.submitAndStayCallback);
        else Meteor.call('blockedDates.update', date, this.submitAndStayCallback);
    }

    handleCancel() {
        this.setState({ dateForm: null });
    }

    handleDateEdit(date) {
        this.setState({ dateForm: date });
    }

    handleDateDelete(date) {
        Meteor.call('blockedDates.remove', date, this.submitCallback);
    }

    render() {
        return (
            <Grid className='blocked-dates page' fluid>
                <Row>
                    <Col sm={9}>
                        <Row>
                            <Col sm={5}>
                                <h2>{!this.state.dateForm ? 'Blocked dates' :
                                    this.state.dateForm.name ? 'Edit blocked date' : 'Add blocked date'}</h2>
                            </Col>
                            <Col sm={3}>
                                {
                                    !this.state.dateForm
                                    &&
                                    <Button
                                        onClick={this.openDateForm}
                                        bsClass='button-primary'
                                        style={{ marginTop: '20px', marginBottom: '10px' }}
                                    >
                                        Add blocked date
                                    </Button>
                                }
                            </Col>
                            {
                                this.state.dateForm ?
                                    <BlockedDateForm
                                        blockedDate={this.state.dateForm}
                                        onSubmit={this.handleSubmit}
                                        onSubmitAndStay={this.handleSubmitAndStay}
                                        onClose={this.handleCancel}
                                        error={this.state.error}
                                    />
                                    :
                                    <BlockedDatesTable
                                        data={this.props.blockedDates}
                                        onDataEdit={this.handleDateEdit}
                                        onDataDelete={this.handleDateDelete}
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
    const handle = Meteor.subscribe('holidayDates.all', 'blocked');
    const loading = !handle.ready();

    return {
        loading,
        blockedDates: HolidayDates.find().fetch()
    }
})(BlockedDates);