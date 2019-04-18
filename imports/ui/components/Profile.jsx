import { Meteor } from 'meteor/meteor';
import React from 'react';
import { Grid, Row, Col, Button, Image as ReactImage } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class Profile extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    componentDidMount() {
        var html = document.querySelector('html');

        html.style.background = '#ffffff';
    }

    render() {
        var { profile } = this.props;

        return (
            <Col sm={12} style={{ marginTop: '20px' }}>
                <Row>
                    <Col sm={8}>
                        <Row>
                            <Col sm={12} style={{ marginTop: '15px' }}>
                                <div style={{ borderBottom: '1px solid #000000' }}>
                                    <h2>{profile.fullName}</h2>
                                    <p style={{ color: '#666666', fontSize: '20px' }}>{profile.jobTitle}</p>
                                </div>
                            </Col>
                            <Col sm={12} style={{ marginTop: '15px' }}>
                                <div style={{ borderBottom: '1px solid #000000' }}>
                                    <h3>Biography</h3>
                                    <p style={{ fontSize: '16px' }}>{profile.bio}</p>
                                </div>
                            </Col>
                            <Col sm={12} style={{ marginTop: '25px' }}>
                                <Row>
                                    <Col sm={4}>
                                        <p style={{ marginTop: '10px', fontSize: '18px', fontWeight: 'bold' }}>Works phone number</p>
                                    </Col>
                                    <Col sm={8}>
                                        <p style={{ marginTop: '10px', fontSize: '18px' }}>{profile.telephone}</p>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm={4}>
                                        <p style={{ marginTop: '10px', fontSize: '18px', fontWeight: 'bold' }}>Works email address</p>
                                    </Col>
                                    <Col sm={8}>
                                        <p style={{ marginTop: '10px', fontSize: '18px' }}>{profile.email}</p>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm={4}>
                                        <p style={{ marginTop: '10px', fontSize: '18px', fontWeight: 'bold' }}>Working location</p>
                                    </Col>
                                    <Col sm={8}>
                                        <p style={{ marginTop: '10px', fontSize: '18px' }}>{profile.location}</p>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm={4}>
                                        <p style={{ marginTop: '10px', fontSize: '18px', fontWeight: 'bold' }}>Who reports to this person</p>
                                    </Col>
                                    <Col sm={8} style={{ marginTop: '10px' }}>
                                        <Row>
                                            {
                                                profile.subordinates.map(subordinate => (
                                                    <Col sm={12} key={subordinate._id} style={{ marginBottom: '10px' }}>
                                                        <div className='small-profile-wrapper' onClick={() => this.props.onProfileSelect(subordinate)}>
                                                            <div className='custom-border-left'></div>
                                                            <div className='small-profile'>
                                                                <ReactImage rounded width={54} height={54} src={subordinate.photo || '/img/no-avatar.png'} />
                                                                <Link to='#'>{subordinate.fullName}</Link>
                                                            </div>
                                                        </div>
                                                    </Col>
                                                ))
                                            }
                                        </Row>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Col>
                    <Col sm={4}>
                        <ReactImage height={250} width={250} src={profile.photo || '/img/no-avatar.png'} />
                    </Col>
                </Row>
            </Col>
        );
    }
}

export default Profile;