import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import React from 'react';
import { Button, Row, Col, Form, FormControl, ControlLabel, FormGroup, Checkbox } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';

import CustomSwitch from '../../CustomSwitch';

import PersonalSettingsCollection from '../../../../api/collections/user_info/personalSettings';

class PersonalSettings extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            ...props.settings,
            saving: false,
        };

        this.handleSwitchToggle = this.handleSwitchToggle.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ ...nextProps.settings });
    }

    handleSwitchToggle(event) {
        this.setState({ [event.target.id]: !this.state[event.target.id] });
    }

    handleSubmit(event) {
        event.preventDefault();

        this.setState({ saving: true });

        const settings = this.state;

        Meteor.call('personalSettings.update', settings, (error, response) => {
            if (error) {
                toast.error(error.reason);

                this.setState({ saving: false });
            } else {
                toast.success('Saved');

                this.setState({ saving: false });
            }
        });
    }

    handleCancel(event) {
        this.props.history.push('/dashboard');
    }

    canEdit = this.props.userInfo.userId === Meteor.userId();

    render() {
        return (
            <Col sm={12} style={{ marginTop: '20px' }}>
                <Form horizontal onSubmit={this.handleSubmit}>
                    <FormGroup bsSize='lg' controlId='holidayEmails'>
                        <Col componentClass={ControlLabel} sm={4}>Receive emails for holidays</Col>
                        <Col sm={3}>
                            <CustomSwitch
                                id='holidayEmails'
                                checked={this.state.holidayEmails}
                                onChange={this.handleSwitchToggle}
                            />
                        </Col>
                    </FormGroup>
                    <FormGroup bsSize='lg' controlId='companyUpdatesEmails'>
                        <Col componentClass={ControlLabel} sm={4}>Reaceive Company Updates Emails</Col>
                        <Col sm={3}>
                            <CustomSwitch
                                id='companyUpdatesEmails'
                                checked={this.state.companyUpdatesEmails}
                                onChange={this.handleSwitchToggle}
                            />
                        </Col>
                    </FormGroup>
                    <FormGroup bsSize='lg' controlId='newTasksEmails'>
                        <Col componentClass={ControlLabel} sm={4}>Email alerts when new item in your task bar</Col>
                        <Col sm={3}>
                            <CustomSwitch
                                id='newTasksEmails'
                                checked={this.state.newTasksEmails}
                                onChange={this.handleSwitchToggle}
                            />
                        </Col>
                    </FormGroup>
                    {
                        this.canEdit
                        &&
                        <FormGroup>
                            <Col smOffset={4} sm={2}>
                                <Button 
                                    bsClass='button-primary' 
                                    type='submit'
                                    disabled={this.state.saving}
                                >
                                    {(this.state.saving && !this.state.saved) ? 'Saving...' : 'Save'}
                                </Button>
                            </Col>
                            <Col sm={2}>
                                <Button bsClass='button-secondary' onClick={this.handleCancel}>Cancel</Button>
                            </Col>
                            <ToastContainer autoClose={3000} position={toast.POSITION.TOP_CENTER} />
                        </FormGroup>
                    }
                </Form>
            </Col>
        );
    }
}

PersonalSettings.defaultProps = {
    settings: {
        userId: Meteor.userId(),
        holidayEmails: false,
        companyUpdatesEmails: false,
        newTasksEmails: false
    }
};

export default withTracker(props => {
    const userId = props.userInfo.userId || Meteor.userId();
    const settingsHandle = Meteor.subscribe('personalSettings.user', userId);
    const loading = !settingsHandle.ready();

    return {
        loading,
        settings: PersonalSettingsCollection.findOne()
    };
})(PersonalSettings);