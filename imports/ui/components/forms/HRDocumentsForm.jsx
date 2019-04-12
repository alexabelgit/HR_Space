import React from 'react';
import { Button, Row, Col, Form, FormControl, ControlLabel, FormGroup } from 'react-bootstrap';

import CustomSelect from '../CustomSelect';
import FieldGroup from '../FieldGroup';
import DateInput from '../DateInput';

const types = ['Pre-employment', 'Terms of Employment', 'ETB Paperwork', 'Return to work interview', 'Training', 'Appraisals', 'Tax'];

class HRDocumentsForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            documentType: '',
            file: null,
            uploading: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleOnSelect = this.handleOnSelect.bind(this);
        this.handleFileSelect = this.handleFileSelect.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }

    handleChange(event) {
        this.setState({ [event.target.id]: event.target.value })
    }

    handleOnSelect(value, stateProp) {
        this.setState({ [stateProp]: value });
    }

    handleFileSelect(event) {
        event.preventDefault();

        var file = this.documentFileInput.files[0];

        this.setState({ file });
    }

    handleSubmit(event) {
        event.preventDefault();

        const name = this.state.name + '.' + this.state.file.name.split('.').pop().toLowerCase();
        const { documentType, file } = this.state;

        this.setState({ uploading: true });

        this.props.onSubmit({ name, documentType, file });
    }

    handleCancel(event) {
        this.props.onClose();
    }

    render() {
        return (
            <Col sm={10} style={{ marginTop: '20px' }}>
                <Form horizontal onSubmit={this.handleSubmit}>
                    <FormGroup bsSize='lg' controlId='documentType'>
                        <Col componentClass={ControlLabel} sm={3}>Document type</Col>
                        <Col sm={4}>
                            <CustomSelect
                                id='documentType'
                                value={this.state.documentType}
                                options={types}
                                onSelect={value => this.handleOnSelect(value, 'documentType')}
                            />
                        </Col>
                    </FormGroup>
                    <FieldGroup
                        id='name'
                        type='text'
                        label='Summary'
                        value={this.state.name}
                        onChange={this.handleChange}
                    />
                    <FormGroup bsSize='lg' controlId='documentFile'>
                        <Col componentClass={ControlLabel} sm={3}></Col>
                        <Col sm={4}>
                            <ControlLabel htmlFor='documentFile' className='button-primary' style={{ textAlign: 'center' }}>
                                { this.state.file && this.state.file.name || 'Upload file' }
                            </ControlLabel>
                            <FormControl
                                id='documentFile'
                                accept='application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/pdf, .doc, .docx, .pdf'
                                type='file'
                                inputRef={ref => this.documentFileInput = ref}
                                onChange={this.handleFileSelect}
                            />
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        <Col smOffset={3} sm={2}>
                            <Button bsClass='button-primary' type='submit' disabled={this.state.uploading}>Save</Button>
                        </Col>
                        <Col sm={2}>
                            <Button onClick={this.handleCancel} bsClass='button-secondary'>Cancel</Button>
                        </Col>
                    </FormGroup>
                </Form>
            </Col>
        );
    }
}

export default HRDocumentsForm;