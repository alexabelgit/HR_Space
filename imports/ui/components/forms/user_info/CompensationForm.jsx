import React from 'react';
import { Row, Col, Button, Tabs, Tab } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { ToastContainer, toast } from 'react-toastify';

import Currencies from '../../../../api/collections/currencies';
import BenefitTypes from '../../../../api/collections/benefitTypes';
import BenefitsInKindTypes from '../../../../api/collections/benefitsInKindTypes';
import Salary from '../../../../api/collections/user_info/compensation/salary';
import BonusDetails from '../../../../api/collections/user_info/compensation/bonusDetails';
import BenefitDetails from '../../../../api/collections/user_info/compensation/benefitDetails';
import BenefitsInKind from '../../../../api/collections/user_info/compensation/benefitsInKind';

import SalaryTable from '../../tables/SalaryTable';
import BonusDetailsTable from '../../tables/BonusDetailsTable';
import BenefitDetailsTable from '../../tables/BenefitDetailsTable';
import BenefitsInKindTable from '../../tables/BenefitsInKindTable';
import SalaryForm from './SalaryForm';
import BonusDetailsForm from './BonusDetailsForm';
import BenefitDetailsForm from './BenefitDetailsForm';
import BenefitsInKindForm from './BenefitsInKindForm';
import Summary from '../../../../api/collections/user_info/summary';
import ManagerPermissions from '../../../../api/collections/managementRoles';
import { Roles } from 'meteor/alanning:roles';

class CompensationForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            salaryForm: null,
            bonusForm: null,
            benefitForm: null,
            benefitsInKindForm: null,
            salaries: props.salaries,
            bonuses: props.bonuses,
            benefits: props.benefits,
            benefitsInKindTypes: props.benefitsInKindTypes,
        };

        this.handleSalarySubmit = this.handleSalarySubmit.bind(this);
        this.handleSalaryEdit = this.handleSalaryEdit.bind(this);
        this.handleSalaryDelete = this.handleSalaryDelete.bind(this);
        this.handleBonusSubmit = this.handleBonusSubmit.bind(this);
        this.handleBonusEdit = this.handleBonusEdit.bind(this);
        this.handleBonusDelete = this.handleBonusDelete.bind(this);
        this.handleBenefitSubmit = this.handleBenefitSubmit.bind(this);
        this.handleBenefitEdit = this.handleBenefitEdit.bind(this);
        this.handleBenefitDelete = this.handleBenefitDelete.bind(this);
        this.handleBenefitInKindSubmit = this.handleBenefitInKindSubmit.bind(this);
        this.handleBenefitInKindEdit = this.handleBenefitInKindEdit.bind(this);
        this.handleBenefitInKindDelete = this.handleBenefitInKindDelete.bind(this);
        this.openSalaryForm = this.openSalaryForm.bind(this);
        this.closeSalaryForm = this.closeSalaryForm.bind(this);
        this.openBonusForm = this.openBonusForm.bind(this);
        this.closeBonusForm = this.closeBonusForm.bind(this);
        this.openBenefitForm = this.openBenefitForm.bind(this);
        this.closeBenefitForm = this.closeBenefitForm.bind(this);
        this.openBenefitsInKindForm = this.openBenefitsInKindForm.bind(this);
        this.closeBenefitsInKindForm = this.closeBenefitsInKindForm.bind(this);
        this.isMyTeam = this.isMyTeam.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            salaries: nextProps.salaries,
            bonuses: nextProps.bonuses,
            benefits: nextProps.benefits,
            benefitsInKind: nextProps.benefitsInKind
        });
    }

    isManager() {
        return Roles.userIsInRole(Meteor.userId(), 'manager');
    }

    isMyTeam() {
        if (Meteor.userId() === this.props.userInfo.userId) {
            return true;
        } else {
            return this.props.managersTeam && this.props.managersTeam.includes(this.props.userInfo.userId);
        }
    }

    isEmployee() {
        return Roles.userIsInRole(Meteor.userId(), 'employee');
    }

    isHR() {
        if (this.props.userInfo.userId === Meteor.userId() && Roles.userIsInRole(Meteor.userId(), 'hr')) {
            return true;
        }
        else {
            return false;
        }
    }

    hasPermission() {
        if (this.props.userInfo.userId === Meteor.userId()) {
            return true;
        }

        const { permissions } = this.props;

        if (permissions.length) {
            const { compensationEdit } = permissions[0];

            return compensationEdit;
        }

        return false;
    }

    handleSalarySubmit(salary) {
        var methodName = !salary._id ? 'salary.create' : 'salary.update';

        Meteor.call(methodName, salary, (error, response) => {
            if (error) {
                if (error.reason === 'MISSING_FIELD') {
                    let fieldName = error.details.capitalize();

                    toast.error(`${fieldName} is required`);
                } else {
                    toast.error(error.reason);
                }
            } else {
                toast.success('Saved');
                
                this.setState({ salaryForm: null });
            }
        });
    }

    handleSalaryEdit(event, row) {
        event.preventDefault();

        this.setState({ salaryForm: row });
    }

    handleSalaryDelete(event, row) {
        event.preventDefault();

        Meteor.call('salary.remove', row, (error, response) => {
            if (error) {
                toast.error(error.reason);
            }
        });
    }

    handleBonusSubmit(bonusDetails) {
        var methodName = !bonusDetails._id ? 'bonusDetails.create' : 'bonusDetails.update';

        Meteor.call(methodName, bonusDetails, (error, response) => {
            if (error) {
                if (error.reason === 'MISSING_FIELD') {
                    let fieldName = error.details.capitalize();

                    toast.error(`${fieldName} is required`);
                } else {
                    toast.error(error.reason);
                }
            } else {
                toast.success('Saved');

                this.setState({ bonusForm: null });
            }
        });
    }

    handleBonusEdit(event, row) {
        event.preventDefault();

        this.setState({ bonusForm: row });
    }

    handleBonusDelete(event, row) {
        event.preventDefault();

        Meteor.call('bonusDetails.remove', row, (error, response) => {
            if (error) {
                toast.error(error.reason);
            }
        });
    }

    handleBenefitSubmit(benefit) {
        var methodName = !benefit._id ? 'benefitDetails.create' : 'benefitDetails.update';

        Meteor.call(methodName, benefit, (error, response) => {
            if (error) {
                if (error.reason === 'MISSING_FIELD') {
                    let fieldName = error.details.capitalize();

                    toast.error(`${fieldName} is required`);
                } else if (error.reason === 'DATES_MISMATCH') {
                    toast.error(error.details);
                } else {
                    toast.error(error.reason);
                }
            } else {
                toast.success('Saved');

                this.setState({ benefitForm: null });
            }
        });
    }

    handleBenefitEdit(event, row) {
        event.preventDefault();

        this.setState({ benefitForm: row });
    }

    handleBenefitDelete(event, row) {
        event.preventDefault();

        Meteor.call('benefitDetails.remove', row, (error, response) => {
            if (error) {
                toast.error(error.reason);
            }
        });
    }

    handleBenefitInKindSubmit(benefitInKind) {
        var methodName = !benefitInKind._id ? 'benefitsInKind.create' : 'benefitsInKind.update';

        Meteor.call(methodName, benefitInKind, (error, response) => {
            if (error) {
                if (error.reason === 'MISSING_FIELD') {
                    let fieldName = error.details.capitalize();

                    toast.error(`${fieldName} is required`);
                } else if (error.reason === 'DATES_MISMATCH') {
                    toast.error(error.details);
                } else {
                    toast.error(error.reason);
                }
            } else {
                toast.success('Saved');

                this.setState({ benefitsInKindForm: null });
            }
        });
    }

    handleBenefitInKindEdit(event, row) {
        event.preventDefault();

        this.setState({ benefitsInKindForm: row });
    }

    handleBenefitInKindDelete(event, row) {
        event.preventDefault();

        Meteor.call('benefitsInKind.remove', row, (error, response) => {
            if (error) {
                toast.error(error.reason);
            }
        });
    }

    openSalaryForm(event) {
        event.preventDefault();

        this.setState({
            salaryForm: {
                _id: '',
                userId: this.props.userInfo && this.props.userInfo.userId || Meteor.userId(),
                effectiveDate: new Date(0),
                salary: '',
                frequency: '',
                currency: '',
                notes: ''
            }
        });
    }

    openBonusForm(event) {
        event.preventDefault();

        this.setState({
            bonusForm: {
                _id: '',
                userId: this.props.userInfo && this.props.userInfo.userId || Meteor.userId(),
                date: new Date(0),
                amount: '',
                currency: ''
            }
        });
    }

    openBenefitForm(event) {
        event.preventDefault();

        this.setState({
            benefitForm: {
                id: '',
                userId: this.props.userInfo && this.props.userInfo.userId || Meteor.userId(),
                benefitType: '',
                startDate: new Date(0),
                endDate: new Date(0),
                value: '',
                frequency: ''
            }
        });
    }

    openBenefitsInKindForm(event) {
        event.preventDefault();

        this.setState({
            benefitsInKindForm: {
                _id: '',
                userId: this.props.userInfo && this.props.userInfo.userId || Meteor.userId(),
                benefitType: '',
                startDate: new Date(0),
                endDate: new Date(0),
                value: '',
                frequency: ''
            }
        });
    }

    closeSalaryForm(event) {
        event.preventDefault();

        this.setState({ salaryForm: null })
    }

    closeBonusForm(event) {
        event.preventDefault();

        this.setState({ bonusForm: null });
    }

    closeBenefitForm(event) {
        event.preventDefault();

        this.setState({ benefitForm: null });
    }

    closeBenefitsInKindForm(event) {
        event.preventDefault();

        this.setState({ benefitsInKindForm: null });
    }

    render() {
        return (
            <Row>
                <Col sm={12}>
                    <h2 style={{ marginTop: '40px', marginBottom: '25px' }}>Compensation</h2>
                    <Tabs defaultActiveKey={1} animation={false} id='sub-tabs'>
                        <Tab eventKey={1} tabClassName='nav-sub-tab' title='Salaries'>
                            <Row>
                                <Col sm={5}>
                                    <h2>Salaries</h2>
                                </Col>
                                <Col smOffset={3} sm={2}>
                                    {
                                        !this.state.salaryForm
                                        &&
                                        this.isMyTeam()
                                        &&
                                        this.hasPermission()
                                        &&
                                        !this.isEmployee()
                                        &&
                                        !this.isHR()
                                        &&
                                        <Button
                                            onClick={this.openSalaryForm}
                                            bsClass='button-primary'
                                            style={{ marginTop: '20px', marginBottom: '10px' }}
                                        >
                                            Add salary
                                        </Button>
                                    }
                                </Col>
                                {
                                    this.state.salaryForm ?
                                        <SalaryForm
                                            data={this.state.salaryForm}
                                            currencies={this.props.currencies}
                                            onSubmit={this.handleSalarySubmit}
                                            onClose={this.closeSalaryForm}
                                        />
                                        :
                                        <SalaryTable
                                            isManager={this.isManager}
                                            isEmployee={this.isEmployee}
                                            isHR={this.isHR}
                                            salaries={this.state.salaries}
                                            handleEdit={this.handleSalaryEdit}
                                            handleDelete={this.handleSalaryDelete}
                                        />
                                }
                            </Row>
                        </Tab>
                        <Tab eventKey={2} tabClassName='nav-sub-tab' title='Bonus Details'>
                            <Row>
                                <Col sm={5}>
                                    <h2>Bonus Details</h2>
                                </Col>
                                <Col smOffset={3} sm={2}>
                                    {
                                        !this.state.bonusForm
                                        &&
                                        this.isMyTeam()
                                        &&
                                        this.hasPermission()
                                        &&
                                        !this.isEmployee()
                                        &&
                                        !this.isHR()
                                        &&
                                        <Button
                                            onClick={this.openBonusForm}
                                            bsClass='button-primary'
                                            style={{ marginTop: '20px', marginBottom: '10px' }}
                                        >
                                            Add bonus detail
                                        </Button>
                                    }
                                </Col>
                                {
                                    this.state.bonusForm ?
                                        <BonusDetailsForm
                                            data={this.state.bonusForm}
                                            currencies={this.props.currencies}
                                            onSubmit={this.handleBonusSubmit}
                                            onClose={this.closeBonusForm}
                                        />
                                        :
                                        <BonusDetailsTable
                                            isManager={this.isManager}
                                            isEmployee={this.isEmployee}
                                            isHR={this.isHR}
                                            bonuses={this.state.bonuses}
                                            handleEdit={this.handleBonusEdit}
                                            handleDelete={this.handleBonusDelete}
                                        />
                                }
                            </Row>
                        </Tab>
                        <Tab eventKey={3} tabClassName='nav-sub-tab' title='Benefit Details'>
                            <Row>
                                <Col sm={5}>
                                    <h2>Benefit Details</h2>
                                </Col>
                                <Col smOffset={3} sm={2}>
                                    {
                                        !this.state.benefitForm
                                        &&
                                        this.isMyTeam()
                                        &&
                                        this.hasPermission()
                                        &&
                                        !this.isEmployee()
                                        &&
                                        !this.isHR()
                                        &&
                                        <Button
                                            onClick={this.openBenefitForm}
                                            bsClass='button-primary'
                                            style={{ marginTop: '20px', marginBottom: '10px' }}
                                        >
                                            Add benefit detail
                                        </Button>
                                    }
                                </Col>
                                {
                                    this.state.benefitForm ?
                                        <BenefitDetailsForm
                                            data={this.state.benefitForm}
                                            benefitTypes={this.props.benefitTypes}
                                            onSubmit={this.handleBenefitSubmit}
                                            onClose={this.closeBenefitForm}
                                        />
                                        :
                                        <BenefitDetailsTable
                                            isManager={this.isManager}
                                            isEmployee={this.isEmployee}
                                            isHR={this.isHR}
                                            benefits={this.state.benefits}
                                            handleEdit={this.handleBenefitEdit}
                                            handleDelete={this.handleBenefitDelete}
                                        />
                                }
                            </Row>
                        </Tab>
                        <Tab eventKey={4} tabClassName='nav-sub-tab' title='Benefit in Kind'>
                            <Row>
                                <Col sm={5}>
                                    <h2>Benefit in Kind</h2>
                                </Col>
                                <Col smOffset={3} sm={2}>
                                    {
                                        !this.state.benefitsInKindForm
                                        &&
                                        this.isMyTeam()
                                        &&
                                        this.hasPermission()
                                        &&
                                        !this.isEmployee()
                                        &&
                                        !this.isHR()
                                        &&
                                        <Button
                                            onClick={this.openBenefitsInKindForm}
                                            bsClass='button-primary'
                                            style={{ marginTop: '20px', marginBottom: '10px' }}
                                        >
                                            Add benefit in kind
                                        </Button>
                                    }
                                </Col>
                                {
                                    this.state.benefitsInKindForm ?
                                        <BenefitsInKindForm
                                            data={this.state.benefitsInKindForm}
                                            benefitsInKindTypes={this.props.benefitsInKindTypes}
                                            onSubmit={this.handleBenefitInKindSubmit}
                                            onClose={this.closeBenefitsInKindForm}
                                        />
                                        :
                                        <BenefitsInKindTable
                                            isManager={this.isManager}
                                            isEmployee={this.isEmployee}
                                            isHR={this.isHR}
                                            benefits={this.state.benefitsInKind}
                                            handleEdit={this.handleBenefitInKindEdit}
                                            handleDelete={this.handleBenefitInKindDelete}
                                        />
                                }
                            </Row>
                        </Tab>
                    <ToastContainer autoClose={3000} position={toast.POSITION.TOP_CENTER} />
                    </Tabs>
                </Col>
            </Row>
        );
    }
}

