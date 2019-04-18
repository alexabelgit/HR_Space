import React from 'react';
import { Row, Col, FormGroup, ControlLabel, Form, Button } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';
import { UploadFS } from 'meteor/jalik:ufs';
import moment from 'moment';

import FieldGroup from '../../FieldGroup';
import DateInput from '../../DateInput';
import CustomSwitch from '../../CustomSwitch';

import { HRDocumentsStore } from '../../../../api/collections/hrDocuments';

import { generatePDF } from '../../../../startup/client/generatePDF';

class SelfCertificationForm extends React.Component {
    constructor(props) {
        super();

        this.state = {
            reason: '',
            startDate: null,
            dayOfWeek1: '',
            endDate: null,
            dayOfWeek2: '',
            workingDays: '',
            returnDate: null,
            doctorVisited: false,
            recommendations: '',
            absenceRelation: false,
            absenceRelationDetails: '',
            injury: false,
            injuryDetails: '',
            comments: '',
            confirmation: false,
            name: '',
            department: '',
            emailAddress: '',
            validateEmail: '',
        };
    }

    handleChange = event => this.setState({ [event.target.id]: event.target.value });

    handleDateChange = (stateProp, date) => this.setState({ [stateProp]: date });

    handleSwitchToggle = event => this.setState({ [event.target.id]: !this.state[event.target.id] });

    handleSubmit = event => {
        event.preventDefault();

        if (this.state.emailAddress !== this.state.validateEmail) {
            return toast.error('Emails do not match');
        }

        const form = {
            name: 'SELF CERTIFICATION',
            rows: [
                { label: 'Reason for Absence', value: this.state.reason },
                { label: 'Start date of absence', value: moment(this.state.startDate).format('DD/MM/YYYY') },
                { label: 'What day of the week was this?', value: this.state.dayOfWeek1 },
                { label: 'End date of absence', value: moment(this.state.endDate).format('DD/MM/YYYY') },
                { label: 'What day of the week was this?', value: this.state.dayOfWeek2 },
                { label: 'Number of working days', value: this.state.workingDays },
                { label: 'What date did you return to work?', value: moment(this.state.returnDate).format('DD/MM/YYYY') },
                { label: 'Did you visit your Doctor?', value: this.state.doctorVisited ? 'Yes' : 'No' },
                { label: 'If yes, did your Doctor make any recommendations/comments?', value: this.state.recommendations },
                { label: 'Was your absence related to work?', value: this.state.absenceRelation ? 'Yes' : 'No' },
                { label: 'If yes, please provide further details', value: this.state.absenceRelationDetails },
                { label: 'Was your absence due to an injury at work?', value: this.state.injury ? 'Yes' : 'No' },
                { label: 'If yes, please provide further details', value: this.state.injuryDetails },
                { label: 'Any other comments about your absence', value: this.state.comments },
                { label: 'Please confirm that you are fit to return to work?', value: this.state.confirmation ? 'Yes' : 'No' },
                { label: 'Name', value: this.state.name },
                { label: 'Department', value: this.state.department },
                { label: 'Email', value: this.state.emailAddress },
            ],
        };

        var file = generatePDF(form);

        const document = {
            type: file.type,
            size: file.size,
            name: 'Self certification form',
            documentType: 'Return to work interview',
            userId: this.props.location.state.users
        };

        const uploader = new UploadFS.Uploader({
            data: file,
            file: document,
            store: HRDocumentsStore,
            onError: error => {
                console.log(error);

                toast.error(error);
            },
            onComplete: f => {
                Meteor.call('completeTask', this.props.location.state.taskId, (error, response) => {
                    if (error) {
                        toast.error(error.reason);
                    } else {
                        this.props.history.push('/dashboard');
                    }
                });
            }
        });

        uploader.start();
    }

