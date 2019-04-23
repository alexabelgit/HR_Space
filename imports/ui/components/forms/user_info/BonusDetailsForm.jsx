import React from 'react';
import { Button, Row, Col, Form, FormControl, ControlLabel, FormGroup } from 'react-bootstrap';

import CustomSelect from '../../CustomSelect';
import FieldGroup from '../../FieldGroup';
import DateInput from '../../DateInput';

class BonusDetailsForm extends React.Component {
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
                    <FormGroup bsSize='lg' controlId='date'>
                        <Col componentClass={ControlLabel} sm={5}>Date</Col>
                        <Col sm={4}>
                            <DateInput
                                id='date'
                                selected={this.state.date}
                                onChange={date => this.handleDateChange(date, 'date')}
                                wrapperStyle={{ width: '100%' }}
                            />
                        </Col>
                    </FormGroup>
                    <FieldGroup
                        id='amount'
                        type='text'
                        label='Amount'
                        labelsize={5}
                        inputsize={4}
                        value={this.state.amount}
                        onChange={this.handleChange}
                        numbersOnly={true}
                    />
                    <FormGroup bsSize='lg' controlId='currency'>
                        <Col componentClass={ControlLabel} sm={5}>Currency</Col>
                        <Col sm={2}>
                            <CustomSelect
                                id='currency'
                                value={this.state.currency}
                                options={this.props.currencies}
                                onSelect={value => this.handleOnSelect(value, 'currency')}
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

export default BonusDetailsForm;