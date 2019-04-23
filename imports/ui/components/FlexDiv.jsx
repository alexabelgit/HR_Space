import React from 'react';

class FlexDiv extends React.Component {
    render() {
        const style = {
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '25px'
        };

        return (
            <div style={style}>
                {this.props.children}
            </div>
        );
    }
}

export default FlexDiv;