export default withTracker(props => {
    const userId = props.userInfo && props.userInfo.userId || Meteor.userId();
    const dropdownsHandle = Meteor.subscribe('compensationFormDropdowns.businessId');
    const compensationHandle = Meteor.subscribe('compensation.user', userId);
    const managersTeamHandle = Meteor.subscribe('managersTeam');
    const managerPermissionsHandle = Meteor.subscribe('managerPermissions');
    const loading = !dropdownsHandle.ready() || !compensationHandle.ready() || !managersTeamHandle.ready() || !managerPermissionsHandle.ready();

    return {
        loading,
        currencies: Currencies.find({}, { sort: { name: 1 } }).fetch(),
        benefitTypes: BenefitTypes.find({}, { sort: { name: 1 } }).fetch(),
        benefitsInKindTypes: BenefitsInKindTypes.find({}, { sort: { name: 1 } }).fetch(),
        salaries: Salary.find({}, { sort: { effectiveDate: 1 } }).fetch(),
        bonuses: BonusDetails.find().fetch(),
        benefits: BenefitDetails.find().fetch(),
        benefitsInKind: BenefitsInKind.find().fetch(),
        managersTeam: Summary.find().map(summary => summary.userId),
        permissions: ManagerPermissions.find().fetch(),
    };
})(CompensationForm);