import React from 'react';
import { HelpBlock } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import classnames from 'classnames';

import 'react-datepicker/dist/react-datepicker.css';

class DateInput extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};

    }

    handleDateChange = date => {
        var newDate = +date.toDate() ? date.toDate() : null;

        this.props.onChange(newDate, this.props.id);
    }

    render() {
        const { wrapperStyle, minDate, maxDate, excludeDates = [], required } = this.props;
        const selected = (+this.props.selected) ? moment(this.props.selected) : undefined;

        return (
            <div className='datepicker-wrapper' style={wrapperStyle}>
                <div style={{ position: 'relative' }}>
                    <DatePicker 
                        className='input lg'
                        selected={selected} 
                        dateFormat='DD/MM/YYYY' 
                        onSelect={this.handleDateChange} 
                        // onChange={this.handleDateChange} 
                        disabled={this.props.disabled}
                        minDate={minDate}
                        maxDate={maxDate}
                        excludeDates={excludeDates.map(date => moment(date))}
                        required={required}
                    />
                    <i className='fa fa-calendar' style={{ position: 'absolute', right: '10px', top: 'calc(50% - 8px)', fontSize: '16px' }}></i>
                </div>
                <HelpBlock style={{ opacity: this.props.help ? 1 : 0 }}>{this.props.help}</HelpBlock>
            </div>
        );
    }
}

export default DateInput;