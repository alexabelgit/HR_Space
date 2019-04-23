import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import React from 'react';
import { Row, Col, FormGroup, FormControl, ControlLabel, HelpBlock, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import moment from 'moment';

import FieldGroup from '../../FieldGroup';
import CustomSwitch from '../../CustomSwitch';
import CustomSelect from '../../CustomSelect';
import Select from '../../Select';
import DateInput from '../../DateInput';

import EmploymentTypes from '../../../../api/collections/employmentTypes';
import Departments from '../../../../api/collections/departments';
import Teams from '../../../../api/collections/teams';
import WorkingPatterns from '../../../../api/collections/workingPatterns';
import Job from '../../../../api/collections/user_info/job';
import Summary from '../../../../api/collections/user_info/summary';
import ManagerPermissions from '../../../../api/collections/managementRoles';
import { Roles } from 'meteor/alanning:roles';

const accesses = ['Admin', 'Employee', 'Hr', 'Manager'];

class JobForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            ...props.job,
            saving: false,
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSwitchToggle = this.handleSwitchToggle.bind(this);
        this.handleOnSelect = this.handleOnSelect.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ ...nextProps.job });
    }

    handleChange(event) {
        event.preventDefault();

        this.setState({ [event.target.id]: event.target.value });
    }

    handleSwitchToggle(event) {
        if (event.target.id === 'isManager') {
            this.setState({ [event.target.id]: !this.state[event.target.id], access: 'Manager' });
        } else if ((event.target.id === 'workPermit') && this.state.workPermit) {
            this.setState({ [event.target.id]: !this.state[event.target.id], dateOfExpiry: new Date(0) });
        } else {
            this.setState({ [event.target.id]: !this.state[event.target.id] });
        }
    }

    handleOnSelect(value, stateProp) {
        this.setState({ [stateProp]: value });
    }

    handleDateChange(date, stateProp) {
        var newState = { [stateProp]: date };

        if (stateProp === 'dateOfExpiry') {
            if (this.state.workPermit && (date <= this.state.startDate)) {
                toast.error('Date of expiry cannot be on the same day or before the start date');
            } else {
                this.setState(newState);
            }
        } else if (stateProp === 'startDate' && (this.state.probationEndDate <= date)) {
            if (this.state.workPermit && (this.state.dateOfExpiry <= date)) {
                toast.error('Date of expiry cannot be on the same day or before the start date');
            } else {
                newState.probationEndDate = moment(date).add(1, 'day').toDate();

                this.setState(newState);
            }
        } else {
            this.setState(newState);
        }
    }

    handleCancel(event) {
        this.props.history.push('/dashboard');
    }

    handleSubmit(event) {
        event.preventDefault();

        this.setState({ saving: true });

        var { saving, ...jobInfo } = this.state;

        jobInfo.access = jobInfo.access.toLowerCase();

        console.log(jobInfo);

        Meteor.call('job.update', jobInfo, (error, response) => {
            if (error) {
                toast.error(error.reason);

                this.setState({ saving: false });
            } else {
                toast.success('Saved');

                this.setState({ saving: false });
            }
        });
    }

    hasPermission() {
        if (this.props.userInfo.userId === Meteor.userId()) {
            return true;
        }

        const { permissions } = this.props;

        if (permissions.length) {
            const { jobEdit } = permissions[0];

            return jobEdit;
        }

        return false;
    }

    isMyTeam() {
        return this.props.managersTeam && this.props.managersTeam.includes(this.props.userInfo.userId);
    }

    render() {
        var lengthOfService = (moment(new Date()).diff(moment(this.state.startDate), 'days') / 365).toFixed(2);
        const isAdmin = Roles.userIsInRole(Meteor.userId(), 'admin');
        console.log(this.isMyTeam());

        return (
            <Form horizontal onSubmit={this.handleSubmit}>
                <h2 style={{ marginTop: '40px', marginBottom: '25px' }}>Job</h2>
                <FieldGroup
                    id='title'
                    offset={1}
                    labelsize={3}
                    label='Job Title'
                    type='text'
                    inputsize={4}
                    value={this.state.title}
                    onChange={this.handleChange}
                    disabled={!((this.isMyTeam() && this.hasPermission()) || isAdmin)}
                />
                {
                    isAdmin
                    &&
                    <FormGroup bsSize='lg' controlId='isManager'>
                        <Col componentClass={ControlLabel} sm={4}>Manager</Col>
                        <Col sm={4}>
                            <CustomSwitch 
                                id='isManager' 
                                checked={this.state.isManager} 
                                onChange={this.handleSwitchToggle} 
                            />
                        </Col>
                    </FormGroup>
                }
                {/* <FormGroup bsSize='lg' controlId='managerName'>
                    <Col componentClass={ControlLabel} sm={4}>Managers Name</Col>
                    <Col sm={4}>
                        <CustomSelect
                            textAlign='left' 
                            id='managerName'
                            options={managers} 
                            value={this.state.managerName}
                            onSelect={value => this.handleOnSelect(value, 'managerName')} 
                        />
                    </Col>
                </FormGroup> */}
                <FormGroup bsSize='lg' controlId='employeeType'>
                    <Col componentClass={ControlLabel} sm={4}>Employee Type</Col>
                    <Col sm={4}>
                        <CustomSelect
                            textAlign='left' 
                            id='employeeType'
                            options={this.props.employmentTypes} 
                            value={this.state.employeeType}
                            onSelect={value => this.handleOnSelect(value, 'employeeType')} 
                            disabled={!((this.isMyTeam() && this.hasPermission()) || isAdmin)}
                        />
                    </Col>
                </FormGroup>
                <FormGroup bsSize='lg' controlId='department'>
                    <Col componentClass={ControlLabel} sm={4}>Department</Col>
                    <Col sm={4}>
                        <CustomSelect
                            textAlign='left' 
                            id='department'
                            options={this.props.departments} 
                            value={this.state.department}
                            onSelect={value => this.handleOnSelect(value, 'department')} 
                            disabled={!((this.isMyTeam() && this.hasPermission()) || isAdmin)}
                        />
                    </Col>
                </FormGroup>
                <FormGroup bsSize='lg' controlId='team'>
                    <Col componentClass={ControlLabel} sm={4}>Team</Col>
                    <Col sm={4}>
                        <Select
                            id='team'
                            options={this.props.teams} 
                            selected={this.state.team}
                            onSelect={value => this.handleOnSelect(value, 'team')} 
                            disabled={!((this.isMyTeam() && this.hasPermission()) || isAdmin)}
                        />
                    </Col>
                </FormGroup>
                <FormGroup bsSize='lg' controlId='startDate'>
                    <Col componentClass={ControlLabel} sm={4}>Start date</Col>
                    <Col sm={4}>
                        <DateInput 
                            id='startDate' 
                            selected={this.state.startDate} 
                            onChange={date => this.handleDateChange(date, 'startDate')} 
                            disabled={!((this.isMyTeam() && this.hasPermission()) || isAdmin)}
                        />
                    </Col>
                </FormGroup>
                <FormGroup bsSize='lg' controlId='probationEndDate'>
                    <Col componentClass={ControlLabel} sm={4}>End of probation date</Col>
                    <Col sm={4}>
                        <DateInput 
                            id='probationEndDate' 
                            selected={this.state.probationEndDate} 
                            onChange={date => this.handleDateChange(date, 'probationEndDate')} 
                            minDate={moment(this.state.startDate).add(1, 'day')}
                            disabled={!((this.isMyTeam() && this.hasPermission()) || isAdmin)}
                        />
                    </Col>
                </FormGroup>
                <Row>
                    <Col sm={12}>
                        <FormGroup bsSize='lg'>
                            <Col componentClass={ControlLabel} smOffset={1} sm={3}>
                                Length of service
                            </Col>
                            <Col sm={3}>
                                <div className='input lg' style={{ cursor: 'default' }}>
                                {
                                    ((+this.state.startDate === 0) || (this.state.startDate > new Date())) ? '0 Years' : 
                                        (+lengthOfService >= 2) ?
                                            (lengthOfService + ' Years') :
                                            (lengthOfService + ' Year')
                                }
                                </div>
                            </Col>
                        </FormGroup>
                    </Col>
                </Row>
                <FormGroup bsSize='lg' controlId='terminationDate'>
                    <Col componentClass={ControlLabel} sm={4}>Termination date</Col>
                    <Col sm={4}>
                        <DateInput 
                            id='terminationDate' 
                            selected={this.state.terminationDate} 
                            onChange={date => this.handleDateChange(date, 'terminationDate')} 
                    disabled={!((this.isMyTeam() && this.hasPermission()) || isAdmin)}
                        />
                    </Col>
                </FormGroup>
                <FieldGroup
                    id='annualLeaveEntitlement'
                    offset={1}
                    labelsize={3}
                    label='Annual Leave Entitlement'
                    type='text'
                    inputsize={2}
                    value={this.state.annualLeaveEntitlement}
                    onChange={this.handleChange}
                    numbersOnly
                    disabled={!((this.isMyTeam() && this.hasPermission()) || isAdmin)}
                />
                <FormGroup bsSize='lg' controlId='workPermit'>
                    <Col componentClass={ControlLabel} sm={4}>Work Permit or Visa required</Col>
                    <Col sm={4}>
                        <CustomSwitch 
                            id='workPermit' 
                            checked={this.state.workPermit} 
                            onChange={this.handleSwitchToggle} 
                    disabled={!((this.isMyTeam() && this.hasPermission()) || isAdmin)}
                        />
                    </Col>
                </FormGroup>
                <FormGroup bsSize='lg' controlId='dateOfExpiry'>
                    <Col componentClass={ControlLabel} sm={4}>Date of expiry</Col>
                    <Col sm={4}>
                        <DateInput 
                            id='dateOfExpiry' 
                            selected={this.state.dateOfExpiry} 
                            onChange={date => this.handleDateChange(date, 'dateOfExpiry')} 
                            disabled={!this.state.workPermit || isAdmin}
                        />
                    </Col>
                </FormGroup>
                <FormGroup bsSize='lg' controlId='workingPattern'>
                    <Col componentClass={ControlLabel} sm={4}>Working pattern</Col>
                    <Col sm={4}>
                        <Select
                            id='workingPattern'
                            options={this.props.workingPatterns} 
                            selected={this.state.workingPattern}
                            onSelect={value => this.handleOnSelect(value, 'workingPattern')} 
                            disabled={!((this.isMyTeam() && this.hasPermission()) || isAdmin)}
                        />
                    </Col>
                </FormGroup>
                {
                    isAdmin
                    &&
                    <FormGroup bsSize='lg' controlId='access'>
                        <Col componentClass={ControlLabel} sm={4}>Access</Col>
                        <Col sm={4}>
                            <CustomSelect
                                textAlign='left' 
                                id='access'
                                options={accesses} 
                                value={this.state.access ? this.state.access.capitalize() : 'Employee'}
                                dropup 
                                onSelect={value => this.handleOnSelect(value, 'access')} 
                                disabled={!((this.isMyTeam() && this.hasPermission()) || isAdmin)}
                            />
                        </Col>
                    </FormGroup>
                }
                
                <FieldGroup
                    id='disability'
                    offset={1}
                    labelsize={3}
                    label='Any work related disability'
                    inputsize={4}
                    type='textarea'
                    value={this.state.disability}
                    onChange={this.handleChange}
                    disabled={!((this.isMyTeam() && this.hasPermission()) || isAdmin)}
                />
                {
                    isAdmin
                    &&
                    <FormGroup>
                        <Col smOffset={4} sm={2}>
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
                <ToastContainer autoClose={3000} position={toast.POSITION.TOP_CENTER} />
            </Form>
        );
    }
}

