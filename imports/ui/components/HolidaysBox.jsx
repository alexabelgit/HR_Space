import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class HolidaysBox extends React.Component {
    render() {
        const { holidayEntitlement = 0, daysTaken = 0 } = this.props;

        return (
            <div className='box' style={{ height: '265px', marginBottom: '20px' }}>
                <div className='custom-border'></div>
                <Col sm={12}>
                    <h3>Holidays</h3>
                </Col>
                <Col sm={12}><div className='custom-divider'></div></Col>
                <Col sm={9} style={{ marginTop: '20px' }}>
                    <p>Holiday Entitlement</p>
                </Col>
                <Col sm={3} style={{ marginTop: '20px' }}>
                    <p>{holidayEntitlement}</p>
                </Col>
                <Col sm={9}>
                    <p>Days Taken</p>
                </Col>
                <Col sm={3}>
                    <p>{daysTaken}</p>
                </Col>
                <Col sm={9}>
                    <p>Days Remaining</p>
                </Col>
                <Col sm={3}>
                    <p>{holidayEntitlement - daysTaken}</p>
                </Col>
                <Col sm={12} style={{ marginTop: '40px' }}>
                    <Link to='/holidays_status' className='button-link'>Apply for holiday</Link>
                </Col>
            </div>
        );
    }
}

export default HolidaysBox;