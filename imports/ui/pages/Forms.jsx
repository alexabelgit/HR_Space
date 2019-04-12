import React from 'react';
import { Grid, Row, Col, Nav, NavItem } from 'react-bootstrap';
import { Route } from 'react-router-dom';
import { IndexLinkContainer, LinkContainer } from 'react-router-bootstrap';
import { ToastContainer, toast } from 'react-toastify';

import PersonalDetailsForm from '../components/forms/amendment/PersonalDetailsForm';
import BankDetailsForm from '../components/forms/amendment/BankDetailsForm';
import NewJoinerForm from '../components/forms/amendment/NewJoinerForm';
import InductionChecklistForm from '../components/forms/amendment/InductionChecklistForm';
import TrainingForm from '../components/forms/amendment/TrainingForm';
import ExitForm from '../components/forms/amendment/ExitForm';
import SelfCertificationForm from '../components/forms/amendment/SelfCertificationForm';

class Forms extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            employee: {
                firstName: '',
                surname: '',
                department: '',
            }
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.userInfo.userId !== this.props.userInfo.userId) {
            Meteor.call('getEmployeeName.userId', this.props.userInfo.userId || Meteor.userId(), (error, response) => {
                if (error) {
                    toast.error(error.reason);
                } else {
                    this.setState({ employee: response });
                }
            });
        }
    }

    componentDidMount() {
        var nodes = document.querySelectorAll('html, div#root');

        nodes.forEach(node => node.style.background = '#ffffff');

        Meteor.call('getEmployeeName.userId', this.props.userInfo.userId || Meteor.userId(), (error, response) => {
            if (error) {
                toast.error(error.reason);
            } else {
                this.setState({ employee: response });
            }
        });
    }

    render() {
        return (
            <Grid className='forms page' fluid>
                <Row>
                    <Col sm={11}>
                        <Nav bsStyle='tabs' activeKey={1} id='tabs'>
                            <IndexLinkContainer to='/forms/personal_details_change'>
                                <NavItem eventKey={1} className='nav-tab' title='Change of personal details'>
                                    Change of personal details
                                </NavItem>
                            </IndexLinkContainer>
                            <LinkContainer to='/forms/new_joiner'>
                                <NavItem eventKey={2} className='nav-tab' title='New joiner'>
                                    New joiner
                                </NavItem>
                            </LinkContainer>
                            <LinkContainer to='/forms/bank_details_change'>
                                <NavItem eventKey={3} className='nav-tab' title='Change of bank details'>
                                    Change of bank details
                                </NavItem>
                            </LinkContainer>
                            <LinkContainer to='/forms/new_joiner_checklist'>
                                <NavItem eventKey={4} className='nav-tab' title='New joiner checklist'>
                                    New joiner checklist
                                </NavItem>
                            </LinkContainer>
                            <LinkContainer to='/forms/training'>
                                <NavItem eventKey={5} className='nav-tab' title='Training'>
                                    Training
                                </NavItem>
                            </LinkContainer>
                            <LinkContainer to='/forms/exit'>
                                <NavItem eventKey={6} className='nav-tab' title='Exit form'>
                                    Exit form
                                </NavItem>
                            </LinkContainer>
                            <LinkContainer to='/forms/self_certification'>
                                <NavItem eventKey={7} className='nav-tab' title='Self certification'>
                                    Self certification
                                </NavItem>
                            </LinkContainer>
                        </Nav>
                    </Col>
                    <Col sm={11}>
                        <Route path='/forms/new_joiner' render={props => <NewJoinerForm employee={this.state.employee} {...props} />} />
                        <Route path='/forms/personal_details_change' render={props => <PersonalDetailsForm employee={this.state.employee} {...props} />} />
                        <Route path='/forms/bank_details_change' render={props => <BankDetailsForm employee={this.state.employee} {...props} />} />
                        <Route path='/forms/new_joiner_checklist' render={props => <InductionChecklistForm employee={this.state.employee} {...props} />} />
                        <Route path='/forms/training' render={props => <TrainingForm employee={this.state.employee} {...props} />} />
                        <Route path='/forms/exit' render={props => <ExitForm employee={this.state.employee} {...props} />} />
                        <Route path='/forms/self_certification' render={props => <SelfCertificationForm employee={this.state.employee} {...props} />} />
                    </Col>
                </Row>
                <ToastContainer autoClose={3000} position={toast.POSITION.TOP_CENTER} />
            </Grid>
        );
    }
}

export default Forms;