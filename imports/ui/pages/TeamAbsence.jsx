import React from 'react';
import { Grid, Row, Col, Button } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { toast, ToastContainer } from 'react-toastify';

import Absence from '../../api/collections/absence';

import TeamAbsenceTable from '../components/tables/TeamAbsenceTable';

class TeamAbsence extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            absences: [],
        };
    }

    componentDidMount() {
        var nodes = document.querySelectorAll('html, div#root');

        nodes.forEach(node => node.style.background = '#ffffff');

        Meteor.call('getTeamAbsence', Meteor.userId(), (error, response) => {
            if (error) {
                toast.error(error.reason);
            } else {
                this.setState({ absences: response });
            }
        });
    }

    render() {
        return (
            <Grid className='teams-absence page' fluid>
                <Row>
                    <Col sm={12}>
                        <Row>
                            <Col sm={5}>
                                <h2>Teams absence</h2>
                            </Col>
                            <TeamAbsenceTable
                                data={this.state.absences}
                            />
                        </Row>
                    </Col>
                </Row>
                <ToastContainer autoClose={3000} position={toast.POSITION.TOP_CENTER} />
            </Grid>
        );
    }
}

export default TeamAbsence;