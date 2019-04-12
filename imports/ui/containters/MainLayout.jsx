import { Meteor } from 'meteor/meteor';
import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { withTracker } from 'meteor/react-meteor-data';
import { ToastContainer, toast } from 'react-toastify';

import MainGrid from '../containters/MainGrid';

import Login from '../pages/Login';
import Signup from '../pages/Signup';
import SuperSignup from '../pages/SuperSignup';
import Main from '../pages/Main';
import PersonalDetails from '../pages/PersonalDetails';
import HRDocuments from '../pages/HRDocuments';
import Absence from '../pages/Absence';
import Announcements from '../pages/Announcements';
import FixedHolidays from '../pages/FixedHolidays';
import AbsenceTypes from '../pages/AbsenceTypes';
import Teams from '../pages/Teams';
import Currencies from '../pages/Currencies';
import EmploymentTypes from '../pages/EmploymentTypes';
import BenefitTypes from '../pages/BenefitTypes';
import BenefitsInKind from '../pages/BenefitsInKind';
import Departments from '../pages/Departments';
import HolidaysStatus from '../pages/HolidaysStatus';
import ManagementRoles from '../pages/ManagementRoles';
import Calendar from '../pages/Calendar';
import WorkingPatterns from '../pages/WorkingPatterns';
import HRPolicies from '../pages/HRPolicies';
import Search from '../pages/Search';
import UserAccounts from '../pages/UserAccounts';
import ContentPages from '../pages/ContentPages';
import CodeOfConduct from '../pages/CodeOfConduct';
import AboutUs from '../pages/AboutUs';
import PublicHolidays from '../pages/PublicHolidays';
import BlockedDates from '../pages/BlockedDates';
import CompanyHolidays from '../pages/CompanyHolidays';
import CompanyDetails from '../pages/CompanyDetails';
import Forms from '../pages/Forms';
import TeamAbsence from '../pages/TeamAbsence';
import ResetPassword from '../pages/ResetPassword';

import NotFound from '../pages/NotFound';

import { Authorization } from '../components/Authorization';

import Summary from '../../api/collections/user_info/summary';

const Employee = Authorization(['admin', 'hr', 'manager', 'employee']);
const Manager = Authorization(['admin', 'hr', 'manager']);
const HR = Authorization(['admin', 'hr']);
const Admin = Authorization(['admin']);
const AdminAndSuperAdmin = Authorization(['admin', 'super_admin', 'hr']);
const SuperAdmin = Authorization(['super_admin']);

class MainLayout extends React.Component {
    constructor() {
        super();

        this.state = {
            userInfo: { userId: Meteor.userId(), isNew: false },
            hiringFromSummaryForm: false
        };
    }

    handleUserInfoChange = userInfo => {
        if (window.location.pathname === '/personal_details/summary') {
            this.setState({ userInfo, hiringFromSummaryForm: true });
        } else {
            this.setState({ userInfo, hiringFromSummaryForm: false });
        }
    }

    handleHire = userInfo => {
        this.setState({ userInfo });

        toast.success('Saved');
    }

    handleSummaryFormClose = () => {
        if (this.state.userInfo.isNew && !this.state.hiringFromSummaryForm) {
            this.setState({ userInfo: { userId: Meteor.userId(), isNew: false } });
        }
    }

