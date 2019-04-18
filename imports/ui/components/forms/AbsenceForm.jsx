import React from 'react';
import { Button, Row, Col, Form, FormControl, ControlLabel, FormGroup } from 'react-bootstrap';
import moment from 'moment';

import Select from '../Select';
import FieldGroup from '../FieldGroup';
import DateInput from '../DateInput';

class AbsenceForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            ...props.absence,
        };
    }

    handleSubmit = event => {
        event.preventDefault();

        this.props.onSubmit(this.state);
    }

    handleChange = event => this.setState({ [event.target.id]: event.target.value });

    handleOnSelect = (value, stateProp) => this.setState({ [stateProp]: value });

    handleDateChange = (date, stateProp) => this.setState({ [stateProp]: date });

    render() {
        return (
            <Col sm={10} style={{ marginTop: '20px' }}>
                <Form horizontal onSubmit={this.handleSubmit}>
                    <FormGroup bsSize='lg' controlId='employee'>
                        <Col componentClass={ControlLabel} sm={3}>Employee</Col>
                        <Col sm={4}>
                            <Select
                                id='employee'
                                selected={this.state.employee}
                                options={this.props.employees}
                                displayKey='fullName'
                                onSelect={value => this.handleOnSelect(value, 'employee')}
                            />
                        </Col>
                    </FormGroup>
                    <FormGroup bsSize='lg' controlId='startDate'>
                        <Col componentClass={ControlLabel} sm={3}>Start Date</Col>
                        <Col sm={3}>
                            <DateInput 
                                id='startDate' 
                                selected={this.state.startDate} 
                                onChange={date => this.handleDateChange(date, 'startDate')} 
                                wrapperStyle={{ width: '100%' }} 
                                maxDate={moment(new Date())}
                            />
                        </Col>
                    </FormGroup>
                    <FormGroup bsSize='lg' controlId='endDate'>
                        <Col componentClass={ControlLabel} sm={3}>Return Date</Col>
                        <Col sm={3}>
                            <DateInput 
                                id='endDate' 
                                selected={this.state.endDate} 
                                onChange={date => this.handleDateChange(date, 'endDate')} 
                                wrapperStyle={{ width: '100%' }} 
                                minDate={moment(this.state.startDate || new Date()).add(1, 'day')}
                            />
                        </Col>
                    </FormGroup>
                    <FormGroup bsSize='lg' controlId='absenceType'>
                        <Col componentClass={ControlLabel} sm={3}>Reason for absence</Col>
                        <Col sm={4}>
                            <Select
                                id='absenceType'
                                selected={this.state.absenceType}
                                options={this.props.absenceTypes}
                                displayKey='name'
                                onSelect={value => this.handleOnSelect(value, 'absenceType')}
                            />
                        </Col>
                    </FormGroup>
                    <FieldGroup
                        id='notes'
                        type='textarea'
                        label='Notes'
                        value={this.state.notes}
                        onChange={this.handleChange}
                        inputsize={5}
                    />
                    <FormGroup>
                        <Col smOffset={3} sm={3}>
                            <Button bsClass='button-primary' type='submit'>Record absence</Button>
                        </Col>
                        <Col sm={2}>
                            <Button bsClass='button-secondary' onClick={this.props.onClose}>Cancel</Button>
                        </Col>
                    </FormGroup>
                </Form>
            </Col>
        );
    }
}

export default AbsenceForm;