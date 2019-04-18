import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Row, Col, FormGroup, FormControl, ControlLabel, HelpBlock, Form, Button, Image as ReactImage } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { withTracker } from 'meteor/react-meteor-data';
import { ToastContainer, toast } from 'react-toastify';

import Countries from '../../../../api/collections/countries';
import BankInfo from '../../../../api/collections/user_info/bankInfo';

import CustomSelect from '../../CustomSelect';
import FieldGroup from '../../FieldGroup';

class BankForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            ...props.bankInfo,
            saving: false,
        };

        this.handleOnSelect = this.handleOnSelect.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleBankAddressChange = this.handleBankAddressChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ 
            ...nextProps.bankInfo, 
            bankCountry: nextProps.bankInfo.bankAddress && nextProps.bankInfo.bankAddress.country 
        });
    }

    handleOnSelect(value) {
        this.setState({ bankCountry: value });
    }

    handleChange(event) {
        this.setState({ [event.target.id]: event.target.value });
    }

    handleBankAddressChange(event) {
        var newBankAddress = Object.assign({}, this.state.bankAddress);

        switch (event.target.id) {
            case 'bankAddressLine1':
                newBankAddress.line1 = event.target.value;
                break;
            case 'bankAddressLine2':
                newBankAddress.line2 = event.target.value;
                break;
            case 'bankAddressCity':
                newBankAddress.city = event.target.value;
                break;
            case 'bankAddressCountry':
                newBankAddress.country = event.target.value;
                break;
            case 'bankAddressPostcode':
                newBankAddress.postcode = event.target.value;
                break;
            case 'bankAddressTaxCode':
                newBankAddress.taxCode = event.target.value;
                break;
            default:
                break;
        }

        this.setState({ newBankAddress });
    }

    handleSubmit(event) {
        event.preventDefault();

        this.setState({ saving: true });

        const bankInfo = {
            _id: this.state._id,
            userId: this.state.userId,
            accountNumber: this.accountNumber.value.trim(),
            sortCode: this.sortCode.value.trim(),
            accountName: this.accountName.value.trim(),
            bankName: this.bankName.value.trim(),
            IBAN: this.IBAN.value.trim(),
            Swift: this.Swift.value.trim(),
            BIC: this.BIC.value.trim(),
            bankAddress: {
                line1: this.bankAddressLine1.value.trim(),
                line2: this.bankAddressLine2.value.trim(),
                city: this.bankAddressCity.value.trim(),
                country: this.state.bankCountry,
                postcode: this.bankAddressPostcode.value.trim(),
                taxCode: this.bankAddressTaxCode.value.trim()
            }
        };

        Meteor.call('bankInfo.update', bankInfo, (error, response) => {
            if (error) {
                toast.error(error.reason);

                this.setState({ saving: false });
            } else {
                toast.success('Saved');

                this.setState({ saving: false });
            }
        });
    }

    canEdit = this.props.userInfo.userId === Meteor.userId();

    render() {
        return (
            <Form horizontal onSubmit={this.handleSubmit} key={this.state._id}>
                <h2 style={{ marginTop: '40px', marginBottom: '25px' }}>Bank</h2>
                <FieldGroup
                    id='accountNumber'
                    type='text'
                    label='Bank Account number'
                    defaultValue={this.state.accountNumber}
                    onBlur={this.handleChange}
                    inputRef={ref => this.accountNumber = ref}
                    disabled={!this.canEdit}
                />
                <FieldGroup
                    id='sortCode'
                    type='text'
                    label='Sort code'
                    inputsize={3}
                    defaultValue={this.state.sortCode}
                    onBlur={this.handleChange}
                    inputRef={ref => this.sortCode = ref}
                    disabled={!this.canEdit}
                />
                <FieldGroup
                    id='accountName'
                    type='text'
                    label='Account Name'
                    defaultValue={this.state.accountName}
                    onBlur={this.handleChange}
                    inputRef={ref => this.accountName = ref}
                    disabled={!this.canEdit}
                />
                <FieldGroup
                    id='bankName'
                    type='text'
                    label='Bank Name'
                    defaultValue={this.state.bankName}
                    onBlur={this.handleChange}
                    inputRef={ref => this.bankName = ref}
                    disabled={!this.canEdit}
                />
                <FieldGroup
                    id='IBAN'
                    type='text'
                    label='IBAN'
                    defaultValue={this.state.IBAN}
                    onBlur={this.handleChange}
                    inputRef={ref => this.IBAN = ref}
                    disabled={!this.canEdit}
                />
                <FieldGroup
                    id='Swift'
                    type='text'
                    label='Swift'
                    defaultValue={this.state.Swift}
                    onBlur={this.handleChange}
                    inputRef={ref => this.Swift = ref}
                    disabled={!this.canEdit}
                />
                <FieldGroup
                    id='BIC'
                    type='text'
                    label='BIC'
                    defaultValue={this.state.BIC}
                    onBlur={this.handleChange}
                    inputRef={ref => this.BIC = ref}
                    disabled={!this.canEdit}
                />
                <FormGroup bsSize='lg' controlId='labelbankadress'>
                    <Col componentClass={ControlLabel} sm={3} style={{ fontWeight: 'bold' }}>Bank Address</Col>
                    <Col sm={4}></Col>
                </FormGroup>
                <FieldGroup
                    id='bankAddressLine1'
                    type='text'
                    label='Line 1'
                    defaultValue={this.state.bankAddress.line1}
                    onBlur={this.handleBankAddressChange}
                    inputRef={ref => this.bankAddressLine1 = ref}
                    disabled={!this.canEdit}
                />
                <FieldGroup
                    id='bankAddressLine2'
                    type='text'
                    label='Line 2'
                    defaultValue={this.state.bankAddress.line2}
                    onBlur={this.handleBankAddressChange}
                    inputRef={ref => this.bankAddressLine2 = ref}
                    disabled={!this.canEdit}
                />
                <FieldGroup
                    id='bankAddressCity'
                    type='text'
                    label='City'
                    defaultValue={this.state.bankAddress.city}
                    onBlur={this.handleBankAddressChange}
                    inputRef={ref => this.bankAddressCity = ref}
                    disabled={!this.canEdit}
                />
                <FormGroup bsSize='lg' controlId='bankAddressCountry'>
                    <Col componentClass={ControlLabel} sm={3}>Country</Col>
                    <Col sm={4}>
                        <CustomSelect 
                            id='country'
                            value={this.state.bankCountry} 
                            options={this.props.countries} 
                            onSelect={this.handleOnSelect} 
                            textAlign='left'
                            filter
                            dropup 
                    disabled={!this.canEdit}
                    />
                    </Col>
                </FormGroup>
                <FieldGroup
                    id='bankAddressPostcode'
                    type='text'
                    label='Postcode'
                    inputsize={2}
                    defaultValue={this.state.bankAddress.postcode}
                    onBlur={this.handleBankAddressChange}
                    inputRef={ref => this.bankAddressPostcode = ref}
                    disabled={!this.canEdit}
                />
                <FieldGroup
                    id='bankAddressTaxCode'
                    type='text'
                    label='Tax code'
                    defaultValue={this.state.bankAddress.taxCode}
                    onBlur={this.handleBankAddressChange}
                    inputRef={ref => this.bankAddressTaxCode = ref}
                    disabled={!this.canEdit}
                />
                {
                    this.canEdit
                    &&
                    <FormGroup>
                        <Col smOffset={3} sm={2}>
                            <Button 
                                bsClass='button-primary' 
                                type='submit'
                                disabled={this.state.saving}
                            >
                                {this.state.saving ? 'Saving...' : 'Save'}
                            </Button>
                        </Col>
                        <Col sm={2}>
                            <Button bsClass='button-secondary'>Cancel</Button>
                        </Col>
                    </FormGroup>
                }
                <ToastContainer autoClose={3000} position={toast.POSITION.TOP_CENTER} />
            </Form>
        );
    }
}

BankForm.defaultProps = {
    bankInfo: {
        _id: '',
        userId: Meteor.userId(),
        accountNumber: '',
        sortCode: '',
        accountName: '',
        bankName: '',
        IBAN: '',
        Swift: '',
        BIC: '',
        bankAddress: {
            line1: '',
            line2: '',
            city: '',
            country: '',
            postcode: '',
            taxCode: ''
        },
        bankCountry: ''
    }
};

export default withTracker(props => {
    const userId = props.userInfo.userId || Meteor.userId();
    const countriesHandle = Meteor.subscribe('countries.all');
    const bankInfoHandle = Meteor.subscribe('bankInfo.user', userId);
    const loading = !countriesHandle.ready() || !bankInfoHandle.ready();

    return {
        loading,
        countries: Countries.find().map(country => country.name),
        bankInfo: BankInfo.findOne({ userId })
    };
})(BankForm);