import React from 'react';
import { Grid, Row, Col, Button } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

import EmploymentTypesCollection from '../../api/collections/employmentTypes';

import DropdownDataTable from '../components/tables/DropdownDataTable';
import DropdownDataForm from '../components/forms/DropdownDataForm';

class EmploymentTypes extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            employmentTypeForm: null,
            error: null
        };

        this.openDropdownDataForm = this.openDropdownDataForm.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSubmitAndStay = this.handleSubmitAndStay.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleEmploymentTypeEdit = this.handleEmploymentTypeEdit.bind(this);
        this.handleEmploymentTypeDelete = this.handleEmploymentTypeDelete.bind(this);
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
            employmentTypeForm: {
                _id: '',
                name: '',
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
            this.setState({ employmentTypeForm: null });
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

    handleSubmit(employmentType) {
        var index = this.props.employmentTypes.findIndex(item => item._id === employmentType._id);

        if (index === -1) Meteor.call('employmentTypes.create', employmentType, this.submitCallback);
        else Meteor.call('employmentTypes.update', employmentType, this.submitCallback);
    }

    handleSubmitAndStay(employmentType) {
        var index = this.props.employmentTypes.findIndex(item => item._id === employmentType._id);

        if (index === -1) Meteor.call('employmentTypes.create', employmentType, this.submitAndStayCallback);
        else Meteor.call('employmentTypes.update', employmentType, this.submitAndStayCallback);
    }

    handleCancel() {
        this.setState({ employmentTypeForm: null });
    }

    handleEmploymentTypeEdit(employmentType) {
        this.setState({ employmentTypeForm: employmentType });
    }

    handleEmploymentTypeDelete(employmentType) {
        Meteor.call('employmentTypes.remove', employmentType, this.submitCallback);
    }

    render() {
        return (
            <Grid className='employment-types page' fluid>
                <Row>
                    <Col sm={9}>
                        <Row>
                            <Col sm={5}>
                                <h2>{!this.state.employmentTypeForm ? 'Employment types' :
                                    this.state.employmentTypeForm.name ? 'Edit employment type' : 'Add employment type'}</h2>
                            </Col>
                            <Col sm={3}>
                                {
                                    !this.state.employmentTypeForm
                                    &&
                                    <Button
                                        onClick={this.openDropdownDataForm}
                                        bsClass='button-primary'
                                        style={{ marginTop: '20px', marginBottom: '10px' }}
                                    >
                                        Add employment type
                                    </Button>
                                }
                            </Col>
                            {
                                this.state.employmentTypeForm ?
                                    <DropdownDataForm
                                        dataType='employment type'
                                        data={this.state.employmentTypeForm}
                                        onSubmit={this.handleSubmit}
                                        onSubmitAndStay={this.handleSubmitAndStay}
                                        onClose={this.handleCancel}
                                        error={this.state.error}
                                    />
                                    :
                                    <DropdownDataTable
                                        dataType='employment type'
                                        data={this.props.employmentTypes}
                                        onDataEdit={this.handleEmploymentTypeEdit}
                                        onDataDelete={this.handleEmploymentTypeDelete}
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
    const handle = Meteor.subscribe('employmentTypes.all');
    const loading = !handle.ready();

    return {
        loading,
        employmentTypes: EmploymentTypesCollection.find().fetch()
    }
})(EmploymentTypes);