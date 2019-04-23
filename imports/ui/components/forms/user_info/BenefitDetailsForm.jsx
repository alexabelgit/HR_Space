import React from 'react';
import { Button, Row, Col, Form, FormControl, ControlLabel, FormGroup } from 'react-bootstrap';

import CustomSelect from '../../CustomSelect';
import FieldGroup from '../../FieldGroup';
import DateInput from '../../DateInput';

const frequencies = ['per year', 'per month', 'per week', 'per hour'];

class BenefitDetailsForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            ...props.data
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleOnSelect = this.handleOnSelect.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ [event.target.id]: event.target.value })
    }

    handleDateChange(date, stateProp) {
        this.setState({ [stateProp]: date });
    }

    handleOnSelect(value, stateProp) {
        this.setState({ [stateProp]: value });
    }

    handleSubmit(event) {
        event.preventDefault();

        this.props.onSubmit(this.state);
    }

    render() {
        return (
            <Col sm={10}>
                <Form horizontal onSubmit={this.handleSubmit}>
                    <FormGroup bsSize='lg' controlId='benefitType'>
                        <Col componentClass={ControlLabel} sm={5}>Benefit Type</Col>
                        <Col sm={4}>
                            <CustomSelect
                                id='benefitType'
                                value={this.state.benefitType}
                                options={this.props.benefitTypes}
                                onSelect={value => this.handleOnSelect(value, 'benefitType')}
                            />
                        </Col>
                    </FormGroup>
                    <FormGroup bsSize='lg' controlId='startDate'>
                        <Col componentClass={ControlLabel} sm={5}>Start Date</Col>
                        <Col sm={4}>
                            <DateInput
                                id='startDate'
                                selected={this.state.startDate}
                                onChange={date => this.handleDateChange(date, 'startDate')}
                                wrapperStyle={{ width: '100%' }}
                            />
                        </Col>
                    </FormGroup>
                    <FormGroup bsSize='lg' controlId='endDate'>
                        <Col componentClass={ControlLabel} sm={5}>End Date</Col>
                        <Col sm={4}>
                            <DateInput
                                id='endDate'
                                selected={this.state.endDate}
                                onChange={date => this.handleDateChange(date, 'endDate')}
                                wrapperStyle={{ width: '100%' }}
                            />
                        </Col>
                    </FormGroup>
                    <FieldGroup
                        id='value'
                        type='text'
                        label='Value'
                        labelsize={5}
                        inputsize={4}
                        value={this.state.value}
                        onChange={this.handleChange}
                        numbersOnly={true}
                    />
                    <FormGroup bsSize='lg' controlId='frequency'>
                        <Col componentClass={ControlLabel} sm={5}>Frequency</Col>
                        <Col sm={4}>
                            <CustomSelect
                                id='frequency'
                                value={this.state.frequency}
                                options={frequencies}
                                onSelect={value => this.handleOnSelect(value, 'frequency')}
                            />
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        <Col smOffset={5} sm={2}>
                            <Button bsClass='button-primary' type='submit'>Save and close</Button>
                        </Col>
                        <Col sm={2}>
                            <Button onClick={e => this.props.onClose(e)} bsClass='button-secondary'>Cancel</Button>
                        </Col>
                    </FormGroup>
                </Form>
            </Col>
        );
    }
}

export default BenefitDetailsForm;