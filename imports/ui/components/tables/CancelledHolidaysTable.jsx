import React from 'react';
import { Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import moment from 'moment';

class CancelledHolidaysTable extends React.Component {
    dateFormatter(cell, row) {
        return moment(cell).format('DD/MM/YYYY');
    }

    render() {
        return (
            <Col sm={12} className='custom-table' style={{ marginTop: '30px', paddingBottom: '20px', border: '1px solid #000000' }}>
                <div style={{ height: '306px' }}>
                    <h3>Your cancelled and declined holiday requests</h3>
                    <BootstrapTable hover tableHeaderClass='table-header' tableBodyClass='table-body' data={this.props.data} maxHeight='250px'>
                        <TableHeaderColumn dataField='_id' isKey hidden>ID</TableHeaderColumn>
                        <TableHeaderColumn dataField='startDate' dataFormat={this.dateFormatter}>Start Date</TableHeaderColumn>
                        <TableHeaderColumn dataField='endDate' dataFormat={this.dateFormatter}>End Date</TableHeaderColumn>
                        <TableHeaderColumn dataField='duration' dataFormat={(cell, row) => (cell === 1) ? (cell + ' day') : (cell + ' days')}>Duration</TableHeaderColumn>
                        <TableHeaderColumn dataField='cancelledDate' dataFormat={this.dateFormatter} width='40%'>Date Cancelled/Declined</TableHeaderColumn>
                    </BootstrapTable>
                </div>
            </Col>
        );
    }
}

export default CancelledHolidaysTable;