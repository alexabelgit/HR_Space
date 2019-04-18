import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import React from 'react';
import { Grid, Row, Col, Button } from 'react-bootstrap';

import ContentPagesTable from '../components/tables/ContentPagesTable';
import ContentPageForm from '../components/forms/ContentPageForm';

import SmartCustomSelect from '../components/SmartCustomSelect';

import ContentPagesCollection from '../../api/collections/contentPages';
import BusinessesCollection from '../../api/collections/businesses';
import { toast } from 'react-toastify';
import { Roles } from 'meteor/alanning:roles';

class ContentPages extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            contentPageForm: null,
            filter: 'Filter by client',
            error: null
        };
    }

    componentDidMount() {
        var nodes = document.querySelectorAll('html, div#root');

        nodes.forEach(node => node.style.background = '#ffffff');
    }

    openContentPageForm = event => {
        event.preventDefault();

         const isSuperAdmin = Roles.userIsInRole(Meteor.userId(), 'super_admin');

        this.setState({
            contentPageForm: {
                _id: '',
                name: '',
                summary: '',
                article: '',
                isActive: true,
                visibleFor: 'all',
                 business: isSuperAdmin ? '' : Meteor.user().profile.businessId
               // business: ''
            }
        });
    }

    submitCallback = (error, response) => {
        if (error) {
            if (error.reason === 'MISSING_FIELD') {
                let fieldName = error.details.capitalize();

                setTimeout(() => this.setState({ error: null }), 3000);
                
                this.setState({ error: { field: error.details, message: `${fieldName} is required` }});
            } else {
                setTimeout(() => this.setState({ error: null }), 3000);

                this.setState({ error: { field: '', message: error.reason } });
            }
        } else {
            this.setState({ contentPageForm: null });
        }
    }

    handleSubmit = contentPage => {
        var index = this.props.contentPages.findIndex(item => item._id === contentPage._id);

        if (index === -1) Meteor.call('contentPages.create', contentPage, this.submitCallback);
        else Meteor.call('contentPages.update', contentPage, this.submitCallback);
    }

    handleCancel = () => {
        this.setState({ contentPageForm: null });
    }

    handleContentPageEdit = contentPage => {
        this.setState({ contentPageForm: contentPage });
    }

    handleContentPageDelete = contentPageId => {
        Meteor.call('contentPages.remove', contentPageId, this.submitCallback);
    }

    handleOrderDecrement = contentPage => {
        Meteor.call('contentPages.decrementOrder', contentPage, (error, response) => {
            if (error) {
                toast.error(error.reason);
            }
        });
    }

    handleOrderIncrement = contentPage => {
        Meteor.call('contentPages.incrementOrder', contentPage, (error, response) => {
            if (error) {
                toast.error(error.reason);
            }
        });
    }

    handleOnSelect = (value, stateProp) => this.setState({ [stateProp]: value });

    render() {
        const filteredContentPages = (this.state.filter === 'all' || this.state.filter === 'Filter by client') ?
            this.props.contentPages :
            this.props.contentPages.filter(item => item.business === this.state.filter);

        return (
            <Grid className='content-pages page' fluid>
                <Row>
                    <Col sm={10}>
                        <Row>
                            <Col sm={5}>
                                <h2>{!this.state.contentPageForm ? 'Content Page' : 'Manage Content Page'}</h2>
                            </Col>
                            <Col smOffset={4} sm={3}>
                                {
                                    !this.state.contentPageForm
                                    &&
                                    <Button
                                        onClick={this.openContentPageForm}
                                        bsClass='button-primary'
                                        style={{ marginTop: '20px', marginBottom: '10px' }}
                                    >
                                        Add new content page
                                    </Button>
                                }
                            </Col>
                            {
                                !this.state.policyForm
                                &&
                                <Col sm={4} style={{ marginBottom: '15px' }}>
                                    <Row>
                                        <Col sm={3}>
                                            <span style={{ lineHeight: '40px', fontSize: '18px' }}>Filter</span>
                                        </Col>
                                        <Col sm={9}>
                                            <SmartCustomSelect
                                                id='businessFilter'
                                                option={this.state.filter}
                                                placeholder={this.state.filter}
                                                options={[{ _id: 'all', name: 'All' }].concat(this.props.businesses)}
                                                onSelect={value => this.handleOnSelect(value, 'filter')}
                                                style={{ height: '40px', padding: '5px 8px', fontSize: '14px' }}
                                            />
                                        </Col>
                                    </Row>
                                </Col>
                            }
                            {
                                this.state.contentPageForm ?
                                    <ContentPageForm 
                                        businesses={this.props.businesses}
                                        contentPage={this.state.contentPageForm} 
                                        onSubmit={this.handleSubmit} 
                                        onClose={this.handleCancel}
                                        error={this.state.error}
                                    />
                                    :
                                    <ContentPagesTable
                                        data={filteredContentPages}
                                        onContentPageEdit={this.handleContentPageEdit}
                                        onContentPageDelete={this.handleContentPageDelete}
                                        onOrderIncrement={this.handleOrderIncrement}
                                        onOrderDecrement={this.handleOrderDecrement}
                                    />
                            }
                        </Row>
                    </Col>
                </Row>
            </Grid>
        );
    }
}

export default withTracker(props => {
    const contentPagesHandle = Meteor.subscribe('contentPages.all');
    const businessesHandle = Meteor.subscribe('businesses.dropdown');
    const loading = !contentPagesHandle.ready() || !businessesHandle.ready();

    return {
        loading,
        contentPages: ContentPagesCollection.find({}).fetch(),
        businesses: BusinessesCollection.find({}, { sort: { name: 1 } }).fetch()
    };
})(ContentPages);