import React from 'react';
import PropTypes from 'prop-types';
import { Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import moment from 'moment';

const propTypes = {
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
    onContentPageEdit: PropTypes.func.isRequired,
    onContentPageDelete: PropTypes.func.isRequired
};

class ContentPagesTable extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};

        this.nameFormatter = this.nameFormatter.bind(this);
        this.contentPageControlsFormatter = this.contentPageControlsFormatter.bind(this);
    }

    handleContentPageEdit(event, row) {
        event.preventDefault();

        this.props.onContentPageEdit(row);
    }

    handleContentPageDelete(event, row) {
        event.preventDefault();

        this.props.onContentPageDelete(row);
    }

    nameFormatter(cell, row) {
        return <Link to='#' onClick={e => this.handleContentPageEdit(e, row)}>{cell}</Link>;
    }

    contentPageControlsFormatter(cell, row) {
        return (
            <div style={{ textAlign: 'center' }}>
                <Link to='#' onClick={e => this.handleContentPageEdit(e, row)}>Edit</Link>
                <Link to='#' onClick={e => this.handleContentPageDelete(e, row)} style={{ marginLeft: '20px' }}><i className='fa fa-trash-o' style={{ color: '#000000' }}></i> Delete</Link>
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

    isActiveFormatter(cell, row) {
        if (cell) return <i className='fa fa-check'></i>;
        else return '';
    }

    visibleForFormatter(cell, row) {
        if (cell === 'hr') return cell.toUpperCase();
        else return cell.capitalize();
    }

    render() {
        return (
            <Col sm={12} className='custom-table'>
                <BootstrapTable hover tableHeaderClass='table-header' tableBodyClass='table-body' data={this.props.data} options={{defaultSortName: 'order', defaultSortOrder: 'asc'}}>
                    <TableHeaderColumn dataField='order' width='10%'>Display order</TableHeaderColumn>
                    <TableHeaderColumn dataField='name' dataFormat={this.nameFormatter}>Article name</TableHeaderColumn>
                    <TableHeaderColumn dataField='summary'>Summary</TableHeaderColumn>
                    <TableHeaderColumn dataField='isActive' headerAlign='left' dataAlign='center' dataFormat={this.isActiveFormatter}>Active</TableHeaderColumn>
                    <TableHeaderColumn dataField='visibleFor' dataFormat={this.visibleForFormatter}>Visible for</TableHeaderColumn>
                    <TableHeaderColumn dataField='_id' isKey hidden>ID</TableHeaderColumn>
                    <TableHeaderColumn dataField='orderControls' headerAlign='left' dataAlign='center' dataFormat={this.orderControlsFormatter} tdStyle={{ padding: '5px 20px' }}>Reorder</TableHeaderColumn>
                    <TableHeaderColumn dataField='contentPageControls' dataAlign='center' dataFormat={this.contentPageControlsFormatter}></TableHeaderColumn>
                </BootstrapTable>
            </Col>
        );
    }
}

ContentPagesTable.propTypes = propTypes;

export default ContentPagesTable;