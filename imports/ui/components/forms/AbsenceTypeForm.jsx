import React from 'react';
import { Button, Row, Col, Form, FormControl, ControlLabel, FormGroup, Checkbox } from 'react-bootstrap';

import FieldGroup from '../FieldGroup';

class AbsenceTypeForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            ...props.absenceType,
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleCheckBoxChange = this.handleCheckBoxChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSubmitAndStay = this.handleSubmitAndStay.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }

    handleChange(event) {
        this.setState({ [event.target.id]: event.target.value })
    }

    handleDateChange(date, stateProp) {
        this.setState({ [stateProp]: date });
    }

    handleCheckBoxChange(event) {
        this.setState({ [event.target.id]: event.target.checked });
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
            type: '',
            sicknessIdentifier: false,
            selfCertification: false
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
                        id='type'
                        type='text'
                        label='Absence type'
                        value={this.state.type}
                        onChange={this.handleChange}
                        help={this.props.error && this.props.error.field === 'type' ? this.props.error.message : ''}
                    />
                    <FormGroup bsSize='lg' controlId='sicknessIdentifier'>
                        <Col componentClass={ControlLabel} sm={3}>Sickness Identifier</Col>
                        <Col sm={3}>
                            <Checkbox id='sicknessIdentifier' checked={this.state.sicknessIdentifier} onChange={this.handleCheckBoxChange} />
                        </Col>
                    </FormGroup>
                    <FormGroup bsSize='lg' controlId='selfCertification'>
                        <Col componentClass={ControlLabel} sm={3}>Self Certification</Col>
                        <Col sm={3}>
                            <Checkbox id='selfCertification' checked={this.state.selfCertification} onChange={this.handleCheckBoxChange} />
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

export default AbsenceTypeForm;