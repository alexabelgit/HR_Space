import React from 'react';
import { Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import moment from 'moment';

class PublicHolidaysTable extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};

        this.holidayControlsFormatter = this.holidayControlsFormatter.bind(this);
    }

    handlePublicHolidayEdit(event, row) {
        event.preventDefault();

        this.props.onDataEdit(row);
    }

    handlePublicHolidayDelete(event, row) {
        event.preventDefault();

        this.props.onDataDelete(row);
    }

    publicHolidayFormatter(cell, row) {
        return <Link to='#' onClick={e => this.handlePublicHolidayEdit(e, row)}>{cell}</Link>;
    }

    holidayControlsFormatter(cell, row) {
        return (
            <div style={{ textAlign: 'center' }}>
                <Link to='#' onClick={e => this.handlePublicHolidayEdit(e, row)}>Edit</Link>
                <Link to='#' onClick={e => this.handlePublicHolidayDelete(e, row)} style={{ marginLeft: '20px' }}><i className='fa fa-trash-o' style={{ color: '#000000' }}></i> Delete</Link>
            </div>
        );
    }

    dateFormatter(cell, row) {
        return moment(cell).format('DD/MM/YYYY');
    }

    isActiveFormatter(cell, row) {
        if (cell) return <i className='fa fa-check'></i>;
        else return '';
    }

    render() {
        return (
            <Col sm={8} className='custom-table'>
                <BootstrapTable hover tableHeaderClass='table-header' tableBodyClass='table-body' data={this.props.data}>
                    <TableHeaderColumn dataField='name' dataFormat={this.publicHolidayFormatter}>Public holiday</TableHeaderColumn>
                    <TableHeaderColumn dataField='date' dataFormat={this.dateFormatter} width='20%'>Date</TableHeaderColumn>
                    <TableHeaderColumn dataField='isActive' dataFormat={this.isActiveFormatter} width='20%' headerAlign='left' dataAlign='center'>Active</TableHeaderColumn>
                    <TableHeaderColumn dataField='_id' isKey hidden>ID</TableHeaderColumn>
                    <TableHeaderColumn dataField='absenceTypeControls' dataFormat={this.holidayControlsFormatter}></TableHeaderColumn>
                </BootstrapTable>
            </Col>
        );
    }
}

export default PublicHolidaysTable;