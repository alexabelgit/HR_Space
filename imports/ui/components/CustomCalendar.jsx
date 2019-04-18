import React from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import moment from 'moment';
import BigCalendar from 'react-big-calendar';

import 'moment/locale/en-gb';
import 'react-big-calendar/lib/css/react-big-calendar.css';

BigCalendar.momentLocalizer(moment);

const events = [
    { title: 'some event', details: 'some details0', startDate: new Date(), endDate: moment(new Date()).add(7, 'days').toDate() },
    { title: 'some event', details: 'some details1', startDate: new Date(), endDate: moment(new Date()).add(7, 'days').toDate() },
    { title: 'some event', details: 'some details2', startDate: new Date(2017, 11, 1), endDate: new Date(2017, 11, 2) },
    { title: 'some event', details: 'some details2', startDate: new Date(2017, 11, 1), endDate: new Date(2017, 11, 2) },
    { title: 'some event', details: 'some details2', startDate: new Date(2017, 11, 1), endDate: new Date(2017, 11, 2) },
    { title: 'some event', details: 'some details2', startDate: new Date(2017, 11, 1), endDate: new Date(2017, 11, 2) },
    { title: 'some event', details: 'some details2', startDate: new Date(2017, 11, 1), endDate: new Date(2017, 11, 2) },
    { title: 'some event', details: 'some details3', startDate: new Date(2017, 11, 1), endDate: new Date(2017, 11, 2) },
    { title: 'some event', details: 'some details4', startDate: new Date(2017, 11, 1), endDate: new Date(2017, 11, 2) },
    { title: 'some event', details: 'some details5', startDate: new Date(2017, 10, 30), endDate: new Date(2017, 11, 1) },
    { title: 'some event', details: 'some details6', startDate: new Date(2017, 11, 2), endDate: new Date(2017, 11, 3) },
    { title: 'some event', details: 'some details7', startDate: new Date(2017, 11, 3), endDate: new Date(2017, 11, 7) },
    { title: 'some event', details: 'some details8', startDate: new Date(2017, 11, 6), endDate: new Date(2017, 11, 11) },
];

const CustomToolbar = toolbar => {
    const goBack = () => {
        toolbar.date.setMonth(toolbar.date.getMonth() - 1);
        toolbar.onNavigate('prev');
    };

    const goNext = () => {
        toolbar.date.setMonth(toolbar.date.getMonth() + 1);
        toolbar.onNavigate('next');
    };

    const label = () => {
        const date = moment(toolbar.date);

        return <span style={{ verticalAlign: 'middle' }}>{date.format('MMMM') + ' ' + date.format('YYYY')}</span>;
    };

    return (
        <div className='toolbar-container'>
            <button className='calendar-nav-button' onClick={goBack}><i className='fa fa-chevron-left' style={{ verticalAlign: 'middle' }}></i></button>
            <label className='label-date'>{label()}</label>
            <button className='calendar-nav-button' onClick={goNext}><i className='fa fa-chevron-right' style={{ verticalAlign: 'middle' }}></i></button>
        </div>
    );
};

const CustomEvent = ({ event }) => {
    console.log('event.sicknessIdentifier', event);
    const overlay = <Tooltip id='tooltip'>{event.details}</Tooltip>;

    if (event.sicknessIdentifier) {
        return <div>{event.title}</div>;
    } else {
        return (
            <OverlayTrigger 
                placement='top' 
                overlay={overlay}
            >
                <div>{event.title}</div>
            </OverlayTrigger>
        );
    }
};

class CustomCalendar extends React.Component {
    render() {
        return (
            <div style={{ margin: '30px 0', height: '45vw' }}>
                <BigCalendar
                    events={this.props.absences}
                    popup={true}
                    views={['month']}
                    startAccessor='startDate'
                    endAccessor='endDate'
                    components={{ toolbar: CustomToolbar, event: CustomEvent }}
                    eventPropGetter={(event, start, end, isSelected) => ({ className: event.type, style: {} })}
                    formats={{ dateFormat: (date, culture, localizer) => localizer.format(date, 'D', culture) }}
                />
            </div>
        );
    }
}

export default CustomCalendar;