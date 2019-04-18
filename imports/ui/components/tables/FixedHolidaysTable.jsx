import React from 'react';
import { Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import moment from 'moment';

class FixedHolidaysTable extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};

        this.holidayContolsFormatter = this.holidayContolsFormatter.bind(this);
        this.titleFormatter = this.titleFormatter.bind(this);
    }

    handleHolidayEdit(event, row) {
        event.preventDefault();

        this.props.onHolidayEdit(row);
    }

    handleHolidayDelete(event, row) {
        event.preventDefault();

        this.props.onHolidayDelete(row.id);
    }

    titleFormatter(cell, row) {
        return <Link to='#' onClick={e => this.handleHolidayEdit(e, row)}>{cell}</Link>;
    }

    holidayContolsFormatter(cell, row) {
        return (
            <div style={{ textAlign: 'center' }}>
                <Link to='#' onClick={e => this.handleHolidayEdit(e, row)}>Edit</Link>
                <Link to='#' onClick={e => this.handleHolidayDelete(e, row)} style={{ marginLeft: '20px' }}><i className='fa fa-trash-o' style={{ color: '#000000' }}></i> Delete</Link>
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
            <Col sm={12} className='custom-table'>
                <BootstrapTable hover tableHeaderClass='table-header' tableBodyClass='table-body' data={this.props.data}>
                    <TableHeaderColumn dataField='title' dataFormat={this.titleFormatter}>Title</TableHeaderColumn>
                    <TableHeaderColumn dataField='type'>Holiday type</TableHeaderColumn>
                    <TableHeaderColumn dataField='date' dataFormat={this.dateFormatter}>Date</TableHeaderColumn>
                    <TableHeaderColumn dataField='isActive' headerAlign='left' dataAlign='center' dataFormat={this.isActiveFormatter}>Active</TableHeaderColumn>
                    <TableHeaderColumn dataField='id' isKey hidden>ID</TableHeaderColumn>
                    <TableHeaderColumn dataField='holidayControls' dataFormat={this.holidayContolsFormatter}></TableHeaderColumn>
                </BootstrapTable>
            </Col>
        );
    }
}

export default FixedHolidaysTable;