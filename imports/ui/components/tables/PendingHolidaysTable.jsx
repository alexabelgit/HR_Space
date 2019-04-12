import React from 'react';
import { Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import moment from 'moment';

class PendingHolidaysTable extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};

        this.holidayContorlsFormatter = this.holidayContorlsFormatter.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }

    handleCancel(event, row) {
        event.preventDefault();

        this.props.onCancel(row);
    }

    holidayContorlsFormatter(cell, row) {
        return <Link to='#' onClick={e => this.handleCancel(e, row)}>Cancel</Link>;
    }

    dateFormatter(cell, row) {
        return moment(cell).format('DD/MM/YYYY');
    }

    render() {
        return (
            <Col sm={12} className='custom-table' style={{ paddingBottom: '20px', border: '1px solid #000000' }}>
                <div style={{ height: '306px' }}>
                    <h3>Pending requests</h3>
                    <BootstrapTable hover tableHeaderClass='table-header' tableBodyClass='table-body' data={this.props.data} maxHeight='250px'>
                        <TableHeaderColumn dataField='requestedDate' dataFormat={this.dateFormatter}>Requested</TableHeaderColumn>
                        <TableHeaderColumn dataField='_id' isKey hidden>ID</TableHeaderColumn>
                        <TableHeaderColumn dataField='startDate' dataFormat={this.dateFormatter}>Start Date</TableHeaderColumn>
                        <TableHeaderColumn dataField='endDate' dataFormat={this.dateFormatter}>End Date</TableHeaderColumn>
                        <TableHeaderColumn dataField='duration' dataFormat={(cell, row) => (cell === 1) ? (cell + ' day') : (cell + ' days')}>Duration</TableHeaderColumn>
                        <TableHeaderColumn dataField='holidayControls' dataFormat={this.holidayContorlsFormatter} dataAlign='center'></TableHeaderColumn>
                    </BootstrapTable>
                </div>
            </Col>
        );
    }
}

export default PendingHolidaysTable;