import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    id: PropTypes.string,
    checked: PropTypes.bool,
    justify: PropTypes.string
};

class CustomSwitch extends React.Component {
    render() {
        const { inputRef, ...props } = this.props;

        return (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: props.justify || 'left', paddingTop: '11px' }}>
                <label htmlFor={props.id} style={{ fontSize: '16px', marginRight: '5px', opacity: props.checked ? '1' : '0.4' }}>Yes</label>
                <label htmlFor={props.id} className='switch'>
                    <input type='checkbox' ref={inputRef} {...props} />
                    <span className='slider round'></span>
                </label>
                <label htmlFor={props.id} style={{ fontSize: '16px', marginLeft: '5px', opacity: props.checked ? '0.4' : '1' }}>No</label>
            </div>
        );
    }
}

CustomSwitch.propTypes = propTypes;

export default CustomSwitch;