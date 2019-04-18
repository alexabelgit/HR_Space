import React from 'react';
import { DropdownButton, MenuItem, HelpBlock, FormControl } from 'react-bootstrap';
import classnames from 'classnames';

class CustomSelect extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            value: props.value,
            filter: '',
        };

        this.onValueSelect = this.onValueSelect.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ value: nextProps.value });
    }

    onValueSelect(value) {
        this.setState({ value });

        this.props.onSelect(value);
    }

    handleFilter = event => {
        event.preventDefault();

        this.setState({ filter: event.target.value });
    }

    render() {
        const { filter, textAlign, onSelect, value, option, placeholder, options = [], dropup, help, ...props } = this.props;

        const filteredOptions = !filter ? options : options.filter(opt => ~opt.toLowerCase().indexOf(this.state.filter.toLowerCase()));

        const title = <div>{this.state.value || '- Please select -'} <i className='caret fa fa-chevron-down'></i></div>;

        return (
            <div>
                <DropdownButton
                    className={classnames('custom-select', { 'error': !!help })}
                    title={title}
                    noCaret
                    dropup={dropup}
                    style={{ textAlign: textAlign }}
                    {...props}
                >
                    {
                        filter
                        &&
                        <MenuItem className='filter-menu-item' disabled>
                            <FormControl
                                bsClass='input'
                                type='text'
                                placeholder='Type to filter...'
                                value={this.state.filter}
                                onChange={this.handleFilter}
                            />
                        </MenuItem>
                    }
                    {
                        filteredOptions.length ?
                            filteredOptions.map((option, index) => (
                                <MenuItem
                                    key={option._id || index}
                                    onSelect={() => this.onValueSelect(option.name || option)}
                                >
                                    {option.name || option}
                                </MenuItem>
                            ))
                            :
                            <MenuItem disabled>No options</MenuItem>
                    }
                </DropdownButton>
                <HelpBlock style={{ opacity: help ? 1 : 0 }}>{help}</HelpBlock>
            </div>
        );
    }
}

CustomSelect.defaultProps = {
    textAlign: 'left'
};

export default CustomSelect;