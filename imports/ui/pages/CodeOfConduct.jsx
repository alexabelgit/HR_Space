import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import React from 'react';
import { Grid, Row, Col, Button } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';

import HRPoliciesCollection from '../../api/collections/hrPolicies';

class CodeOfConduct extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            ...props.policy
        };
    }

    componentDidMount() {
        var nodes = document.querySelectorAll('html, div#root');

        nodes.forEach(node => node.style.background = '#ffffff');
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.match.params.id) {
            this.setState({ ...nextProps.policy });
        }
    }

    render() {
        const { loading } = this.props;
        const policy = this.state;

        return (
            <Grid className='code-of-conduct page' fluid>
                <Row>
                    <Col sm={12}>
                        {
                            loading ?
                                <div style={{ fontSize: '20px', fontWeight: 'bold', opacity: 0.5, margin: '15px' }}>Loading...</div>
                                :
                                policy ?
                                    // <div>
                                    //     <h1>{policy.name}</h1>
                                    //     <h2>{policy.summary}</h2>
                                    <div dangerouslySetInnerHTML={{ __html: policy.details }} />
                                    // </div>
                                    :
                                    <div>
                                        No active code of conduct yet
                                    </div>
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
        const hrPolicyHandle = Meteor.subscribe('hrPolicies.business');
        const loading = !hrPolicyHandle.ready();

        return {
            loading,
            policy: HRPoliciesCollection.findOne({ _id: id })
        };
    } else {
        const business = Meteor.user().profile.businessId;
        const access = Roles.getRolesForUser(Meteor.userId())[0];
        const hrPoliciesHandle = Meteor.subscribe('hrPolicies.single', { business, access });
        const loading = !hrPoliciesHandle.ready();
        
        return {
            loading,
            policy: HRPoliciesCollection.findOne({ business, access: { $in: ['all', access] }, isActive: true }),
        };
    }
})(CodeOfConduct));