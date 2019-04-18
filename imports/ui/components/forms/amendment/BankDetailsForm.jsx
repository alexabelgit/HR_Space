import React from 'react';
import { Col, FormGroup, Form, Button } from 'react-bootstrap';

import FieldGroup from '../../FieldGroup';
import { ToastContainer, toast } from 'react-toastify';

import { generatePDF } from '../../../../startup/client/generatePDF';

import { HRDocumentsStore } from '../../../../api/collections/hrDocuments';

class BankDetailsForm extends React.Component {
    constructor(props) {
        super();

        this.state = { ...props.employee };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ ...nextProps.employee });
    }

    handleSubmit = event => {
        event.preventDefault();

        const form = {
            name: 'CHANGE OF BANK DETAILS',
            rows: [
                { label: 'Name', value: this.firstName.trim() + ' ' + this.surname.trim() },
                { label: 'Department', value: this.department.trim() || '' },
                { label: 'New Account Name', value: this.newAccountName.trim() },
                { label: 'New Account Number', value: this.newAccountNumber.trim() },
                { label: 'New Sort Code', value: this.newSortCode.trim() },
                { label: 'IBAN', value: this.IBAN.trim() },
                { label: 'Swift', value: this.Swift.trim() },
                { label: 'BIC', value: this.BIC.trim() },
            ],
        };

        var file = generatePDF(form);

        const document = {
            type: file.type,
            size: file.size,
            name: 'Change of bank details',
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
                <h2 style={{ marginTop: '40px', marginBottom: '25px' }}>Change of bank details</h2>
                <FieldGroup
                    id='name'
                    type='text'
                    label='Name'
                    value={this.state.firstName + ' ' + this.state.surname}
                    onChange={e => e.preventDefault()}
                    labelsize={4}
                    disabled
                />
                <FieldGroup
                    id='department'
                    type='text'
                    label='Department'
                    labelsize={4}
                    value={this.state.department}
                    onChange={e => e.preventDefault()}
                    disabled
                />
                <FieldGroup
                    id='newAccountName'
                    type='text'
                    label='New Account Name *'
                    labelsize={4}
                    inputRef={node => this.newAccountName = node}
                    required
                />
                <FieldGroup
                    id='newAccountNumber'
                    type='text'
                    label='New Account Number *'
                    labelsize={4}
                    inputRef={node => this.newAccountNumber = node}
                    required
                />
                <FieldGroup
                    id='newSortCode'
                    type='text'
                    label='New Sort Code *'
                    labelsize={4}
                    inputRef={node => this.newSortCode = node}
                    required
                />
                <FieldGroup
                    id='IBAN'
                    type='text'
                    label='IBAN'
                    labelsize={4}
                    inputRef={node => this.IBAN = node}
                />
                <FieldGroup
                    id='Swift'
                    type='text'
                    label='Swift'
                    labelsize={4}
                    inputRef={node => this.Swift = node}
                />
                <FieldGroup
                    id='BIC'
                    type='text'
                    label='BIC'
                    labelsize={4}
                    inputRef={node => this.BIC = node}
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

export default BankDetailsForm;