import React from 'react';
import { Grid, Row, Col, Button } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

import BenefitTypesCollection from '../../api/collections/benefitTypes';

import DropdownDataTable from '../components/tables/DropdownDataTable';
import DropdownDataForm from '../components/forms/DropdownDataForm';

class BenefitTypes extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            benefitTypeForm: null,
            error: null
        };

        this.openDropdownDataForm = this.openDropdownDataForm.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSubmitAndStay = this.handleSubmitAndStay.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleBenefitTypeEdit = this.handleBenefitTypeEdit.bind(this);
        this.handleBenefitTypeDelete = this.handleBenefitTypeDelete.bind(this);
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
            benefitTypeForm: {
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
            this.setState({ benefitTypeForm: null });
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

    handleSubmit(benefitType) {
        var index = this.props.benefitTypes.findIndex(item => item._id === benefitType._id);

        if (index === -1) Meteor.call('benefitTypes.create', benefitType, this.submitCallback);
        else Meteor.call('benefitTypes.update', benefitType, this.submitCallback);
    }

    handleSubmitAndStay(benefitType) {
        var index = this.props.benefitTypes.findIndex(item => item._id === benefitType._id);

        if (index === -1) Meteor.call('benefitTypes.create', benefitType, this.submitAndStayCallback);
        else Meteor.call('benefitTypes.update', benefitType, this.submitAndStayCallback);
    }

    handleCancel() {
        this.setState({ benefitTypeForm: null });
    }

    handleBenefitTypeEdit(benefitType) {
        this.setState({ benefitTypeForm: benefitType });
    }

    handleBenefitTypeDelete(benefitType) {
        Meteor.call('benefitTypes.remove', benefitType, this.submitCallback);
    }

    render() {
        return (
            <Grid className='benefit-types page' fluid>
                <Row>
                    <Col sm={9}>
                        <Row>
                            <Col sm={5}>
                                <h2>{!this.state.benefitTypeForm ? 'Benefit types' :
                                    this.state.benefitTypeForm.name ? 'Edit benefit type' : 'Add benefit type'}</h2>
                            </Col>
                            <Col sm={3}>
                                {
                                    !this.state.benefitTypeForm
                                    &&
                                    <Button
                                        onClick={this.openDropdownDataForm}
                                        bsClass='button-primary'
                                        style={{ marginTop: '20px', marginBottom: '10px' }}
                                    >
                                        Add benefit type
                                    </Button>
                                }
                            </Col>
                            {
                                this.state.benefitTypeForm ?
                                    <DropdownDataForm
                                        dataType='benefit type'
                                        data={this.state.benefitTypeForm}
                                        onSubmit={this.handleSubmit}
                                        onSubmitAndStay={this.handleSubmitAndStay}
                                        onClose={this.handleCancel}
                                        error={this.state.error}
                                    />
                                    :
                                    <DropdownDataTable
                                        dataType='benefit type'
                                        data={this.props.benefitTypes}
                                        onDataEdit={this.handleBenefitTypeEdit}
                                        onDataDelete={this.handleBenefitTypeDelete}
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
    const handle = Meteor.subscribe('benefitTypes.all');
    const loading = !handle.ready();

    return {
        loading,
        benefitTypes: BenefitTypesCollection.find({}, { sort: { name: 1 } }).fetch()
    }
})(BenefitTypes);