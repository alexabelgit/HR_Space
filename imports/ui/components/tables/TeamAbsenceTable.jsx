import React from 'react';
import { Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import moment from 'moment';

class TeamAbsenceTable extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    dateFormatter = (cell, row) => cell ? moment(cell).format('DD/MM/YYYY') : 'Not set';

    render() {
        return (
            <Col sm={12} className='custom-table'>
                <BootstrapTable hover tableHeaderClass='table-header' tableBodyClass='table-body' data={this.props.data}>
                    <TableHeaderColumn dataField='_id' isKey hidden>ID</TableHeaderColumn>
                    <TableHeaderColumn dataField='employee' dataFormat={(cell, row) => cell.fullName}>Name</TableHeaderColumn>
                    <TableHeaderColumn dataField='absenceType'>Type of sickness</TableHeaderColumn>
                    <TableHeaderColumn dataField='startDate' dataFormat={this.dateFormatter}>Start date</TableHeaderColumn>
                    <TableHeaderColumn dataField='endDate' dataFormat={this.dateFormatter}>End date</TableHeaderColumn>
                    <TableHeaderColumn dataField='totalDays'>Total sickness days</TableHeaderColumn>
                </BootstrapTable>
            </Col>
        );
    }
}

export default TeamAbsenceTable;