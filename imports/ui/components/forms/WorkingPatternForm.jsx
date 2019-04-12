import React from 'react';
import { Button, Row, Col, Form, ControlLabel, FormGroup } from 'react-bootstrap';

import CustomSwitch from '../CustomSwitch';
import FieldGroup from '../FieldGroup';

const isNumeric = n => !isNaN(parseFloat(n)) && isFinite(n);

class WorkingPatternForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            ...props.workingPattern
        };
    }

    handleChange = event => {
        this.setState({ [event.target.id]: event.target.value })
    }

    handleSwitchToggle = event => {
        this.setState({ [event.target.id]: !this.state[event.target.id] });
    }

    handleSubmit = event => {
        event.preventDefault();

        this.props.onSubmit({
            _id: this.state._id,
            name: this.name.value.trim(),
            isActive: this.active.checked,
            weekHours: [
                +this.sun.value,
                +this.mon.value,
                +this.tue.value,
                +this.wed.value,
                +this.thu.value,
                +this.fri.value,
                +this.sat.value,
            ]
        });
    }

    handleKeyPress = event => {
        if (!isNumeric(event.key) || (+(event.target.value.toString() + event.key) > 24)) {
            event.preventDefault();
        }
    }

    handlePaste = event => {
        const value = event.clipboardData.getData('Text');

        if (!isNumeric(value) || (+value > 24) || (+value + +event.target.value > 24)) {
            event.preventDefault();
        }
    }

    render() {
        return (
            <Col sm={12} style={{ marginTop: '20px' }}>
                <Form horizontal onSubmit={this.handleSubmit}>
                    <FieldGroup
                        type='text'
                        label='Name of Working Pattern'
                        defaultValue={this.state.name}
                        inputRef={node => this.name = node}
                    />
                    <FormGroup bsSize='lg' controlId='isActive'>
                        <Col componentClass={ControlLabel} sm={3}>Active</Col>
                        <Col sm={4}>
                            <CustomSwitch 
                                defaultChecked={this.state.isActive} 
                                inputRef={node => this.active = node}
                                justify='left' 
                            />
                        </Col>
                    </FormGroup>
                    <Row>
                        <Col smOffset={3} sm={9} style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '15px' }}>How many hours worked these days</Col>
                    </Row>
                    <Row>
                        <Col smOffset={3} sm={9} style={{ fontSize: '18px', marginBottom: '15px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <div style={{ display: 'inline-block', width: '13%' }}>
                                    <label htmlFor='mon'>Monday</label>
                                    <input 
                                        defaultValue={this.state.weekHours[1]} 
                                        type='text' 
                                        className='input lg' 
                                        onKeyPress={this.handleKeyPress}
                                        ref={node => this.mon = node} 
                                        onPaste={this.handlePaste}
                                    />
                                </div>
                                <div style={{ display: 'inline-block', width: '13%' }}>
                                    <label htmlFor='tue'>Tuesday</label>
                                    <input 
                                        defaultValue={this.state.weekHours[2]} 
                                        type='text' 
                                        className='input lg' 
                                        onKeyPress={this.handleKeyPress}
                                        ref={node => this.tue = node} 
                                        onPaste={this.handlePaste}
                                    />
                                </div>
                                <div style={{ display: 'inline-block', width: '13%' }}>
                                    <label htmlFor='wed'>Wednesday</label>
                                    <input 
                                        defaultValue={this.state.weekHours[3]} 
                                        type='text' 
                                        className='input lg' 
                                        onKeyPress={this.handleKeyPress}
                                        ref={node => this.wed = node} 
                                        onPaste={this.handlePaste}
                                    />
                                </div>
                                <div style={{ display: 'inline-block', width: '13%' }}>
                                    <label htmlFor='thu'>Thursday</label>
                                    <input 
                                        defaultValue={this.state.weekHours[4]} 
                                        type='text' 
                                        className='input lg' 
                                        onKeyPress={this.handleKeyPress}
                                        ref={node => this.thu = node} 
                                        onPaste={this.handlePaste}
                                    />
                                </div>
                                <div style={{ display: 'inline-block', width: '13%' }}>
                                    <label htmlFor='fri'>Friday</label>
                                    <input 
                                        defaultValue={this.state.weekHours[5]} 
                                        type='text' 
                                        className='input lg' 
                                        onKeyPress={this.handleKeyPress}
                                        ref={node => this.fri = node} 
                                        onPaste={this.handlePaste}
                                    />
                                </div>
                                <div style={{ display: 'inline-block', width: '13%' }}>
                                    <label htmlFor='sat'>Saturday</label>
                                    <input 
                                        defaultValue={this.state.weekHours[6]} 
                                        type='text' 
                                        className='input lg' 
                                        onKeyPress={this.handleKeyPress}
                                        ref={node => this.sat = node} 
                                        onPaste={this.handlePaste}
                                    />
                                </div>
                                <div style={{ display: 'inline-block', width: '13%' }}>
                                    <label htmlFor='sun'>Sunday</label>
                                    <input 
                                        defaultValue={this.state.weekHours[0]} 
                                        type='text' 
                                        className='input lg' 
                                        onKeyPress={this.handleKeyPress}
                                        ref={node => this.sun = node} 
                                        onPaste={this.handlePaste}
                                    />
                                </div>
                            </div>
                        </Col>
                    </Row>
                    <FormGroup>
                        <Col smOffset={3} sm={2}>
                            <Button bsClass='button-primary' type='submit'>Save</Button>
                        </Col>
                        <Col sm={2}>
                            <Button onClick={this.props.onClose} bsClass='button-secondary'>Cancel</Button>
                        </Col>
                    </FormGroup>
                </Form>
            </Col>
        );
    }
}

export default WorkingPatternForm;