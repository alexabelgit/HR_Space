import React from 'react';
import { Grid, Row, Col, Form, FormGroup, ControlLabel, Button, Image as ReactImage } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';

import CustomSelect from '../components/CustomSelect';
import FieldGroup from '../components/FieldGroup';

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

class ResetPassword extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            secretQuestions: [],
            password: '',
            verifyPassword: '',
            errorInput: '',
        };
    }

    componentDidMount() {
        var nodes = document.querySelectorAll('html, div#root');

        nodes.forEach(node => node.style.background = '#ffffff');

        const { token } = this.props.match.params;

        if (!token) {
            this.props.history.push('/login');
        }

        Meteor.call('getRandomQuestions.token', { token }, (error, response) => {
            if (error) {
                toast.error(error.reason);
            } else {
                this.setState({
                    secretQuestions: response.map(question => ({ ...question, answer: '' })),
                });
            }
        });
    }

    handleChange = event => this.setState({ [event.target.id]: event.target.value });

    handleSecretQuestionChange = (value, questionId) => {
        const { secretQuestions } = this.state;

        const index = secretQuestions.findIndex(question => question._id === questionId);

        secretQuestions[index].answer = value;

        this.setState({ secretQuestions });
    }

    handleSubmit = event => {
        event.preventDefault();

        if (this.state.password !== this.state.verifyPassword) {
            toast.error('Passwords do not match');
        } else {
            this.setState({ loading: true });

            const { password: newPassword } = this.state;
            const { token } = this.props.match.params;
            const questions = this.state.secretQuestions.map(question => ({ questionId: question._id, answer: question.answer }));

            Meteor.call('resetEmployeePassword', { token, newPassword, questions }, (error, response) => {
                if (error) {
                    if (error.reason === 'INVALID_ANSWER') {
                        setTimeout(() => this.setState({ errorInput: '' }), 3000);

                        toast.error('Wrong answer');

                        this.setState({ errorInput: error.details });
                    } else {
                        toast.error(error.reason);
                    }
                } else {
                    this.props.history.push('/login');
                }
            });
        }
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
                            <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                            <FieldGroup
                                id='password'
                                type='password'
                                label='Password'
                                value={this.state.password}
                                onChange={this.handleChange}
                                labelsize={5}
                                inputsize={4}
                                required
                            />
                            <FieldGroup
                                id='verifyPassword'
                                type='password'
                                label='Verify Password'
                                value={this.state.verifyPassword}
                                onChange={this.handleChange}
                                labelsize={5}
                                inputsize={4}
                                required
                            />
                            {
                                this.state.secretQuestions.map(question => {
                                    switch (question.inputType) {
                                        case 'select':
                                            return (
                                                <FormGroup bsSize='lg' controlId={question._id} key={question._id}>
                                                    <Col componentClass={ControlLabel} sm={5}>{question.text}</Col>
                                                    <Col sm={4}>
                                                        <CustomSelect
                                                            id={question._id}
                                                            value={question.answer || 'Select month'}
                                                            options={months}
                                                            onSelect={value => this.handleSecretQuestionChange(value, question._id)}
                                                            help={this.state.errorInput === question._id}
                                                        />
                                                    </Col>
                                                </FormGroup>
                                            );
                                        default:
                                            return (
                                                <FieldGroup
                                                    id={question._id}
                                                    key={question._id}
                                                    type='text'
                                                    label={question.text}
                                                    value={question.answer}
                                                    onChange={e => this.handleSecretQuestionChange(e.target.value, question._id)}
                                                    labelsize={5}
                                                    inputsize={4}
                                                    help={this.state.errorInput === question._id}
                                                    required
                                                />
                                            );
                                    }
                                })
                            }
                            <FormGroup>
                                <Col smOffset={5} sm={4}>
                                    <Button disabled={this.props.loading} bsClass='button-primary' type='submit'>{this.props.loading ? 'Changing password...' : 'Change password'}</Button>
                                </Col>
                            </FormGroup>
                        </Form>
                    </Col>
                </Row>
                <ToastContainer autoClose={3000} position={toast.POSITION.TOP_CENTER} />
            </Grid>
        );
    }
}

export default ResetPassword;