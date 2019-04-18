import React from 'react';
import { Grid, Row, Col, Button } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { toast, ToastContainer } from 'react-toastify';

import WorkingPatternsCollection from '../../api/collections/workingPatterns';

import WorkingPatternsTable from '../components/tables/WorkingPatternsTable';
import WorkingPatternForm from '../components/forms/WorkingPatternForm';

class WorkingPatterns extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            workingPatternForm: null,
            error: null
        };
    }

    componentDidMount() {
        var nodes = document.querySelectorAll('html, div#root');

        nodes.forEach(node => node.style.background = '#ffffff');
    }

    submitCallback = (error, response) => {
        if (error) {
            switch (error.reason) {
                case 'MISSING_FIELD':
                    let fieldName = error.details.capitalize();

                    toast.error(`${fieldName} is required`);

                    break;
                case 'DATES_MISMATCH':
                    toast.error(error.details);

                    break;
                default:
                    toast.error(error.reason);

                    break;
            }
        } else {
            this.setState({ workingPatternForm: null });
        }
    }

    openWorkingPatternForm = event => {
        event.preventDefault();

        this.setState({
            workingPatternForm: {
                name: '',
                weekHours: [0, 0, 0, 0, 0, 0, 0],
                isActive: true,
            }
        });
    }

    handleSubmit = workingPattern => {
        var index = this.props.workingPatterns.findIndex(a => a._id === workingPattern._id);

        if (index === -1) Meteor.call('workingPatterns.create', workingPattern, this.submitCallback);
        else Meteor.call('workingPatterns.update', workingPattern, this.submitCallback);
    }

    handleCancel = event => {
        event.preventDefault();

        this.setState({ workingPatternForm: null });
    }

    handleWorkingPatternEdit = workingPattern => {
        this.setState({ workingPatternForm: workingPattern });
    }

    handleWorkingPatternDelete = workingPattern => {
        Meteor.call('workingPatterns.remove', workingPattern, this.submitCallback);
    }

    render() {
        return (
            <Grid className='working-patterns page' fluid>
                <Row>
                    <Col sm={9}>
                        <Row>
                            <Col sm={5}>
                                <h2>{!this.state.workingPatternForm ? 'All working patterns' :
                                    this.state.workingPatternForm.name ? 'Edit working pattern' : 'New working pattern'}</h2>
                            </Col>
                            <Col smOffset={4} sm={3}>
                                {
                                    !this.state.workingPatternForm
                                    &&
                                    <Button
                                        onClick={this.openWorkingPatternForm}
                                        bsClass='button-primary'
                                        style={{ marginTop: '20px', marginBottom: '10px' }}
                                    >
                                        Add new working pattern
                                    </Button>
                                }
                            </Col>
                            {
                                this.state.workingPatternForm ?
                                    <WorkingPatternForm
                                        onSubmit={this.handleSubmit}
                                        onClose={this.handleCancel}
                                        workingPattern={this.state.workingPatternForm}
                                        error={this.state.error}
                                    />
                                    :
                                    <WorkingPatternsTable
                                        data={this.props.workingPatterns}
                                        onWorkingPatternEdit={this.handleWorkingPatternEdit}
                                        onWorkingPatternDelete={this.handleWorkingPatternDelete}
                                    />
                            }
                        </Row>
                    </Col>
                </Row>
                <ToastContainer autoClose={3000} position={toast.POSITION.TOP_CENTER} />
            </Grid>
        );
    }
}

export default withTracker(() => {
    const handle = Meteor.subscribe('workingPatterns.all');
    const loading = !handle.ready();

    return {
        loading,
        workingPatterns: WorkingPatternsCollection.find().fetch()
    };
})(WorkingPatterns);