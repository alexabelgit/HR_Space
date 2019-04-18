import React from 'react';
import PropTypes from 'prop-types';
import { Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import moment from 'moment';

const propTypes = {
    dataType: PropTypes.string.isRequired,
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
    onDataEdit: PropTypes.func.isRequired,
    onDataDelete: PropTypes.func.isRequired
};

class DropdownDataTable extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            columnHeader: props.dataType.capitalize()
        };

        this.dataControlsFormatter = this.dataControlsFormatter.bind(this);
        this.dataFormatter = this.dataFormatter.bind(this);
    }

    handleDataEdit(event, row) {
        event.preventDefault();

        this.props.onDataEdit(row);
    }

    handleDataDelete(event, row) {
        event.preventDefault();

        this.props.onDataDelete(row);
    }

    dataFormatter(cell, row) {
        return <Link to='#' onClick={e => this.handleDataEdit(e, row)}>{cell}</Link>;
    }

    dataControlsFormatter(cell, row) {
        return (
            <div style={{ textAlign: 'center' }}>
                <Link to='#' onClick={e => this.handleDataEdit(e, row)}>Edit</Link>
                <Link to='#' onClick={e => this.handleDataDelete(e, row)} style={{ marginLeft: '20px' }}><i className='fa fa-trash-o' style={{ color: '#000000' }}></i> Delete</Link>
            </div>
        );
    }

    render() {
        return (
            <Col sm={8} className='custom-table'>
                <BootstrapTable hover tableHeaderClass='table-header' tableBodyClass='table-body' data={this.props.data}>
                    <TableHeaderColumn dataField='name' dataFormat={this.dataFormatter}>{this.state.columnHeader}</TableHeaderColumn>
                    <TableHeaderColumn dataField='_id' isKey hidden>ID</TableHeaderColumn>
                    <TableHeaderColumn dataField='dataControls' dataFormat={this.dataControlsFormatter}></TableHeaderColumn>
                </BootstrapTable>
            </Col>
        );
    }
}

DropdownDataTable.propTypes = propTypes;

export default DropdownDataTable;