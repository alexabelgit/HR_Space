import React from 'react';
import { Button, Row, Col, Form, FormControl, ControlLabel, FormGroup } from 'react-bootstrap';
import { Random } from 'meteor/random';

import CustomSelect from '../CustomSelect';
import FieldGroup from '../FieldGroup';
import DateInput from '../DateInput';
import CustomSwitch from '../CustomSwitch';

const types = ['Company', 'Public', 'Blocked'];

class FixedHolidayForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            ...props.holiday
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleOnSelect = this.handleOnSelect.bind(this);
        this.handleSwitchToggle = this.handleSwitchToggle.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
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

    handleSwitchToggle(event) {
        this.setState({ [event.target.id]: !this.state[event.target.id] });
    }

    handleSubmit(event) {
        event.preventDefault();

        this.props.onSubmit(this.state);
    }

    handleCancel(event) {
        event.preventDefault();

        this.props.onClose();
    }

    render() {
        return (
            <Col sm={10} style={{ marginTop: '20px' }}>
                <Form horizontal onSubmit={this.handleSubmit}>
                    <FormGroup bsSize='lg' controlId='type'>
                        <Col componentClass={ControlLabel} sm={3}>Type</Col>
                        <Col sm={4}>
                            <CustomSelect
                                value={this.state.type}
                                options={types}
                                onSelect={value => this.handleOnSelect(value, 'type')}
                            />
                        </Col>
                    </FormGroup>
                    <FieldGroup
                        id='title'
                        type='text'
                        label='Title'
                        value={this.state.title}
                        onChange={this.handleChange}
                    />
                    <FormGroup bsSize='lg' controlId='date'>
                        <Col componentClass={ControlLabel} sm={3}>Date</Col>
                        <Col sm={3}>
                            <DateInput 
                                id='date' 
                                selected={this.state.date} 
                                onChange={date => this.handleDateChange(date, 'date')} 
                                wrapperStyle={{ width: '100%' }} 
                            />
                        </Col>
                    </FormGroup>
                    <FormGroup bsSize='lg' controlId='isActive'>
                        <Col componentClass={ControlLabel} sm={3}>isActive</Col>
                        <Col sm={3}>
                            <CustomSwitch id='isActive' checked={this.state.isActive} onChange={this.handleSwitchToggle} />
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        <Col smOffset={3} sm={2}>
                            <Button bsClass='button-primary' type='submit'>Save changes</Button>
                        </Col>
                        <Col sm={2}>
                            <Button onClick={this.handleCancel} bsClass='button-secondary'>Cancel</Button>
                        </Col>
                    </FormGroup>
                </Form>
            </Col>
        );
    }
}

export default FixedHolidayForm;