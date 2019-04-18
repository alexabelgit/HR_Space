import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import React from 'react';
import { Grid, Row, Col, Button } from 'react-bootstrap';

import CompanyDetailsForm from '../components/forms/CompanyDetailsForm';

import CompanyDetailsCollection from '../../api/collections/companyDetails';
import Currencies from '../../api/collections/currencies';
import Countries from '../../api/collections/countries';

class CompanyDetails extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            error: null
        };

        this.submitCallback = this.submitCallback.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }

    componentDidMount() {
        var nodes = document.querySelectorAll('html, div#root');

        nodes.forEach(node => node.style.background = '#ffffff');
    }

    submitCallback(error, response) {
        if (error) {
            switch (error.reason) {
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
            this.props.history.push('/dashboard');
        }
    }

    handleSubmit(details) {
        var businessId = Meteor.user().profile.businessId;

        if (details._id) Meteor.call('companyDetails.update', details, this.submitCallback);
        else Meteor.call('companyDetails.create', { business: businessId, ...details }, this.submitCallback);
    }

    handleCancel() {
        this.props.history.goBack();
    }

    render() {
        return (
            <Grid className='company-details page' fluid>
                <Row>
                    <Col sm={12}>
                        <h1>Company details</h1>
                        {
                            this.props.loading ?
                                <div style={{ fontSize: '20px', fontWeight: 'bold', opacity: 0.5, margin: '15px' }}>Loading...</div>
                                :
                                <CompanyDetailsForm
                                    onSubmit={this.handleSubmit}
                                    onCancel={this.handleCancel}
                                    companyDetails={this.props.companyDetails}
                                    currencies={this.props.currencies}
                                    countries={this.props.countries}
                                    error={this.state.error}
                                />
                        }
                    </Col>
                </Row>
            </Grid>
        );
    }
}

export default withTracker(() => {
    const businessId = Meteor.user().profile.businessId;
    const detailsHandle = Meteor.subscribe('companyDetails.businessId', businessId);
    const currenciesHandle = Meteor.subscribe('currencies.all');
    const countriesHandle = Meteor.subscribe('countries.all');
    const loading = !detailsHandle.ready() || !currenciesHandle.ready() || !countriesHandle.ready();

    return {
        loading,
        companyDetails: CompanyDetailsCollection.findOne({ business: businessId }),
        currencies: Currencies.find({}, { sort: { name: 1 } }).fetch(),
        countries: Countries.find().map(country => country.name),
    };
})(CompanyDetails);