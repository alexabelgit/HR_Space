import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

import React from 'react';
import { Nav, Navbar, NavItem, Image as ReactImage } from 'react-bootstrap';
import { IndexLinkContainer, LinkContainer } from 'react-router-bootstrap';
import { withRouter } from 'react-router-dom';

import HRPoliciesCollection from '../../api/collections/hrPolicies';
import ContentPagesCollection from '../../api/collections/contentPages';

const SuperAdminNavigation = () => (
    <div>
        <LinkContainer to='#' className='nav-item'>
            <NavItem disabled>SUPER ADMIN</NavItem>
        </LinkContainer>
        <LinkContainer to='/user_accounts' className='nav-item'>
            <NavItem>User Accounts</NavItem>
        </LinkContainer>
        <LinkContainer to='/hr_policies' className='nav-item'>
            <NavItem>Employee Handbook Maintenance</NavItem>
        </LinkContainer>
        <LinkContainer to='/content_pages' className='nav-item'>
            <NavItem>About Us</NavItem>
        </LinkContainer>
    </div>
);

const AdminNavigation = () => (
    <div>
        <LinkContainer to='#' className='nav-item'>
            <NavItem disabled>ADMIN</NavItem>
        </LinkContainer>
        <LinkContainer to='/announcements' className='nav-item'>
            <NavItem>Announcements</NavItem>
        </LinkContainer>
        <LinkContainer to='/hr_policies' className='nav-item'>
            <NavItem>Employee Handbook</NavItem>
        </LinkContainer>
        <LinkContainer to='/content_pages' className='nav-item'>
            <NavItem>About Us</NavItem>
        </LinkContainer>
        <LinkContainer to='/currencies' className='nav-item'>
            <NavItem>Currencies</NavItem>
        </LinkContainer>
        <LinkContainer to='/departments' className='nav-item'>
            <NavItem>Departments</NavItem>
        </LinkContainer>
        <LinkContainer to='/teams' className='nav-item'>
            <NavItem>Teams</NavItem>
        </LinkContainer>
        <LinkContainer to='/employment_types' className='nav-item'>
            <NavItem>Employment Types</NavItem>
        </LinkContainer>
        <LinkContainer to='/benefit_types' className='nav-item'>
            <NavItem>Benefit Types</NavItem>
        </LinkContainer>
        <LinkContainer to='/benefits_in_kind' className='nav-item'>
            <NavItem>Benefits in Kind</NavItem>
        </LinkContainer>
        <LinkContainer to='/absence_types' className='nav-item'>
            <NavItem>Reason for Absense</NavItem>
        </LinkContainer>
        <LinkContainer to='/management_roles' className='nav-item'>
            <NavItem>Roles</NavItem>
        </LinkContainer>
    </div>
);

const HRNavigation = ({ role }) => (
    <div>
        <LinkContainer to='#' className='nav-item'>
            <NavItem disabled>HR</NavItem>
        </LinkContainer>
        <LinkContainer to='#' className='nav-item'>
            <NavItem>Reports</NavItem>
        </LinkContainer>
        {/* {
            (role !== 'admin')
            &&
            <LinkContainer to='/announcements' className='nav-item'>
                <NavItem>Announcements</NavItem>
            </LinkContainer>
        } */}
        <LinkContainer to='/working_patterns' className='nav-item'>
            <NavItem>Working Patterns</NavItem>
        </LinkContainer>
        <LinkContainer to='/company_holidays' className='nav-item'>
            <NavItem>Company Holidays</NavItem>
        </LinkContainer>
        <LinkContainer to='/public_holidays' className='nav-item'>
            <NavItem>Public Holidays</NavItem>
        </LinkContainer>
        <LinkContainer to='/blocked_dates' className='nav-item'>
            <NavItem>Blocked Dates</NavItem>
        </LinkContainer>
        <LinkContainer to='/company_details' className='nav-item'>
            <NavItem>My Company Details</NavItem>
        </LinkContainer>
    </div>
);

