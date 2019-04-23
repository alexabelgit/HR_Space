import React from 'react';
import classnames from 'classnames';
import { Row, Col, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';

import DateInput from './DateInput';

class InstitutionGroup extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    // handleChange = (educationId, prop, value) => this.props.onChange(educationId, prop, value);
    handleChange = event => {
        event.preventDefault();

        const { education, onChange } = this.props;

        education[event.target.id] = event.target.value;

        onChange(education);
    }
    
    handleDateChange = (date, key) => {
        const { education, onChange } = this.props;

        education[key] = date;

        onChange(education);
    }

    render() {
        const fromDateLabelWrapperStyle = { 
            display: 'inline-block', 
            marginLeft: '0', 
            paddingLeft: '15px', 
            paddingRight: '15px', 
            marginRight: '0', 
            paddingLeft: '15px', 
            paddingRight: '15px', 
            // verticalAlign: this.props.help && (this.props.help.field === 'startDate') ? 'top' : 'middle', 
            verticalAlign: 'middle', 
            width: '33.33333333%',
        };

        const fromDateLabelStyle = { 
            float: 'right', 
            verticalAlign: 'middle', 
            fontSize: '18px',
            // paddingTop: this.props.help && (this.props.help.field === 'startDate') ? '11px' : 0,
            paddingTop: 0,
        };

        const toDateLabelStyle = { 
            paddingLeft: '10px', 
            // verticalAlign: this.props.help && (this.props.help.field === 'startDate') ? 'top' : 'middle', 
            verticalAlign: 'middle', 
            fontSize: '18px',
            // paddingTop: this.props.help && (this.props.help.field === 'startDate') ? '11px' : 0,
            paddingTop: 0,
        };

        const { disabled } = this.props;

        return (
            <Row>
                <Col sm={12}>
                    <FormGroup bsSize='lg' controlId='institutionName'>
                        <Col componentClass={ControlLabel} sm={4}>Name of School/College/University</Col>
                        <Col sm={5}>
                            <FormControl
                                id='institutionName'
                                type='text' 
                                bsClass='input lg'
                                // defaultValue={this.props.institutionName}
                                value={this.props.education.institutionName}
                                // onBlur={e => this.handleChange(this.props._id, 'institutionName', e.target.value)}
                                onChange={this.handleChange}
                                disabled={disabled}
                            />
                        </Col>
                    </FormGroup>
                    <div style={{ marginLeft: '-15px', marginRight: '-15px', marginBottom: '15px' }}>
                        <div style={fromDateLabelWrapperStyle}>
                            <label htmlFor='startDate' style={fromDateLabelStyle}>From</label>
                        </div>
                        <div style={{ display: 'inline-block', marginLeft: '0', paddingLeft: '15px', paddingRight: '15px', marginRight: '0', paddingLeft: '15px', paddingRight: '15px', verticalAlign: 'middle', width: '41.66666667%' }}>
                            <DateInput 
                                id='startDate' 
                                // onChange={date => this.handleChange(this.props._id, 'startDate', date)} 
                                onChange={this.handleDateChange} 
                                // selected={this.props.startDate} 
                                selected={this.props.education.startDate} 
                                wrapperStyle={{ width: '45%' }}
                                disabled={disabled}
                            />
                            <label htmlFor='endDate' style={toDateLabelStyle}>To</label>
                            <DateInput 
                                id='endDate' 
                                // onChange={date => this.handleChange(this.props._id, 'endDate', date)} 
                                onChange={this.handleDateChange} 
                                // selected={this.props.endDate} 
                                selected={this.props.education.endDate} 
                                // minDate={this.props.startDate}
                                minDate={this.props.education.startDate}
                                wrapperStyle={{ width: '45%', float: 'right' }} 
                                disabled={disabled}
                            />
                        </div>
                    </div>
                    <FormGroup bsSize='lg' controlId='qualifications'>
                        <Col componentClass={ControlLabel} sm={4}>Qualifications</Col>
                        <Col sm={5}>
                            <FormControl 
                                id='qualifications'
                                // defaultValue={this.props.qualifications}
                                value={this.props.education.qualifications}
                                // onBlur={e => this.handleChange(this.props._id, 'qualifications', e.target.value)}
                                onChange={this.handleChange}
                                componentClass='textarea' 
                                rows={7} 
                                bsClass='input'
                                disabled={disabled}
                            />
                        </Col>
                    </FormGroup>
                    <div className='custom-divider' style={{ marginBottom: '15px' }}></div>
                </Col>
            </Row>
        );
    }
}

export default InstitutionGroup;