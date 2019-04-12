import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import React from 'react';
import { Grid, Row, Col, Button } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';

import CustomCalendar from '../components/CustomCalendar';
import Select from '../components/Select';

import Teams from '../../api/collections/teams';

class Calendar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            absenceType: null,
            team: null,
            employee: null,
            absences: [],
            employees: [],
            holidayDates: [],
        };
    }

    componentDidMount() {
        var nodes = document.querySelectorAll('html, div#root');

        nodes.forEach(node => node.style.background = '#ffffff');

        const filters = { 
            absenceType: this.state.absenceType, 
            team: this.state.team, 
            employee: this.state.employee,
        };

        Meteor.call('getAbsences.filters', filters, (error, response) => {
            if (error) {
                toast.error(error.reason);
            } else {
                var employees = [];

                response.absences.forEach(absence => {
                    let index = employees.findIndex(employee => employee._id === absence.employee._id);

                    if (index === -1) employees.push(absence.employee);
                });

                console.log(response.absences);

                this.setState({ 
                    absences: response.absences, 
                    holidayDates: response.holidayDates, 
                    employees,
                });
            }
        });
    }

    handleOnSelect = (value, stateProp) => {
        var newFilters = {
            absenceType: this.state.absenceType,
            team: this.state.team,
            employee: this.state.employee,
        };

        newFilters[stateProp] = value;

        Meteor.call('getAbsences.filters', newFilters, (error, response) => {
            if (error) {
                toast.error(error.reason);
            } else {
                this.setState({ absences: response.absences, [stateProp]: value });
            }
        });
    }

    render() {
        const customSelectStyle = {
            height: '40px',
            padding: '5px 8px',
            fontSize: '14px'
        };

        const absences = this.state.absences.map(absence => ({ 
            title: absence.employee.fullName,
            startDate: absence.startDate,
            endDate: absence.endDate || absence.startDate,
            sicknessIdentifier: absence.absenceType && absence.absenceType.sicknessIdentifier,
            details: <div style={{ textAlign: 'left' }}>Absence type: {absence.absenceType ? absence.absenceType.name : 'Holiday'}<br />Notes: {absence.notes || 'No notes provided'}</div>,
            type: absence.absenceType ? 'absence' : 'holiday',
        }));

        const holidayDates = this.state.holidayDates.map(holidayDate => ({
            title: holidayDate.name,
            startDate: holidayDate.date,
            endDate: holidayDate.date,
            details: <div style={{ textAlign: 'left' }}>{(holidayDate.holidayType === 'public') ? 'Public holidays' : (holidayDate.holidayType === 'company') ? 'Company holidays' : 'Blocked dates'}</div>,
            type: 'special-date',
        }));

        return (
            <Grid className='calendar page' fluid>
                <Row>
                    <Col sm={12}>
                        <Row>
                            <Col sm={3} style={{ marginTop: '20px', marginBottom: '10px' }}>
                                <h2 style={{ marginTop: 0, marginBottom: 0 }}>Calendar</h2>
                            </Col>
                            <Col sm={9} style={{ marginTop: '20px', marginBottom: '10px' }}>
                                <Row>
                                    <Col sm={3}>
                                        <span className='pull-right' style={{ lineHeight: '40px', fontSize: '18px' }}>Filter by</span>
                                    </Col>
                                    <Col sm={3}>
                                        <Select 
                                            style={customSelectStyle} 
                                            placeholder='All absences' 
                                            options={['Sickness', 'Holidays']} 
                                            selected={this.state.absenceType}
                                            onSelect={value => this.handleOnSelect(value, 'absenceType')} 
                                        />
                                    </Col>
                                    <Col sm={3}>
                                        <Select 
                                            style={customSelectStyle} 
                                            options={this.props.teams} 
                                            placeholder='All teams'
                                            displayKey='name'
                                            selected={this.state.team}
                                            onSelect={value => this.handleOnSelect(value, 'team')} 
                                        />
                                    </Col>
                                    <Col sm={3}>
                                        <Select 
                                            style={customSelectStyle} 
                                            selected={this.state.employee}
                                            options={this.state.employees} 
                                            placeholder='All employees'
                                            displayKey='fullName'
                                            onSelect={value => this.handleOnSelect(value, 'employee')} 
                                        />
                                    </Col>
                                </Row>
                            </Col>
                            <Col smOffset={1} sm={10}>
                                <CustomCalendar absences={holidayDates.concat(absences)} />
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <ToastContainer autoClose={3000} position={toast.POSITION.TOP_CENTER} />
            </Grid>
        );
    }
}

export default withTracker(() => {
    const teamsHandle = Meteor.subscribe('teams.all');
    const loading = !teamsHandle.ready();

    return {
        loading,
        teams: Teams.find().fetch(),
    };
})(Calendar);