const ManagerNavigation = ({ policies, contentPages }) => (
    <div>
        <LinkContainer to='#'>
            <NavItem disabled>MANAGERS</NavItem>
        </LinkContainer>
        {
            policies.map(policy => (
                <LinkContainer to={`/hr_policies/${policy._id}`} key={policy._id} className='nav-item'>
                    <NavItem>{policy.name}</NavItem>
                </LinkContainer>
            ))
        }
        {
            contentPages.map(page => (
                <LinkContainer to={`/content_pages/${page._id}`} key={page._id} className='nav-item'>
                    <NavItem>{page.name}</NavItem>
                </LinkContainer>
            ))
        }
        <LinkContainer to='/announcements' className='nav-item'>
            <NavItem>Announcements</NavItem>
        </LinkContainer>
    </div>
);

const AllNavigation = ({ policies, contentPages }) => (
    <div>
        
        <LinkContainer to='/dashboard' className='nav-item'>
            <NavItem><i className='fa fa-th'></i>Your Dashboard</NavItem>
        </LinkContainer>
        <LinkContainer to='/forms/personal_details_change' className='nav-item'>
            <NavItem><i className='fa fa-th-list'></i>Forms</NavItem>
        </LinkContainer>
        {/* <LinkContainer to='/about_us' className='nav-item'>
            <NavItem>
                <div style={{ display: 'inline-block', width: '14px', height: '14px', borderRadius: '4px', marginRight: '13px', background: 'rgba(255, 255, 255, 0.3)' }}>
                    <ReactImage width={14} height={14} style={{ verticalAlign: 'initial' }} src='/img/logo-icon.png' />
                </div>
                About Us
            </NavItem>
        </LinkContainer>
        <LinkContainer to='/code_of_conduct' className='nav-item'>
            <NavItem><i className='fa fa-file-text'></i>Code of Conduct</NavItem>
        </LinkContainer> */}
        <LinkContainer to='#'>
            <NavItem disabled>Employee Handbook</NavItem>
        </LinkContainer>
        {
            policies.map(policy => (
                <LinkContainer to={'/hr_policies/' + policy._id} key={policy._id} className='nav-item'>
                    <NavItem>{policy.name}</NavItem>
                </LinkContainer>
            ))
        }
        <LinkContainer to='#'>
            <NavItem disabled>About Us</NavItem>
        </LinkContainer>
        {
            contentPages.map(page => (
                <LinkContainer to={'/content_pages/' + page._id} key={page._id} className='nav-item'>
                    <NavItem>{page.name}</NavItem>
                </LinkContainer>
            ))
        }
    </div>
);

const RoleNavigation = props => {
    const { role, policies, contentPages } = props;

    if (role === 'super_admin') return <SuperAdminNavigation />;
    else if (role === 'admin' || role === 'hr') return <div><HRNavigation {...props} /><AdminNavigation /></div>;
    // else if (role === 'hr') return <HRNavigation />;
    else if (role === 'manager') return <ManagerNavigation role={role} policies={policies.filter(policy => policy.access === 'manager')} contentPages={contentPages.filter(contentPage => contentPage.access === 'manager')} />;
    else return null;
};

class Sidebar extends React.Component {
    render() {
        const { role } = this.props;

        return (
            <div id='sidebar'>
                <div style={{ textAlign: 'center', marginTop: '35px' }}>
                    <ReactImage src='/img/logo.png' />
                </div>
                <Nav>
                    {
                        (role !== 'super_admin')
                        &&
                        <AllNavigation 
                            policies={this.props.policies} 
                            contentPages={this.props.contentPages} 
                        />
                    }
                    <RoleNavigation 
                        role={this.props.role} 
                        policies={this.props.policies} 
                        contentPages={this.props.contentPages}
                    />
                </Nav>
            </div>
        );
    }
}

export default withRouter(withTracker(() => {
    const policiesHandle = Meteor.subscribe('hrPolicies.business');
    const contentPagesHandle = Meteor.subscribe('contentPages.business');
    const loading = !policiesHandle.ready() || !contentPagesHandle.ready();

    return {
        loading,
        policies: HRPoliciesCollection.find().fetch(),
        contentPages: ContentPagesCollection.find().fetch()
    };
})(Sidebar));