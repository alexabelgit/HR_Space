import React from 'react';
import { Grid, Row, Col, FormGroup, FormControl, ControlLabel, HelpBlock, Form, Button, Image as ReactImage } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { ToastContainer, toast } from 'react-toastify';

import UserAccountForm from '../components/forms/UserAccountForm';
import UserAccountsTable from '../components/tables/UserAccountsTable';

import Countries from '../../api/collections/countries';
import Businesses from '../../api/collections/businesses';

class UserAccounts extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            userAccountForm: null,
            saving: false
        };
    }

    componentDidMount() {
        var nodes = document.querySelectorAll('html, div#root');

        nodes.forEach(node => node.style.background = '#ffffff');
    }

    openUserAccountForm = event => {
        event.preventDefault();

        this.setState({
            userAccountForm: {
                name: '',
                address: '',
                city: '',
                country: '',
                postcode: '',
                employeesCount: '',
                webAddress: '',
                contactName: '',
                email: '',
                startDate: new Date(0),
                endDate: new Date(0),
                price: '',
                paymentFrequency: '',
                status: '',
                bank: {
                    accountNumber: '',
                    sortCode: '',
                    accountName: '',
                    name: '',
                    IBAN: '',
                    swift: '',
                    BIC: '',
                    address: '',
                    city: '',
                    country: '',
                    postcode: '',
                }
            }
        });
    }

    handleCancel = () => {
        this.setState({ userAccountForm: null });
    }

    handleUserAccountEdit = userAccount => {
        this.setState({ userAccountForm: userAccount });
    }

    handleSubmit = message => {
        toast.success(message);

        this.setState({ userAccountForm: null });
    }

    handleError = message => {
        toast.error(message);
    }

    render() {
        return (
            <Grid className='user-accounts page' fluid>
                <Row>
                    <Col sm={10}>
                        <Row>
                            <Col sm={5}>
                                <h2>{!this.state.userAccountForm ? 'User Accounts' : 'Manage User Account'}</h2>
                            </Col>
                            <Col smOffset={4} sm={3}>
                            {
                                <Button
                                    onClick={this.state.userAccountForm ? this.handleCancel : this.openUserAccountForm}
                                    bsClass='button-primary'
                                    style={{ marginTop: '20px', marginBottom: '10px' }}
                                >
                                    {this.state.userAccountForm ? 'Back' : 'Add new user account'}
                                </Button>
                            }
                            </Col>
                            {
                                this.state.userAccountForm ?
                                    <UserAccountForm 
                                        business={this.state.userAccountForm}
                                        countries={this.props.countries}
                                        onSubmit={this.handleSubmit} 
                                        onClose={this.handleCancel} 
                                        onError={this.handleError}
                                    />
                                    :
                                    <UserAccountsTable
                                        data={this.props.businesses}
                                        onUserAccountEdit={this.handleUserAccountEdit}
                                        onUserAccountDelete={this.handleUserAccountDelete}
                                    />
                            }
                        </Row>
                    </Col>
                </Row>
                <ToastContainer autoClose={3000} position={toast.POSITION.TOP_CENTER} />
            </Grid>
        );
    }
}

export default withTracker(() => {
    const countriesHandle = Meteor.subscribe('countries.all');
    const businessesHandle = Meteor.subscribe('businesses.all');
    const loading = !countriesHandle.ready() || !businessesHandle.ready();

    return {
        loading,
        countries: Countries.find().map(country => country.name),
        businesses: Businesses.find({}, { sort: { name: 1 } }).fetch(),
    };
})(UserAccounts);