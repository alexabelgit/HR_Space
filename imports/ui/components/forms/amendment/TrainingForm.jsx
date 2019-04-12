import React from 'react';
import { Col, FormGroup, ControlLabel, Form, Button } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import moment from 'moment';

import FieldGroup from '../../FieldGroup';
import DateInput from '../../DateInput';
import CustomSwitch from '../../CustomSwitch';

import { generatePDF } from '../../../../startup/client/generatePDF';

import { HRDocumentsStore } from '../../../../api/collections/hrDocuments';

class TrainingForm extends React.Component {
    constructor(props) {
        super();

        this.state = {
            activityName: '',
            description: '',
            keyLearnings: '',
            startDate: null,
            endDate: null,
            timeStarted: '',
            timeEnded: '',
            timeSpent: '',
            cost: '',
            comments: '',
            recommendation: true,
            ...props.employee,
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ ...nextProps.employee });
    }

    handleChange = event => this.setState({ [event.target.id]: event.target.value });

    handleDateChange = (value, stateProp) => this.setState({ [stateProp]: value });

    handleSwitchToggle = event => this.setState({ [event.target.id]: !this.state[event.target.id] });

    handleSubmit = event => {
        event.preventDefault();

        const form = {
            name: 'TRAINING',
            rows: [
                { label: 'Name', value: this.state.firstName + ' ' + this.state.surname },
                { label: 'Course or Activity Name', value: this.state.activityName },
                { label: 'Brief Description', value: this.state.description },
                { label: 'Date started', value: moment(this.state.startDate).format('DD/MM/YYYY') },
                { label: 'Date completed', value: moment(this.state.endDate).format('DD/MM/YYYY') },
                { label: 'Time Started', value: this.state.timeStarted },
                { label: 'Time Ended', value: this.state.timeEnded },
                { label: 'Time Involved/Spent', value: this.state.timeSpent },
                { label: 'Cost', value: this.state.cost },
                { label: 'Any Comments/Feedback', value: this.state.comments },
                { label: 'Would you recommend to Others', value: this.state.recommendation ? 'Yes' : 'No' },
            ],
        };

        var file = generatePDF(form);

        const document = {
            type: file.type,
            size: file.size,
            name: 'Training',
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
                <h2 style={{ marginTop: '40px', marginBottom: '25px' }}>Training</h2>
                <FieldGroup
                    id='name'
                    type='text'
                    label='Name'
                    labelsize={4}
                    value={this.state.firstName + ' ' + this.state.surname}
                    onChange={() => {}}
                    disabled
                />
                <FieldGroup
                    id='activityName'
                    type='text'
                    label='Course or Activity Name *'
                    labelsize={4}
                    onChange={this.handleChange}
                    required
                />
                <FieldGroup
                    id='description'
                    type='textarea'
                    label='Brief Description'
                    labelsize={4}
                    onChange={this.handleChange}
                />
                <FieldGroup
                    id='keyLearnings'
                    type='textarea'
                    label='Key Learnings'
                    labelsize={4}
                    onChange={this.handleChange}
                />
                <FormGroup bsSize='lg' controlId='startDate'>
                    <Col componentClass={ControlLabel} sm={4}>Date started *</Col>
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
                <FormGroup bsSize='lg' controlId='endDate'>
                    <Col componentClass={ControlLabel} sm={4}>Date completed *</Col>
                    <Col sm={4}>
                        <DateInput 
                            id='endDate' 
                            selected={this.state.endDate} 
                            onChange={date => this.handleDateChange(date, 'endDate')}
                            wrapperStyle={{ width: '100%' }} 
                            required
                />
                    </Col>
                </FormGroup>
                <FieldGroup
                    id='timeStarted'
                    type='text'
                    label='Time Started'
                    labelsize={4}
                    onChange={this.handleChange}
                />
                <FieldGroup
                    id='timeEnded'
                    type='text'
                    label='Time Ended'
                    labelsize={4}
                    onChange={this.handleChange}
                />
                <FieldGroup
                    id='timeSpent'
                    type='text'
                    label='Time Involved/Spent'
                    labelsize={4}
                    onChange={this.handleChange}
                />
                <FieldGroup
                    id='cost'
                    type='text'
                    label='Cost'
                    labelsize={4}
                    onChange={this.handleChange}
                />
                <FieldGroup
                    id='comments'
                    type='textarea'
                    label='Any Comments/Feedback?'
                    labelsize={4}
                    onChange={this.handleChange}
                />
                <FormGroup bsSize='lg' controlId='recommendation'>
                    <Col componentClass={ControlLabel} sm={4}>Would you recommend to Others</Col>
                    <Col sm={4}>
                        <CustomSwitch 
                            id='recommendation' 
                            checked={this.state.recommendation}
                            onChange={this.handleSwitchToggle}
                        />
                    </Col>
                </FormGroup>
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

export default TrainingForm;