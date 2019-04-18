import React from 'react';
import { Grid, Row, Col, Button } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

import BenefitsInKindTypes from '../../api/collections/benefitsInKindTypes';

import DropdownDataTable from '../components/tables/DropdownDataTable';
import DropdownDataForm from '../components/forms/DropdownDataForm';

class BenefitsInKind extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            benefitInKindType: null,
            error: null
        };

        this.openDropdownDataForm = this.openDropdownDataForm.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSubmitAndStay = this.handleSubmitAndStay.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleBenefitInKindEdit = this.handleBenefitInKindEdit.bind(this);
        this.handleBenefitInkindDelete = this.handleBenefitInkindDelete.bind(this);
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
            benefitInKindType: {
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
            this.setState({ benefitInKindType: null });
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

    handleSubmit(benefitInKindType) {
        var index = this.props.benefitsInKindTypes.findIndex(item => item._id === benefitInKindType._id);

        if (index === -1) Meteor.call('benefitsInKindTypes.create', benefitInKindType, this.submitCallback);
        else Meteor.call('benefitsInKindTypes.update', benefitInKindType, this.submitCallback);
    }

    handleSubmitAndStay(benefitInKindType) {
        var index = this.props.benefitsInKindTypes.findIndex(item => item._id === benefitInKindType._id);

        if (index === -1) Meteor.call('benefitsInKindTypes.create', benefitInKindType, this.submitAndStayCallback);
        else Meteor.call('benefitsInKindTypes.update', benefitInKindType, this.submitAndStayCallback);
    }

    handleCancel() {
        this.setState({ benefitInKindType: null });
    }

    handleBenefitInKindEdit(benefitInKindType) {
        this.setState({ benefitInKindType: benefitInKindType });
    }

    handleBenefitInkindDelete(benefitInKindType) {
        Meteor.call('benefitsInKindTypes.remove', benefitInKindType, this.submitCallback);
    }

    render() {
        return (
            <Grid className='benefits-in-kind page' fluid>
                <Row>
                    <Col sm={9}>
                        <Row>
                            <Col sm={5}>
                                <h2>{!this.state.benefitInKindType ? 'Benefits in kind' :
                                    this.state.benefitInKindType.name ? 'Edit benefit in kind' : 'Add benefit in kind'}</h2>
                            </Col>
                            <Col sm={3}>
                                {
                                    !this.state.benefitInKindType
                                    &&
                                    <Button
                                        onClick={this.openDropdownDataForm}
                                        bsClass='button-primary'
                                        style={{ marginTop: '20px', marginBottom: '10px' }}
                                    >
                                        Add benefit in kind
                                    </Button>
                                }
                            </Col>
                            {
                                this.state.benefitInKindType ?
                                    <DropdownDataForm
                                        dataType='benefit in kind'
                                        data={this.state.benefitInKindType}
                                        onSubmit={this.handleSubmit}
                                        onSubmitAndStay={this.handleSubmitAndStay}
                                        onClose={this.handleCancel}
                                        error={this.state.error}
                                    />
                                    :
                                    <DropdownDataTable
                                        dataType='benefit in kind'
                                        data={this.props.benefitsInKindTypes}
                                        onDataEdit={this.handleBenefitInKindEdit}
                                        onDataDelete={this.handleBenefitInkindDelete}
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
    const handle = Meteor.subscribe('benefitsInKindTypes.all');
    const loading = !handle.ready();

    return {
        loading,
        benefitsInKindTypes: BenefitsInKindTypes.find().fetch()
    }
})(BenefitsInKind);