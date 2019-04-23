import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import React from 'react';
import { Row, Col, FormGroup, FormControl, ControlLabel, HelpBlock, Form, Button, Image as ReactImage } from 'react-bootstrap';
import { UploadFS } from 'meteor/jalik:ufs';
import { ToastContainer, toast } from 'react-toastify';

import CustomSelect from '../../CustomSelect';
import SmartCustomSelect from '../../SmartCustomSelect';
import FieldGroup from '../../FieldGroup';

import { ImagesStore } from '../../../../api/collections/images';
import Summary from '../../../../api/collections/user_info/summary';

class SummaryForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            ...props.summary,
            saving: false,
            managers: [],
        };
    }

    componentDidMount() {
        if (this.props.userInfo.isNew) {
            Meteor.call('generateEmployeeId.business', (error, response) => {
                if (error) {
                    toast.error(error.reason);
                } else {
                    Meteor.call('managers.get', this.props.userInfo.userId, (err, res) => {
                        if (err) {
                            toast.error(err.reason);
                        } else {
                            this.setState({ employeeId: response, managers: res });
                        }
                    });
                }
            });
        } else {
            Meteor.call('managers.get', this.props.userInfo.userId, (err, res) => {
                if (err) {
                    toast.error(err.reason);
                } else {
                    this.setState({ managers: res });
                }
            });
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.userInfo.isNew) {
            Meteor.call('generateEmployeeId.business', (error, response) => {
                if (error) {
                    toast.error(error.reason);
                } else {
                    const newSummary = {
                        userId: '',
                        firstName: nextProps.userInfo.firstName,
                        surname: nextProps.userInfo.surname,
                        employeeId: response,
                        manager: '',
                        email: '',
                        location: '',
                        telephone: '',
                        mobile: '',
                        linkedin: '',
                        twitter: '',
                        facebook: '',
                        photo: '',
                        bio: ''
                    };

                    this.setState({ ...newSummary });
                }
            });
        } else if (nextProps.summary !== this.props.summary) {
            this.setState({ ...nextProps.summary });
        }
    }

    componentWillUnmount() {
        this.props.onCloseForm();
    }

    handlePhotoUpload = file => {
        const updatedSummary = this.state;

        updatedSummary.photo = file.url;

        const methodName = this.props.userInfo.isNew ? 'createEmployee' : 'summary.update';

        Meteor.call(methodName, updatedSummary, (error, response) => {
            if (error) {
                if (error.reason === 'MISSING_FIELD') {
                    let fieldName = error.details.capitalize();

                    toast.error(`${fieldName} is required`);

                    this.setState({ saving: false });
                } else if (error.reason === 'Email already exists.') {
                    toast.error('A user with this email already exists');

                    this.setState({ saving: false });
                } else {
                    toast.error(error.reason);

                    this.setState({ saving: false });
                }
            } else {
                this.setState({ saving: false });

                if (this.props.userInfo.isNew) {
                    this.props.onHireEmployee({ userId: response, isNew: false });
                } else {
                    toast.success('Saved');
                }
            }
        });
    }

    handleSubmit = event => {
        event.preventDefault();

        this.setState({ saving: true });

        var file = this.photoInput.files[0];

        if (file) {
            const image = {
                name: file.name,
                type: file.type,
                size: file.size
            };

            const upload = new UploadFS.Uploader({
                data: file,
                file: image,
                store: ImagesStore,
                onError: error => {
                    toast.error('Cannot upload file');

                    this.setState({ saving: false });
                },
                onComplete: f => this.handlePhotoUpload(f),
                onProgress: (f, proggress) => console.log(f.name + ': ' + (proggress * 100).toFixed(2) + '% uploaded')
            });

            upload.start();
        } else {
            const updatedSummary = this.state;

            const methodName = this.props.userInfo.isNew ? 'createEmployee' : 'summary.update';

            Meteor.call(methodName, updatedSummary, (error, response) => {
                if (error) {
                    if (error.reason === 'MISSING_FIELD') {
                        let fieldName = error.details.capitalize();

                        toast.error(`${fieldName} is required`);

                        this.setState({ saving: false });
                    } else if (error.reason === 'Email already exists.') {
                        toast.error('A user with this email already exists');

                        this.setState({ saving: false });
                    } else if (error.reason === 'Match failed') {
                        toast.error('Email address must be entered');

                        this.setState({ saving: false });
                    } else {
                        toast.error(error.reason);

                        this.setState({ saving: false });
                    }
                } else {
                    this.setState({ saving: false });
                    
                    if (this.props.userInfo.isNew) {
                        this.props.onHireEmployee({ userId: response, isNew: false });
                    } else {
                        toast.success('Saved');
                    }
                }
            });
        }
    }

    handleChange = event => {
        this.setState({ [event.target.id]: event.target.value });
    }

    handleOnSelect = value => {
        this.setState({ manager: value });
    }

    handlePhotoChange = event => {
        event.preventDefault();

        var reader = new FileReader(),
            file = this.photoInput.files[0],
            validExtensions = ['png', 'jpg', 'jpeg'];

        if (validExtensions.indexOf(file.name.split('.').pop().toLowerCase()) === -1) {
            toast.error('Invalid file extension');
        } else {
            reader.onloadend = () => this.setState({ photo: reader.result });

            reader.readAsDataURL(file);
        }
    }

    canEdit = (this.props.userInfo.userId === Meteor.userId());

    render() {
        const managers = this.state.managers.filter(manager => manager._id !== this.props.userInfo.userId);
        const isAdmin = Roles.userIsInRole(Meteor.userId(), 'admin');

        console.log(!this.canEdit, !isAdmin);

        return (
            <Form horizontal onSubmit={this.handleSubmit}>
                <h2 style={{ marginTop: '40px', marginBottom: '25px' }}>Summary</h2>
                <FieldGroup
                    id='firstName'
                    type='text'
                    label='First Name'
                    value={this.state.firstName}
                    onChange={this.handleChange}
                    disabled={!this.canEdit}
                />
                <FieldGroup
                    id='surname'
                    type='text'
                    label='Surname'
                    value={this.state.surname}
                    onChange={this.handleChange}
                    disabled={!this.canEdit}
                />
                <Row>
                    <Col sm={12}>
                        <FormGroup bsSize='lg'>
                            <Col componentClass={ControlLabel} smOffset={0} sm={3}>
                                Employee ID
                            </Col>
                            <Col sm={3}>
                                <div className='input lg' style={{ cursor: 'default' }}>{this.state.employeeId}</div>
                            </Col>
                        </FormGroup>
                    </Col>
                </Row>
                <FormGroup bsSize='lg' controlId='manager'>
                    <Col componentClass={ControlLabel} sm={3}>Manager Name</Col>
                    <Col sm={4}>
                        <SmartCustomSelect
                            id='manager'
                            option={this.state.manager}
                            options={managers}
                            onSelect={this.handleOnSelect}
                            textAlign='left'
                            disabled={!isAdmin && !this.canEdit}
                        />
                    </Col>
                </FormGroup>
                <FieldGroup
                    id='email'
                    type='email'
                    label='Work Email Address'
                    value={this.state.email}
                    onChange={this.handleChange}
                    disabled={!this.canEdit}
                />
                <FieldGroup
                    id='location'
                    type='text'
                    label='Work Location'
                    inputsize={5}
                    value={this.state.location}
                    onChange={this.handleChange}
                    disabled={!this.canEdit}
                />
                <FieldGroup
                    id='telephone'
                    type='text'
                    label='Work Telephone'
                    value={this.state.telephone}
                    onChange={this.handleChange}
                    disabled={!this.canEdit}
                />
                <FieldGroup
                    id='mobile'
                    type='text'
                    label='Work Mobile'
                    value={this.state.mobile}
                    onChange={this.handleChange}
                    disabled={!this.canEdit}
                />
                <FieldGroup
                    id='linkedin'
                    type='text'
                    label='Linkedin'
                    labelicon='linkedin-square'
                    iconcolor='#0077b5'
                    value={this.state.linkedin}
                    onChange={this.handleChange}
                    disabled={!this.canEdit}
                />
                <FieldGroup
                    id='twitter'
                    type='text'
                    label='Twitter'
                    labelicon='twitter-square'
                    iconcolor='#1da1f2'
                    value={this.state.twitter}
                    onChange={this.handleChange}
                    disabled={!this.canEdit}
                />
                <FieldGroup
                    id='facebook'
                    type='text'
                    label='Facebook'
                    labelicon='facebook-square'
                    iconcolor='#3b5998'
                    value={this.state.facebook}
                    onChange={this.handleChange}
                    disabled={!this.canEdit}
                />
                <FormGroup bsSize='lg'>
                    <Col componentClass={ControlLabel} sm={3} style={{ lineHeight: '89px' }}>Profile photo</Col>
                    <Col sm={4}>
                        <Row>
                            <Col sm={5}>
                                <ReactImage 
                                    height={110} 
                                    width={110} 
                                    src={this.state.photo || '/img/no-avatar.png'} 
                                    circle 
                                />
                            </Col>
                            <Col sm={7} style={{ lineHeight: '110px' }}>
                                <ControlLabel 
                                    onClick={this.handleImageUpload} 
                                    htmlFor='photoInput' 
                                    className='button-primary'
                                    style={{ textAlign: 'center' }}
                                >
                                    Upload new photo
                                </ControlLabel>
                                <FormControl
                                    id='photoInput'
                                    accept='image/*'
                                    type='file'
                                    inputRef={ref => this.photoInput = ref}
                                    onChange={this.handlePhotoChange}
                                    disabled={!this.canEdit}
                                />
                            </Col>
                        </Row>
                    </Col>
                </FormGroup>
                <FieldGroup
                    id='bio'
                    type='textarea'
                    label='Personal bio summary'
                    inputsize={5}
                    value={this.state.bio}
                    onChange={this.handleChange}
                    disabled={!this.canEdit}
                />
                {
                    (this.canEdit || isAdmin)
                    &&
                    <FormGroup>
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
                            <Button bsClass='button-secondary' onClick={() => this.props.history.push('/dashboard')}>Cancel</Button>
                        </Col>
                    </FormGroup>
                }
                <ToastContainer autoClose={3000} position={toast.POSITION.TOP_CENTER} />
            </Form>
        );
    }
}

SummaryForm.defaultProps = {
    summary: {
        userId: '',
        firstName: '',
        surname: '',
        employeeId: '',
        manager: '',
        email: '',
        location: '',
        telephone: '',
        mobile: '',
        linkedin: '',
        twitter: '',
        facebook: '',
        photo: '',
        bio: ''
    }
};

export default withTracker(props => {
    const userId = props.userInfo.userId || Meteor.userId();

    if (props.userInfo.isNew) {
        return {
            summary: {
                firstName: props.userInfo.firstName,
                surname: props.userInfo.surname,
            },
        };
    } else {
        const summaryHandle = Meteor.subscribe('summary.user', userId);
        const loading = !summaryHandle.ready();

        return {
            loading,
            summary: Summary.findOne({ userId }),
        };
    }
})(SummaryForm);