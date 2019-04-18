import React from 'react';
import { Grid, Row, Col, Button } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

import AbsenceTypesCollection from '../../api/collections/absenceTypes';

import AbsenceTypesTable from '../components/tables/AbsenceTypesTable';
import AbsenceTypeForm from '../components/forms/AbsenceTypeForm';

class AbsenceTypes extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            absenceTypeForm: null,
            error: null
        };

        this.openAbsenceTypeForm = this.openAbsenceTypeForm.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSubmitAndStay = this.handleSubmitAndStay.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleAbsenceTypeEdit = this.handleAbsenceTypeEdit.bind(this);
        this.handleAbsenceTypeDelete = this.handleAbsenceTypeDelete.bind(this);
        this.submitCallback = this.submitCallback.bind(this);
        this.submitAndStayCallback = this.submitAndStayCallback.bind(this);
    }

    componentDidMount() {
        var nodes = document.querySelectorAll('html, div#root');

        nodes.forEach(node => node.style.background = '#ffffff');
    }

    openAbsenceTypeForm(event) {
        event.preventDefault();

        this.setState({
            absenceTypeForm: {
                _id: '',
                type: '',
                sicknessIdentifier: false,
                selfCertification: false
            }
        });
    }

    submitCallback(error, response) {
        if (error) {
            switch (error.reason) {
                case 'DUPLICATE_DOCUMENT':
                    setTimeout(() => this.setState({ error: null }), 3000);

                    this.setState({ error: { field: 'type', message: error.details } });
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
            this.setState({ absenceTypeForm: null });
        }
    }

    submitAndStayCallback(error, response) {
        if (error) {
            switch (error.reason) {
                case 'DUPLICATE_DOCUMENT':
                    setTimeout(() => this.setState({ error: null }), 3000);

                    this.setState({ error: { field: 'type', message: error.details } });
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

    handleSubmit(absenceType) {
        var index = this.props.absenceTypes.findIndex(type => type._id === absenceType._id);

        if (index === -1) Meteor.call('absenceTypes.create', absenceType, this.submitCallback);
        else Meteor.call('absenceTypes.update', absenceType, this.submitCallback);
    }

    handleSubmitAndStay(absenceType) {
        var index = this.props.absenceTypes.findIndex(type => type._id === absenceType._id);

        if (index === -1) Meteor.call('absenceTypes.create', absenceType, this.submitAndStayCallback);
        else Meteor.call('absenceTypes.update', absenceType, this.submitAndStayCallback);
    }

    handleCancel() {
        this.setState({ absenceTypeForm: null });
    }

    handleAbsenceTypeEdit(absenceType) {
        this.setState({ absenceTypeForm: absenceType });
    }

    handleAbsenceTypeDelete(absenceType) {
        Meteor.call('absenceTypes.remove', absenceType, this.submitCallback);
    }

    render() {
        return (
            <Grid className='absence-types page' fluid>
                <Row>
                    <Col sm={9}>
                        <Row>
                            <Col sm={5}>
                                <h2>{!this.state.absenceTypeForm ? 'Absence types' :
                                    this.state.absenceTypeForm.name ? 'Edit absence type' : 'Add absence types'}</h2>
                            </Col>
                            <Col smOffset={4} sm={3}>
                                {
                                    !this.state.absenceTypeForm
                                    &&
                                    <Button
                                        onClick={this.openAbsenceTypeForm}
                                        bsClass='button-primary'
                                        style={{ marginTop: '20px', marginBottom: '10px' }}
                                    >
                                        Add absence type
                                    </Button>
                                }
                            </Col>
                            {
                                this.state.absenceTypeForm ?
                                    <AbsenceTypeForm
                                        absenceType={this.state.absenceTypeForm}
                                        onSubmit={this.handleSubmit}
                                        onSubmitAndStay={this.handleSubmitAndStay}
                                        onClose={this.handleCancel}
                                        error={this.state.error}
                                    />
                                    :
                                    <AbsenceTypesTable
                                        data={this.props.absenceTypes}
                                        onAbsenceTypeEdit={this.handleAbsenceTypeEdit}
                                        onAbsenceTypeDelete={this.handleAbsenceTypeDelete} 
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
    const handle = Meteor.subscribe('absenceTypes.all');
    const loading = !handle.ready();

    return {
        loading,
        absenceTypes: AbsenceTypesCollection.find().fetch()
    }
})(AbsenceTypes);