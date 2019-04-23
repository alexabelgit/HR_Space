import React from 'react';
import { Button, Row, Col, Form, FormControl, ControlLabel, FormGroup, Checkbox } from 'react-bootstrap';

import FieldGroup from '../FieldGroup';
import CustomSwitch from '../CustomSwitch';
import DateInput from '../DateInput';

class PublicHolidayForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            ...props.publicHoliday,
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleSwitchToggle = this.handleSwitchToggle.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSubmitAndStay = this.handleSubmitAndStay.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }

    handleChange(event) {
        this.setState({ [event.target.id]: event.target.value })
    }

    handleDateChange(date) {
        this.setState({ date });
    }

    handleSwitchToggle(event) {
        this.setState({ [event.target.id]: !this.state[event.target.id] });
    }

    handleSubmit(event) {
        event.preventDefault();

        this.props.onSubmit(this.state);
    }

    handleSubmitAndStay(event) {
        event.preventDefault();

        this.props.onSubmitAndStay(this.state);

        this.setState({
            _id: '',
            name: '',
            date: new Date(),
            isActive: true
        });
    }

    handleCancel(event) {
        event.preventDefault();

        this.props.onClose();
    }

    render() {
        return (
            <Col sm={10} style={{ marginTop: '20px' }}>
                <Form horizontal onSubmit={this.handleSubmit}>
                    <FieldGroup
                        id='name'
                        type='text'
                        label='Public holiday'
                        value={this.state.name}
                        onChange={this.handleChange}
                        help={this.props.error && this.props.error.field === 'name' ? this.props.error.message : ''}
                    />
                    <FormGroup bsSize='lg' controlId='date'>
                        <Col componentClass={ControlLabel} sm={3}>Date</Col>
                        <Col sm={3}>
                            <DateInput
                                id='date'
                                selected={this.state.date}
                                onChange={this.handleDateChange}
                            />
                        </Col>
                    </FormGroup>
                    <FormGroup bsSize='lg' controlId='isActive'>
                        <Col componentClass={ControlLabel} sm={3}>Active</Col>
                        <Col sm={3}>
                            <CustomSwitch
                                id='isActive'
                                checked={this.state.isActive}
                                onChange={this.handleSwitchToggle}
                            />
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        <Col smOffset={3} sm={3}>
                            <Button bsClass='button-primary' type='submit'>Save and close</Button>
                        </Col>
                        <Col sm={3}>
                            <Button onClick={this.handleSubmitAndStay} bsClass='button-primary' type='button'>Save and add again</Button>
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        <Col smOffset={3} sm={3}>
                            <Button onClick={this.handleCancel} bsClass='button-secondary'>Cancel</Button>
                        </Col>
                    </FormGroup>
                </Form>
            </Col>
        );
    }
}

export default PublicHolidayForm;