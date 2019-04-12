import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import React from 'react';
import { Grid, Row, Col, Nav, NavItem } from 'react-bootstrap';
import { withRouter, Route } from 'react-router-dom';
import { IndexLinkContainer, LinkContainer } from 'react-router-bootstrap';

import SummaryForm from '../components/forms/user_info/SummaryForm';
import ContactForm from '../components/forms/user_info/ContactForm';
import BankForm from '../components/forms/user_info/BankForm';
import EducationForm from '../components/forms/user_info/EducationForm';
import JobForm from '../components/forms/user_info/JobForm';
import PersonalInformationForm from '../components/forms/user_info/PersonalInformationForm';
import CompensationForm from '../components/forms/user_info/CompensationForm';
import PersonalSettings from '../components/forms/user_info/PersonalSettings';
import HRDocuments from './HRDocuments';
import ManagerPermissions from '../../api/collections/managementRoles';

class PersonalDetails extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};

        // this.permissions = this.permissions.bind(this);
    }

    componentDidMount() {
        var nodes = document.querySelectorAll('html, div#root');

        nodes.forEach(node => node.style.background = '#ffffff');
    }

    get permissions() {
        if (this.props.userInfo.userId === Meteor.userId()) {
            return {
                jobView: true,
                compensationView: true,
                hrDocumentsView: true,
            };
        }

        const isManager = Roles.userIsInRole(Meteor.userId(), 'manager');

        if (isManager) {
            return this.props.permissions[0] || { jobView: false, compensationView: false, hrDocumentsView: false };
        }

        return {
            jobView: true,
            compensationView: true,
            hrDocumentsView: true,
        };
    }

    render() {
        return (
            <Grid className='personal-details page' fluid>
                <Row>
                    <Col sm={12}>
                        <Nav bsStyle='tabs' activeKey={1} id='tabs'>
                            <IndexLinkContainer to='/personal_details/summary'>
                                <NavItem eventKey={1} className='nav-tab' title='Summary'>
                                    Summary
                                </NavItem>
                            </IndexLinkContainer>
                            <LinkContainer to='/personal_details/info'>
                                <NavItem eventKey={2} className='nav-tab' title='Personal information'>
                                    Personal information
                                </NavItem>
                            </LinkContainer>
                            <LinkContainer to='/personal_details/education'>
                                <NavItem eventKey={3} className='nav-tab' title='Education'>
                                    Education
                                </NavItem>
                            </LinkContainer>
                            {
                                this.permissions.jobView
                                &&
                                <LinkContainer to='/personal_details/job'>
                                    <NavItem eventKey={4} className='nav-tab' title='Job'>
                                        Job
                                    </NavItem>
                                </LinkContainer>
                            }
                            {
                                this.permissions.compensationView
                                &&
                                <LinkContainer to='/personal_details/compensation'>
                                    <NavItem eventKey={5} className='nav-tab' title='Compensation'>
                                        Compensation
                                    </NavItem>
                                </LinkContainer>
                            }
                            <LinkContainer to='/personal_details/bank'>
                                <NavItem eventKey={6} className='nav-tab' title='Bank'>
                                    Bank
                                </NavItem>
                            </LinkContainer>
                            <LinkContainer to='/personal_details/contact'>
                                <NavItem eventKey={7} className='nav-tab' title='Contact'>
                                    Contact
                                </NavItem>
                            </LinkContainer>
                            {
                                this.permissions.hrDocumentsView
                                &&
                                <LinkContainer to='/personal_details/hr_documents'>
                                    <NavItem eventKey={8} className='nav-tab' title='HR Documents'>
                                        HR Documents
                                    </NavItem>
                                </LinkContainer>
                            }
                            <LinkContainer to='/personal_details/settings'>
                                <NavItem eventKey={9} className='nav-tab' title='Personal settings'>
                                    Personal settings
                                </NavItem>
                            </LinkContainer>
                        </Nav>
                    </Col>
                    <Col sm={12}>
                        <Route 
                            path='/personal_details/summary' 
                            render={props => 
                                <SummaryForm 
                                    userInfo={this.props.userInfo} 
                                    onHireEmployee={this.props.onUserInfoChange} 
                                    onCloseForm={this.props.onSummaryFormClose}
                                    {...props} 
                                />
                            } 
                        />
                        <Route 
                            path='/personal_details/info' 
                            render={props => <PersonalInformationForm userInfo={this.props.userInfo} {...props} />} 
                        />
                        <Route 
                            path='/personal_details/education' 
                            render={props => <EducationForm userInfo={this.props.userInfo} {...props} />} 
                        />
                        <Route 
                            path='/personal_details/job' 
                            render={props => <JobForm userInfo={this.props.userInfo} {...props} />} 
                        />
                        <Route 
                            path='/personal_details/compensation' 
                            render={props => <CompensationForm userInfo={this.props.userInfo} {...props} />} 
                        />
                        <Route 
                            path='/personal_details/bank' 
                            render={props => <BankForm userInfo={this.props.userInfo} {...props} />} 
                        />
                        <Route 
                            path='/personal_details/contact' 
                            render={props => <ContactForm userInfo={this.props.userInfo} {...props} />} 
                        />
                        <Row style={{ marginTop: '20px' }}>
                            <Route 
                                path='/personal_details/hr_documents' 
                                render={props => <HRDocuments userInfo={this.props.userInfo} {...props} />} 
                            />
                        </Row>
                        <Route 
                            path='/personal_details/settings' 
                            render={props => <PersonalSettings userInfo={this.props.userInfo} {...props} />} 
                        />
                    </Col>
                </Row>
            </Grid>
        );
    }
}

export default withRouter(withTracker(props => {
    const managerPermissionsHandler = Meteor.subscribe('managerPermissions');
    const loading = !managerPermissionsHandler.ready();

    return {
        loading,
        permissions: ManagerPermissions.find().fetch(),
    };
})(PersonalDetails));