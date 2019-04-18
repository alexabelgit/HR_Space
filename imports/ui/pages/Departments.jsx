import React from 'react';
import { Grid, Row, Col, Button } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

import DepartmentsCollection from '../../api/collections/departments';

import DropdownDataTable from '../components/tables/DropdownDataTable';
import DropdownDataForm from '../components/forms/DropdownDataForm';

class Departments extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            departmentForm: null,
            error: null
        };

        this.openDropdownDataForm = this.openDropdownDataForm.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSubmitAndStay = this.handleSubmitAndStay.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleDepartmentEdit = this.handleDepartmentEdit.bind(this);
        this.handleDepartmentDelete = this.handleDepartmentDelete.bind(this);
        this.submitCallback = this.submitCallback.bind(this);
        this.submitAndStayCallback = this.submitAndStayCallback.bind(this);
    }

    componentDidMount() {
        var nodes = document.querySelectorAll('html, div#root');

        nodes.forEach(node => node.style.background = '#ffffff');
    }

    openDropdownDataForm(event) {
        event.preventDefault();

        this.setState({
            departmentForm: {
                name: ''
            }
        });
    }

    submitCallback(error, response) {
        if (error) {
            switch (error.reason) {
                case 'DUPLICATE_DOCUMENT':
                    setTimeout(() => this.setState({ error: null }), 3000);

                    this.setState({ error: { field: 'name', message: error.details } });
                    break;
                case 'MISSING_FIELD':
                    let fieldName = error.details.capitalize();
    
                    setTimeout(() => this.setState({ error: null }), 3000);
                    
                    this.setState({ error: { field: error.details, message: `${fieldName} is required` }});
                    break
                default:
                    setTimeout(() => this.setState({ error: null }), 3000);

                    this.setState({ error: { field: '', message: error.reason } });
                    break;
            }
        } else {
            this.setState({ departmentForm: null });
        }
    }

    submitAndStayCallback(error, response) {
        if (error) {
            switch (error.reason) {
                case 'DUPLICATE_DOCUMENT':
                    setTimeout(() => this.setState({ error: null }), 3000);

                    this.setState({ error: { field: 'name', message: error.details } });
                    break;
                case 'MISSING_FIELD':
                    let fieldName = error.details.capitalize();
    
                    setTimeout(() => this.setState({ error: null }), 3000);
                    
                    this.setState({ error: { field: error.details, message: `${fieldName} is required` }});
                    break
                default:
                    setTimeout(() => this.setState({ error: null }), 3000);

                    this.setState({ error: { field: '', message: error.reason } });
                    break;
            }
        }
    }

    handleSubmit(department) {
        var index = this.props.departments.findIndex(item => item._id === department._id);

        if (index === -1) Meteor.call('departments.create', department, this.submitCallback);
        else Meteor.call('departments.update', department, this.submitCallback);
    }

    handleSubmitAndStay(department) {
        var index = this.props.departments.findIndex(item => item._id === department._id);

        if (index === -1) Meteor.call('departments.create', department, this.submitAndStayCallback);
        else Meteor.call('departments.update', department, this.submitAndStayCallback);
    }

    handleCancel() {
        this.setState({ departmentForm: null });
    }

    handleDepartmentEdit(department) {
        this.setState({ departmentForm: department });
    }

    handleDepartmentDelete(department) {
        Meteor.call('departments.remove', department, this.submitCallback);
    }

    render() {
        return (
            <Grid className='departments page' fluid>
                <Row>
                    <Col sm={9}>
                        <Row>
                            <Col sm={5}>
                                <h2>{!this.state.departmentForm ? 'Departments' :
                                    this.state.departmentForm.name ? 'Edit department' : 'Add department'}</h2>
                            </Col>
                            <Col sm={3}>
                                {
                                    !this.state.departmentForm
                                    &&
                                    <Button
                                        onClick={this.openDropdownDataForm}
                                        bsClass='button-primary'
                                        style={{ marginTop: '20px', marginBottom: '10px' }}
                                    >
                                        Add department
                                    </Button>
                                }
                            </Col>
                            {
                                this.state.departmentForm ?
                                    <DropdownDataForm
                                        dataType='department'
                                        data={this.state.departmentForm}
                                        onSubmit={this.handleSubmit}
                                        onSubmitAndStay={this.handleSubmitAndStay}
                                        onClose={this.handleCancel}
                                        error={this.state.error}
                                    />
                                    :
                                    <DropdownDataTable
                                        dataType='department'
                                        data={this.props.departments}
                                        onDataEdit={this.handleDepartmentEdit}
                                        onDataDelete={this.handleDepartmentDelete}
                                    />
                            }
                        </Row>
                    </Col>
                </Row>
            </Grid>
        );
    }
}

export default withTracker(() => {
    const handle = Meteor.subscribe('departments.all');
    const loading = !handle.ready();

    return {
        loading,
        departments: DepartmentsCollection.find().fetch()
    }
})(Departments);