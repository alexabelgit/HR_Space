import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import React from 'react';
import { Grid, Row, Col, Button } from 'react-bootstrap';

import HRPoliciesTable from '../components/tables/HRPoliciesTable';
import HRPolicyForm from '../components/forms/HRPolicyForm';

import SmartCustomSelect from '../components/SmartCustomSelect';
import ErrorAlert from '../components/ErrorAlert';

import HRPoliciesCollection from '../../api/collections/hrPolicies';
import BusinessesCollection from '../../api/collections/businesses';

class HRPolicies extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            policyForm: null,
            error: null,
            filter: 'Filter by client',
            copyTo: 'Copy to',
            selected: []
        };

        this.openPolicyForm = this.openPolicyForm.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handlePolicyEdit = this.handlePolicyEdit.bind(this);
        this.handlePolicyDelete = this.handlePolicyDelete.bind(this);
        this.handleOnSelect = this.handleOnSelect.bind(this);
        this.submitCallback = this.submitCallback.bind(this);
        this.handleCopy = this.handleCopy.bind(this);
        this.handleRowsSelect = this.handleRowsSelect.bind(this);
        this.handleRowsDeselect = this.handleRowsDeselect.bind(this);
    }

    componentDidMount() {
        var nodes = document.querySelectorAll('html, div#root');

        nodes.forEach(node => node.style.background = '#ffffff');
    }

    openPolicyForm(event) {
        event.preventDefault();

        const isSuperAdmin = Roles.userIsInRole(Meteor.userId(), 'super_admin');

        this.setState({
            policyForm: {
                _id: '',
                name: '',
                summary: '',
                details: '',
                isActive: true,
                access: 'all',
                 business: isSuperAdmin ? '' : Meteor.user().profile.businessId,
                //business: '',
            }
        });
    }

    submitCallback(error, response) {
        if (error) {
            if (error.reason === 'MISSING_FIELD') {
                let fieldName = error.details.capitalize();

                setTimeout(() => this.setState({ error: null }), 3000);
                
                this.setState({ error: { field: error.details, message: `${fieldName} is required` }});
            } else {
                setTimeout(() => this.setState({ error: null }), 3000);

                this.setState({ error: { field: '', message: error.reason } });
            }
        } else {
            this.setState({ policyForm: null });
        }
    }

    handleSubmit(policy) {
        var index = this.props.policies.findIndex(item => item._id === policy._id);

        if (index === -1) Meteor.call('hrPolicies.create', policy, this.submitCallback);
        else Meteor.call('hrPolicies.update', policy, this.submitCallback);
    }

    handleCancel() {
        this.setState({ policyForm: null });
    }

    handlePolicyEdit(policy) {
        this.setState({ policyForm: policy });
    }

    handlePolicyDelete(policyId) {
        Meteor.call('hrPolicies.remove', policyId, this.submitCallback);
    }

    handleOnSelect(value, stateProp) {
        this.setState({ [stateProp]: value });
    }

    handleCopy(event) {
        Meteor.call('copyPolicy', { policies: this.state.selected, business: this.state.copyTo }, (error, response) => {
            if (error) {
                console.log(error);

                setTimeout(() => this.setState({ error: null }), 3000);

                this.setState({ error: error.reason });
            }

            this.setState({ selected: [] });

            this.table.cleanSelected();
        });
    }

    handleRowsSelect(rows) {
        this.setState({ selected: this.state.selected.concat(rows) });
    }

    handleRowsDeselect(rows) {
        var selected = this.state.selected.filter(row => rows.indexOf(row) === -1);

        this.setState({ selected });
    }

    handleOrderDecrement = policy => {
        Meteor.call('hrPolicies.decrementOrder', policy, (error, response) => {
            if (error) {
                toast.error(error.reason);
            }
        });
    }

    handleOrderIncrement = policy => {
        Meteor.call('hrPolicies.incrementOrder', policy, (error, response) => {
            if (error) {
                toast.error(error.reason);
            }
        });
    }

    render() {
        const filteredPolicies = (this.props.businesses && this.state.filter === 'Filter by client' || this.state.filter === 'all') ?
            this.props.policies :
            this.props.policies.filter(item => item.business === this.state.filter) || this.props.policies;

        return (
            <Grid className='hr-policies page' fluid>
                <Row>
                    <Col sm={10}>
                        <Row>
                            <Col sm={5}>
                                <h2>{!this.state.policyForm ? 'HR Policies' : 'Manage HR Policies'}</h2>
                            </Col>
                            <Col smOffset={4} sm={3}>
                                {
                                    !this.state.policyForm
                                    &&
                                    <Button
                                        onClick={this.openPolicyForm}
                                        bsClass='button-primary'
                                        style={{ marginTop: '20px', marginBottom: '10px' }}
                                    >
                                        Add new policy
                                    </Button>
                                }
                            </Col>
                            {
                                !this.state.policyForm
                                &&
                                <Col sm={4} style={{ marginBottom: '15px' }}>
                                    <Row>
                                        <Col sm={3}>
                                            <span style={{ lineHeight: '40px', fontSize: '18px' }}>Filter</span>
                                        </Col>
                                        <Col sm={9}>
                                            <SmartCustomSelect
                                                id='businessFilter'
                                                option={this.state.filter}
                                                placeholder={this.state.filter}
                                                options={[{ _id: 'all', name: 'All' }].concat(this.props.businesses)}
                                                onSelect={value => this.handleOnSelect(value, 'filter')}
                                                style={{ height: '40px', padding: '5px 8px', fontSize: '14px' }}
                                            />
                                        </Col>
                                    </Row>
                                </Col>
                            }
                            {
                                this.state.policyForm ?
                                    <HRPolicyForm 
                                        businesses={this.props.businesses}
                                        policy={this.state.policyForm} 
                                        onSubmit={this.handleSubmit} 
                                        onClose={this.handleCancel} 
                                        error={this.state.error}
                                    />
                                    :
                                    <HRPoliciesTable
                                        data={filteredPolicies}
                                        onPolicyEdit={this.handlePolicyEdit}
                                        onPolicyDelete={this.handlePolicyDelete}
                                        onRowsSelect={this.handleRowsSelect}
                                        onRowsDeselect={this.handleRowsDeselect}
                                        getRef={node => this.table = node}
                                        onOrderDecrement={this.handleOrderDecrement}
                                        onOrderIncrement={this.handleOrderIncrement}
                                    />
                            }
                            {
                                (!this.state.policyForm && Roles.userIsInRole(Meteor.userId(), 'super_admin')) //говнокод
                                &&
                                <Col smOffset={7} sm={5} style={{ marginTop: '15px' }}>
                                    <Row>
                                        <Col sm={6} style={{ lineHeight: '42px' }}>
                                            <SmartCustomSelect
                                                id='copyToBusiness'
                                                option={this.state.copyTo}
                                                placeholder={this.state.copyTo}
                                                options={this.props.businesses}
                                                onSelect={value => this.handleOnSelect(value, 'copyTo')}
                                                style={{ height: '42px', padding: '5px 8px', fontSize: '14px' }}
                                            />
                                        </Col>
                                        <Col sm={6}>
                                            <Button 
                                                onClick={this.handleCopy} 
                                                bsClass='button-primary'
                                                disabled={this.state.copyTo === 'Copy to' || !this.state.selected.length}
                                            >
                                                Copy
                                            </Button>
                                        </Col>
                                    </Row>
                                </Col>
                            }
                            <ErrorAlert text={this.state.error} visible={!!this.state.error} />
                        </Row>
                    </Col>
                </Row>
            </Grid>
        );
    }
}

export default withTracker(props => {
    // const businessId = 'test_business'; // тут має бути Meteor.user().profile.businessId, або шось таке
    const businessId = Meteor.user().profile.businessId; // шось таке

    var isSuperAdmin = Roles.userIsInRole(Meteor.userId(), 'super_admin'); //говнокод, потім поміняти!

    // const policiesHandle = Meteor.subscribe('hrPolicies.all');
    const policiesHandle = Meteor.subscribe(isSuperAdmin ? 'hrPolicies.all' : 'hrPolicies.business');
    const businessesHandle = Meteor.subscribe('businesses.dropdown');
    const loading = !policiesHandle.ready() || !businessesHandle.ready();

    return {
        loading,
        policies: HRPoliciesCollection.find(isSuperAdmin ? {} : { business: businessId }).fetch(),
        businesses: BusinessesCollection.find({}, { sort: { name: 1 } }).fetch()
    };
})(HRPolicies);