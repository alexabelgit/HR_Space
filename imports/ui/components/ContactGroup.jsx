import React from 'react';
import { Row, Col, FormGroup, FormControl, ControlLabel, HelpBlock, Form, Button } from 'react-bootstrap';

class ContactGroup extends React.Component {
    render() {
        return (
            <Row>
                <Col sm={12}>
                    <FormGroup bsSize='lg' controlId='name'>
                        <Col componentClass={ControlLabel} sm={3}>Name</Col>
                        <Col sm={4}>
                            <FormControl 
                                type='text' 
                                bsClass='input lg'
                                defaultValue={this.props.name}
                                onBlur={e => this.props.onChange(this.props._id, 'name', e.target.value)}
                            />
                        </Col>
                    </FormGroup>
                    <FormGroup bsSize='lg' controlId='relationship'>
                        <Col componentClass={ControlLabel} sm={3}>Relationship</Col>
                        <Col sm={4}>
                            <FormControl 
                                type='text' 
                                bsClass='input lg'
                                defaultValue={this.props.relationship}
                                onBlur={e => this.props.onChange(this.props._id, 'relationship', e.target.value)}
                            />
                        </Col>
                    </FormGroup>
                    <FormGroup bsSize='lg' controlId='telephone'>
                        <Col componentClass={ControlLabel} sm={3}>Telephone</Col>
                        <Col sm={4}>
                            <FormControl 
                                type='text' 
                                bsClass='input lg'
                                defaultValue={this.props.telephone}
                                onBlur={e => this.props.onChange(this.props._id, 'telephone', e.target.value)}
                            />
                        </Col>
                    </FormGroup>
                    <FormGroup bsSize='lg' controlId='email'>
                        <Col componentClass={ControlLabel} sm={3}>Email address</Col>
                        <Col sm={4}>
                            <FormControl 
                                type='text' 
                                bsClass='input lg'
                                defaultValue={this.props.email}
                                onBlur={e => this.props.onChange(this.props._id, 'email', e.target.value)}
                            />
                        </Col>
                    </FormGroup>
                    <div className='custom-divider' style={{ marginBottom: '15px' }}></div>
                </Col>
            </Row>
        );
    }
}

export default ContactGroup;