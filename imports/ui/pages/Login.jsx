import { Meteor } from 'meteor/meteor';
import React from 'react';
import { Grid, Row, Col, Alert } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';
import { Roles } from 'meteor/alanning:roles'

import LoginForm from '../components/forms/LoginForm';

class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loggingIn: false,
        };
    }

    componentDidMount() {
        var nodes = document.querySelectorAll('html, div#root');

        nodes.forEach(node => node.style.background = '#ffffff');

        //Meteor.call('test', (error, response) => console.log(response));
    }

    handleSubmit = ({ username, password }) => {


        if (!username) {
            return toast.error('Username is required');
        }

        if (!password) {
            return toast.error('Password is required');
        }

        this.setState({ loggingIn: true });

        Meteor.loginWithPassword(username, password, err => {
            if (err) {
                this.setState({ loggingIn: false });

                toast.error(err.reason);
            } else {
                if (Meteor.user()) {
                    if (Roles.userIsInRole(Meteor.userId(), 'super_admin')) {
                        this.props.history.push('/user_accounts');
                    } else {
                        this.props.history.push({
                            pathname: '/dashboard',
                            state: { userId: Meteor.userId(), isNew: false },
                        });
                    }
                }
            }
        });
    }

    render() {
        return (
            <Grid className='login' fluid>
                <Row>
                    <Col className='login-form-wrapper' sm={12}>
                        <LoginForm onSubmit={this.handleSubmit} loggingIn={this.state.loggingIn} />
                        <Col smOffset={4} sm={4} style={{ marginTop: '20px' }}>
                            <Alert style={{ opacity: this.state.alert ? 1 : 0 }} bsStyle='danger'>{this.state.alert}</Alert>
                        </Col>
                    </Col>
                </Row>
                <ToastContainer autoClose={3000} position={toast.POSITION.TOP_CENTER} />
            </Grid>
        );
    }
}

export default Login;