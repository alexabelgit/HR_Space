import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    visible: PropTypes.bool.isRequired,
    text: PropTypes.string
};

class SuccessAlert extends React.Component {
    render() {
        const { visible, text } = this.props;

        return (
            <div className='success-alert' style={{ opacity: visible ? 1 : 0 }}>
                {text}
            </div>
        );
    }
}

SuccessAlert.propTypes = propTypes;

export default SuccessAlert;