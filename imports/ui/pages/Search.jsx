import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import React from 'react';
import { Grid, Row, Col, Button } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';

import UsersList from '../components/UsersList';
import Profile from '../components/Profile';

import Summary from '../../api/collections/user_info/summary';
import Job from '../../api/collections/user_info/job';

class Search extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            profiles: [],
            profile: null,
        };
    }

    componentDidMount() {
        var nodes = document.querySelectorAll('html, div#root');

        nodes.forEach(node => node.style.background = '#ffffff');

        const query = this.props.match.params.query;

        Meteor.call('searchEmployees.query', query, (error, response) => {
            if (error) {
                toast.error(error.reason);
            } else {
                this.setState({ profiles: response });
            }
        });
    }

    componentWillReceiveProps(nextProps) {
        const query = nextProps.match.params.query;

        Meteor.call('searchEmployees.query', query, (error, response) => {
            if (error) {
                toast.error(error.reason);
            } else {
                this.setState({ profiles: response });
            }
        });
    }

    handleProfileSelect = profile => {
        Meteor.call('subordinates.get', profile._id, (error, response) => {
            if (error) {
                toast.error(error.reason);
            } else {
                var selectedProfile = {
                    ...profile,
                    subordinates: response,
                };
                
                this.setState({ profile: selectedProfile });
            }
        });
    };

    handleProfileClose = () => this.setState({ profile: null });

    render() {
        return (
            <Grid className='search page' fluid>
                <Row>
                    <Col sm={12}>
                        <Row>
                            <Col sm={5}>
                                {
                                    this.state.profile ?
                                        <Button
                                            bsClass='button-primary'
                                            onClick={this.handleProfileClose}
                                            style={{ width: '60%', marginTop: '20px' }}
                                        >
                                            <i className='fa fa-chevron-left' style={{ float: 'left', lineHeight: '20px' }}></i>
                                            Back to search results
                                        </Button>
                                        :
                                        <h2>Search results</h2>
                                }
                            </Col>
                            {
                                this.state.profile ?
                                    <Profile
                                        profile={this.state.profile}
                                        onClose={this.handleProfileClose}
                                        onProfileSelect={this.handleProfileSelect}
                                    />
                                    :
                                    <UsersList
                                        profiles={this.state.profiles}
                                        onProfileSelect={this.handleProfileSelect}
                                    />
                            }
                        </Row>
                    </Col>
                </Row>
                <ToastContainer autoClose={3000} position={toast.POSITION.TOP_CENTER} />
            </Grid>
        );
    }
}

export default Search;
// withTracker(props => {
//     var query = props.match.params.query;
//     const businessId = Meteor.user().profile.businessId;
//     const summariesHandle = Meteor.subscribe('summaries.business.all', businessId);
//     const jobs = Meteor.subscribe('job.business.all', businessId);
//     const loading = !summariesHandle.ready();

//     var queryArr, expressions, mongoQuery;

//     if (query) {
//         queryArr = query.split(' ');

//         expressions = queryArr
//                         .map(item => new RegExp(`\\s${item}.*`, 'i')) //if firstname or surname consists of multiple words
//                         .concat(queryArr.map(item => new RegExp(`.*${item}.*`, 'i')));

//         mongoQuery = {
//             $or: expressions
//                     .map(exp => ({ firstName: exp }))
//                     .concat(expressions.map(exp => ({ surname: exp })))
//         };
//     }

//     return {
//         loading,
//         profiles: Summary.find(mongoQuery || {}).fetch(),
//         jobTitles: Job.find().fetch()
//     };
// })(Search);