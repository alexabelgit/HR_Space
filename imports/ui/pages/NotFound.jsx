import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';

class NotFound extends React.Component {
    render() {
        return (
            <Grid className='not-found' style={{ paddingTop: '20px' }} fluid>
                Page not found
            </Grid>
        );
    }
}

export default NotFound;