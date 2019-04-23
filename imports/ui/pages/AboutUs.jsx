import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import React from 'react';
import { Grid, Row, Col, Button } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';

import ContentPagesCollection from '../../api/collections/contentPages';

class AboutUs extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            ...props.contentPage
        };
    }

    componentDidMount() {
        var nodes = document.querySelectorAll('html, div#root');

        nodes.forEach(node => node.style.background = '#ffffff');
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.match.params.id) {
            this.setState({ ...nextProps.contentPage });
        }
    }

    render() {
        const { loading } = this.props;
        const contentPage = this.state;

        return (
            <Grid className='about-us page' fluid>
                <Row>
                    <Col sm={12}>
                        {
                            loading ?
                                <div style={{ fontSize: '20px', fontWeight: 'bold', opacity: 0.5, margin: '15px' }}>Loading...</div>
                                :
                                contentPage ?
                                    // <div>
                                    //     <h1>{contentPage.name}</h1>
                                    //     <h2>{contentPage.summary}</h2>
                                    <div dangerouslySetInnerHTML={{ __html: contentPage.article }} />
                                    // </div>
                                    :
                                    <div>No active content page yet</div>
                        }
                    </Col>
                </Row>
            </Grid>
        );
    }
}

export default withRouter(withTracker(props => {
    if (props.match.params.id) {
        const id = props.match.params.id;
        const contentPagesHandle = Meteor.subscribe('contentPages.business');
        const loading = !contentPagesHandle.ready();

        return {
            loading,
            contentPage: ContentPagesCollection.findOne({ _id: id })
        };
    } else {
        const business = Meteor.user().profile.businessId;
        const visibleFor = Roles.getRolesForUser(Meteor.userId())[0];
        const contentPagesHandle = Meteor.subscribe('contentPages.single', { business, visibleFor });
        const loading = !contentPagesHandle.ready();
        
        return {
            loading,
            contentPage: ContentPagesCollection.findOne({ business, visibleFor: { $in: ['all', visibleFor] }, isActive: true }),
        };
    }
})(AboutUs));