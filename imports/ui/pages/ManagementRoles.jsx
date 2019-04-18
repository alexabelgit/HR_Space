import React from 'react';
import { Grid, Row, Col, Button } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { toast, ToastContainer } from 'react-toastify';

import { AbsenceTypes as AbsenceTypesCollection } from '../../api/collections/absenceTypes';

import ManagementRolesTable from '../components/tables/ManagementRolesTable';

import { Random } from 'meteor/random';
import ManagerPermissions from '../../api/collections/managementRoles';

class ManagementRoles extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            managementRoles: [
                // {
                //     _id: Random.id(),
                //     section: 'Profile public',
                //     view: true,
                //     update: true
                // },
                // {
                //     _id: Random.id(),
                //     section: 'Profile private',
                //     view: true,
                //     update: true
                // },
                {
                    _id: Random.id(),
                    section: 'Job details',
                    field: 'job',
                    view: !!(props.permissions && props.permissions.jobView),
                    update: !!(props.permissions && props.permissions.jobEdit),
                },
                {
                    _id: Random.id(),
                    section: 'Compensation',
                    field: 'compensation',
                    view: !!(props.permissions && props.permissions.compensationView),
                    update: !!(props.permissions && props.permissions.compensationEdit),
                },
                {
                    _id: Random.id(),
                    section: 'HR Documents',
                    field: 'hrDocuments',
                    view: !!(props.permissions && props.permissions.hrDocumentsView),
                    update: !!(props.permissions && props.permissions.hrDocumentsEdit),
                },
                // {
                //     _id: Random.id(),
                //     section: 'Other absence',
                //     view: true,
                //     update: true
                // },
                // {
                //     _id: Random.id(),
                //     section: 'Holiday allocation',
                //     view: true,
                //     update: true
                // },
                // {
                //     _id: Random.id(),
                //     section: 'Days carried forward',
                //     view: true,
                //     update: true
                // },
                // {
                //     _id: Random.id(),
                //     section: 'Upload documents for a direct',
                //     view: true,
                //     update: true
                // },
                // {
                //     _id: Random.id(),
                //     section: 'Medical facts',
                //     view: true,
                //     update: true
                // },
                // {
                //     _id: Random.id(),
                //     section: 'Start date',
                //     view: true,
                //     update: true
                // }
            ]
        };

        this.handleSwitchToggle = this.handleSwitchToggle.bind(this);
    }

    componentDidMount() {
        var nodes = document.querySelectorAll('html, div#root');

        nodes.forEach(node => node.style.background = '#ffffff');
    }

    componentWillReceiveProps(nextProps) {
        const managementRoles = this.state.managementRoles.slice();

        managementRoles.forEach(role => {
            if (role.field === 'job') {
                role.view = !!(nextProps.permissions && nextProps.permissions.jobView);
                role.update = !!(nextProps.permissions && nextProps.permissions.jobEdit);
            } else if (role.field === 'compensation') {
                role.view = !!(nextProps.permissions && nextProps.permissions.compensationView);
                role.update = !!(nextProps.permissions && nextProps.permissions.compensationEdit);
            } else if (role.field === 'hrDocuments') {
                role.view = !!(nextProps.permissions && nextProps.permissions.hrDocumentsView);
                role.update = !!(nextProps.permissions && nextProps.permissions.hrDocumentsEdit);
            }
        });

        this.setState({ managementRoles });
    }

    handleSwitchToggle({ rowId, view, update }) {
        var newManagementRolesArr = this.state.managementRoles.slice();

        newManagementRolesArr.map((role, index) => {
            if (role._id === rowId) {
                newManagementRolesArr[index] = { ...newManagementRolesArr[index], view, update };
            }
        });

        this.setState({ managementRoles: newManagementRolesArr });
    }

    handleSave = () => {
        const methodName = this.props.permissions.length ? 'managerPermissions.update' : 'managerPermissions.create';

        const job = this.state.managementRoles.find(role => role.field === 'job');
        const compensation = this.state.managementRoles.find(role => role.field === 'compensation');
        const hrDocuments = this.state.managementRoles.find(role => role.field === 'hrDocuments');
        const args = {
            jobView: job.view,
            jobEdit: job.update,
            compensationView: compensation.view,
            compensationEdit: compensation.update,
            hrDocumentsView: hrDocuments.view,
            hrDocumentsEdit: hrDocuments.update,
        }

        Meteor.call(methodName, args, (error, result) => {
            if (error) {
                toast.error('Error saving roles');
            } else {
                toast.success('Saved');
            }
        });
    }

    render() {
        return (
            <Grid className='management-roles page' fluid>
                <Row>
                    <Col sm={9}>
                        <Row>
                            <Col sm={5}>
                                <h2>Management Roles</h2>
                            </Col>
                            <ManagementRolesTable
                                data={this.state.managementRoles}
                                handleSwitchToggle={this.handleSwitchToggle}
                            />
                            <Col sm={12} style={{ marginTop: '25px' }}>
                                <Row>
                                    <Col smOffset={3} sm={3}>
                                        <Button type='submit' bsClass='button-primary' onClick={this.handleSave}>Save</Button>
                                    </Col>
                                    <Col sm={3}>
                                        <Button bsClass='button-secondary'>Cancel</Button>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <ToastContainer autoClose={3000} position={toast.POSITION.TOP_CENTER} />
            </Grid>
        );
    }
}

export default withTracker(props => {
    const managerPermissions = Meteor.subscribe('managerPermissions');
    const loading = !managerPermissions.ready();

    return {
        loading,
        permissions: ManagerPermissions.findOne(),
    }
})(ManagementRoles);