JobForm.defaultProps = {
    job: {
        userId: Meteor.userId(),
        title: '',
        isManager: false,
        managerName: '',
        employeeType: '',
        department: '',
        team: '',
        startDate: new Date(0),
        probationEndDate: new Date(0),
        lengthOfService: '',
        terminationDate: new Date(0),
        annualLeaveEntitlement: 1,
        workPermit: false,
        dateOfExpiry: new Date(0),
        workingPattern: '',
        access: '',
        disability: ''
    },
};

export default withTracker(props => {
    const userId = props.userInfo.userId || Meteor.userId();
    const dropdownsHandle = Meteor.subscribe('jobFormDropdowns.businessId', userId);
    const managerPermissionsHandler = Meteor.subscribe('managerPermissions');
    const managersTeam = Meteor.subscribe('managersTeam');
    const jobHandle = Meteor.subscribe('job.user', userId);
    const loading = !dropdownsHandle.ready() || !jobHandle.ready() || !managerPermissionsHandler.ready() || !managersTeam.ready();

    return {
        loading,
        employmentTypes: EmploymentTypes.find({}, { sort: { name: 1 } }).fetch(),
        departments: Departments.find({}, { sort: { name: 1 } }).fetch(),
        teams: Teams.find({}, { sort: { name: 1 } }).fetch(),
        workingPatterns: WorkingPatterns.find({}, { fields: { name: 1 } }).fetch(),
        job: Job.findOne({ userId }),
        permissions: ManagerPermissions.find().fetch(),
        managersTeam: Summary.find({ userId: { $ne: Meteor.userId() } }).map(summary => summary.userId),
    };
})(JobForm);