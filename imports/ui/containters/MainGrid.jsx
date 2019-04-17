import { Meteor } from 'meteor/meteor';
import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';

import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import Roles from '../../api/collections/roles';

class MainGrid extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        var userRole = "super_admin";//Roles.getRolesForUser(Meteor.userId())[0];

        const { userInfo, onUserInfoChange } = this.props;

        return (
            <Grid fluid>
                <Row>
                    <div className='sidebar-background'></div>
                    <Col sm={2} xs={2}>
                        <Sidebar role={userRole} />
                    </Col>
                    <Col sm={10} xs={10}>
                        <Row>
                            <Header 
                                role={userRole} 
                                userInfo={userInfo} 
                                onUserInfoChange={onUserInfoChange}
                            />
                            {this.props.children}
                        </Row>
                    </Col>
                </Row>
            </Grid>
        );
    }
}

export default withRouter(MainGrid);