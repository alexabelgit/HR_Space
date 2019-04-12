import React from 'react';
import { Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

import CustomSwitch from '../CustomSwitch';

class ManagementRolesTable extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};

        this.viewFormatter = this.viewFormatter.bind(this);
        this.updateFormatter = this.updateFormatter.bind(this);
    }

    viewFormatter(cell, row) {
        return <CustomSwitch id={row._id} checked={cell} onChange={e => this.props.handleSwitchToggle({ rowId: row._id, view: !row.view, update: row.update })} justify='center' />
    }

    updateFormatter(cell, row) {
        return <CustomSwitch id={row._id + 1} checked={cell} onChange={e => this.props.handleSwitchToggle({ rowId: row._id, view: row.view, update: !row.update })} justify='center' />
    }

    render() {
        return (
            <Col sm={12} className='custom-table'>
                <BootstrapTable hover tableHeaderClass='table-header' tableBodyClass='table-body' data={this.props.data}>
                    <TableHeaderColumn dataField='_id' isKey hidden>ID</TableHeaderColumn>
                    <TableHeaderColumn dataField='section'>Section</TableHeaderColumn>
                    <TableHeaderColumn dataField='view' width='15%' dataFormat={this.viewFormatter} dataAlign='center' tdStyle={{ padding: 0, verticalAlign: 'middle' }}>View</TableHeaderColumn>
                    <TableHeaderColumn dataField='update' width='15%' dataFormat={this.updateFormatter} dataAlign='center' tdStyle={{ padding: 0, verticalAlign: 'middle' }}>Update</TableHeaderColumn>
                </BootstrapTable>
            </Col>
        );
    }
}

export default ManagementRolesTable;