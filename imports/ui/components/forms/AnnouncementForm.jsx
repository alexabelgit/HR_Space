import { Meteor } from 'meteor/meteor';
import { UploadFS } from 'meteor/jalik:ufs';
import React from 'react';
import { Button, Row, Col, Form, FormControl, ControlLabel, FormGroup } from 'react-bootstrap';
import { Random } from 'meteor/random';

import CustomSelect from '../CustomSelect';
import FieldGroup from '../FieldGroup';
import DateInput from '../DateInput';
import CustomEditor from '../CustomEditor';
import ErrorAlert from '../ErrorAlert';
import CustomSwitch from '../CustomSwitch';

import { ImagesStore } from '../../../api/collections/images';

const types = ['Staff update', 'Policy update', 'Social update'];

class AnnouncementForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            error: null,
            images: [],
            ...props.announcement
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleOnSelect = this.handleOnSelect.bind(this);
        this.handleSwitchToggle = this.handleSwitchToggle.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleEditorChange = this.handleEditorChange.bind(this);
        this.uploadImageCallback = this.uploadImageCallback.bind(this);
    }

    handleChange(event) {
        this.setState({ [event.target.id]: event.target.value })
    }

    handleDateChange(date, stateProp) {
        this.setState({ [stateProp]: date });
    }

    handleOnSelect(value, stateProp) {
        this.setState({ [stateProp]: value });
    }

    handleSwitchToggle(event) {
        this.setState({ [event.target.id]: !this.state[event.target.id] });
    }

    handleSubmit(event) {
        event.preventDefault();

        const { images, error: err, ...announcement } = this.state;

        const imagesToDelete = images.filter(image => !~this.state.detail.indexOf(image.url)).map(image => image._id);

        if (imagesToDelete.length > 0) {
            Meteor.call('images.remove', imagesToDelete, (error, response) => {
                if (error) {
                    setTimeout(() => this.setState({ error: null }), 3000);
    
                    this.setState({ error: error.reason });
                } else {
                    this.props.onSubmit(announcement);
                }
            });
        } else {
            this.props.onSubmit(announcement);
        }
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
        this.setState({ detail: html });
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
            <Col sm={12} style={{ marginTop: '20px' }}>
                <Form horizontal onSubmit={this.handleSubmit}>
                    <FieldGroup
                        id='title'
                        type='text'
                        label='Announcement Title'
                        value={this.state.title}
                        onChange={this.handleChange}
                        help={this.props.error && this.props.error.field === 'title' ? this.props.error.message : ''}
                        inputsize={6}
                    />
                    <FormGroup bsSize='lg' controlId='detail'>
                        <Col componentClass={ControlLabel} sm={3}>Detail</Col>
                        <Col sm={7}>
                            <CustomEditor 
                                html={this.state.detail} 
                                onImageUpload={this.uploadImageCallback}
                                onChange={this.handleEditorChange}
                            />
                        </Col>
                    </FormGroup>
                    <FormGroup bsSize='lg' controlId='startDate'>
                        <Col componentClass={ControlLabel} sm={3}>Start Date</Col>
                        <Col sm={3}>
                            <DateInput 
                                id='startDate' 
                                selected={this.state.startDate} 
                                onChange={date => this.handleDateChange(date, 'startDate')} 
                                wrapperStyle={{ width: '100%' }} 
                                help={this.props.error && this.props.error.field === 'startDate' ? this.props.error.message : ''}
                            />
                        </Col>
                    </FormGroup>
                    <FormGroup bsSize='lg' controlId='endDate'>
                        <Col componentClass={ControlLabel} sm={3}>End Date</Col>
                        <Col sm={3}>
                            <DateInput 
                                id='endDate' 
                                selected={this.state.endDate} 
                                onChange={date => this.handleDateChange(date, 'endDate')} 
                                wrapperStyle={{ width: '100%' }} 
                            />
                        </Col>
                    </FormGroup>
                    <FormGroup bsSize='lg' controlId='type'>
                        <Col componentClass={ControlLabel} sm={3}>Type</Col>
                        <Col sm={4}>
                            <CustomSelect
                                value={this.state.type}
                                options={types}
                                onSelect={value => this.handleOnSelect(value, 'type')}
                                help={this.props.error && this.props.error.field === 'type' ? this.props.error.message : ''}
                        />
                        </Col>
                    </FormGroup>
                    <FormGroup bsSize='lg' controlId='mandatory'>
                        <Col componentClass={ControlLabel} sm={3}>Mandatory</Col>
                        <Col sm={7}>
                            <CustomSwitch
                                id='mandatory'
                                checked={!!this.state.mandatory}
                                onChange={this.handleSwitchToggle}
                            />
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        <Col smOffset={3} sm={2}>
                            <Button bsClass='button-primary' type='submit'>Save changes</Button>
                        </Col>
                        <Col sm={2}>
                            <Button onClick={this.handleCancel} bsClass='button-secondary'>Cancel</Button>
                        </Col>
                    </FormGroup>
                </Form>
                <ErrorAlert text={this.state.error} visible={!!this.state.error} />
            </Col>
        );
    }
}

export default AnnouncementForm;