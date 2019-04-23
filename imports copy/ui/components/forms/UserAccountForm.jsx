import React from 'react';
import { Grid, Row, Col, FormGroup, FormControl, ControlLabel, HelpBlock, Form, Button, Image as ReactImage } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';

import CustomSelect from '../CustomSelect';
import FieldGroup from '../FieldGroup';
import DateInput from '../DateInput';

const employeesCount = ['1-5', '6-10', '11-15', '16-20', '21-25'];
const paymentFrequencies = ['Per year', 'Per month'];
const statuses = ['Live', 'Expired', 'Trial', 'Trial ended'];

class UserAccountForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            _id: props.business._id,
            name: props.business.name,
            addressLine1: props.business.address ? props.business.address.split('\n')[0] : '',
            addressLine2: props.business.address ? props.business.address.split('\n')[1] : '',
            city: props.business.city || '',
            country: props.business.country || '',
            postcode: props.business.postcode || '',
            employeesCount: props.business.employeesCount || '',
            webAddress: props.business.webAddress || '',
            contactName: props.business.contactName || '',
            email: props.business.email || '',
            startDate: props.business.startDate || '',
            endDate: props.business.endDate || '',
            price: props.business.price || '',
            paymentFrequency: props.business.paymentFrequency ? props.business.paymentFrequency.capitalize() : '',
            status: props.business.status ? props.business.status.split('_').join(' ').capitalize() : '',
            bankAccountNumber: props.business.bank ? props.business.bank.accountNumber : '',
            bankSortCode: props.business.bank ? props.business.bank.sortCode : '',
            bankAccountName: props.business.bank ? props.business.bank.accountName : '',
            bankName: props.business.bank ? props.business.bank.name : '',
            IBAN: props.business.bank ? props.business.bank.IBAN : '',
            swift: props.business.bank ? props.business.bank.swift : '',
            BIC: props.business.bank ? props.business.bank.BIC : '',
            bankAddressLine1: (props.business.bank && props.business.bank.address) ? props.business.bank.address.split('\n')[0] : '',
            bankAddressLine2: (props.business.bank && props.business.bank.address) ? props.business.bank.address.split('\n')[1] : '',
            bankCity: props.business.bank ? props.business.bank.city : '',
            bankCountry: props.business.bank ? props.business.bank.country : '',
            bankPostcode: props.business.bank ? props.business.bank.postcode : '',
            saving: false,
        };
    }

    handleChange = event => {
        event.preventDefault();

        this.setState({ [event.target.id]: event.target.value });
    }

    handleOnSelect = (value, stateProp) => {
        this.setState({ [stateProp]: value });
    }

    handleDateChange = (date, stateProp) => {
        this.setState({ [stateProp]: date });
    }

    handleBlur = event => {
        event.stopPropagation();

        this.setState({ [event.target.id]: event.target.value });
    }

    handleSubmit = event => {
        event.preventDefault();

        this.setState({ saving: true });

        var newBusiness = {
            _id: this.state._id,
            name: this.state.name,
            address: this.state.addressLine1 + '\n' + this.state.addressLine2,
            city: this.state.city,
            country: this.state.country,
            postcode: this.state.postcode,
            employeesCount: this.state.employeesCount,
            webAddress: this.state.webAddress,
            contactName: this.state.contactName,
            email: this.state.email,
            startDate: this.state.startDate,
            endDate: this.state.endDate,
            price: this.state.price,
            paymentFrequency: this.state.paymentFrequency.toLowerCase(),
            status: this.state.status.split(' ').join('_').toLowerCase(),
            bank: {
                accountNumber: this.state.bankAccountNumber,
                sortCode: this.state.bankSortCode,
                accountName: this.state.bankAccountName,
                name: this.state.bankName,
                IBAN: this.state.IBAN,
                swift: this.state.swift,
                BIC: this.state.BIC,
                address: this.state.bankAddressLine1 + '\n' + this.state.bankAddressLine2,
                city: this.state.bankCity,
                country: this.state.bankCountry,
                postcode: this.state.bankPostcode
            }
        };
        
        const methodName = newBusiness._id ? 'businesses.update' : 'businesses.create';

        Meteor.call(methodName, newBusiness, (error, response) => {
            this.setState({ saving: false });

            if (error) {
                switch (error.reason) {
                    case 'DATES_MISMATCH':
                    case 'EMAIL_ALREADY_EXISTS':
                        this.props.onError(error.details);

                        break;
                    case 'MISSING_FIELD':
                        let fieldName = error.details.capitalize();

                        this.props.onError(`${fieldName} is required`);

                        break;
                    default:
                        this.props.onError(error.reason);

                        break;
                }
            } else {
                this.props.onSubmit(newBusiness._id ? 'Business was updated' : 'Business was created');
            }
        });
    }

    render() {
        return (
            <Grid className='user-accounts page' fluid>
                <Row>
                    <Col sm={9}>
                        <Row>
                            <Form
                                horizontal
                                style={{ marginTop: '40px', marginBottom: '25px' }}
                                onSubmit={this.handleSubmit}
                            >
                                <FieldGroup
                                    id='name'
                                    type='text'
                                    label='Business Name'
                                    defaultValue={this.state.name}
                                    onBlur={this.handleBlur}
                                    offset={1}
                                    labelsize={5}
                                    inputsize={5}
                                />
                                <FieldGroup
                                    id='addressLine1'
                                    type='text'
                                    label='Address'
                                    defaultValue={this.state.addressLine1}
                                    onBlur={this.handleBlur}
                                    offset={1}
                                    labelsize={5}
                                    inputsize={5}
                                />
                                <FieldGroup
                                    id='addressLine2'
                                    type='text'
                                    label=''
                                    defaultValue={this.state.addressLine2}
                                    onBlur={this.handleBlur}
                                    offset={1}
                                    labelsize={5}
                                    inputsize={5}
                                />
                                <FieldGroup
                                    id='city'
                                    type='text'
                                    label='City'
                                    defaultValue={this.state.city}
                                    onBlur={this.handleBlur}
                                    offset={1}
                                    labelsize={5}
                                    inputsize={5}
                                />
                                <FormGroup bsSize='lg' controlId='country'>
                                    <Col componentClass={ControlLabel} smOffset={1} sm={5}>Country</Col>
                                    <Col sm={5}>
                                        <CustomSelect
                                            id='country'
                                            value={this.state.country}
                                            options={this.props.countries}
                                            onSelect={value => this.handleOnSelect(value, 'country')}
                                            filter
                                        />
                                    </Col>
                                </FormGroup>
                                <FieldGroup
                                    id='postcode'
                                    type='text'
                                    label='Postcode'
                                    defaultValue={this.state.postcode}
                                    onBlur={this.handleBlur}
                                    offset={1}
                                    labelsize={5}
                                    inputsize={3}
                                />
                                <FormGroup bsSize='lg' controlId='employeesCount'>
                                    <Col componentClass={ControlLabel} smOffset={1} sm={5}>Number of employees (from - to)</Col>
                                    <Col sm={3}>
                                        <CustomSelect
                                            id='employeesCount'
                                            value={this.state.employeesCount}
                                            options={employeesCount}
                                            onSelect={value => this.handleOnSelect(value, 'employeesCount')}
                                        />
                                    </Col>
                                </FormGroup>
                                <FieldGroup
                                    id='webAddress'
                                    type='text'
                                    label='Web address'
                                    defaultValue={this.state.webAddress}
                                    onBlur={this.handleBlur}
                                    offset={1}
                                    labelsize={5}
                                    inputsize={5}
                                />
                                <FieldGroup
                                    id='contactName'
                                    type='text'
                                    label='Contact Name'
                                    defaultValue={this.state.contactName}
                                    onBlur={this.handleBlur}
                                    offset={1}
                                    labelsize={5}
                                    inputsize={5}
                                />
                                <FieldGroup
                                    id='email'
                                    type='email'
                                    label='Email Address'
                                    defaultValue={this.state.email}
                                    onBlur={this.handleBlur}
                                    offset={1}
                                    labelsize={5}
                                    inputsize={5}
                                />
                                <FormGroup bsSize='lg' controlId='startDate'>
                                    <Col componentClass={ControlLabel} smOffset={1} sm={5}>Start Date</Col>
                                    <Col sm={3}>
                                        <DateInput
                                            id='startDate'
                                            selected={this.state.startDate}
                                            onChange={date => this.handleDateChange(date, 'startDate')}
                                        />
                                    </Col>
                                </FormGroup>
                                <FormGroup bsSize='lg' controlId='endDate'>
                                    <Col componentClass={ControlLabel} smOffset={1} sm={5}>End Date</Col>
                                    <Col sm={3}>
                                        <DateInput
                                            id='endDate'
                                            selected={this.state.endDate}
                                            onChange={date => this.handleDateChange(date, 'endDate')}
                                        />
                                    </Col>
                                </FormGroup>
                                <FieldGroup
                                    id='price'
                                    type='text'
                                    label='Price'
                                    defaultValue={this.state.price}
                                    onBlur={this.handleBlur}
                                    offset={1}
                                    labelsize={5}
                                    inputsize={3}
                                />
                                <FormGroup bsSize='lg' controlId='paymentFrequency'>
                                    <Col componentClass={ControlLabel} smOffset={1} sm={5}>Payment Frequency</Col>
                                    <Col sm={5}>
                                        <CustomSelect
                                            id='paymentFrequency'
                                            value={this.state.paymentFrequency}
                                            options={paymentFrequencies}
                                            onSelect={value => this.handleOnSelect(value, 'paymentFrequency')}
                                        />
                                    </Col>
                                </FormGroup>
                                <FormGroup bsSize='lg' controlId='status'>
                                    <Col componentClass={ControlLabel} smOffset={1} sm={5}>Status</Col>
                                    <Col sm={5}>
                                        <CustomSelect
                                            id='status'
                                            value={this.state.status}
                                            options={statuses}
                                            onSelect={value => this.handleOnSelect(value, 'status')}
                                        />
                                    </Col>
                                </FormGroup>
                                <FieldGroup
                                    id='bankAccountNumber'
                                    type='text'
                                    label='Bank Account number'
                                    defaultValue={this.state.bankAccountNumber}
                                    onBlur={this.handleBlur}
                                    offset={1}
                                    labelsize={5}
                                    inputsize={5}
                                />
                                <FieldGroup
                                    id='bankSortCode'
                                    type='text'
                                    label='Sort code'
                                    defaultValue={this.state.bankSortCode}
                                    onBlur={this.handleBlur}
                                    offset={1}
                                    labelsize={5}
                                    inputsize={3}
                                />
                                <FieldGroup
                                    id='bankAccountName'
                                    type='text'
                                    label='Account Name'
                                    defaultValue={this.state.bankAccountName}
                                    onBlur={this.handleBlur}
                                    offset={1}
                                    labelsize={5}
                                    inputsize={5}
                                />
                                <FieldGroup
                                    id='bankName'
                                    type='text'
                                    label='Bank Name'
                                    defaultValue={this.state.bankName}
                                    onBlur={this.handleBlur}
                                    offset={1}
                                    labelsize={5}
                                    inputsize={5}
                                />
                                <FieldGroup
                                    id='IBAN'
                                    type='text'
                                    label='IBAN'
                                    defaultValue={this.state.IBAN}
                                    onBlur={this.handleBlur}
                                    offset={1}
                                    labelsize={5}
                                    inputsize={5}
                                />
                                <FieldGroup
                                    id='swift'
                                    type='text'
                                    label='Swift'
                                    defaultValue={this.state.swift}
                                    onBlur={this.handleBlur}
                                    offset={1}
                                    labelsize={5}
                                    inputsize={5}
                                />
                                <FieldGroup
                                    id='BIC'
                                    type='text'
                                    label='BIC'
                                    defaultValue={this.state.BIC}
                                    onBlur={this.handleBlur}
                                    offset={1}
                                    labelsize={5}
                                    inputsize={5}
                                />
                                <FormGroup bsSize='lg' controlId='bankAddressHeading'>
                                    <Col componentClass={ControlLabel} smOffset={1} sm={5} style={{ fontWeight: 'bold' }}>Bank Address</Col>
                                </FormGroup>
                                <FieldGroup
                                    id='bankAddressLine1'
                                    type='text'
                                    label='Line 1'
                                    defaultValue={this.state.bankAddressLine1}
                                    onBlur={this.handleBlur}
                                    offset={1}
                                    labelsize={5}
                                    inputsize={5}
                                />
                                <FieldGroup
                                    id='bankAddressLine2'
                                    type='text'
                                    label='Line 2'
                                    defaultValue={this.state.bankAddressLine2}
                                    onBlur={this.handleBlur}
                                    offset={1}
                                    labelsize={5}
                                    inputsize={5}
                                />
                                <FieldGroup
                                    id='bankCity'
                                    type='text'
                                    label='City'
                                    defaultValue={this.state.bankCity}
                                    onBlur={this.handleBlur}
                                    offset={1}
                                    labelsize={5}
                                    inputsize={5}
                                />
                                <FormGroup bsSize='lg' controlId='bankCountry'>
                                    <Col componentClass={ControlLabel} smOffset={1} sm={5}>Country</Col>
                                    <Col sm={5}>
                                        <CustomSelect
                                            id='bankCountry'
                                            value={this.state.bankCountry}
                                            options={this.props.countries}
                                            onSelect={value => this.handleOnSelect(value, 'bankCountry')}
                                            filter
                                            dropup
                                        />
                                    </Col>
                                </FormGroup>
                                <FieldGroup
                                    id='bankPostcode'
                                    type='text'
                                    label='Postcode'
                                    defaultValue={this.state.bankPostcode}
                                    onBlur={this.handleBlur}
                                    offset={1}
                                    labelsize={5}
                                    inputsize={3}
                                />
                                <FormGroup>
                                    <Col smOffset={6} sm={3}>
                                        <Button
                                            bsClass='button-primary'
                                            type='submit'
                                            disabled={this.state.saving}
                                        >
                                            {this.state.saving ? 'Saving...' : 'Save'}
                                        </Button>
                                    </Col>
                                    <Col sm={3}>
                                        <Button onClick={this.props.onClose} bsClass='button-secondary'>Cancel</Button>
                                    </Col>
                                </FormGroup>
                            </Form>
                        </Row>
                    </Col>
                </Row>
                <ToastContainer autoClose={3000} position={toast.POSITION.TOP_CENTER} />                
            </Grid>
        );
    }
}

UserAccountForm.defaultProps = {
    business: {
        name: '',
        addressLine1: '',
        addressLine2: '',
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
        bankAccountNumber: '',
        bankSortCode: '',
        bankAccountName: '',
        bankName: '',
        IBAN: '',
        swift: '',
        BIC: '',
        bankAddressLine1: '',
        bankAddressLine2: '',
        bankCity: '',
        bankCountry: '',
        bankPostcode: '',
    }
}

export default UserAccountForm;