    render() {
        return (
            <Form 
                onSubmit={this.props.location.state ? this.handleSubmit : undefined} 
                style={{ marginBottom: '25px' }} 
                horizontal>
                <h2 style={{ marginTop: '40px', marginBottom: '25px' }}>Self certification</h2>
                <FieldGroup
                    id='reason'
                    type='text'
                    label='Reason for Absence *'
                    labelsize={4}
                    value={this.state.reason}
                    onChange={this.handleChange}
                    required
                />
                <FormGroup bsSize='lg' controlId='startDate'>
                    <Col componentClass={ControlLabel} sm={4}>Start date of absence *</Col>
                    <Col sm={3}>
                        <DateInput 
                            id='startDate' 
                            wrapperStyle={{ width: '100%' }} 
                            selected={this.state.startDate}
                            onChange={date => this.handleDateChange('startDate', date)}
                            required
                        />
                    </Col>
                </FormGroup>
                <FieldGroup
                    id='dayOfWeek1'
                    type='text'
                    label='What day of the week was this? *'
                    labelsize={4}
                    value={this.state.dayOfWeek1}
                    onChange={this.handleChange}
                    required                 
                />
                <FormGroup bsSize='lg' controlId='endDate'>
                    <Col componentClass={ControlLabel} sm={4}>End date of absence *</Col>
                    <Col sm={3}>
                        <DateInput 
                            id='endDate' 
                            wrapperStyle={{ width: '100%' }} 
                            selected={this.state.endDate}
                            onChange={date => this.handleDateChange('endDate', date)}
                            required
                        />
                    </Col>
                </FormGroup>
                <FieldGroup
                    id='dayOfWeek2'
                    type='text'
                    label='What day of the week was this? *'
                    labelsize={4}
                    value={this.state.dayOfWeek2}
                    onChange={this.handleChange}
                    required
                />
                <FieldGroup
                    id='workingDays'
                    type='text'
                    label='Number of working days *'
                    labelsize={4}
                    value={this.state.workingDays}
                    onChange={this.handleChange}
                    required
                />
                <FormGroup bsSize='lg' controlId='returnDate'>
                    <Col componentClass={ControlLabel} sm={4}>What date did you return to work? *</Col>
                    <Col sm={3}>
                        <DateInput 
                            id='returnDate' 
                            wrapperStyle={{ width: '100%' }} 
                            selected={this.state.returnDate}
                            onChange={date => this.handleDateChange('returnDate', date)}
                            required
                        />
                    </Col>
                </FormGroup>
                <FormGroup bsSize='lg' controlId='doctorVisited'>
                    <Col componentClass={ControlLabel} sm={4}>Did you visit your Doctor? *</Col>
                    <Col sm={4}>
                        <CustomSwitch 
                            id='doctorVisited' 
                            onChange={this.handleSwitchToggle}
                            checked={this.state.doctorVisited}
                        />
                    </Col>
                </FormGroup>
                <FieldGroup
                    id='recommendations'
                    type='textarea'
                    label='If yes, did your Doctor make any recommendations/comments?'
                    labelsize={4}
                    value={this.state.recommendations}
                    onChange={this.handleChange}
                    disabled={!this.state.doctorVisited}
                    required={this.state.doctorVisited}
                />
                <FormGroup bsSize='lg' controlId='absenceRelation'>
                    <Col componentClass={ControlLabel} sm={4}>Was your absence related to work? *</Col>
                    <Col sm={4}>
                        <CustomSwitch 
                            id='absenceRelation' 
                            onChange={this.handleSwitchToggle}
                            checked={this.state.absenceRelation}
                        />
                    </Col>
                </FormGroup>
                <FieldGroup
                    id='absenceRelationDetails'
                    type='textarea'
                    label='If yes, please provide further details'
                    labelsize={4}
                    value={this.state.absenceRelationDetails}
                    onChange={this.handleChange}
                    disabled={!this.state.absenceRelation}
                    required={this.state.absenceRelation}
                />
                <FormGroup bsSize='lg' controlId='injury'>
                    <Col componentClass={ControlLabel} sm={4}>Was your absence due to an injury at work? *</Col>
                    <Col sm={4}>
                        <CustomSwitch 
                            id='injury' 
                            onChange={this.handleSwitchToggle}
                            checked={this.state.injury}
                        />
                    </Col>
                </FormGroup>
                <FieldGroup
                    id='injuryDetails'
                    type='textarea'
                    label='If yes, please provide further details'
                    labelsize={4}
                    value={this.state.injuryDetails}
                    onChange={this.handleChange}
                    disabled={!this.state.injury}
                    required={this.state.injury}
                />
                <FieldGroup
                    id='comments'
                    type='textarea'
                    label='Any other comments about your absence'
                    labelsize={4}
                    value={this.state.comments}
                    onChange={this.handleChange}
                />
                <FormGroup bsSize='lg' controlId='confirmation'>
                    <Col componentClass={ControlLabel} sm={4}>Please confirm that you are fit to return to work? *</Col>
                    <Col sm={4}>
                        <CustomSwitch 
                            id='confirmation' 
                            onChange={this.handleSwitchToggle}
                            checked={this.state.confirmation}
                        />
                    </Col>
                </FormGroup>
                <h3>Declaration</h3>
                <p>By submitting this form, I confirm that the information provided above is complete and accurate. I understand that providing false or misleading information is a disciplinary offence.</p>
                <FieldGroup
                    id='name'
                    type='text'
                    label='Name *'
                    labelsize={4}
                    value={this.state.name}
                    onChange={this.handleChange}
                    required
                />
                <FieldGroup
                    id='department'
                    type='text'
                    label='Department'
                    labelsize={4}
                    value={this.state.department}
                    onChange={this.handleChange}
                />
                <FieldGroup
                    id='emailAddress'
                    type='email'
                    label='Email Address *'
                    labelsize={4}
                    value={this.state.emailAddress}
                    onChange={this.handleChange}
                    required
                />
                <FieldGroup
                    id='validateEmail'
                    type='email'
                    label='Validate Email *'
                    labelsize={4}
                    value={this.state.validateEmail}
                    onChange={this.handleChange}
                    required
                />
                <Row>
                    <Col smOffset={4} sm={3}>
                        <Button 
                            bsClass='button-primary' 
                            type='submit'
                            disabled={!this.props.location.state}
                        >
                            Send form
                        </Button>
                    </Col>
                </Row>
                <ToastContainer autoClose={3000} position={toast.POSITION.TOP_CENTER} />
            </Form>
        );
    }
}

export default SelfCertificationForm;