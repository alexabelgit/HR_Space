import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    visible: PropTypes.bool.isRequired,
    text: PropTypes.string
};

class ErrorAlert extends React.Component {
    render() {
        const { visible, text } = this.props;
        
        return (
            <div className='error-alert' style={{ opacity: visible ? 1 : 0 }}>
                {text}
            </div>
        );
    }
}

ErrorAlert.propTypes = propTypes;

export default ErrorAlert;