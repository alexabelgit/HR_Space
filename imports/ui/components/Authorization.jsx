import React from 'react';
import { Redirect } from 'react-router-dom';
import { Roles } from 'meteor/alanning:roles';

export const Authorization = (allowedRoles) => (WrappedComponent, componentProps) => {
    return class WithAuthorization extends React.Component {
        constructor(props) {
            super(props);

            this.state = {};
        }

        componentDidMount() {
            window.scrollTo(0, 0);
        }

        render() {
            if (Meteor.userId()) {
                var allowedRoles =  Roles.getRolesForUser(Meteor.userId())[0];
                
                if (Roles.userIsInRole(Meteor.userId(), allowedRoles)) {
                    return <WrappedComponent {...this.props} {...componentProps} />;
                } else {
                    console.log('Meteor.userId(): ' + Meteor.userId());
                    console.log('Roles.getRolesForUser(Meteor.userId()): ' + Roles.getRolesForUser(Meteor.userId()));
                    return <div style={{ marginLeft: '15px' }}>Access denied</div>;
                }
            } else {
                return <Redirect to='/login' />;
            }
        }
    };
};