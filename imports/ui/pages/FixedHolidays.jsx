import React from 'react';
import { Grid, Row, Col, Button } from 'react-bootstrap';

import FixedHolidaysTable from '../components/tables/FixedHolidaysTable';
import FixedHolidayForm from '../components/forms/FixedHolidayForm';

import { Random } from 'meteor/random';

class FixedHolidays extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            holidayForm: null,
            holidays: [
                {
                    id: Random.id(),
                    title: 'Holiday title',
                    type: 'Company',
                    date: new Date(),
                    isActive: true
                },
                {
                    id: Random.id(),
                    title: 'Holiday title',
                    type: 'Company',
                    date: new Date(),
                    isActive: true
                },
                {
                    id: Random.id(),
                    title: 'Holiday title',
                    type: 'Company',
                    date: new Date(),
                    isActive: true
                },
                {
                    id: Random.id(),
                    title: 'Holiday title',
                    type: 'Company',
                    date: new Date(),
                    isActive: true
                },
                {
                    id: Random.id(),
                    title: 'Holiday title',
                    type: 'Company',
                    date: new Date(),
                    isActive: true
                },
                {
                    id: Random.id(),
                    title: 'Holiday title',
                    type: 'Company',
                    date: new Date(),
                    isActive: true
                },
                {
                    id: Random.id(),
                    title: 'Holiday title',
                    type: 'Company',
                    date: new Date(),
                    isActive: true
                },
            ]
        };

        this.openHolidayForm = this.openHolidayForm.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleHolidayEdit = this.handleHolidayEdit.bind(this);
        this.handleHolidayDelete = this.handleHolidayDelete.bind(this);
    }

    componentDidMount() {
        var nodes = document.querySelectorAll('html, div#root');

        nodes.forEach(node => node.style.background = '#ffffff');
    }

    openHolidayForm(event) {
        event.preventDefault();

        this.setState({ holidayForm: true });
    }

    handleSubmit(holiday) {
        var index = this.state.holidays.findIndex(h => h.id === holiday.id);

        if (index !== -1) {
            var newHolidaysArr = this.state.holidays.slice();

            newHolidaysArr[index] = holiday;

            this.setState({ holidays: newHolidaysArr, holidayForm: null });
        } else {
            this.setState({ holidays: this.state.holidays.concat([holiday]), holidayForm: null });
        }
    }

    handleCancel() {
        this.setState({ holidayForm: false });
    }

    handleHolidayEdit(holiday) {
        this.setState({ holidayForm: holiday });
    }

    handleHolidayDelete(holidayId) {
        var newHolidaysArr = this.state.holidays.filter(holiday => holiday.id !== holidayId);

        this.setState({ holidays: newHolidaysArr });
    }

    render() {
        return (
            <Grid className='fixed-holidays page' fluid>
                <Row>
                    <Col sm={9}>
                        <Row>
                            <Col sm={5}>
                            <h2>{!this.state.holidayForm ? 'Fixed holidays' : 
                                        this.state.holidayForm.title ? 'Edit fixed holiday' : 'Add new fixed holiday'}</h2>
                            </Col>
                            <Col smOffset={4} sm={3}>
                                {
                                    !this.state.holidayForm
                                    &&
                                    <Button
                                        onClick={this.openHolidayForm}
                                        bsClass='button-primary'
                                        style={{ marginTop: '20px', marginBottom: '10px' }}
                                    >
                                        Add fixed holiday
                                    </Button>
                                }
                            </Col>
                            {
                                this.state.holidayForm ?
                                    <FixedHolidayForm holiday={this.state.holidayForm} onSubmit={this.handleSubmit} onClose={this.handleCancel} />
                                    :
                                    <FixedHolidaysTable data={this.state.holidays} onHolidayEdit={this.handleHolidayEdit} onHolidayDelete={this.handleHolidayDelete} />
                            }
                        </Row>
                    </Col>
                </Row>
            </Grid>
        );
    }
}

export default FixedHolidays;