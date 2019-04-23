import React from 'react';
import { Row, Col, FormGroup, ControlLabel, Form, Button } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';

import FieldGroup from '../../FieldGroup';
import CustomSwitch from '../../CustomSwitch';

import { generatePDF } from '../../../../startup/client/generatePDF';

import { HRDocumentsStore } from '../../../../api/collections/hrDocuments';

class ExitForm extends React.Component {
    constructor(props) {
        super();

        this.state = {
            higherPay: true,
            betterOpportunity: true,
            conflict: true,
            managerConflict: true,
            workBalance: true,
            careerChange: true,
            other: true,
            details: '',
            comments: '',
            ...props.employee,
        };
    }
    
    componentWillReceiveProps(nextProps) {
        this.setState({ ...nextProps.employee });
    }

    handleChange = event => this.setState({ [event.target.id]: event.target.value });

    handleSwitchToggle = event => this.setState({ [event.target.id]: !this.state[event.target.id] });

    handleSubmit = event => {
        event.preventDefault();

        const form = {
            name: 'EXIT/LEAVER FORM',
            rows: [
                { label: 'Name', value: this.state.firstName + ' ' + this.state.surname },
                { label: 'Higher pay', value: this.state.higherPay ? 'Yes' : 'No' },
                { label: 'Better career opportunity', value: this.state.betterOpportunity ? 'Yes' : 'No' },
                { label: 'Conflict with other employees', value: this.state.conflict ? 'Yes' : 'No' },
                { label: 'Conflict with manager', value: this.state.managerConflict ? 'Yes' : 'No' },
                { label: 'Improved work life balance', value: this.state.workBalance ? 'Yes' : 'No' },
                { label: 'Career change', value: this.state.careerChange ? 'Yes' : 'No' },
                { label: 'Other', value: this.state.other ? 'Yes' : 'No' },
                { label: 'Please provide details', value: this.state.details },
                { label: 'Any other comments', value: this.state.comments },
            ],
        };

        var file = generatePDF(form);

        const document = {
            type: file.type,
            size: file.size,
            name: 'Exit form',
            documentType: 'Forms',
            userId: this.props.employee.userId,
        };

        const uploader = new UploadFS.Uploader({
            data: file,
            file: document,
            store: HRDocumentsStore,
            onError: error => {
                console.log(error);

                toast.error(error);
            },
            onComplete: f => toast.success('Form submitted. A document was added to your HR documents.'),
        });

        uploader.start();
    };

    render() {
        return (
            <Form horizontal onSubmit={this.handleSubmit}>
                <h2 style={{ marginTop: '40px', marginBottom: '25px' }}>Exit/Leaver form</h2>
                <FieldGroup
                    id='name'
                    type='text'
                    label='Name'
                    value={this.props.employee.firstName + ' ' + this.props.employee.surname}
                    onChange={() => {}}
                    labelsize={4}
                    disabled
                />
                <Row>
                    <Col smOffset={2} sm={10}>
                        <h3>Reason for leaving (please select primary and secondary reason for leaving)</h3>
                    </Col>
                </Row>
                <FormGroup bsSize='lg' controlId='higherPay'>
                    <Col componentClass={ControlLabel} sm={4}>Higher pay</Col>
                    <Col sm={4}>
                        <CustomSwitch
                            id='higherPay'
                            checked={this.state.higherPay}
                            onChange={this.handleSwitchToggle}
                        />
                    </Col>
                </FormGroup>
                <FormGroup bsSize='lg' controlId='betterOpportunity'>
                    <Col componentClass={ControlLabel} sm={4}>Better career opportunity</Col>
                    <Col sm={4}>
                        <CustomSwitch
                            id='betterOpportunity'
                            checked={this.state.betterOpportunity}
                            onChange={this.handleSwitchToggle}
                        />
                    </Col>
                </FormGroup>
                <FormGroup bsSize='lg' controlId='conflict'>
                    <Col componentClass={ControlLabel} sm={4}>Conflict with other employees</Col>
                    <Col sm={4}>
                        <CustomSwitch
                            id='conflict'
                            checked={this.state.conflict}
                            onChange={this.handleSwitchToggle}
                        />
                    </Col>
                </FormGroup>
                <FormGroup bsSize='lg' controlId='managerConflict'>
                    <Col componentClass={ControlLabel} sm={4}>Conflict with manager</Col>
                    <Col sm={4}>
                        <CustomSwitch
                            id='managerConflict'
                            checked={this.state.managerConflict}
                            onChange={this.handleSwitchToggle}
                        />
                    </Col>
                </FormGroup>
                <FormGroup bsSize='lg' controlId='workBalance'>
                    <Col componentClass={ControlLabel} sm={4}>Improved work life balance</Col>
                    <Col sm={4}>
                        <CustomSwitch
                            id='workBalance'
                            checked={this.state.workBalance}
                            onChange={this.handleSwitchToggle}
                        />
                    </Col>
                </FormGroup>
                <FormGroup bsSize='lg' controlId='careerChange'>
                    <Col componentClass={ControlLabel} sm={4}>Career change</Col>
                    <Col sm={4}>
                        <CustomSwitch
                            id='careerChange'
                            checked={this.state.careerChange}
                            onChange={this.handleSwitchToggle}
                        />
                    </Col>
                </FormGroup>
                <FormGroup bsSize='lg' controlId='other'>
                    <Col componentClass={ControlLabel} sm={4}>Other</Col>
                    <Col sm={4}>
                        <CustomSwitch
                            id='other'
                            checked={this.state.other}
                            onChange={this.handleSwitchToggle}
                        />
                    </Col>
                </FormGroup>
                <FieldGroup
                    id='details'
                    type='textarea'
                    label='Please provide details'
                    labelsize={4}
                    onChange={this.handleChange}
                />
                <FieldGroup
                    id='comments'
                    type='textarea'
                    label='Any other comments'
                    labelsize={4}
                    onChange={this.handleChange}
                />
                <FormGroup>
                    <Col smOffset={4} sm={2}>
                        <Button bsClass='button-primary' type='submit'>Save</Button>
                    </Col>
                    <Col sm={2}>
                        <Button bsClass='button-secondary'>Cancel</Button>
                    </Col>
                </FormGroup>
                <ToastContainer autoClose={3000} position={toast.POSITION.TOP_CENTER} />
            </Form>
        );
    }
};

export default ExitForm;