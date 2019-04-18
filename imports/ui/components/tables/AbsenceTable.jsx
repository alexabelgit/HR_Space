import React from 'react';
import { Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import moment from 'moment';

class AbsenceTable extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    handleAbsenceEdit = (event, row) => {
        event.preventDefault();

        this.props.onAbsenceEdit(row);
    }

    handleAbsenceDelete = (event, row) => {
        event.preventDefault();

        this.props.onAbsenceDelete(row);
    }

    employeeFormatter = (cell, row) => <Link to='#' onClick={e => this.handleAbsenceEdit(e, row)}>{cell.fullName}</Link>;

    absenceControlsFormatter = (cell, row) => {
        return (
            <div style={{ textAlign: 'center' }}>
                <Link to='#' onClick={e => this.handleAbsenceEdit(e, row)}>Edit</Link>
                {/* <Link to='#' onClick={e => this.handleAbsenceDelete(e, row)} style={{ marginLeft: '20px' }}><i className='fa fa-trash-o' style={{ color: '#000000' }}></i> Delete</Link> */}
            </div>
        );
    }

    dateFormatter(cell, row) {
        return (+cell) ? moment(cell).format('DD/MM/YYYY') : 'Not set';
    }

    render() {
        return (
            <Col sm={12} className='custom-table'>
                <BootstrapTable hover tableHeaderClass='table-header' tableBodyClass='table-body' data={this.props.data}>
                    <TableHeaderColumn dataField='_id' isKey hidden>ID</TableHeaderColumn>
                    <TableHeaderColumn dataField='employee' dataFormat={this.employeeFormatter}>Employee</TableHeaderColumn>
                    <TableHeaderColumn dataField='absenceType' dataFormat={(cell, row) => cell.name}>Reason</TableHeaderColumn>
                    <TableHeaderColumn dataField='startDate' dataFormat={this.dateFormatter}>Start date</TableHeaderColumn>
                    <TableHeaderColumn dataField='endDate' dataFormat={this.dateFormatter}>Return date</TableHeaderColumn>
                    <TableHeaderColumn dataField='absenceControls' dataFormat={this.absenceControlsFormatter}></TableHeaderColumn>
                </BootstrapTable>
            </Col>
        );
    }
}

export default AbsenceTable;