import React from 'react';
import { DropdownButton, MenuItem, HelpBlock } from 'react-bootstrap';

class SmartCustomSelect extends React.Component {
    constructor(props) {
        super(props);

        var index = props.options.findIndex(item => item._id === props.option);

        this.state = {
            option: props.options[index] || { name: props.placeholder || '- Please select -', _id: '' }
        };

        this.onValueSelect = this.onValueSelect.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        var index = nextProps.options.findIndex(item => item._id === nextProps.option);

        this.setState({ option: nextProps.options[index] || { name: nextProps.placeholder || '- Please select -', _id: '' } });
    }

    onValueSelect(option) {
        this.setState({ option });

        this.props.onSelect(option._id);
    }

    render() {
        const { onSelect, textAlign, value, option, placeholder, options, dropup, help, ...props } = this.props;

        const title = <div>{this.state.option.name} <i className='caret fa fa-chevron-down'></i></div>;

        return (
            <div>
                <DropdownButton 
                    className={this.props.help ? 'custom-select error' : 'custom-select'} 
                    title={title} 
                    style={{ textAlign: textAlign || 'left' }}
                    noCaret
                    {...props}
                >
                    {
                        this.props.options.map(option => (
                                <MenuItem 
                                    key={option._id} 
                                    onSelect={() => this.onValueSelect(option)}
                                >
                                    {option.name}
                                </MenuItem>
                            )
                        )
                    }
                </DropdownButton>
                <HelpBlock style={{ opacity: this.props.help ? 1 : 0 }}>{this.props.help}</HelpBlock>
            </div>
        );
    }
}

export default SmartCustomSelect;