    render() {
        const mainProps = {
            userInfo: this.state.userInfo,
            onLoginUserInfoChange: this.handleUserInfoChange,
        };

        const personalDetailsProps = {
            userInfo : this.state.userInfo,
            onUserInfoChange: this.handleHire,
            onSummaryFormClose: this.handleSummaryFormClose,
        };

        const formsProps = { 
            userInfo: this.state.userInfo 
        };

        const searchProps = {
            userInfo: this.state.userInfo,
        };

        return (
            <Router>
                <Switch>
                    <Route path='/login' exact render={props => this.props.currentUser ? <Redirect to={{ pathname: '/dashboard', state: { userId: Meteor.userId(), isNew: false } }} /> : <Login {...props} />} />
                    <Route path='/signup/:token?' exact render={props => this.props.currentUser ? <Redirect to={{ pathname: '/dashboard', state: { userId: Meteor.userId(), isNew: false } }} /> : <Signup {...props} />} />
                    <Route path='/super_signup/' exact render={props => this.props.currentUser ? <Redirect to={{ pathname: '/dashboard', state: { userId: Meteor.userId(), isNew: false } }} /> : <SuperSignup {...props} />} />
                    <Route path='/reset_password/:token' exact render={props => this.props.currentUser ? <Redirect to={{ pathname: '/dashboard', state: { userId: Meteor.userId(), isNew: false } }} /> : <ResetPassword {...props} />} />
                {
                    this.props.loggingIn ? 
                        <div style={{ fontSize: '20px', fontWeight: 'bold', opacity: 0.5, margin: '15px' }}>
                            Loading...
                        </div>
                        :
                        <MainGrid userInfo={this.state.userInfo} onUserInfoChange={this.handleUserInfoChange}>
                            <Route path='/' exact render={() => <Redirect to='/dashboard' />} />
                            <Route path='/dashboard' exact component={Employee(Main, mainProps)} />
                            <Route path='/search/:query?' component={Employee(Search, searchProps)} />
                            <Route path='/personal_details' component={Employee(PersonalDetails, personalDetailsProps)} />
                            <Route path='/holidays_status' exact component={Employee(HolidaysStatus, this.state)} />
                            <Route path='/hr_documents' exact component={Employee(HRDocuments, this.state)} />
                            <Route path='/absence' exact component={Manager(Absence)} />
                            <Route path='/announcements' exact component={Manager(Announcements)} />
                            <Route path='/fixed_holidays' exact component={Manager(FixedHolidays)} />
                            <Route path='/absence_types' exact component={HR(AbsenceTypes)} />
                            <Route path='/teams' exact component={HR(Teams)} />
                            <Route path='/currencies' exact component={HR(Currencies)} />
                            <Route path='/employment_types' exact component={HR(EmploymentTypes)} />
                            <Route path='/benefit_types' exact component={HR(BenefitTypes)} />
                            <Route path='/benefits_in_kind' exact component={HR(BenefitsInKind)} />
                            <Route path='/departments' exact component={HR(Departments)} />
                            <Route path='/management_roles' exact component={HR(ManagementRoles)} />
                            <Route path='/calendar' exact component={Employee(Calendar)} />
                            <Route path='/working_patterns' exact component={HR(WorkingPatterns)} />
                            <Route path='/hr_policies' exact component={AdminAndSuperAdmin(HRPolicies)} />
                            <Route path='/hr_policies/:id' exact component={Employee(CodeOfConduct)} />
                            <Route path='/content_pages' exact component={AdminAndSuperAdmin(ContentPages)} />
                            <Route path='/content_pages/:id' exact component={Employee(AboutUs)} />
                            <Route path='/code_of_conduct' exact component={Employee(CodeOfConduct)} />
                            <Route path='/about_us' exact component={Employee(AboutUs)} />
                            <Route path='/blocked_dates' exact component={HR(BlockedDates)} />
                            <Route path='/public_holidays' exact component={HR(PublicHolidays)} />
                            <Route path='/company_holidays' exact component={HR(CompanyHolidays)} />
                            <Route path='/user_accounts' exact component={SuperAdmin(UserAccounts)} />
                            <Route path='/company_details' exact component={HR(CompanyDetails)} />
                            <Route path='/forms' component={Employee(Forms, formsProps)} />
                            <Route path='/team_absence' component={Manager(TeamAbsence)} />
                        </MainGrid>
                }
                    <ToastContainer autoClose={3000} position={toast.POSITION.TOP_CENTER} />
                </Switch>
            </Router>
        );
    }
}

export default withTracker(() => {
    return {
        loggingIn: Meteor.loggingIn(),
        currentUser: Meteor.user()
    };
})(MainLayout);