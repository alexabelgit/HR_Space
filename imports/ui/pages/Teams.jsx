import React from 'react';
import { Grid, Row, Col, Button } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

import TeamsCollection from '../../api/collections/teams';

import DropdownDataTable from '../components/tables/DropdownDataTable';
import DropdownDataForm from '../components/forms/DropdownDataForm';

class Teams extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            teamForm: null,
            error: null
        };

        this.openDropdownDataForm = this.openDropdownDataForm.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSubmitAndStay = this.handleSubmitAndStay.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleTeamEdit = this.handleTeamEdit.bind(this);
        this.handleTeamDelete = this.handleTeamDelete.bind(this);
        this.submitCallback = this.submitCallback.bind(this);
        this.submitAndStayCallback = this.submitAndStayCallback.bind(this);
    }

    componentDidMount() {
        var nodes = document.querySelectorAll('html, div#root');

        nodes.forEach(node => node.style.background = '#ffffff');
    }

    openDropdownDataForm(event) {
        event.preventDefault();

        this.setState({
            teamForm: {
                name: ''
            }
        });
    }

    submitCallback(error, response) {
        if (error) {
            switch (error.reason) {
                case 'DUPLICATE_DOCUMENT':
                    setTimeout(() => this.setState({ error: null }), 3000);

                    this.setState({ error: { field: 'name', message: error.details } });
                    break;
                case 'MISSING_FIELD':
                    let fieldName = error.details.capitalize();
    
                    setTimeout(() => this.setState({ error: null }), 3000);
                    
                    this.setState({ error: { field: error.details, message: `${fieldName} is required` }});
                    break
                default:
                    setTimeout(() => this.setState({ error: null }), 3000);

                    this.setState({ error: { field: '', message: error.reason } });
                    break;
            }
        } else {
            this.setState({ teamForm: null });
        }
    }

    submitAndStayCallback(error, response) {
        if (error) {
            switch (error.reason) {
                case 'DUPLICATE_DOCUMENT':
                    setTimeout(() => this.setState({ error: null }), 3000);

                    this.setState({ error: { field: 'name', message: error.details } });
                    break;
                case 'MISSING_FIELD':
                    let fieldName = error.details.capitalize();
    
                    setTimeout(() => this.setState({ error: null }), 3000);
                    
                    this.setState({ error: { field: error.details, message: `${fieldName} is required` }});
                    break
                default:
                    setTimeout(() => this.setState({ error: null }), 3000);

                    this.setState({ error: { field: '', message: error.reason } });
                    break;
            }
        }
    }

    handleSubmit(team) {
        var index = this.props.teams.findIndex(item => item._id === team._id);

        if (index === -1) Meteor.call('teams.create', team, this.submitCallback);
        else Meteor.call('teams.update', team, this.submitCallback);
    }

    handleSubmitAndStay(team) {
        var index = this.props.teams.findIndex(item => item._id === team._id);

        if (index === -1) Meteor.call('teams.create', team, this.submitAndStayCallback);
        else Meteor.call('teams.update', team, this.submitAndStayCallback);
    }

    handleCancel() {
        this.setState({ teamForm: null });
    }

    handleTeamEdit(team) {
        this.setState({ teamForm: team });
    }

    handleTeamDelete(team) {
        Meteor.call('teams.remove', team, this.submitCallback);
    }

    render() {
        return (
            <Grid className='teams page' fluid>
                <Row>
                    <Col sm={9}>
                        <Row>
                            <Col sm={5}>
                                <h2>{!this.state.teamForm ? 'Teams' :
                                    this.state.teamForm.name ? 'Edit team' : 'Add team'}</h2>
                            </Col>
                            <Col sm={3}>
                                {
                                    !this.state.teamForm
                                    &&
                                    <Button
                                        onClick={this.openDropdownDataForm}
                                        bsClass='button-primary'
                                        style={{ marginTop: '20px', marginBottom: '10px' }}
                                    >
                                        Add team
                                    </Button>
                                }
                            </Col>
                            {
                                this.state.teamForm ?
                                    <DropdownDataForm
                                        dataType='team'
                                        data={this.state.teamForm}
                                        onSubmit={this.handleSubmit}
                                        onSubmitAndStay={this.handleSubmitAndStay}
                                        onClose={this.handleCancel}
                                        error={this.state.error}
                                    />
                                    :
                                    <DropdownDataTable
                                        dataType='team'
                                        data={this.props.teams}
                                        onDataEdit={this.handleTeamEdit}
                                        onDataDelete={this.handleTeamDelete}
                                    />
                            }
                        </Row>
                    </Col>
                </Row>
            </Grid>
        );
    }
}

export default withTracker(() => {
    const handle = Meteor.subscribe('teams.all');
    const loading = !handle.ready();

    return {
        loading,
        teams: TeamsCollection.find().fetch()
    }
})(Teams);