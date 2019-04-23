import React from 'react';
import { Col, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { LinkContainer } from 'react-router-bootstrap';

const propTypes = {
    icon: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    to: PropTypes.string.isRequired
};

class MainMenuItem extends React.Component {
    render() {
        const { icon: iconClass, text, backgroundColor = '#ffffff' } = this.props;

        return (
            <Col className='main-menu-item'>
                <LinkContainer to={this.props.to} style={{ border: 'none', width: '100%', backgroundColor: 'transparent' }}>
                    <Button onClick={this.props.onClick}>
                        <i className={`fa fa-${iconClass}`}></i>
                        <p>{text}</p>
                    </Button>
                </LinkContainer>
            </Col>
        );
    }
}

MainMenuItem.propTypes = propTypes;

export default MainMenuItem;