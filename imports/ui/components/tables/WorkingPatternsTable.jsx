import React from 'react';
import PropTypes from 'prop-types';
import { Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

const propTypes = {
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
    onWorkingPatternEdit: PropTypes.func.isRequired,
    onWorkingPatternDelete: PropTypes.func.isRequired
};

class WorkingPatternsTable extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};

        this.dataControlsFormatter = this.dataControlsFormatter.bind(this);
        this.dataFormatter = this.dataFormatter.bind(this);
    }

    handleDataEdit(event, row) {
        event.preventDefault();

        this.props.onWorkingPatternEdit(row);
    }

    handleDataDelete(event, row) {
        event.preventDefault();

        this.props.onWorkingPatternDelete(row);
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

    isActiveFormatter(cell, row) {
        if (cell) return <i className='fa fa-check'></i>;
        else return '';
    }

    render() {
        return (
            <Col sm={12} className='custom-table'>
                <BootstrapTable hover tableHeaderClass='table-header' tableBodyClass='table-body' data={this.props.data}>
                    <TableHeaderColumn dataField='name' dataFormat={this.dataFormatter}>Working pattern</TableHeaderColumn>
                    <TableHeaderColumn dataField='isActive' headerAlign='left' dataAlign='center' dataFormat={this.isActiveFormatter}>Active</TableHeaderColumn>
                    <TableHeaderColumn dataField='_id' isKey hidden>ID</TableHeaderColumn>
                    <TableHeaderColumn dataField='dataControls' dataFormat={this.dataControlsFormatter}></TableHeaderColumn>
                </BootstrapTable>
            </Col>
        );
    }
}

WorkingPatternsTable.propTypes = propTypes;

export default WorkingPatternsTable;