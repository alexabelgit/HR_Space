import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import React from 'react';
import { Row, Col, FormGroup, FormControl, ControlLabel, HelpBlock, Form, Button, Image as ReactImage } from 'react-bootstrap';
import { Random } from 'meteor/random';
import { ToastContainer, toast } from 'react-toastify';

import FieldGroup from '../../FieldGroup';
import ContactGroup from '../../ContactGroup';

import Contact from '../../../../api/collections/user_info/contact';

class ContactForm extends React.Component {
    constructor(props) {
        super(props);

        const emptyContact = {
            _id: Random.id(),
            userId: props.userInfo.userId || Meteor.userId(),
            name: '',
            relationship: '',
            telephone: '',
            email: '',
            isNew: true
        };

        this.state = {
            contacts: props.contacts.length ? props.contacts : [emptyContact],
            emptyFields: props.contacts.length ? false : true,
            saving: false,
        };
    }

    componentWillReceiveProps(nextProps) {
        const emptyContact = {
            _id: Random.id(),
            userId: this.props.userInfo.userId || Meteor.userId(),
            name: '',
            relationship: '',
            telephone: '',
            email: '',
            isNew: true
        };

        this.setState({
            contacts: nextProps.contacts.length ? nextProps.contacts : [emptyContact],
            emptyFields: true
        });
    }

    handleContactGroupAdd =event => {
        event.preventDefault();

        const emptyContact = {
            _id: Random.id(),
            userId: this.props.userInfo.userId || Meteor.userId(),
            name: '',
            relationship: '',
            telephone: '',
            email: '',
            isNew: true
        };

        this.setState({ contacts: this.state.contacts.concat([emptyContact]), emptyFields: true });
    }

    handleChange = (contactId, prop, value) => {
        var emptyFields = false;

        var contacts = this.state.contacts.map(contact => {
            if (contact._id === contactId) {
                let updatedContact = Object.assign({}, contact);

                updatedContact[prop] = value;

                return updatedContact;
            }

            return contact;
        });

        contacts.forEach(contact => {
            if (!contact.name.trim() || !contact.email.trim()) {
                emptyFields = true;
            }
        });

        this.setState({ contacts, emptyFields: emptyFields });
    }

    handleSubmit = event => {
        event.preventDefault();

        this.setState({ saving: true });
        
        if (this.state.emptyFields) {
            toast.error('Name and email are required');

            this.setState({ saving: false });
        } else {
            Meteor.call('contact.submit', this.state.contacts, (error, result) => {
                if (error) {
                    toast.error(error.reason);
                    
                    this.setState({ saving: false });
                } else {
                    toast.success('Saved');
                    
                    this.setState({ saving: false });
                }
            });
        }
    }

    canEdit = this.props.userInfo.userId === Meteor.userId();

    render() {
        return (
            <Form horizontal onSubmit={this.handleSubmit}>
                <h2 style={{ marginTop: '40px', marginBottom: '25px' }}>Contact</h2>
                {
                    this.state.contacts.map(contact => 
                        <ContactGroup
                            key={contact._id || Random.id()}
                            onChange={this.handleChange}
                            {...contact}
                        />
                    )
                }
                {
                    this.canEdit
                    &&
                    <Row>
                        <Col smOffset={3} sm={2}>
                            {
                                (this.state.contacts.length < 2)
                                &&
                                <Button
                                    bsClass='button-primary'
                                    style={{ marginBottom: '15px' }}
                                    onClick={this.handleContactGroupAdd}
                                    disabled={this.state.emptyFields}
                                >
                                    + Add
                            </Button>
                            }
                        </Col>
                    </Row>
                }
                {/* <FieldGroup
                    id='name'
                    type='text'
                    label='Name'
                    value={this.state.name}
                    onChange={this.handleChange}
                />
                <FieldGroup
                    id='relationship'
                    type='text'
                    label='Relationship'
                    inputsize={3}
                    value={this.state.relationship}
                    onChange={this.handleChange}
                />
                <FieldGroup
                    id='telephone'
                    type='text'
                    label='Telephone'
                    value={this.state.telephone}
                    onChange={this.handleChange}
                />
                <FieldGroup
                    id='email'
                    type='email'
                    label='Email address'
                    value={this.state.email}
                    onChange={this.handleChange}
                /> */}
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

// ContactForm.defaultProps = {
//     contact: {
//         userId: Meteor.userId(),
//         name: '',
//         relationship: '',
//         telephone: '',
//         email: ''
//     }
// }

export default withTracker(props => {
    const userId = props.userInfo.userId || Meteor.userId();
    const contactHandle = Meteor.subscribe('contact.user', userId);
    const loading = !contactHandle.ready();

    return {
        loading,
        contacts: Contact.find().fetch()
    };
})(ContactForm);