import { Meteor } from 'meteor/meteor';
import React from 'react';
import { Modal, Button, Row, Col, Nav, Navbar, Glyphicon, Form, FormGroup, FormControl, ControlLabel, Image as ReactImage, Media, MenuItem } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import classnames from 'classnames';
import { withTracker } from 'meteor/react-meteor-data';
import { toast, ToastContainer } from 'react-toastify';

import EmployeesDropdown from './EmployeesDropdown'
import FieldGroup from './FieldGroup';

import Summary from '../../api/collections/user_info/summary';

class Header extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            searchFocused: false,
            showHireModal: false,
            employee: {
                fullName: '',
                position: '',
                profilePic: '/img/no-avatar.png',
            }
        };
    }

    componentDidMount() {
        Meteor.call('getEmployeeInfo', (error, response) => {
            if (error) {
                toast.error(error.reason);
            } else {
                this.setState({ employee: response });
            }
        });
    }

    handleClick = event => Meteor.logout();

    handleSearchFocus = event => this.setState({ searchFocused: true });

    handleSearchBlur = event => {
        event.stopPropagation();

        setTimeout(() => {
            this.searchInput.value = '';

            this.setState({ searchFocused: false });
        }, 100);
    };

    handleSearch = event => {
        event.preventDefault();

        if (this.state.searchFocused) {
            const query = this.searchInput.value.trim();

            this.props.history.push(`/search/${query}`);
        }
    };

    handleHireSelect = () => this.setState({ showHireModal: true });

    closeHireModal = () => this.setState({ showHireModal: false });

    handleHire = () => {
        this.setState({ showHireModal: false });

        const firstName = this.firstNameInput.value.trim();
        const surname = this.lastNameInput.value.trim();

        this.props.onUserInfoChange({ userId: null, isNew: true, firstName, surname });

        if (this.props.location.pathname !== '/personal_details/summary') {
            this.props.history.push('/personal_details/summary');
        }
    };

    handleUserInfoChange = id => {
        this.props.onUserInfoChange({ userId: id, isNew: false });
    };

    handleKeyUp = event => {
        if (this.state.searchFocused && (event.key === 'Enter')) {
            const query = this.searchInput.value.trim();

            this.props.history.push(`/search/${query}`);
        }
    };

    render() {
        if (!this.props.userInfo.userId) {
            selected = this.props.userInfo.firstName + ' ' + this.props.userInfo.surname;
        } else {
            let user = this.props.employees.filter(employee => employee.userId === this.props.userInfo.userId)[0];

            selected = user ? (user.firstName + ' ' + user.surname) : 'Loading...';
        }

        return (
            <Navbar id='header' fluid>
                <Row>
                    {
                        (this.props.role !== 'super_admin')
                        &&
                        <Col sm={6}>
                            <Navbar.Header style={{ width: '100%' }}>
                                <Navbar.Form
                                    style={{ margin: '12px 0', padding: '0' }}
                                >
                                    <FormGroup style={{ width: '100%' }}>
                                        <FormControl
                                            onFocus={this.handleSearchFocus}
                                            onBlur={this.handleSearchBlur}
                                            onKeyUp={this.handleKeyUp}
                                            inputRef={ref => this.searchInput = ref}
                                            bsClass='input search'
                                            type='text'
                                            placeholder={this.state.searchFocused ? '' : 'Search'}
                                        />
                                        <Button
                                            type='submit'
                                            className={classnames('search-button', { 'active': this.state.searchFocused })}
                                            onClick={this.handleSearch}
                                        >
                                            <Glyphicon glyph='search' />
                                        </Button>
                                    </FormGroup>
                                </Navbar.Form>
                            </Navbar.Header>
                        </Col>
                    }
                    <Col className='pull-right' sm={3}>
                        <div className='user-info-container'>
                            <Media style={{ marginTop: '12px' }}>
                                <Media.Left align='top'>
                                    <ReactImage width={56} height={56} src={this.state.employee.profilePic} rounded />
                                </Media.Left>
                                <Media.Right style={{ paddingLeft: '0' }}>
                                    <Media.Heading style={{ marginTop: '5px', color: '#484747' }}>
                                        <p>{this.state.employee.fullName}</p>
                                    </Media.Heading>
                                    <Media.Body>
                                        <p style={{ color: '#929292' }}>{this.state.employee.position}</p>
                                    </Media.Body>
                                </Media.Right>
                            </Media>
                            <div className='header-popup-menu'>
                                <Button bsClass='button-primary' onClick={this.handleClick}>Sign Out</Button>
                            </div>
                        </div>
                    </Col>
                    {
                        ((this.props.role !== 'super_admin') && (this.props.role !== 'employee'))
                        &&
                        <Col className='pull-right' sm={3}>
                            <EmployeesDropdown
                                selected={selected}
                                employees={this.props.employees}
                                onUserInfoChange={this.props.onUserInfoChange}
                                onHireSelect={this.handleHireSelect}
                            />
                            <Modal show={this.state.showHireModal} onHide={this.closeHireModal}>
                                <Modal.Header>
                                    <Modal.Title>Hire a new employee</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <Row>
                                        <Form horizontal>
                                            <FieldGroup
                                                id='firstName'
                                                label='First name'
                                                type='text'
                                                inputsize={8}
                                                inputRef={ref => this.firstNameInput = ref}
                                            />
                                            <FieldGroup
                                                id='lastName'
                                                label='Last name'
                                                type='text'
                                                inputsize={8}
                                                inputRef={ref => this.lastNameInput = ref}
                                            />
                                        </Form>
                                    </Row>
                                </Modal.Body>
                                <Modal.Footer>
                                    <div style={{ display: 'inline-block', float: 'right', marginLeft: '15px' }}>
                                        <Button
                                            style={{ width: 'auto' }}
                                            bsClass='button-secondary'
                                            onClick={this.closeHireModal}
                                        >
                                            Close
                                    </Button>
                                    </div>
                                    <div style={{ display: 'inline-block', float: 'right' }}>
                                        <Button
                                            style={{ width: 'auto' }}
                                            bsClass='button-primary'
                                            onClick={this.handleHire}
                                        >
                                            Continue
                                    </Button>
                                    </div>
                                </Modal.Footer>
                            </Modal>
                        </Col>
                    }
                </Row>
            </Navbar>
        );
    }
}

export default withRouter(withTracker(props => {
    const isManager = Roles.userIsInRole(Meteor.userId(), 'manager');
    const newUserId = props.userInfo.userId || Meteor.userId();
    const summariesHandle = Meteor.subscribe(isManager ? 'managersTeam' : 'summary.all', newUserId);
    const loading = !summariesHandle.ready();

    return {
        loading,
        employees: Summary.find({}, { sort: { firstName: 1 }, fields: { 'userId': 1, 'firstName': 1, 'surname': 1 } }).fetch()
    };
})(Header));