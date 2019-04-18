import React from 'react';
import { Button, Row, Col, Form, FormControl, ControlLabel, FormGroup, HelpBlock } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import CustomSelect from '../CustomSelect';
import FieldGroup from '../FieldGroup';
import DateInput from '../DateInput';

class CompanyDetailsForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            ...props.companyDetails
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleOnSelect = this.handleOnSelect.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }

    handleChange(event) {
        this.setState({ [event.target.id]: event.target.value })
    }

    handleOnSelect(value, stateProp) {
        this.setState({ [stateProp]: value });
    }

    handleSubmit(event) {
        event.preventDefault();

        this.props.onSubmit(this.state);
    }

    handleCancel(event) {
        this.props.onCancel();
    }

    render() {
        return (
            <Col sm={10} style={{ marginTop: '20px' }}>
                <Form horizontal onSubmit={this.handleSubmit}>
                    <FieldGroup
                        id='holidaysToCarry'
                        type='text'
                        label='Holidays to carry forward'
                        onChange={this.handleChange}
                        value={this.state.holidaysToCarry}
                        inputsize={2}
                        offset={2}
                        help={this.props.error && this.props.error.field === 'holidaysToCarry' ? 'This field is required' : ''}
                    />
                    <FieldGroup
                        id='monthsBeforeAlerts'
                        type='text'
                        label='Months before alerts are sent for holidays'
                        onChange={this.handleChange}
                        value={this.state.monthsBeforeAlerts}
                        inputsize={2}
                        offset={2}
                        help={this.props.error && this.props.error.field === 'monthsBeforeAlerts' ? 'This field is required' : ''}
                    />
                    <FormGroup bsSize='lg' controlId='defaultCurrency'>
                        <Col componentClass={ControlLabel} smOffset={2} sm={3}>Default currency</Col>
                        <Col sm={3}>
                            <CustomSelect 
                                value={this.state.defaultCurrency} 
                                options={this.props.currencies}
                                onSelect={value => this.handleOnSelect(value, 'defaultCurrency')}
                                help={this.props.error && this.props.error.field === 'defaultCurrency' ? 'This field is required' : ''}
                            />
                        </Col>
                    </FormGroup>
                    <FormGroup bsSize='lg' controlId='country'>
                        <Col componentClass={ControlLabel} smOffset={2} sm={3}>Country</Col>
                        <Col sm={3}>
                            <CustomSelect 
                                value={this.state.country} 
                                options={this.props.countries}
                                onSelect={value => this.handleOnSelect(value, 'country')}
                                filter
                                dropup
                                help={this.props.error && this.props.error.field === 'country' ? 'This field is required' : ''}
                            />
                        </Col>
                    </FormGroup>
                    <FieldGroup
                        id='defaultProbationWeeks'
                        type='text'
                        label='Default probation weeks'
                        onChange={this.handleChange}
                        value={this.state.defaultProbationWeeks}
                        inputsize={2}
                        offset={2}
                        help={this.props.error && this.props.error.field === 'defaultProbationWeeks' ? 'This field is required' : ''}
                    />
                    <FormGroup bsSize='lg' controlId='country'>
                        <Col componentClass={ControlLabel} smOffset={2} sm={3}></Col>
                        <Col sm={3}>
                            <div><Link className='button-link' to='/public_holidays'>Set public holidays</Link></div>
                            <div><Link className='button-link' to='/company_holidays'>Set company holidays</Link></div>
                            <div><Link className='button-link' to='/blocked_dates'>Blocked dates</Link></div>
                        </Col>
                    </FormGroup>
                    <Row>
                        <Col smOffset={5} sm={6} style={{ fontSize: '18px', marginBottom: '15px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <div style={{ display: 'inline-block', width: '30%' }}>
                                    <label htmlFor='taskAlerts1'>Task alerts 1 (days)</label>
                                    <input 
                                        id='taskAlerts1' 
                                        value={this.state.taskAlerts1} 
                                        type='text' 
                                        className={this.props.error && this.props.error.field === 'taskAlerts1' ? 'input error lg' : 'input lg'} 
                                        onChange={this.handleChange} 
                                    />
                                    <HelpBlock style={{ opacity: this.props.error && this.props.error.field === 'taskAlerts1' ? 1 : 0, fontSize: '14px' }}>This field is required</HelpBlock>
                                </div>
                                <div style={{ display: 'inline-block', width: '30%' }}>
                                    <label htmlFor='taskAlerts2'>Task alerts 2 (days)</label>
                                    <input 
                                        id='taskAlerts2' 
                                        value={this.state.taskAlerts2} 
                                        type='text' 
                                        className={this.props.error && this.props.error.field === 'taskAlerts2' ? 'input error lg' : 'input lg'} 
                                        onChange={this.handleChange} 
                                    />
                                    <HelpBlock style={{ opacity: this.props.error && this.props.error.field === 'taskAlerts2' ? 1 : 0, fontSize: '14px' }}>This field is required</HelpBlock>
                                </div>
                                <div style={{ display: 'inline-block', width: '30%' }}>
                                    <label htmlFor='taskAlerts3'>Task alerts 3 (days)</label>
                                    <input 
                                        id='taskAlerts3' 
                                        value={this.state.taskAlerts3} 
                                        type='text' 
                                        className={this.props.error && this.props.error.field === 'taskAlerts3' ? 'input error lg' : 'input lg'} 
                                        onChange={this.handleChange} 
                                    />
                                    <HelpBlock style={{ opacity: this.props.error && this.props.error.field === 'taskAlerts3' ? 1 : 0, fontSize: '14px' }}>This field is required</HelpBlock>
                                </div>
                            </div>
                        </Col>
                    </Row>
                    <FormGroup>
                        <Col smOffset={5} sm={2}>
                            <Button bsClass='button-primary' type='submit'>Save</Button>
                        </Col>
                        <Col sm={2}>
                            <Button onClick={this.handleCancel} bsClass='button-secondary'>Cancel</Button>
                        </Col>
                    </FormGroup>
                </Form>
            </Col>
        );
    }
}

CompanyDetailsForm.defaultProps = {
    companyDetails: {
        holidaysToCarry: '',
        monthsBeforeAlerts: '',
        defaultCurrency: '',
        country: '',
        defaultProbationWeeks: '',
        taskAlerts1: '',
        taskAlerts2: '',
        taskAlerts3: ''
    }
};

export default CompanyDetailsForm;