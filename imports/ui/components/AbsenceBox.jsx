import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class AbsenceBox extends React.Component {
    render() {
        const { bradfordFactor } = this.props;
        
        const color = bradfordFactor < 50 ? 'green' :
                        (50 <= bradfordFactor && bradfordFactor <= 124) ? 'blue' :
                        (125 <= bradfordFactor && bradfordFactor <= 399) ? 'yellow' :
                        (400 <= bradfordFactor&& bradfordFactor <= 649) ? 'orange' : 'red';

        const bradfordFactorStyle = {
            position: 'absolute',
            right: '10px',
            bottom: '10px',
            padding: '10px',
            color
        };

        return (
            <div className='box' style={{ position: 'relative', height: '265px' }}>
                <div className='custom-border'></div>
                <Col sm={12}>
                    <h3>Absence</h3>
                </Col>
                <Col sm={12}><div className='custom-divider'></div></Col>
                <Col sm={12} style={{ marginTop: '20px' }}>
                    <Link to='/absence' className='button-link'>Absence management</Link>
                </Col>
                <Col sm={12} style={{ marginTop: '10px' }}>
                    <Link to='/team_absence' className='button-link'>View your teams absence</Link>
                </Col>
                <div style={bradfordFactorStyle}>
                    Bradford factor:&nbsp;&nbsp;
                    <span>{bradfordFactor}</span>
                </div>
            </div>
        );
    }
}

export default AbsenceBox;