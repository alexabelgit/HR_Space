import { Meteor } from 'meteor/meteor';
import React from 'react';
import PropTypes from 'prop-types';
import { Button, Row, Col, Form, FormControl, ControlLabel, FormGroup, Checkbox, Radio, HelpBlock } from 'react-bootstrap';
import { Editor } from 'react-draft-wysiwyg';

import FieldGroup from '../FieldGroup';
import SmartCustomSelect from '../SmartCustomSelect';
import CustomSwitch from '../CustomSwitch';
import CustomEditor from '../CustomEditor';

import { ImagesStore } from '../../../api/collections/images';

const propTypes = {
    businesses: PropTypes.arrayOf(PropTypes.object).isRequired,
    policy: PropTypes.object.isRequired,
    onSubmit: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
    error: PropTypes.object
};

class HRPolicyForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            images: [],
            error: null,
            ...props.policy,
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleOnSelect = this.handleOnSelect.bind(this);
        this.handleSwitchToggle = this.handleSwitchToggle.bind(this);
        this.handleRadioChange = this.handleRadioChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleEditorChange = this.handleEditorChange.bind(this);
        this.uploadImageCallback = this.uploadImageCallback.bind(this);
    }

    handleChange(event) {
        this.setState({ [event.target.id]: event.target.value });
    }

    handleSwitchToggle(event) {
        this.setState({ [event.target.id]: !this.state[event.target.id] });
    }

    handleRadioChange(event) {
        this.setState({ access: event.target.name });
    }

    handleSubmit(event) {
        event.preventDefault();

        const { images, error: err, ...policy } = this.state;

        const imagesToDelete = images.filter(image => !~this.state.detail.indexOf(image.url)).map(image => image._id);

        if (imagesToDelete.length > 0) {
            Meteor.call('images.remove', imagesToDelete, (error, response) => {
                if (error) {
                    setTimeout(() => this.setState({ error: null }), 3000);
    
                    this.setState({ error: error.reason });
                } else {
                    this.props.onSubmit(policy);
                }
            });
        } else {
            this.props.onSubmit(policy);
        }
    }

    handleOnSelect(value, stateProp) {
        this.setState({ [stateProp]: value });
    }

    handleCancel(event) {
        event.preventDefault();

        const imagesToDelete = this.state.images.map(image => image._id);

        if (imagesToDelete.length > 0) {
            Meteor.call('images.remove', imagesToDelete, (error, response) => {
                if (error) {
                    setTimeout(() => this.setState({ error: null }), 3000);
    
                    this.setState({ error: error.reason });
                } else {
                    this.props.onClose();
                }
            });
        } else {
            this.props.onClose();
        }
    }

    handleEditorChange(html) {
        this.setState({ details: html });
    }

    uploadImageCallback(file) {
        return new Promise((resolve, reject) => {
            const image = {
                name: file.name,
                type: file.type,
                size: file.size,
            };

            const uploader = new UploadFS.Uploader({
                data: file,
                file: image,
                store: ImagesStore,
                onError: error => {
                    console.log(error);

                    setTimeout(() => this.setState({ error: null }), 3000);

                    this.setState({ error: error.reason });

                    reject(error.reason);
                },
                onComplete: f => {
                    this.setState({ images: this.state.images.concat([f]) });

                    resolve({ data: { link: f.url } });
                }
            });

            uploader.start();
        });
    }

    render() {
        return (
            <Col sm={10} style={{ marginTop: '20px' }}>
                <Form horizontal onSubmit={this.handleSubmit}>
                {
                    Roles.userIsInRole(Meteor.userId(), 'super_admin')
                    &&
                    <FormGroup bsSize='lg' controlId='business'>
                        <Col componentClass={ControlLabel} sm={3}>Business Name</Col>
                        <Col sm={5}>
                            <SmartCustomSelect
                                id='business'
                                option={this.state.business}
                                options={this.props.businesses} 
                                onSelect={value => this.handleOnSelect(value, 'business')} 
                                help={this.props.error && this.props.error.field === 'business' ? this.props.error.message : ''}
                            />
                        </Col>
                    </FormGroup>
                }
                    <FieldGroup
                        id='name'
                        type='text'
                        label='Policy Name'
                        value={this.state.name}
                        onChange={this.handleChange}
                        inputsize={5}
                        help={this.props.error && this.props.error.field === 'name' ? this.props.error.message : ''}
                        />
                    <FieldGroup
                        id='summary'
                        type='text'
                        label='Policy Summary'
                        value={this.state.summary}
                        onChange={this.handleChange}
                        inputsize={6}
                        help={this.props.error && this.props.error.field === 'summary' ? this.props.error.message : ''}
                    />
                    <FormGroup bsSize='lg' controlId='details'>
                        <Col componentClass={ControlLabel} sm={3}>Full policy details</Col>
                        <Col sm={9}>
                            <CustomEditor 
                                html={this.state.details} 
                                onImageUpload={this.uploadImageCallback}
                                onChange={this.handleEditorChange}
                            />
                        </Col>
                    </FormGroup>
                    <FormGroup bsSize='lg' controlId='isActive'>
                        <Col componentClass={ControlLabel} sm={3}>Active</Col>
                        <Col sm={6}>
                            <CustomSwitch 
                                id='isActive' 
                                checked={this.state.isActive} 
                                onChange={this.handleSwitchToggle}
                            />
                        </Col>
                    </FormGroup>
                    <FormGroup bsSize='lg' controlId='access'>
                        <Col componentClass={ControlLabel} sm={3}>Access</Col>
                        <Col sm={6}>
                            <Radio checked={this.state.access === 'all'} onChange={this.handleRadioChange} name='all' inline>All</Radio>
                            <Radio checked={this.state.access === 'hr'} onChange={this.handleRadioChange} name='hr' inline>HR Access</Radio>
                            <Radio checked={this.state.access === 'manager'} onChange={this.handleRadioChange} name='manager' inline>Manager Only</Radio>
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        <Col smOffset={3} sm={3}>
                            <Button bsClass='button-primary' type='submit'>Save</Button>
                        </Col>
                        <Col sm={3}>
                            <Button onClick={this.handleCancel} bsClass='button-secondary'>Cancel</Button>
                        </Col>
                    </FormGroup>
                </Form>
            </Col>
        );
    }
}

HRPolicyForm.propTypes = propTypes;

export default HRPolicyForm;