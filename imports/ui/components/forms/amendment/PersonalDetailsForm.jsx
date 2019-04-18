import React from 'react';
import { Col, FormGroup, Form, Button } from 'react-bootstrap';
import { UploadFS } from 'meteor/jalik:ufs';
import { toast, ToastContainer } from 'react-toastify';

import { generatePDF } from '../../../../startup/client/generatePDF';

import FieldGroup from '../../FieldGroup';

import { HRDocumentsStore } from '../../../../api/collections/hrDocuments';

class DetailsChangeForm extends React.Component {
    constructor(props) {
        super();

        this.state = {
            changeOfAddress: '',
            changeOfTelephoneNumber: '',
            emergencyContact: '',
            otherDetails: '',
            ...props.employee,
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ ...nextProps.employee });
    }

    handleChange = event => this.setState({ [event.target.id]: event.target.value });
    
    handleSubmit = event => {
        event.preventDefault();

        const form = {
            name: 'CHANGE OF DETAILS',
            rows: [
                { label: 'Name', value: this.state.firstName + ' ' + this.state.surname },
                { label: 'Department', value: this.state.department || '' },
                { label: 'Change of Address', value: this.state.changeOfAddress.trim() },
                { label: 'Change of Telephone Number', value: this.state.changeOfTelephoneNumber.trim() },
                { label: 'Emergency Contact or Next of Kin', value: this.state.emergencyContact.trim() },
                { label: 'Details Of Any Other Change', value: this.state.otherDetails.trim() },
            ],
        };

        var file = generatePDF(form);

        const document = {
            type: file.type,
            size: file.size,
            name: 'Change of details',
            documentType: 'Forms',
            userId: this.props.employee.userId,
        };

        const uploader = new UploadFS.Uploader({
            adaptive: true,
            data: file,
            file: document,
            store: HRDocumentsStore,
            onError: error => {
                console.log(error);

                toast.error(error);
            },
            onComplete: f => {
                toast.success('Form submitted. A document was added to your HR documents.');

                console.log(f);
            },
            onAbort: f => console.log('abord', f),
            onCreate: f => console.log('create', f),
            onProgress: (f, p) => console.log(f.name, p*100),
            onStop: f => console.log('stop', f),
        });

        uploader.start();
    };

    render() {
        console.log(this.state.department);
        return (
            <Form horizontal onSubmit={this.handleSubmit}>
                <h2 style={{ marginTop: '40px', marginBottom: '25px' }}>Change of details</h2>
                <FieldGroup
                    id='name'
                    type='text'
                    label='Name'
                    labelsize={4}
                    value={this.props.employee.firstName + ' ' + this.props.employee.surname}
                    onChange={() => {}}
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
                <FieldGroup
                    id='changeOfAddress'
                    type='textarea'
                    label='Change of Address'
                    labelsize={4}
                    onChange={this.handleChange}
                />
                <FieldGroup
                    id='changeOfTelephoneNumber'
                    type='text'
                    label='Change of Telephone Number'
                    labelsize={4}
                    onChange={this.handleChange}
                />
                <FieldGroup
                    id='emergencyContact'
                    type='textarea'
                    label='Emergency Contact or Next of Kin'
                    labelsize={4}
                    onChange={this.handleChange}
                />
                <FieldGroup
                    id='otherDetails'
                    type='textarea'
                    label='Details Of Any Other Change'
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

export default DetailsChangeForm;