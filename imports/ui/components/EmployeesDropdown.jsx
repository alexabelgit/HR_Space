import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import React from 'react';
import { DropdownButton, MenuItem, HelpBlock, Modal, Button } from 'react-bootstrap';
import classnames from 'classnames';

import Summary from '../../api/collections/user_info/summary';
import { Roles } from 'meteor/alanning:roles';

class EmployeesDropdown extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    handleSelect = employee => {
        this.props.onUserInfoChange({ userId: employee.userId, isNew: false });
    }

    handleHireSelect = event => {
        this.props.onHireSelect();
    }

    render() {
        // console.log('dropdown', this.props.employees);
        const title = <div>{this.props.selected} <i className='caret fa fa-chevron-down'></i></div>;
        const isEmployee = Roles.userIsInRole(Meteor.userId(), 'employee');
        const isManager = Roles.userIsInRole(Meteor.userId(), 'manager');
        return (
            <div>
                <DropdownButton
                    id='employees-dropdown'
                    className='custom-select'
                    title={title}
                    style={{ marginTop: '12px', height: '56px', overflowX: 'hidden' }}
                >
                {
                    !this.props.employees.length
                    &&
                    <MenuItem disabled>No employees yet</MenuItem>
                }
                {
                    this.props.employees.map((employee, index) => (
                        <MenuItem
                            key={employee._id}
                            onSelect={e => this.handleSelect(employee)}
                        >
                            {`${employee.firstName} ${employee.surname}`}
                        </MenuItem>
                    ))
                }
                    {!isEmployee && !isManager && <MenuItem divider />}
                    {!isEmployee && !isManager && <MenuItem onSelect={this.handleHireSelect}>Hire...</MenuItem>}
                </DropdownButton>
            </div>
        );
    }
}

// export default withTracker(() => {
//     const summaryHandle = Meteor.subscribe('summary.all');
//     const loading = !summaryHandle.ready();

//     return {
//         loading,
//         employees: Summary.find({}, { fields: { 'userId': 1, 'firstName': 1, 'surname': 1 } }).fetch()
//     };
// })(EmployeesDropdown);
export default EmployeesDropdown;