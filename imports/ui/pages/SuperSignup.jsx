import { Accounts } from 'meteor/accounts-base';
import React from 'react';
import { Button, Form, FormGroup, Grid, Row, Col, Image as ReactImage } from 'react-bootstrap';

import FieldGroup from '../components/FieldGroup';

class SuperSignup extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            loggingIn: false
        };
    }

    componentDidMount() {
        var nodes = document.querySelectorAll('html, div#root');

        nodes.forEach(node => node.style.background = '#ffffff');
    }

    handleChange = event => this.setState({ [event.target.id]: event.target.value });

    handleSubmit = event => {
        event.preventDefault();

        const { username, password } = this.state;

        Accounts.createUser({ username, password, profile: { role: 'super_admin' } }, err => {
            if (err) {
                alert(err.reason);
            } else {
                this.props.history.push('/dashboard');
            }
        });
    }

    render() {
        return (
            <Grid className='signup' fluid>
                <Row>
                    <Col className='signup-form-wrapper' sm={12}>
                        <Form className='signupForm' horizontal autoComplete='off' onSubmit={this.handleSubmit}>
                            <Row>
                                <Col smOffset={4} sm={4}>
                                    <Row>
                                        <Col smOffset={3} sm={5}>
                                            <ReactImage src='/img/logo.png' />
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                            <FieldGroup
                                id='username'
                                type='text'
                                label='Username'
                                value={this.state.username}
                                onChange={this.handleChange}
                                labelsize={5}
                                inputsize={4}
                            />
                            <FieldGroup
                                id='password'
                                type='password'
                                label='Password'
                                value={this.state.password}
                                onChange={this.handleChange}
                                labelsize={5}
                                inputsize={4}
                            />
                            <FormGroup>
                                <Col smOffset={5} sm={4}>
                                    <Button 
                                        disabled={this.props.loggingIn} 
                                        bsClass='button-primary' 
                                        type='submit'
                                    >
                                        {this.props.loggingIn ? 'Creating account...' : 'Create account'}
                                    </Button>
                                </Col>
                            </FormGroup>
                        </Form>
                    </Col>
                </Row>
            </Grid>
        );
    }
}

export default SuperSignup;