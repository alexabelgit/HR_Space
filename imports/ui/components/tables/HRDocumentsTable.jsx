import React from 'react';
import { Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

class HRDocumentsTable extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};

        this.documentControlsFormatter = this.documentControlsFormatter.bind(this);
    }

    handleDocumentView(row) {
        event.preventDefault();

        this.props.onDocumentView(row);
    }

    handleDocumentDelete(row) {
        event.preventDefault();

        this.props.onDocumentDelete(row._id);
    }

    titleFormatter(cell, row) {
        const title = ~cell.lastIndexOf('.') ? cell.substr(0, cell.lastIndexOf('.')) : cell;

        return <Link to='#'>{title}</Link>;
    }

    documentControlsFormatter(cell, row) {
        return (
            <div style={{ textAlign: 'center' }}>
                <Link to='#' onClick={e => this.handleDocumentView(row)}>View</Link>
                <Link to='#' onClick={e => this.handleDocumentDelete(row)} style={{ marginLeft: '20px' }}><i className='fa fa-trash-o' style={{ color: '#000000' }}></i> Delete</Link>
            </div>
        );
    }

    typeFormatter(cell, row) {
        return cell.toUpperCase();
    }

    render() {
        return (
            <Col sm={12} className='custom-table'>
                <BootstrapTable hover tableHeaderClass='table-header' tableBodyClass='table-body' data={this.props.data}>
                    <TableHeaderColumn dataField='name' dataFormat={this.titleFormatter}>Document title</TableHeaderColumn>
                    <TableHeaderColumn dataField='_id' isKey hidden>ID</TableHeaderColumn>
                    <TableHeaderColumn dataField='documentType'>Document type</TableHeaderColumn>
                    {
                        this.props.viewControls
                        &&
                        <TableHeaderColumn dataField='documentContorls' width='20%' dataFormat={this.documentControlsFormatter}></TableHeaderColumn>
                    }
                </BootstrapTable>
            </Col>
        );
    }
}

export default HRDocumentsTable;