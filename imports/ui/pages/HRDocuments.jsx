import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import React from 'react';
import { Grid, Row, Col, Button } from 'react-bootstrap';
import { UploadFS } from 'meteor/jalik:ufs';

import HRDocumentsTable from '../components/tables/HRDocumentsTable';
import HRDocumentsForm from '../components/forms/HRDocumentsForm';
import DocumentViewer from '../components/DocumentViewer';
import ErrorAlert from '../components/ErrorAlert';

import HRDocumentsCollection, { HRDocumentsStore } from '../../api/collections/hrDocuments';
import Summary from '../../api/collections/user_info/summary';
import ManagerPermissions from '../../api/collections/managementRoles';

class HRDocuments extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            documentForm: null,
            documentViewer: null,
            error: null,
        };

        this.openDocumentForm = this.openDocumentForm.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleDocumentDelete = this.handleDocumentDelete.bind(this);
        this.handleDocumentView = this.handleDocumentView.bind(this);
        this.handleViewerClose = this.handleViewerClose.bind(this);
        this.hasPermission = this.hasPermission.bind(this);
        this.isMyTeam = this.isMyTeam.bind(this);
    }

    componentDidMount() {
        var nodes = document.querySelectorAll('html, div#root');

        nodes.forEach(node => node.style.background = '#ffffff');
    }

    openDocumentForm(event) {
        event.preventDefault();

        this.setState({ documentForm: true });
    }

    handleSubmit({ name, documentType, file }) {
        const document = {
            type: file.type,
            size: file.size,
            name,
            documentType,
            userId: this.props.userInfo && this.props.userInfo.userId || Meteor.userId()
        };

        const uploader = new UploadFS.Uploader({
            data: file,
            file: document,
            store: HRDocumentsStore,
            onError: error => {
                console.log(error);

                setTimeout(() => this.setState({ error: null }), 3000);

                this.setState({ error: error.reason });
            },
            onComplete: f => {
                console.log(f);

                this.setState({ documentForm: null });
            }
        });

        uploader.start();
    }

    handleCancel() {
        this.setState({ documentForm: null });
    }

    handleDocumentDelete(id) {
        Meteor.call('hrDocuments.remove', id, (error, response) => {
            if (error) {
                console.log(error);

                this.setState({ error: error.reason });
            }
        });
    }

    handleDocumentView(document) {
        this.setState({ documentViewer: document });
    }

    handleViewerClose() {
        this.setState({ documentViewer: null });
    }

    hasPermission() {
        if (this.props.userInfo.userId === Meteor.userId()) {
            return true;
        }

        const { permissions } = this.props;

        if (permissions.length) {
            const { hrDocumentsEdit } = permissions[0];

            return hrDocumentsEdit;
        }

        return false;
    }

    isMyTeam() {
        if (this.props.userInfo.userId === Meteor.userId()) {
            return true;
        }

        return this.props.managersTeam && this.props.managersTeam.includes(this.props.userInfo.userId);
    }

    render() {
        return (
            <Grid className='hr-documents page' fluid>
                <Row>
                    <Col sm={9}>
                        <Row>
                            <Col sm={6}>
                                <h2>{this.state.documentForm ? 'Upload new HR document' : 'My HR Documents'}</h2>
                            </Col>
                            <Col smOffset={9} sm={3}>
                                {
                                    !this.state.documentForm
                                    &&
                                    (this.isMyTeam() && this.hasPermission())
                                    &&
                                    <Button
                                        onClick={this.openDocumentForm}
                                        bsClass='button-primary'
                                        style={{ marginTop: '20px', marginBottom: '10px' }}
                                    >
                                        Upload new document
                                    </Button>
                                }
                            </Col>
                            {
                                this.state.documentForm ?
                                    <HRDocumentsForm 
                                        onSubmit={this.handleSubmit} 
                                        onClose={this.handleCancel} 
                                    />
                                    :
                                    <HRDocumentsTable 
                                        data={this.props.hrDocuments} 
                                        viewControls={this.isMyTeam() && this.hasPermission()}
                                        onDocumentView={this.handleDocumentView}
                                        onDocumentDelete={this.handleDocumentDelete} 
                                    />
                            }
                        </Row>
                    </Col>
                    {
                        this.state.documentViewer 
                        && 
                        <DocumentViewer 
                            document={this.state.documentViewer}
                            onClose={this.handleViewerClose}
                        />
                    }
                    <ErrorAlert text={this.state.error} visible={!!this.state.error} />
                </Row>
            </Grid>
        );
    }
}

export default withTracker(props => {
    const userId = props.userInfo.userId || Meteor.userId();
    const documentsHandle = Meteor.subscribe('hrDocuments.user', userId);
    const managersTeamHandle = Meteor.subscribe('managersTeam');
    const managerPermissionsHandle = Meteor.subscribe('managerPermissionsHandle');
    const loading = !documentsHandle.ready() || !managersTeamHandle.ready() || !managerPermissionsHandle.ready();

    return {
        loading,
        hrDocuments: HRDocumentsCollection.find().fetch(),
        managersTeam: Summary.find().map(summary => summary.userId),
        permissions: ManagerPermissions.find().fetch(),
    };
})(HRDocuments);