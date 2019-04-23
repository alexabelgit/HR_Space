import React from 'react';
import { Row, Col, Form, FormGroup, ControlLabel, Button, Image as ReactImage } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';

import CustomSelect from '../CustomSelect';
import FieldGroup from '../FieldGroup';

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

class SignupForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            submitError: props.submitError || '',
            username: '',
            email: '',
            password: '',
            verifyPassword: '',
            // secretQuestion1: {
            //     question: 'What was the first school you attended?',
            //     answer: ''
            // },
            // secretQuestion2: {
            //     question: 'What was the colour and mark of your first car?',
            //     answer: ''
            // },
            // secretQuestion3: {
            //     question: 'What month was your mother born?',
            //     answer: ''
            // },
            // secretQuestion4: {
            //     question: 'What month was your father born?',
            //     answer: ''
            // },
            // secretQuestion5: {
            //     question: 'What was the name of your first pet?',
            //     answer: ''
            // },
            secretQuestions: [],
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ submitError: nextProps.submitError });
    }

    componentDidMount() {
        Meteor.call('getQuestions', (error, response) => {
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

    handleOnSelect = (value, stateProp) => {
        // var newState = Object.assign({}, this.state);

        // newState[stateProp].answer = value;

        // this.setState(newState);

        const { secretQuestions } = this.state;

        const index = secretQuestions.findIndex(question => question.id === stateProp);

        secretQuestions[index].answer = value;
    }

    handleSecretQuestionChange = event => {
        // event.preventDefault();

        // var newState = Object.assign({}, this.state);

        // newState[event.target.id].answer = event.target.value;

        // this.setState(newState);

        const { secretQuestions } = this.state;

        const index = secretQuestions.findIndex(question => question.id === event.target.id);

        secretQuestions[index].answer = event.target.value;

        this.setState({ secretQuestions });
    }

    handleSubmit = event => {
        event.preventDefault();

        if (this.state.password !== this.state.verifyPassword) {
            this.props.onError('Passwords do not match');
        } else {
            let { submitError, verifyPassword, ...newUser } = this.state;

            this.props.onSubmit(newUser);
        }
    }

    render() {
        return (
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
                {/* <FieldGroup
                    id='username'
                    type='text'
                    label='Username'
                    value={this.state.username}
                    onChange={this.handleChange}
                    labelsize={5}
                    inputsize={4}
                    help={this.state.submitError && this.state.submitError.field === 'username' ? this.state.submitError.message : ''}
                />
                <FieldGroup
                    id='email'
                    type='email'
                    label='Email'
                    value={this.state.email}
                    onChange={this.handleChange}
                    labelsize={5}
                    inputsize={4}
                    help={this.state.submitError && this.state.submitError.field === 'email' ? this.state.submitError.message : ''}
                /> */}
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
                <div>
                    {
                        this.state.secretQuestions.map(question => {
                            return (
                                <FieldGroup
                                    id={question.id}
                                    key={question.id}
                                    type='text'
                                    label={question.text}
                                    value={question.answer}
                                    onChange={this.handleSecretQuestionChange}
                                    labelsize={5}
                                    inputsize={4}
                                    required
                                />
                            )
                        })
                    }
                </div>
                {/* <FieldGroup
                    id='secretQuestion1'
                    type='text'
                    label={this.state.secretQuestion1.question}
                    value={this.state.secretQuestion1.answer}
                    onChange={this.handleSecretQuestionChange}
                    labelsize={5}
                    inputsize={4}
                    help={this.state.submitError && this.state.submitError.field === 'secretQuestion1' ? this.state.submitError.message : ''}
                />
                <FieldGroup
                    id='secretQuestion2'
                    type='text'
                    label={this.state.secretQuestion2.question}
                    value={this.state.secretQuestion2.answer}
                    onChange={this.handleSecretQuestionChange}
                    labelsize={5}
                    inputsize={4}
                    help={this.state.submitError && this.state.submitError.field === 'secretQuestion2' ? this.state.submitError.message : ''}
                />
                <FormGroup bsSize='lg' controlId='secretQuestion3'>
                    <Col componentClass={ControlLabel} sm={5}>What month was your mother born?</Col>
                    <Col sm={4}>
                        <CustomSelect 
                            id='secretQuestion3'
                            value={this.state.secretQuestion3.answer || 'Select month'}
                            options={months} 
                            help={this.state.submitError && this.state.submitError.field === 'secretQuestion3' ? this.state.submitError.message : ''}
                            onSelect={value => this.handleOnSelect(value, 'secretQuestion3')} 
                        />
                    </Col>
                </FormGroup>
                <FormGroup bsSize='lg' controlId='secretQuestion4'>
                    <Col componentClass={ControlLabel} sm={5}>What month was your father born?</Col>
                    <Col sm={4}>
                        <CustomSelect 
                            id='secretQuestion4'
                            value={this.state.secretQuestion4.answer || 'Select month'}
                            options={months} 
                            help={this.state.submitError && this.state.submitError.field === 'secretQuestion4' ? this.state.submitError.message : ''}                        
                            onSelect={value => this.handleOnSelect(value, 'secretQuestion4')} 
                        />
                    </Col>
                </FormGroup>
                <FieldGroup
                    id='secretQuestion5'
                    type='text'
                    label={this.state.secretQuestion5.question}
                    value={this.state.secretQuestion5.answer}
                    onChange={this.handleSecretQuestionChange}
                    labelsize={5}
                    inputsize={4}
                    help={this.state.submitError && this.state.submitError.field === 'secretQuestion5' ? this.state.submitError.message : ''}
                /> */}
                {/* <FieldGroup
                    id='role'
                    type='text'
                    label='role'
                    value={this.state.role}
                    onChange={this.handleChange}
                    labelsize={5}
                    inputsize={4}
                /> */}
                <FormGroup>
                    <Col smOffset={5} sm={4}>
                        <Button disabled={this.props.loggingIn} bsClass='button-primary' type='submit'>{this.props.loggingIn ? 'Completing sign up...' : 'Complete sign up'}</Button>
                    </Col>
                </FormGroup>
                <ToastContainer autoClose={3000} position={toast.POSITION.TOP_CENTER} />
            </Form>
        );
    }
}

export default SignupForm;