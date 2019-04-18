import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import React from 'react';
import { Row, Col, FormGroup, FormControl, ControlLabel, HelpBlock, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { UploadFS } from 'meteor/jalik:ufs';
import { ToastContainer, toast } from 'react-toastify';

import Nationalities from '../../../../api/collections/nationalities';
import Countries from '../../../../api/collections/countries';
import EmployeeIds, { EmployeeIdsStore } from '../../../../api/collections/user_info/employeeIds';
import PersonalInformation from '../../../../api/collections/user_info/personalInformation';

import FieldGroup from '../../FieldGroup';
import CustomSelect from '../../CustomSelect';
import DateInput from '../../DateInput';
import DocumentViewer from '../../DocumentViewer';

const maritalStatuses = ['Single', 'Married', 'Divorced', 'Widowed', 'Civil partnership', 'Other'];

class PersonalInformationForm extends React.Component {
    constructor(props) {
        super(props);

        const { address, ...personalInformation } = props.personalInformation;

        personalInformation.addressLine1 = address && address.split('\n')[0] || '';
        personalInformation.addressLine2 = address && address.split('\n')[1] || '';

        this.state = {
            ...personalInformation,
            employeeId: null,
            addedIds: [],
            deletedIds: [],
            saving: false,
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleOnSelect = this.handleOnSelect.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleFileUpload = this.handleFileUpload.bind(this);
        this.handleFileView = this.handleFileView.bind(this);
        this.handleFileViewClose = this.handleFileViewClose.bind(this);
        this.handleFileDelete = this.handleFileDelete.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        const { address, ...personalInformation } = nextProps.personalInformation;

        personalInformation.addressLine1 = address && address.split('\n')[0] || '';
        personalInformation.addressLine2 = address && address.split('\n')[1] || '';

        this.setState({ ...personalInformation });
    }

    handleSubmit(event) {
        event.preventDefault();

        this.setState({ saving: true });

        const personalInformation = {
            _id: this.state._id,
            middleName: this.state.middleName,
            address: this.state.addressLine1 + '\n' + this.state.addressLine2,
            city: this.state.city,
            country: this.state.country,
            postcode: this.state.postcode,
            email: this.state.email,
            mobile: this.state.mobile,
            maritalStatus: this.state.maritalStatus,
            nationality: this.state.nationality,
            dateOfBirth: this.state.dateOfBirth,
            userId: this.state.userId
        };

        Meteor.call('personalInformation.update', personalInformation, (error, response) => {
            if (error) {
                toast.error(error.reason);

                this.setState({ saving: false });
            } else {
                Meteor.call('employeeIds.removeMany', this.state.deletedIds, (err, res) => {
                    if (err) {
                        toast.error(error.reason);

                        this.setState({ saving: false });
                    } else {
                        toast.success('Saved');

                        this.setState({ saving: false });
                    }
                });
            }
        });
    }

    handleChange(event) {
        this.setState({ [event.target.id]: event.target.value });
    }

    handleOnSelect(value, stateProp) {
        this.setState({ [stateProp]: value });
    }

    handleDateChange(date, stateProp) {
        this.setState({ [stateProp]: date });
    }

    handleFileUpload(event) {
        event.preventDefault();

        var file = this.idInput.files[0];

        const employeeId = {
            name: file.name,
            type: file.type,
            size: file.size,
            userId: this.props.userInfo.userId
        };

        const uploader = new UploadFS.Uploader({
            data: file,
            file: employeeId,
            store: EmployeeIdsStore,
            onError: error => {
                toast.error('Cannot upload file');
            },
            onComplete: f => this.setState({ addedIds: this.state.addedIds.concat([f._id]) }),
            onProgress: (f, progress) => console.log(f.name + ': ' + (progress * 100).toFixed(2) + '% uploaded')
        });

        uploader.start();
    }

    handleFileView(event, file) {
        event.preventDefault();

        this.setState({ employeeId: file });
    }

    handleFileViewClose() {
        this.setState({ employeeId: null });
    }

    handleFileDelete(event, fileId) {
        event.preventDefault();

        this.setState({ deletedIds: this.state.deletedIds.concat([fileId]) });
    }

    handleCancel(event) {
        event.preventDefault();

        Meteor.call('employeeIds.removeMany', this.state.addedIds, (error, response) => {
            if (error) {
                toast.error(error.reason);
            } else {
                this.props.history.push('/dashboard');
            }
        });
    }

    canEdit = this.props.userInfo.userId === Meteor.userId();

    render() {
        return (
            <Form horizontal onSubmit={this.handleSubmit} key={this.state._id}>
                <h2 style={{ marginTop: '40px', marginBottom: '25px' }}>Personal information</h2>
                <FieldGroup
                    id='middleName'
                    label='Middle Name'
                    type='text'
                    defaultValue={this.state.middleName}
                    onBlur={this.handleChange}
                    disabled={!this.canEdit}
                />
                <FieldGroup
                    id='addressLine1'
                    label='Address'
                    type='text'
                    defaultValue={this.state.addressLine1}
                    onBlur={this.handleChange}
                    disabled={!this.canEdit}
                />
                <FieldGroup
                    id='addressLine2'
                    label=''
                    type='text'
                    defaultValue={this.state.addressLine2}
                    onBlur={this.handleChange}
                    disabled={!this.canEdit}
                />
                <FieldGroup
                    id='city'
                    label='City'
                    type='text'
                    defaultValue={this.state.city}
                    onBlur={this.handleChange}
                    disabled={!this.canEdit}
                />
                <FormGroup bsSize='lg' controlId='country'>
                    <Col componentClass={ControlLabel} sm={3}>Country</Col>
                    <Col sm={4}>
                        <CustomSelect
                            id='country'
                            value={this.state.country}
                            options={this.props.countries}
                            onSelect={value => this.handleOnSelect(value, 'country')}
                            textAlign='left'
                            filter
                            disabled={!this.canEdit}
                        />
                    </Col>
                </FormGroup>
                <FieldGroup
                    id='postcode'
                    label='Postcode'
                    type='text'
                    inputsize={2}
                    defaultValue={this.state.postcode}
                    onBlur={this.handleChange}
                    disabled={!this.canEdit}
                />
                <FieldGroup
                    id='email'
                    label='Personal Email Address'
                    type='email'
                    defaultValue={this.state.email}
                    onBlur={this.handleChange}
                    disabled={!this.canEdit}
                />
                <FieldGroup
                    id='mobile'
                    label='Mobile'
                    type='text'
                    defaultValue={this.state.mobile}
                    onBlur={this.handleChange}
                    disabled={!this.canEdit}
                />
                <FormGroup bsSize='lg' controlId='maritalStatus'>
                    <Col componentClass={ControlLabel} sm={3}>Marital Status</Col>
                    <Col sm={4}>
                        <CustomSelect
                            id='maritalStatus'
                            dropup
                            value={this.state.maritalStatus}
                            options={maritalStatuses}
                            onSelect={value => this.handleOnSelect(value, 'maritalStatus')}
                            textAlign='left'
                            disabled={!this.canEdit}
                        />
                    </Col>
                </FormGroup>
                <FormGroup bsSize='lg' controlId='nationality'>
                    <Col componentClass={ControlLabel} sm={3}>Nationality</Col>
                    <Col sm={4}>
                        <CustomSelect
                            id='nationality'
                            dropup
                            value={this.state.nationality}
                            options={this.props.nationalities}
                            onSelect={value => this.handleOnSelect(value, 'nationality')}
                            textAlign='left'
                            filter
                            disabled={!this.canEdit}
                        />
                    </Col>
                </FormGroup>
                <FormGroup bsSize='lg' controlId='dateOfBirth'>
                    <Col componentClass={ControlLabel} sm={3}>Date of birth</Col>
                    <Col sm={3}>
                        <DateInput
                            id='dateOfBirth'
                            selected={this.state.dateOfBirth}
                            onChange={date => this.handleDateChange(date, 'dateOfBirth')}
                            wrapperStyle={{ width: '100%' }}
                            disabled={!this.canEdit}
                        />
                    </Col>
                </FormGroup>
                <FormGroup bsSize='lg' controlId='employeeId'>
                    <Col componentClass={ControlLabel} sm={3}>ID</Col>
                    <Col sm={3}>
                        <ControlLabel htmlFor='employeeId' className='button-primary' style={{ textAlign: 'center' }}>Upload file</ControlLabel>
                        <FormControl
                            id='employeeId'
                            accept='.doc, .docx, .pdf'
                            type='file'
                            inputRef={ref => this.idInput = ref}
                            onChange={this.handleFileUpload}
                            disabled={!this.canEdit}
                        />
                    </Col>
                </FormGroup>
                <Row><Col smOffset={3} sm={5} style={{ borderBottom: '1px solid #000000' }}></Col></Row>
                <Row>
                    <Col smOffset={3} sm={5}>
                        {
                            this.props.employeeIds.map(file => (
                                !~this.state.deletedIds.indexOf(file._id)
                                &&
                                <div key={file._id} style={{ borderBottom: '1px solid #eeeeee', padding: '5px 0' }}>
                                    <span>{file.name}</span>
                                    <Link to='#' onClick={event => this.handleFileDelete(event, file._id)} style={{ marginLeft: '10px', float: 'right', fontSize: '14px' }}><i className='fa fa-trash-o' style={{ color: '#000000' }}></i> Delete</Link>
                                    <Link to='#' onClick={event => this.handleFileView(event, file)} style={{ float: 'right', fontSize: '14px' }}>View</Link>
                                </div>
                            ))
                        }
                    </Col>
                </Row>
                {
                    this.canEdit
                    &&
                    <FormGroup style={{ marginTop: '15px' }}>
                        <Col smOffset={3} sm={2}>
                            <Button 
                                bsClass='button-primary' 
                                type='submit'
                                disabled={this.state.saving}
                            >
                                {this.state.saving ? 'Saving...' : 'Save'}
                            </Button>
                        </Col>
                        <Col sm={2}>
                            <Button bsClass='button-secondary' onClick={this.handleCancel}>Cancel</Button>
                        </Col>
                    </FormGroup>
                }
                {
                    this.state.employeeId 
                    && 
                    <DocumentViewer document={this.state.employeeId} onClose={this.handleFileViewClose} />
                }
                <ToastContainer autoClose={3000} position={toast.POSITION.TOP_CENTER} />
            </Form>
        );
    }
}

PersonalInformationForm.defaultProps = {
    personalInformation: {
        _id: '',
        userId: Meteor.userId(),
        middleName: '',
        address: '',
        city: '',
        country: '',
        postcode: '',
        email: '',
        mobile: '',
        maritalStatus: '',
        nationality: '',
        dateOfBirth: new Date(0),
    }
};

export default withTracker(props => {
    const userId = props.userInfo.userId || Meteor.userId();
    const countriesHandle = Meteor.subscribe('countries.all');
    const nationalitiesHandle = Meteor.subscribe('nationalities.all');
    const personalInformationHandle = Meteor.subscribe('personalInformation.user', userId);
    const loading = !countriesHandle.ready() || !personalInformationHandle.ready() || !nationalitiesHandle.ready();

    return {
        loading,
        countries: Countries.find().map(country => country.name),
        nationalities: Nationalities.find().map(nationality => nationality.name),
        employeeIds: EmployeeIds.find({ userId }).fetch(),
        personalInformation: PersonalInformation.findOne({ userId })
    };
})(PersonalInformationForm);