import React from 'react';
import PropTypes from 'prop-types';
import { Button, Row, Col, Form, FormControl, ControlLabel, FormGroup, Checkbox } from 'react-bootstrap';

import FieldGroup from '../FieldGroup';

const propTypes = {
    dataType: PropTypes.string.isRequired,
    data: PropTypes.object.isRequired,
    onSubmit: PropTypes.func.isRequired,
    onSubmitAndStay: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
    error: PropTypes.object
};

class DropdownDataForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            ...props.data,
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSubmitAndStay = this.handleSubmitAndStay.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }

    handleChange(event) {
        this.setState({ [event.target.id]: event.target.value })
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
        });
    }

    handleCancel(event) {
        event.preventDefault();

        this.props.onClose();
    }

    render() {
        const labelText = this.props.dataType.capitalize();

        return (
            <Col sm={10} style={{ marginTop: '20px' }}>
                <Form horizontal onSubmit={this.handleSubmit}>
                    <FieldGroup
                        id='name'
                        type='text'
                        label={labelText}
                        value={this.state.name}
                        onChange={this.handleChange}
                        help={this.props.error && this.props.error.field === 'name' ? this.props.error.message : ''}
                    />
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

DropdownDataForm.propTypes = propTypes;

export default DropdownDataForm;