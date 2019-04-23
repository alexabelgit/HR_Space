import React from 'react';
import { Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import moment from 'moment';

class SalaryTable extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};

        this.salaryControlsFormatter = this.salaryControlsFormatter.bind(this);
    }

    salaryFormatter(cell, row) {
        var formattedSalary = cell.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

        return `<i class='fa fa-${row.currency.toLowerCase()}'></i> ${formattedSalary}`;
    }

    salaryControlsFormatter(cell, row) {
        return (
            <div style={{ textAlign: 'center' }}>
                <Link to='#' onClick={e => this.props.handleEdit(e, row)}>Edit</Link>
                <Link to='#' onClick={e => this.props.handleDelete(e, row)} style={{ marginLeft: '20px' }}><i className='fa fa-trash-o' style={{ color: '#000000' }}></i> Delete</Link>
            </div>
        );
    }

    effectiveDateFormatter(cell, row) {
        return moment(cell).format('DD/MM/YYYY');
    }

    render() {
        var salaries = this.props.salaries.map((item, index) => {
            let percentageChange = (index === 0) ? 0 : ((item.salary * 100 / this.props.salaries[index - 1].salary) - 100);

            percentageChange = percentageChange.toFixed(2) + ' %';

            return {
                ...item,
                percentageChange
            };
        });

        salaries.reverse();

        return (
            <Col sm={10} className='custom-table'>
                <BootstrapTable hover tableHeaderClass='table-header' tableBodyClass='table-body' data={salaries}>
                    <TableHeaderColumn dataField='effectiveDate' dataFormat={this.effectiveDateFormatter}>Effective Date</TableHeaderColumn>
                    <TableHeaderColumn dataField='_id' isKey hidden>ID</TableHeaderColumn>
                    <TableHeaderColumn dataField='salary' dataFormat={this.salaryFormatter}>Salary</TableHeaderColumn>
                    <TableHeaderColumn dataField='frequency'>Frequency</TableHeaderColumn>
                    <TableHeaderColumn dataField='currency'>Currency</TableHeaderColumn>
                    <TableHeaderColumn dataField='percentageChange'>Percentage change</TableHeaderColumn>
                    {!this.props.isManager && !this.props.isEmployee && !this.props.isHR && <TableHeaderColumn dataField='salaryContorls' dataFormat={this.salaryControlsFormatter}></TableHeaderColumn>}
                </BootstrapTable>
            </Col>
        );
    }
}

export default SalaryTable;