import React from 'react';
import { Col, Checkbox } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

class HRPoliciesTable extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};

        this.policyControlsFormatter = this.policyControlsFormatter.bind(this);
        this.handlePolicyEdit = this.handlePolicyEdit.bind(this);
        this.handlePolicyDelete = this.handlePolicyDelete.bind(this);
        this.nameFormatter = this.nameFormatter.bind(this);
    }

    handlePolicyEdit(event, row) {
        event.preventDefault();

        this.props.onPolicyEdit(row);
    }

    handlePolicyDelete(event, row) {
        event.preventDefault();

        this.props.onPolicyDelete(row._id);
    }

    nameFormatter(cell, row) {
        return <Link to='#' onClick={e => this.handlePolicyEdit(e, row)}>{cell}</Link>;
    }

    summaryFormatter(cell, row) {
        if (cell.length > 50) {
            let tmp = cell.substring(0, 46);

            return tmp + '...';
        } else {
            return cell;
        }
    }

    policyControlsFormatter(cell, row) {
        return (
            <div style={{ textAlign: 'center' }}>
                <Link to='#' onClick={e => this.handlePolicyEdit(e, row)}>Edit</Link>
                <Link to='#' onClick={e => this.handlePolicyDelete(e, row)} style={{ marginLeft: '20px' }}><i className='fa fa-trash-o' style={{ color: '#000000' }}></i> Delete</Link>
            </div>
        );
    }

    orderControlsFormatter = (cell, row) => {
        const buttonStyle = {
            padding: '10px',
            cursor: 'pointer',
        };

        return (
            <div style={{ textAlign: 'center' }}>
                <i className='fa fa-arrow-up' style={buttonStyle} onClick={() => this.props.onOrderDecrement(row)}></i>
                <i className='fa fa-arrow-down' style={buttonStyle} onClick={() => this.props.onOrderIncrement(row)}></i>
            </div>
        );
    }

    render() {
        const selectRowProp = {
            mode: 'checkbox',
            onSelect: (row, isSelected, e) => isSelected ? this.props.onRowsSelect([row]) : this.props.onRowsDeselect([row]),
            onSelectAll: (isSelected, rows) => isSelected ? this.props.onRowsSelect(rows) : this.props.onRowsDeselect(rows),
        };

        return (
            <Col sm={12} className='custom-table'>
                <BootstrapTable 
                    hover 
                    tableHeaderClass='table-header' 
                    tableBodyClass='table-body' 
                    data={this.props.data} 
                    selectRow={selectRowProp}
                    ref={node => this.props.getRef(node)}
                    options={{
                        defaultSortName: 'order',
                        defaultSortOrder: 'asc',
                    }}
                >
                    <TableHeaderColumn dataField='order' width='10%'>Display order</TableHeaderColumn>
                    <TableHeaderColumn dataField='name' dataFormat={this.nameFormatter} width='20%'>Policy name</TableHeaderColumn>
                    <TableHeaderColumn dataField='_id' isKey hidden>ID</TableHeaderColumn>
                    <TableHeaderColumn dataField='summary' dataFormat={this.summaryFormatter}>Policy summary</TableHeaderColumn>
                    <TableHeaderColumn dataField='orderControls' width='20%' dataFormat={this.orderControlsFormatter} tdStyle={{ padding: '5px 20px' }}>Reorder</TableHeaderColumn>
                    <TableHeaderColumn dataField='documentContorls' width='20%' dataFormat={this.policyControlsFormatter}></TableHeaderColumn>
                </BootstrapTable>
            </Col>
        );
    }
}

export default HRPoliciesTable;