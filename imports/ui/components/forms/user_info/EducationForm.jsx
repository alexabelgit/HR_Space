import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import React from 'react';
import { Row, Col, FormGroup, Form, Button } from 'react-bootstrap';
import { Random } from 'meteor/random';
import { ToastContainer, toast } from 'react-toastify';

import InstitutionGroup from '../../InstitutionGroup';

import Education from '../../../../api/collections/user_info/education';

class EducationForm extends React.Component {
    constructor(props) {
        super(props);

        const emptyEducation = {
            _id: Random.id(),
            userId: props.userInfo.userId || Meteor.userId(),
            institutionName: '',
            startDate: null,
            endDate: null,
            qualifications: '',
            isNew: true,
        };

        this.state = {
            educations: props.educations.length ? props.educations : [emptyEducation],
            emptyFields: props.educations.length ? false : true,
            saving: false,
        };
    }

    componentWillReceiveProps(nextProps) {
        const emptyEducation = {
            _id: Random.id(),
            userId: this.props.userInfo.userId || Meteor.userId(),
            institutionName: '',
            startDate: null,
            endDate: null,
            qualifications: '',
            isNew: true,
        };

        this.setState({
            educations: nextProps.educations.length ? nextProps.educations : [emptyEducation],
            emptyFields: nextProps.educations.length ? false : true,
        });
    }

    handleInstitutionGroupAdd = event => {
        event.preventDefault();

        const emptyEducation = {
            _id: Random.id(),
            userId: this.props.userInfo.userId || Meteor.userId(),
            institutionName: '',
            startDate: null,
            endDate: null,
            qualifications: '',
            isNew: true,
        };

        this.setState({ educations: this.state.educations.concat([emptyEducation]) });
    }

    handleChange = education => {
        var emptyFields = false;

        const educations = this.state.educations.map(_education => (_education === education) ? education : _education);

        if (!education.institutionName.trim() || !education.qualifications.trim() || !education.startDate || !education.endDate) {
            emptyFields = true;
        }

        this.setState({ educations, emptyFields });
    }

    handleSubmit = event => {
        event.preventDefault();

        this.setState({ saving: true });

        if (this.state.emptyFields) {
            toast.error('All fields are required');

            this.setState({ saving: false });
        } else {
            const educations = this.state.educations.filter(education => education.institutionName.trim() && education.qualifications.trim() && education.startDate && education.endDate);

            Meteor.call('education.submit', educations, (error) => {
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

    handleCancel = () => this.props.history.push('/dashboard');

    canEdit = this.props.userInfo.userId === Meteor.userId();

    render() {
        return (
            <Form horizontal onSubmit={this.handleSubmit}>
                <h2 style={{ marginTop: '40px', marginBottom: '25px' }}>Education</h2>
                {
                    this.state.educations.map(education =>
                        <InstitutionGroup
                            key={education._id || Random.id()}
                            onChange={this.handleChange}
                            // {...education}
                            education={education}
                        />
                    )
                }
                {
                    this.canEdit
                    &&
                    <Row>
                        <Col smOffset={4} sm={2}>
                            {
                                (this.state.educations.length < 5)
                                &&
                                <Button
                                    bsClass='button-primary'
                                    style={{ marginBottom: '15px' }}
                                    onClick={this.handleInstitutionGroupAdd}
                                    disabled={this.state.emptyFields}
                                >
                                    + Add
                            </Button>
                            }
                        </Col>
                    </Row>
                }
                {
                    this.canEdit
                    &&
                    <FormGroup>
                        <Col smOffset={4} sm={2}>
                            <Button 
                                bsClass='button-primary' 
                                type='submit'
                                disabled={this.state.saving}
                            >
                                {this.state.saving ? 'Saving...' : 'Save'}
                            </Button>
                        </Col>
                        <Col sm={2}>
                            <Button bsClass='button-secondary' onClick={this.handleCancel}>Cancel</Button>
                        </Col>
                    </FormGroup>
                }
                <ToastContainer autoClose={3000} position={toast.POSITION.TOP_CENTER} />
            </Form>
        );
    }
}

export default withTracker(props => {
    const userId = props.userInfo.userId || Meteor.userId();
    const educationHandle = Meteor.subscribe('education.user', userId);
    const loading = !educationHandle.ready();

    return {
        loading,
        educations: Education.find().fetch()
    };
})(EducationForm);