import React from 'react';
import { Row, Col, Media, Image as ReactImage, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import Pagination from '../components/Pagination';

class UsersList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            profiles: props.profiles,
            pageOfItems: []
        };
    }

    // handlePageChange = pageOfItems => {
    //     this.setState({ pageOfItems });
    // }

    render() {
        // return (
        //     <Col sm={12}>
        //     {
        //         this.props.profiles.length ?
        //             this.state.pageOfItems.map(profile => (
        //                 <div 
        //                     style={{ cursor: 'pointer', padding: '15px 0', borderBottom: '1px solid #999999' }} 
        //                     key={profile._id}
        //                     onClick={e => this.props.onProfileSelect(profile)}
        //                 >
        //                     <Media>
        //                         <Media.Left align='middle'>
        //                             <ReactImage rounded width={70} height={70} src={profile.photo || '/img/no-avatar.png'} />
        //                         </Media.Left>
        //                         <Media.Body style={{ verticalAlign: 'middle' }}>
        //                             <Media.Heading>
        //                                 <Link
        //                                     to='#'
        //                                     style={{ color: '#006699', fontSize: '24px' }}
        //                                 >
        //                                     {profile.firstName + ' ' + profile.surname}
        //                                 </Link>
        //                             </Media.Heading>
        //                             <p style={{ color: '#666666', fontSize: '16px', marginBottom: '0' }}>Business title</p>
        //                         </Media.Body>
        //                     </Media>
        //                 </div>
        //             ))
        //             :
        //             <div style={{ fontSize: '20px', fontWeight: 'bold', opacity: 0.5, margin: '15px' }}>No employees found</div>
        //     }
        //         <Col sm={12} className='text-center'>
        //             <Pagination items={this.props.profiles} onChangePage={this.handlePageChange} />
        //         </Col>
        //     </Col>
        // );
        return (
            <Col sm={12}>
                {
                    this.props.profiles.length ?
                        this.props.profiles.map(profile => (
                            <div
                                style={{ cursor: 'pointer', padding: '15px 0', borderBottom: '1px solid #999999' }}
                                key={profile._id}
                                onClick={e => this.props.onProfileSelect(profile)}
                            >
                                <Media>
                                    <Media.Left align='middle'>
                                        <ReactImage rounded width={70} height={70} src={profile.photo || '/img/no-avatar.png'} />
                                    </Media.Left>
                                    <Media.Body style={{ verticalAlign: 'middle' }}>
                                        <Media.Heading>
                                            <Link
                                                to='#'
                                                style={{ color: '#006699', fontSize: '24px' }}
                                            >
                                                {profile.fullName}
                                            </Link>
                                        </Media.Heading>
                                        <p style={{ color: '#666666', fontSize: '16px', marginBottom: '0' }}>
                                            {profile.jobTitle}
                                        </p>
                                    </Media.Body>
                                </Media>
                            </div>
                        ))
                        :
                        <div style={{ fontSize: '20px', fontWeight: 'bold', opacity: 0.5, margin: '15px' }}>No employees found</div>
                }
            </Col>
        );
    }
}

export default UsersList;