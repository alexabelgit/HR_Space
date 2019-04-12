import React from 'react';
import { Button, Row, Col, Form, ControlLabel, FormGroup } from 'react-bootstrap';
import moment from 'moment';
import { toast } from 'react-toastify';

import FieldGroup from '../FieldGroup';
import DateInput from '../DateInput';

class HolidayForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            startDate: null,
            endDate: null,
            employee: props.userInfo.userId || Meteor.userId(),
            notes: '',
            annualLeaveEntitlement: 0,
            totalHolidayRequested: 0,
            holidayDuration: 0,
            holidayDates: [],
            workingPattern: null,
        };
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.userInfo.userId !== nextProps.userInfo.userId) {
            Meteor.call('getHolidayAllowance.user', nextProps.userInfo.userId || Meteor.userId(), (error, response) => {
                if (error) {
                    toast.error(error.reason);
                } else {
                    this.setState({ ...response });
                }
            });
        }
    }

    componentDidMount() {
        Meteor.call('getHolidayAllowance.user', this.props.userInfo.userId || Meteor.userId(), (error, response) => {
            if (error) {
                toast.error(error.reason);
            } else {
                this.setState({ ...response });
            }
        });
    }

    validateHoliday = stateProp => {
        const { annualLeaveEntitlement, totalHolidayRequested, startDate, endDate, workingPattern, holidayDates } = this.state;

        if (startDate && endDate) {
            let holidayDuration = 0;

            const isDateWorkingDay = date => {
                // try {
                    for (let holidayDate of holidayDates) {
                    // holidayDates.forEach(holidayDate => {
                        if (holidayDate.endDate) {
                            for (let _date = new Date(+holidayDate.date); _date <= +holidayDate.endDate; _date.setDate(_date.getDate() + 1)) {
                                if (moment(_date).isBetween(moment(startDate), moment(endDate), null, '[]')) {
                                    throw `The period between ${startDate.toLocaleDateString()} and ${endDate.toLocaleDateString()} contains blocked dates`;
                                }
                            }
                        }

                        if (moment(holidayDate.date).isBetween(moment(startDate), moment(endDate), null, '[]')) {
                            if (holidayDate.type === 'blocked') {
                                throw `The period between ${startDate.toLocaleDateString()} and ${endDate.toLocaleDateString()} contains blocked dates`;
                            }

                            if (moment(date).isSame(holidayDate.date, 'day')) {
                                return false;
                            }
                        }
                    // });
                    }
                // } catch (e) {
                //     if (typeof e === 'string') {
                //         throw e;
                //     }

                //     return e;
                // }
    
                let dayIndex = date.getDay();

                if (workingPattern && (workingPattern.weekHours[dayIndex] < 1)) {
                    return false;
                }
    
                return true;
            };

            try {
                for (let date = new Date(+startDate); date <= +endDate; date.setDate(date.getDate() + 1)) {
                    if (isDateWorkingDay(new Date(date))) {
                        holidayDuration++;
                    }
                }

                if (annualLeaveEntitlement - (totalHolidayRequested + holidayDuration) < 0) {
                    throw 'You have exceeded you annual holiday allowance';
                }

                this.setState({ holidayDuration });
            } catch (error) {
                toast.error(error);

                this.setState({ [stateProp]: null, holidayDuration: 0 });
            }
        }
    }

    handleChange = event => {
        this.setState({ [event.target.id]: event.target.value })
    }

    handleDateChange = (date, stateProp) => {
        this.setState({ [stateProp]: date }, () => this.validateHoliday(stateProp));
    }

    handleSubmit = event => {
        event.preventDefault();

        const holidayRequest = {
            startDate: this.state.startDate,
            endDate: this.state.endDate,
            employee: this.state.employee,
            notes: this.state.notes,
        };

        this.props.onSubmit(holidayRequest);
    }

    render() {
        const holidayStyle = {
            fontSize: '20px',
            textAlign: 'right',
            paddingTop: '10px',
            paddingBottom: '10px'
        };

        return (
            <Col sm={10} style={{ marginTop: '20px' }}>
                <Form horizontal onSubmit={this.handleSubmit}>
                    <FormGroup bsSize='lg' controlId='startDate'>
                        <Col componentClass={ControlLabel} smOffset={1} sm={3}>First Day of Leave</Col>
                        <Col sm={3}>
                            <DateInput 
                                id='startDate' 
                                selected={this.state.startDate} 
                                onChange={date => this.handleDateChange(date, 'startDate')} 
                                wrapperStyle={{ width: '100%' }} 
                                excludeDates={this.state.holidayDates.filter(holidayDate => holidayDate.type === 'blocked').map(holidayDate => holidayDate.date)}
                            />
                        </Col>
                    </FormGroup>
                    <FormGroup bsSize='lg' controlId='endDate'>
                        <Col componentClass={ControlLabel} smOffset={1} sm={3}>Last Day of Leave</Col>
                        <Col sm={3}>
                            <DateInput 
                                id='endDate' 
                                selected={this.state.endDate} 
                                onChange={date => this.handleDateChange(date, 'endDate')} 
                                wrapperStyle={{ width: '100%' }} 
                                minDate={moment(this.state.startDate || new Date())}
                                excludeDates={this.state.holidayDates.filter(holidayDate => holidayDate.type === 'blocked').map(holidayDate => holidayDate.date)}
                            />
                        </Col>
                    </FormGroup>
                    <FieldGroup
                        id='notes'
                        type='textarea'
                        onChange={this.handleChange}
                        label='Additional Notes'
                        offset={1}
                        inputsize={4}
                    />
                    <Row style={{ marginBottom: '20px' }}>
                        <Col smOffset={2} sm={6}>
                            <Col sm={12} style={{ border: '1px solid #ececec' }}>
                                <Row style={{ marginTop: '15px' }}>
                                    <Col sm={8} style={{ fontWeight: 'bold', ...holidayStyle}}>
                                        Annual Holiday Allowance
                                    </Col>
                                    <Col sm={3} style={holidayStyle}>
                                        {this.state.annualLeaveEntitlement}
                                    </Col>
                                    <Col sm={8} style={{ fontWeight: 'bold', ...holidayStyle }}>
                                        Total Holiday Requested
                                    </Col>
                                    <Col sm={3} style={holidayStyle}>
                                        {this.state.totalHolidayRequested + this.state.holidayDuration}
                                    </Col>
                                    <Col smOffset={1} sm={10} style={{ paddingRight: '0px', paddingTop: '10px', paddingBottom: '10px' }}>
                                        <Col sm={12} style={{ marginBottom: '15px', paddingRight: '0px', border: '1px solid #cccccc', background: '#dddddd', opacity: 0.8 }} >
                                            <Col sm={8} style={{ fontWeight: 'bold', ...holidayStyle}}>
                                                Remaining Holiday
                                            </Col>
                                            <Col smOffset={1} sm={3} style={holidayStyle}>
                                                {this.state.annualLeaveEntitlement - (this.state.totalHolidayRequested + this.state.holidayDuration)}
                                            </Col>
                                        </Col>
                                    </Col>
                                </Row>
                            </Col>
                        </Col>
                    </Row>
                    <FormGroup>
                        <Col smOffset={4} sm={2}>
                            <Button bsClass='button-primary' type='submit'>Add holiday request</Button>
                        </Col>
                    </FormGroup>
                </Form>
            </Col>
        );
    }
}

export default HolidayForm;