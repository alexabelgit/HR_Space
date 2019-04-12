import React from 'react';
import { Col, FormGroup, ControlLabel, Form, Button, Radio } from 'react-bootstrap';
import moment from 'moment';

import FieldGroup from '../../FieldGroup';
import DateInput from '../../DateInput';
import CustomSwitch from '../../CustomSwitch';
import { ToastContainer, toast } from 'react-toastify';

import { generatePDF } from '../../../../startup/client/generatePDF';

import { HRDocumentsStore } from '../../../../api/collections/hrDocuments';

class NewJoinerForm extends React.Component {
    constructor(props) {
        super();

        this.state = {
            middleName: '',
            dateOfBirth: null,
            gender: 'Male',
            startDate: null,
            fullAddress: '',
            telephoneNumber: '',
            nationalInsuranceNumber: '',
            p7a: true,
            holidaysBooked: '',
            nextOfKin: '',
            emergencyContact: '',
            medicalInformation: '',
            references1: '',
            references2: '',
            otherInformation: '',
            ...props.employee,
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ ...nextProps.employee });
    }

    handleChange = event => this.setState({ [event.target.id]: event.target.value });

    handleDateChange = (value, stateProp) => this.setState({ [stateProp]: value });

    handleSelect = event => this.setState({ gender: event.target.name.capitalize() });

    handleSwitchToggle = event => this.setState({ [event.target.id]: !this.state[event.target.id] });

    handleSubmit = event => {
        event.preventDefault();

        const form = {
            name: 'NEW STARTER',
            rows: [
                { label: 'First Name', value: this.state.firstName },
                { label: 'Middle Name(s)', value: this.state.middleName.trim() },
                { label: 'Surname', value: this.state.surname },
                { label: 'Department', value: this.state.department || '' },
                { label: 'Date of birth', value: moment(this.state.dateOfBirth).format('DD/MM/YYYY') },
                { label: 'Gender', value: this.state.gender },
                { label: 'Start date', value: moment(this.state.startDate).format('DD/MM/YYYY') },
                { label: 'Full Address (including postcode)', value: this.state.fullAddress.trim() },
                { label: 'Telephone Number (inc mobile)', value: this.state.telephoneNumber.trim() },
                { label: 'National Insurance Number', value: this.state.nationalInsuranceNumber.trim() },
                { label: 'Have you provided us with a P7a', value: this.state.p7a ? 'Yes' : 'No' },
                { label: 'Please confirm any holidays booked ', value: this.state.holidaysBooked.trim() },
                { label: 'Next of kin', value: this.state.nextOfKin.trim() },
                { label: 'Emergency contact', value: this.state.emergencyContact.trim() },
                { label: 'Is there any medical (or other) information that the Company should be aware of that may affect your employment or ability to carry out your job role', value: this.state.medicalInformation.trim() },
                { label: 'References 1', value: this.state.references1.trim() },
                { label: 'References 2', value: this.state.references2.trim() },
                { label: 'Other infrmation', value: this.state.otherInformation.trim() },
            ],
        };

        var file = generatePDF(form);

        const document = {
            type: file.type,
            size: file.size,
            name: 'New starter',
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
                <h2 style={{ marginTop: '40px', marginBottom: '25px' }}>New starter</h2>
                <FieldGroup
                    id='firstName'
                    type='text'
                    label='First Name'
                    value={this.props.employee.firstName}
                    onChange={() => {}}
                    labelsize={4}
                    disabled
                />
                <FieldGroup
                    id='middleName'
                    type='text'
                    label='Middle Name(s)'
                    labelsize={4}
                    onChange={this.handleChange}
                />
                <FieldGroup
                    id='surname'
                    type='text'
                    label='Surname'
                    value={this.props.employee.surname}
                    onChange={() => {}}
                    labelsize={4}
                    disabled
                />
                <FieldGroup
                    id='department'
                    type='text'
                    label='Department'
                    labelsize={4}
                    value={this.props.employee.department}
                    onChange={() => {}}
                    disabled
                />
                <FormGroup bsSize='lg' controlId='dateOfBirth'>
                    <Col componentClass={ControlLabel} sm={4}>Date of birth *</Col>
                    <Col sm={4}>
                        <DateInput 
                            id='dateOfBirth' 
                            selected={this.state.dateOfBirth} 
                            onChange={date => this.handleDateChange(date, 'dateOfBirth')}
                            wrapperStyle={{ width: '100%' }} 
                            required
                        />
                    </Col>
                </FormGroup>
                <FormGroup bsSize='lg' controlId='gender'>
                    <Col componentClass={ControlLabel} sm={4}>Gender</Col>
                    <Col sm={4} style={{ paddingTop: '7px' }}>
                        <Radio 
                            name='male' 
                            checked={this.state.gender === 'Male'} 
                            onChange={this.handleSelect} 
                            inline
                        >
                            Male
                        </Radio>
                        <Radio 
                            name='female' 
                            checked={this.state.gender === 'Female'} 
                            onChange={this.handleSelect} 
                            inline
                        >
                            Female
                        </Radio>
                    </Col>
                </FormGroup>
                <FormGroup bsSize='lg' controlId='startDate'>
                    <Col componentClass={ControlLabel} sm={4}>Start date *</Col>
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
                <FieldGroup
                    id='fullAddress'
                    type='textarea'
                    label='Full Address (including postcode) *'
                    labelsize={4}
                    onChange={this.handleChange}
                    required
                />
                <FieldGroup
                    id='telephoneNumber'
                    type='text'
                    label='Telephone Number (inc mobile) *'
                    labelsize={4}
                    onChange={this.handleChange}
                    required
                />
                <FieldGroup
                    id='nationalInsuranceNumber'
                    type='text'
                    label='National Insurance Number'
                    labelsize={4}
                    onChange={this.handleChange}
                />
                <FormGroup bsSize='lg' controlId='p7a'>
                    <Col componentClass={ControlLabel} sm={4}>Have you provided us with a P7a? *</Col>
                    <Col sm={4}>
                        <CustomSwitch 
                            id='p7a' 
                            checked={this.state.p7a}
                            onChange={this.handleSwitchToggle}
                        />
                    </Col>
                </FormGroup>
                <FieldGroup
                    id='holidaysBooked'
                    type='textarea'
                    label='Please confirm any holidays booked *'
                    labelsize={4}
                    onChange={this.handleChange}
                    required
                />
                <FieldGroup
                    id='nextOfKin'
                    type='textarea'
                    label='Next of kin *'
                    labelsize={4}
                    onChange={this.handleChange}
                    required
                />
                <FieldGroup
                    id='emergencyContact'
                    type='textarea'
                    label='Emergency Contact *'
                    labelsize={4}
                    onChange={this.handleChange}
                    required
                />
                <FieldGroup
                    id='medicalInformation'
                    type='textarea'
                    label='Is there any medical (or other) information that the Company should be aware of that may affect your employment or ability to carry out your job role?'
                    labelsize={4}
                    onChange={this.handleChange}
                />
                <FieldGroup
                    id='references1'
                    type='textarea'
                    label='References 1'
                    labelsize={4}
                    onChange={this.handleChange}
                />
                <FieldGroup
                    id='references2'
                    type='textarea'
                    label='References 2'
                    labelsize={4}
                    onChange={this.handleChange}
                />
                <FieldGroup
                    id='otherInformation'
                    type='textarea'
                    label='Other information'
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
}

export default NewJoinerForm;