import React from 'react';
import { Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import moment from 'moment';

class AbsenceTypesTable extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};

        this.absenceTypeControlsFormatter = this.absenceTypeControlsFormatter.bind(this);
        this.typeFormatter = this.typeFormatter.bind(this);
    }

    handleAbsenceTypeEdit(event, row) {
        event.preventDefault();

        this.props.onAbsenceTypeEdit(row);
    }

    handleAbsenceTypeDelete(event, row) {
        event.preventDefault();

        this.props.onAbsenceTypeDelete(row);
    }

    typeFormatter(cell, row) {
        return <Link to='#' onClick={e => this.handleAbsenceTypeEdit(e, row)}>{cell}</Link>;
    }

    absenceTypeControlsFormatter(cell, row) {
        return (
            <div style={{ textAlign: 'center' }}>
                <Link to='#' onClick={e => this.handleAbsenceTypeEdit(e, row)}>Edit</Link>
                <Link to='#' onClick={e => this.handleAbsenceTypeDelete(e, row)} style={{ marginLeft: '20px' }}><i className='fa fa-trash-o' style={{ color: '#000000' }}></i> Delete</Link>
            </div>
        );
    }

    dateFormatter(cell, row) {
        return moment(cell).format('DD/MM/YYYY');
    }

    sicknessIdentifierFormatter(cell, row) {
        if (cell) return <i className='fa fa-check'></i>;
        else return '';
    }

    selfCertificationFormatter(cell, row) {
        if (cell) return <i className='fa fa-check'></i>;
        else return '';
    }

    render() {
        return (
            <Col sm={12} className='custom-table'>
                <BootstrapTable hover tableHeaderClass='table-header' tableBodyClass='table-body' data={this.props.data}>
                    <TableHeaderColumn dataField='type' dataFormat={this.typeFormatter}>Absence type</TableHeaderColumn>
                    <TableHeaderColumn dataField='sicknessIdentifier' dataFormat={this.sicknessIdentifierFormatter} width='20%' headerAlign='left' dataAlign='center'>Sickness Identifier</TableHeaderColumn>
                    <TableHeaderColumn dataField='selfCertification' dataFormat={this.selfCertificationFormatter} width='20%' headerAlign='left' dataAlign='center'>Self Certification</TableHeaderColumn>
                    <TableHeaderColumn dataField='_id' isKey hidden>ID</TableHeaderColumn>
                    <TableHeaderColumn dataField='absenceTypeControls' dataFormat={this.absenceTypeControlsFormatter}></TableHeaderColumn>
                </BootstrapTable>
            </Col>
        );
    }
}

export default AbsenceTypesTable;