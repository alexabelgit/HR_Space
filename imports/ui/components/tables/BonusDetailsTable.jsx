import React from 'react';
import { Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import moment from 'moment';

class BonusDetailsTable extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};

        this.bonusDetailControlsFormatter = this.bonusDetailControlsFormatter.bind(this);
        this.dateFormatter = this.dateFormatter.bind(this);
    }

    amountFormatter(cell, row) {
        var formattedAmount = cell.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

        return `<i class='fa fa-${row.currency.toLowerCase()}'></i> ${formattedAmount}`;
    }

    bonusDetailControlsFormatter(cell, row) {
        return (
            <div style={{ textAlign: 'center' }}>
                <Link to='#' onClick={e => this.props.handleEdit(e, row)}>Edit</Link>
                <Link to='#' onClick={e => this.props.handleDelete(e, row)} style={{ marginLeft: '20px' }}><i className='fa fa-trash-o' style={{ color: '#000000' }}></i> Delete</Link>
            </div>
        );
    }

    dateFormatter(cell, row) {
        return moment(cell).format('DD/MM/YYYY');
    }

    render() {
        return (
            <Col sm={10} className='custom-table'>
                <BootstrapTable hover tableHeaderClass='table-header' tableBodyClass='table-body' data={this.props.bonuses}>
                    <TableHeaderColumn dataField='date' dataFormat={this.dateFormatter}>Date</TableHeaderColumn>
                    <TableHeaderColumn dataField='_id' isKey hidden>ID</TableHeaderColumn>
                    <TableHeaderColumn dataField='amount' dataFormat={this.amountFormatter}>Amount</TableHeaderColumn>
                    <TableHeaderColumn dataField='currency'>Currency</TableHeaderColumn>
                    {!this.props.isManager && !this.props.isEmployee && !this.props.isHR && <TableHeaderColumn dataField='salaryContorls' dataFormat={this.bonusDetailControlsFormatter} width='20%'></TableHeaderColumn>}
                </BootstrapTable>
            </Col>
        );
    }
}

export default BonusDetailsTable;