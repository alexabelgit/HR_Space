import React from 'react';
import { Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import moment from 'moment';

class AnnouncementsTable extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};

        this.announcementControlsFormatter = this.announcementControlsFormatter.bind(this);
        this.titleFormatter = this.titleFormatter.bind(this);
    }

    handleAnnouncementEdit(event, row) {
        event.preventDefault();

        this.props.onAnnouncementEdit(row);
    }

    handleAnnouncementDelete(event, row) {
        event.preventDefault();

        this.props.onAnnouncementDelete(row);
    }

    titleFormatter(cell, row) {
        return <Link to='#' onClick={e => this.handleAnnouncementEdit(e, row)}>{cell}</Link>;
    }

    announcementControlsFormatter(cell, row) {
        return (
            <div>
                <Link to='#' onClick={e => this.handleAnnouncementEdit(e, row)}>Edit</Link>
                <Link to='#' onClick={e => this.handleAnnouncementDelete(e, row)} style={{ marginLeft: '20px' }}><i className='fa fa-trash-o' style={{ color: '#000000' }}></i> Delete</Link>
            </div>
        );
    }

    startDateFormatter(cell, row) {
        return moment(cell).format('DD/MM/YYYY');
    }

    render() {
        return (
            <Col sm={12} className='custom-table'>
                <BootstrapTable hover tableHeaderClass='table-header' tableBodyClass='table-body' headerContainerClass='hidden' data={this.props.data}>
                    <TableHeaderColumn dataField='title' dataFormat={this.titleFormatter} width='70%'>Announcement title</TableHeaderColumn>
                    <TableHeaderColumn dataField='_id' isKey hidden>ID</TableHeaderColumn>
                    <TableHeaderColumn dataField='detail' hidden>Detail</TableHeaderColumn>
                    <TableHeaderColumn dataField='announcementControls' width='25%' dataFormat={this.announcementControlsFormatter} dataAlign='center'></TableHeaderColumn>
                    <TableHeaderColumn dataField='startDate' dataFormat={this.startDateFormatter} dataAlign='center' width='25%'></TableHeaderColumn>
                </BootstrapTable>
            </Col>
        );
    }
}

export default AnnouncementsTable;