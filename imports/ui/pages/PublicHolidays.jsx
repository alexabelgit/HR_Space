import React from 'react';
import { Grid, Row, Col, Button } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

import HolidayDates from '../../api/collections/holidayDates';

import PublicHolidaysTable from '../components/tables/PublicHolidaysTable';
import PublicHolidayForm from '../components/forms/PublicHolidayForm';

class PublicHolidays extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            holidayForm: null,
            error: null
        };

        this.openHolidayForm = this.openHolidayForm.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSubmitAndStay = this.handleSubmitAndStay.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleHolidayEdit = this.handleHolidayEdit.bind(this);
        this.handleHolidayDelete = this.handleHolidayDelete.bind(this);
        this.submitCallback = this.submitCallback.bind(this);
        this.submitAndStayCallback = this.submitAndStayCallback.bind(this);
    }

    componentDidMount() {
        var nodes = document.querySelectorAll('html, div#root');

        nodes.forEach(node => node.style.background = '#ffffff');
    }

    openHolidayForm(event) {
        event.preventDefault();

        this.setState({
            holidayForm: {
                name: '',
                date: new Date(),
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
            this.setState({ holidayForm: null });
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

    handleSubmit(holiday) {
        var index = this.props.publicHolidays.findIndex(item => item._id === holiday._id);

        console.log(holiday);

        if (index === -1) Meteor.call('publicHolidays.create', holiday, this.submitCallback);
        else Meteor.call('publicHolidays.update', holiday, this.submitCallback);
    }

    handleSubmitAndStay(holiday) {
        var index = this.props.publicHolidays.findIndex(item => item._id === holiday._id);

        if (index === -1) Meteor.call('publicHolidays.create', holiday, this.submitAndStayCallback);
        else Meteor.call('publicHolidays.update', holiday, this.submitAndStayCallback);
    }

    handleCancel() {
        this.setState({ holidayForm: null });
    }

    handleHolidayEdit(holiday) {
        this.setState({ holidayForm: holiday });
    }

    handleHolidayDelete(holiday) {
        Meteor.call('publicHolidays.remove', holiday, this.submitCallback);
    }

    render() {
        return (
            <Grid className='public-holidays page' fluid>
                <Row>
                    <Col sm={9}>
                        <Row>
                            <Col sm={5}>
                                <h2>{!this.state.holidayForm ? 'Public holidays' :
                                    this.state.holidayForm.name ? 'Edit public holiday' : 'Add public holiday'}</h2>
                            </Col>
                            <Col sm={3}>
                                {
                                    !this.state.holidayForm
                                    &&
                                    <Button
                                        onClick={this.openHolidayForm}
                                        bsClass='button-primary'
                                        style={{ marginTop: '20px', marginBottom: '10px' }}
                                    >
                                        Add public holiday
                                    </Button>
                                }
                            </Col>
                            {
                                this.state.holidayForm ?
                                    <PublicHolidayForm
                                        publicHoliday={this.state.holidayForm}
                                        onSubmit={this.handleSubmit}
                                        onSubmitAndStay={this.handleSubmitAndStay}
                                        onClose={this.handleCancel}
                                        error={this.state.error}
                                    />
                                    :
                                    <PublicHolidaysTable
                                        data={this.props.publicHolidays}
                                        onDataEdit={this.handleHolidayEdit}
                                        onDataDelete={this.handleHolidayDelete}
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
    const handle = Meteor.subscribe('holidayDates.all', 'public');
    const loading = !handle.ready();

    return {
        loading,
        publicHolidays: HolidayDates.find().fetch()
    }
})(PublicHolidays);