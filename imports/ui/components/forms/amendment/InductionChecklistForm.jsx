import React from 'react';
import { Col, FormGroup, ControlLabel, Form, Button } from 'react-bootstrap';
import moment from 'moment';
import { ToastContainer, toast } from 'react-toastify';

import FieldGroup from '../../FieldGroup';
import CustomSwitch from '../../CustomSwitch';
import DateInput from '../../DateInput';

import { generatePDF } from '../../../../startup/client/generatePDF';

import { HRDocumentsStore } from '../../../../api/collections/hrDocuments';

class InductionChecklistForm extends React.Component {
    constructor(props) {
        super();

        this.state = {
            comments: '',
            startDate: null,
            contractOfEmployment: true,
            signedContractOfEmployment: true,
            standardsAndRules: true,
            policyDocuments: true,
            equalOpportunities: true,
            questions: '',
            ...props.employee,
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ ...nextProps.employee });
    }

    handleChange = event => this.setState({ [event.target.id]: event.target.value });

    handleSwitchToggle = event => this.setState({ [event.target.id]: !this.state[event.target.id] });

    handleDateChange = (value, stateProp) => this.setState({ [stateProp]: value });

    handleSubmit = event => {
        event.preventDefault();

        const form = {
            name: 'INDUCTION CHECKLIST',
            rows: [
                { label: 'Name', value: this.state.firstName + ' ' + this.state.surname },
                { label: 'Department', value: this.state.department || '' },
                { label: 'Comments', value: this.state.comments.trim() },
                { label: 'Start date', value: moment(this.state.startDate).format('DD/MM/YYYY') },
                { label: 'Have you received your contract of employment', value: this.state.contractOfEmployment ? 'Yes' : 'No' },
                { label: 'Have you signed and returned a copy of your contract of employment', value: this.state.signedContractOfEmployment ? 'Yes' : 'No' },
                { label: 'Have you read the Standards and Rules', value: this.state.standardsAndRules ? 'Yes' : 'No' },
                { label: 'Have you familiarised yourself with the policy documents and know where they are', value: this.state.policyDocuments ? 'Yes' : 'No' },
                { label: 'We are an Equal Opportunities employer. Please confirm if you have read the Equal Opportunities Policy', value: this.state.equalOpportunities ? 'Yes' : 'No' },
                { label: 'If you have any questions, please detail them here', value: this.state.questions.trim() },
            ],
        };

        var file = generatePDF(form);

        const document = {
            type: file.type,
            size: file.size,
            name: 'Induction checklist',
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
                <h2 style={{ marginTop: '40px', marginBottom: '25px' }}>Induction checklist</h2>
                <FieldGroup
                    id='name'
                    type='text'
                    label='Name'
                    value={this.props.employee.firstName + ' ' + this.props.employee.surname}
                    onChange={() => {}}
                    labelsize={5}
                    disabled
                />
                <FieldGroup
                    id='department'
                    type='text'
                    label='Department'
                    labelsize={5}
                    value={this.props.employee.department}
                    onChange={() => {}}
                    disabled
                />
                <FieldGroup
                    id='comments'
                    type='textarea'
                    label='Comments'
                    labelsize={5}
                    onChange={this.handleChange}
                />
                <FormGroup bsSize='lg' controlId='startDate'>
                    <Col componentClass={ControlLabel} sm={5}>Please confirm your start date *</Col>
                    <Col sm={4}>
                        <DateInput 
                            id='startDate' 
                            selected={this.state.startDate} 
                            onChange={date => this.handleDateChange(date, 'startDate')}
                            wrapperStyle={{ width: '100%' }} 
                            required
                        />
                    </Col>
                </FormGroup>
                <FormGroup bsSize='lg' controlId='contractOfEmployment'>
                    <Col componentClass={ControlLabel} sm={5}>Have you received your contract of employment? *</Col>
                    <Col sm={4}>
                        <CustomSwitch 
                            id='contractOfEmployment' 
                            checked={this.state.contractOfEmployment}
                            onChange={this.handleSwitchToggle}
                        />
                    </Col>
                </FormGroup>
                <FormGroup bsSize='lg' controlId='signedContractOfEmployment'>
                    <Col componentClass={ControlLabel} sm={5}>Have you signed and returned a copy of your contract of employment? *</Col>
                    <Col sm={4}>
                        <CustomSwitch 
                            id='signedContractOfEmployment' 
                            checked={this.state.signedContractOfEmployment}
                            onChange={this.handleSwitchToggle}
                        />
                    </Col>
                </FormGroup>
                <FormGroup bsSize='lg' controlId='standardsAndRules'>
                    <Col componentClass={ControlLabel} sm={5}>Have you read the Standards and Rules? *</Col>
                    <Col sm={4}>
                        <CustomSwitch 
                            id='standardsAndRules' 
                            checked={this.state.standardsAndRules}
                            onChange={this.handleSwitchToggle}
                        />
                    </Col>
                </FormGroup>
                <FormGroup bsSize='lg' controlId='policyDocuments'>
                    <Col componentClass={ControlLabel} sm={5}>Have you familiarised yourself with the policy documents and know where they are? *</Col>
                    <Col sm={4}>
                        <CustomSwitch 
                            id='policyDocuments' 
                            checked={this.state.policyDocuments}
                            onChange={this.handleSwitchToggle}
                        />
                    </Col>
                </FormGroup>
                <FormGroup bsSize='lg' controlId='equalOpportunities'>
                    <Col componentClass={ControlLabel} sm={5}>We are an Equal Opportunities employer. Please confirm if you have read the Equal Opportunities Policy *</Col>
                    <Col sm={4}>
                        <CustomSwitch 
                            id='equalOpportunities' 
                            checked={this.state.equalOpportunities}
                            onChange={this.handleSwitchToggle}
                        />
                    </Col>
                </FormGroup>
                <FieldGroup
                    id='questions'
                    type='textarea'
                    label='If you have any questions, please detail them here:'
                    labelsize={5}
                    onChange={this.handleChange}
                />
                <FormGroup>
                    <Col smOffset={5} sm={2}>
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
}

export default InductionChecklistForm;