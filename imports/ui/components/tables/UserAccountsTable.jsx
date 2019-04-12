import React from 'react';
import { Col, Checkbox } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

class UserAccountsTable extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    handleUserAccountEdit = (event, row) => {
        event.preventDefault();

        this.props.onUserAccountEdit(row);
    }

    handleUserAccountDelete = (event, row) => {
        event.preventDefault();

        this.props.onUserAccountDelete(row._id);
    }

    nameFormatter = (cell, row) => {
        return <Link to='#' onClick={e => this.handleUserAccountEdit(e, row)}>{cell}</Link>;
    }

    accountControlsFormatter = (cell, row) => {
        return (
            <div style={{ textAlign: 'center' }}>
                <Link to='#' onClick={e => this.handleUserAccountEdit(e, row)}>Edit</Link>
                {/* <Link to='#' onClick={e => this.handleUserAccountDelete(e, row)} style={{ marginLeft: '20px' }}><i className='fa fa-trash-o' style={{ color: '#000000' }}></i> Delete</Link> */}
            </div>
        );
    }

    render() {
        return (
            <Col sm={12} className='custom-table'>
                <BootstrapTable hover tableHeaderClass='table-header' tableBodyClass='table-body' data={this.props.data}>
                    <TableHeaderColumn dataField='name' dataFormat={this.nameFormatter}>Business name</TableHeaderColumn>
                    <TableHeaderColumn dataField='_id' isKey hidden>ID</TableHeaderColumn>
                    <TableHeaderColumn dataField='contactName'>Contact name</TableHeaderColumn>
                    <TableHeaderColumn dataField='documentContorls' width='20%' dataFormat={this.accountControlsFormatter}></TableHeaderColumn>
                </BootstrapTable>
            </Col>
        );
    }
}

export default UserAccountsTable;