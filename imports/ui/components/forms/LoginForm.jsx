import React from 'react';
import { Modal, Row, Col, Form, FormGroup, FormControl, ControlLabel, Button, Image as ReactImage } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { toast, ToastContainer } from 'react-toastify';

import FieldGroup from '../FieldGroup';

const propTypes = {
    onSubmit: PropTypes.func.isRequired,
    loggingIn: PropTypes.bool.isRequired
};

class LoginForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            showModal: false,
        };
    }

    handleChange = event => {
        event.preventDefault();

        this.setState({ [event.target.id]: event.target.value });
    }

    handleSubmit = event => {
        event.preventDefault();

        const { username, password } = this.state;

        this.props.onSubmit({ username, password });
    }

    showModal = event => {
        event.preventDefault();

        this.setState({ showModal: true });
    }

    handleModalConfirm = event => {
        event.preventDefault();

        const email = this.email.value.trim();
        const regex = new RegExp(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

        if (!regex.test(email)) {
            toast.error('Invalid email');
        } else {
            Meteor.call('sendResetPasswordLink', email, (error, response) => {
                if (error) {
                    toast.error(error.reason);
                } else {
                    toast.success('An email with a reset password link was sent to this email address');
                }

                this.setState({ showModal: false });
            });
        }
    }

    render() {
        return (
            <Form className='loginForm' horizontal autoComplete='off' onSubmit={this.handleSubmit}>
                <Row>
                    <Col smOffset={4} sm={4}>
                        <Row>
                            <Col smOffset={4} sm={4}>
                                <ReactImage src='/img/logo.png' />
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <p>Welcome to the HR Space</p>
                <FieldGroup
                    id='username'
                    type='email'
                    label='Username'
                    value={this.state.username}
                    onChange={this.handleChange}
                    labelsize={2}
                    offset={2}
                    inputsize={4}
                />
                <FieldGroup
                    id='password'
                    type='password'
                    label='Password'
                    value={this.state.password}
                    onChange={this.handleChange}
                    labelsize={2}
                    offset={2}
                    inputsize={4}
                />
                <FormGroup>
                    <Col smOffset={4} sm={4}>
                        <Button
                            disabled={this.props.loggingIn}
                            bsClass='button-primary'
                            type='submit'
                        >
                            {this.props.loggingIn ? 'Signing in...' : 'Sign in'}
                        </Button>
                    </Col>
                </FormGroup>
                <Link to='#' onClick={this.showModal}>Forgotten password?</Link>
                <Modal show={this.state.showModal} onHide={() => this.setState({ showModal: false })}>
                    <Modal.Header>
                        <Modal.Title>Reset password</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form horizontal style={{ marginBottom: 0 }}>
                            <FormGroup bsSize='lg' controlId='email' style={{ marginBottom: 0 }}>
                                <Col componentClass={ControlLabel} sm={4}>Enter your email:</Col>
                                <Col sm={7}>
                                    <FormControl
                                        type='email'
                                        bsClass='input lg'
                                        inputRef={node => this.email = node}
                                    />
                                </Col>
                            </FormGroup>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <div style={{ padding: '0px 15px' }}>
                            <div style={{ display: 'inline-block', float: 'right', marginLeft: '15px' }}>
                                <Button bsClass='button-secondary' onClick={() => this.setState({ showModal: false })}>Cancel</Button>
                            </div>
                            <div style={{ display: 'inline-block', float: 'right' }}>
                                <Button bsClass='button-primary' onClick={this.handleModalConfirm}>Confirm</Button>
                            </div>
                        </div>
                    </Modal.Footer>
                </Modal>
            </Form>
        );
    }
}

LoginForm.propTypes = propTypes;

export default LoginForm;