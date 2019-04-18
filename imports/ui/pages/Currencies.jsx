import React from 'react';
import { Grid, Row, Col, Button } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

import CurrenciesCollection from '../../api/collections/currencies';

import DropdownDataTable from '../components/tables/DropdownDataTable';
import DropdownDataForm from '../components/forms/DropdownDataForm';

class Currencies extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currencyForm: null,
            error: null
        };

        this.openDropdownDataForm = this.openDropdownDataForm.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSubmitAndStay = this.handleSubmitAndStay.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleCurrencyEdit = this.handleCurrencyEdit.bind(this);
        this.handleCurrencyDelete = this.handleCurrencyDelete.bind(this);
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
            currencyForm: {
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
            this.setState({ currencyForm: null });
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

    handleSubmit(currency) {
        var index = this.props.currencies.findIndex(item => item._id === currency._id);

        if (index === -1) Meteor.call('currencies.create', currency, this.submitCallback);
        else Meteor.call('currencies.update', currency, this.submitCallback);
    }

    handleSubmitAndStay(currency) {
        var index = this.props.currencies.findIndex(item => item._id === currency._id);

        if (index === -1) Meteor.call('currencies.create', currency, this.submitAndStayCallback);
        else Meteor.call('currencies.update', currency, this.submitAndStayCallback);
    }

    handleCancel() {
        this.setState({ currencyForm: null });
    }

    handleCurrencyEdit(currency) {
        this.setState({ currencyForm: currency });
    }

    handleCurrencyDelete(currency) {
        Meteor.call('currencies.remove', currency, this.submitCallback);
    }

    render() {
        return (
            <Grid className='currencies page' fluid>
                <Row>
                    <Col sm={9}>
                        <Row>
                            <Col sm={5}>
                                <h2>{!this.state.currencyForm ? 'Currencies' :
                                    this.state.currencyForm.name ? 'Edit currency' : 'Add currency'}</h2>
                            </Col>
                            <Col sm={3}>
                                {
                                    !this.state.currencyForm
                                    &&
                                    <Button
                                        onClick={this.openDropdownDataForm}
                                        bsClass='button-primary'
                                        style={{ marginTop: '20px', marginBottom: '10px' }}
                                    >
                                        Add currency
                                    </Button>
                                }
                            </Col>
                            {
                                this.state.currencyForm ?
                                    <DropdownDataForm
                                        dataType='currency'
                                        data={this.state.currencyForm}
                                        onSubmit={this.handleSubmit}
                                        onSubmitAndStay={this.handleSubmitAndStay}
                                        onClose={this.handleCancel}
                                        error={this.state.error}
                                    />
                                    :
                                    <DropdownDataTable
                                        dataType='currency'
                                        data={this.props.currencies}
                                        onDataEdit={this.handleCurrencyEdit}
                                        onDataDelete={this.handleCurrencyDelete}
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
    const handle = Meteor.subscribe('currencies.all');
    const loading = !handle.ready();

    return {
        loading,
        currencies: CurrenciesCollection.find({}, { sort: { name: 1 } }).fetch()
    }
})(Currencies);