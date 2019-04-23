import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data'
import React from 'react';
import { Grid, Row, Col, Button } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';

import AbsenceForm from '../components/forms/AbsenceForm';
import AbsenceTable from '../components/tables/AbsenceTable';

import AbsenceCollection from '../../api/collections/absence';
import AbsenceTypes from '../../api/collections/absenceTypes';
import Summary from '../../api/collections/user_info/summary';

class Absence extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            absenceForm: null,
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.absences.length && this.props.location.state) {
            let absenceIndex = nextProps.absences.findIndex(absence => absence._id === this.props.location.state.absenceId);

            if (!!~absenceIndex) {
                this.setState({ absenceForm: nextProps.absences[absenceIndex] });
            } else {
                toast.error('Absence not found');
            }

            this.props.history.replace({
                pathname: this.props.history.location.pathname,
                state: undefined,
            });
        }
    }

    componentDidMount() {
        var nodes = document.querySelectorAll('html, div#root');

        nodes.forEach(node => node.style.background = '#ffffff');
    }

    openAbsenceForm = () => {
        this.setState({
            absenceForm: {
                _id: '',
                employee: null,
                startDate: null,
                endDate: null,
                absenceType: null,
                notes: ''
            }
        });
    }

    handleSubmit = absence => {
        const methodName = absence._id ? 'absence.update' : 'absence.create';

        Meteor.call(methodName, absence, (error, response) => {
            if (error) {
                switch (error.reason) {
                    case 'DUPLICATE_DOCUMENT':
                        toast.error(error.details);
    
                        break;
                    case 'MISSING_FIELD':
                        let fieldName = error.details.capitalize();
        
                        toast.error(`${fieldName} is required`);
    
                        break
                    default:
                        toast.error(error.reason);
    
                        break;
                }
            } else {
                this.setState({ absenceForm: null });
            }
        });
    }

    handleCancel = () => this.setState({ absenceForm: null });

    handleAbsenceEdit = absence => this.setState({ absenceForm: absence });

    render() {
        return (
            <Grid className='absence page' fluid>
                <Row>
                    <Col sm={12}>
                        <Row>
                            <Col sm={5}>
                                <h2>Absence management</h2>
                            </Col>
                            <Col smOffset={5} sm={2}>
                                {
                                    !this.state.absenceForm
                                    &&
                                    <Button
                                        onClick={this.openAbsenceForm}
                                        bsClass='button-primary'
                                        style={{ marginTop: '20px', marginBottom: '10px' }}
                                    >
                                        Add absence
                                    </Button>
                                }
                            </Col>
                            {
                                this.state.absenceForm ?
                                    <AbsenceForm
                                        absence={this.state.absenceForm}
                                        employees={this.props.employees}
                                        absenceTypes={this.props.absenceTypes}
                                        onSubmit={this.handleSubmit}
                                        onClose={this.handleCancel}
                                        error={toast.error}
                                    />
                                    :
                                    <AbsenceTable
                                        data={this.props.absences}
                                        onAbsenceEdit={this.handleAbsenceEdit}
                                    // onAbsenceDelete={this.handleAbsenceDelete} 
                                    />
                            }
                        </Row>
                    </Col>
                </Row>
                <ToastContainer autoClose={3000} position={toast.POSITION.TOP_CENTER} />
            </Grid>
        );
    }
}

export default withTracker(() => {
    const role = Roles.getRolesForUser(Meteor.userId());
    const absenceHandle = Meteor.subscribe('absence.all');
    const absenceTypesHandle = Meteor.subscribe('absenceTypes.all');
    const employeesHandle = Meteor.subscribe('summary.all');
    const loading = !absenceHandle.ready() || !absenceTypesHandle.ready() || !employeesHandle.ready();

    return {
        loading,
        absenceTypes: AbsenceTypes.find().map(type => ({ _id: type._id, name: type.type })),
        employees: Summary.find().map(employee => ({ _id: employee.userId, fullName: employee.firstName + ' ' + employee.surname })),
        absences: AbsenceCollection.find().fetch()
    };
})(Absence);