import React from 'react';
import { DropdownButton, MenuItem } from 'react-bootstrap';

class Select extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selected: props.selected
        };
    }

    componentWillReceiveProps = nextProps => this.setState({ selected: nextProps.selected });

    onValueSelect = selected => {
        this.setState({ selected });

        this.props.onSelect(selected);
    }

    render() {
        const { 
            onSelect,
            textAlign = 'left', 
            selected, 
            displayKey = 'name', 
            placeholder = '- Please select -', 
            options = [], 
            dropup = false, 
            ...props 
        } = this.props;

        const title =   <div>
                        {
                            (typeof selected === 'string') ?
                                selected
                                :
                                (selected && selected[displayKey]) ? 
                                    selected[displayKey] 
                                    : 
                                    placeholder
                        } 
                            <i className='caret fa fa-chevron-down'></i>
                        </div>;

        return (
            <div>
                <DropdownButton
                    className='custom-select'
                    title={title}
                    style={{ textAlign: textAlign, ...this.props.style }}
                    noCaret
                    {...props}
                >
                    <MenuItem onSelect={() => this.onValueSelect(null)}>{placeholder}</MenuItem>
                    {
                        this.props.options.map((option, index) => (
                                <MenuItem
                                    key={option._id || option.id || index}
                                    onSelect={() => this.onValueSelect(option)}
                                >
                                    {option[displayKey] || option}
                                </MenuItem>
                            )
                        )
                    }
                </DropdownButton>
            </div>
        );
    }
}

export default Select;