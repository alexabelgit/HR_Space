import React from 'react';
import { Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import moment from 'moment';

class BenefitsInKindTable extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};

        this.benefitDetailControlsFormatter = this.benefitDetailControlsFormatter.bind(this);
        this.dateFormatter = this.dateFormatter.bind(this);
    }

    valueFormatter(cell, row) {
        var formattedValue = cell.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

        return `<i class='fa fa-gbp'></i> ${formattedValue}`;
    }

    benefitDetailControlsFormatter(cell, row) {
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
                <BootstrapTable hover tableHeaderClass='table-header' tableBodyClass='table-body' data={this.props.benefits}>
                    <TableHeaderColumn dataField='benefitType'>Benefit Type</TableHeaderColumn>
                    <TableHeaderColumn dataField='_id' isKey hidden>ID</TableHeaderColumn>
                    <TableHeaderColumn dataField='startDate' dataFormat={this.dateFormatter}>Start Date</TableHeaderColumn>
                    <TableHeaderColumn dataField='endDate' dataFormat={this.dateFormatter}>End Date</TableHeaderColumn>
                    <TableHeaderColumn dataField='value' dataFormat={this.valueFormatter}>Value</TableHeaderColumn>
                    <TableHeaderColumn dataField='frequency'>Frequency</TableHeaderColumn>
                    {!this.props.isManager && !this.props.isEmployee && !this.props.isHR && <TableHeaderColumn dataField='salaryContorls' dataFormat={this.benefitDetailControlsFormatter}></TableHeaderColumn>}
                </BootstrapTable>
            </Col>
        );
    }
}

export default BenefitsInKindTable;