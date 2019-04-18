import React from 'react';
import { Alert as BootstrapAlert, Tooltip, OverlayTrigger } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import moment from 'moment';
import classnames from 'classnames';

class Alert extends React.Component {
    constructor(props) {
        super();

        this.state = {
            notes: '',
        };
    }

    componentDidMount() {
        if (this.props.task.holiday) {
            Meteor.call('getHolidayNotes', this.props.task.holiday, (error, response) => this.setState({ notes: response }));
        }
    }
    
    render() {
        const { task, onTaskDismiss, onHolidayApprove, onHolidayDecline } = this.props;

        switch (task.taskType) {
            case 'self_certification':
                return (
                    <BootstrapAlert
                        key={task._id}
                        bsClass={classnames('custom-alert', { 'overdue': task.overdue })}
                    >
                        <div>
                            <Link to={{ pathname: '/forms/self_certification', state: { users: task.users, taskId: task._id } }}>
                                {task.overdue && <span className='overdue-badge'><i className='fa fa-warning'></i>OVERDUE</span>}
                                <span>{moment(task.createdAt).format('DD/MM/YYYY')}</span>
                                <span>{task.text}</span>
                            </Link>
                        </div>
                    </BootstrapAlert>
                )
            case 'holiday_approval':
                const infoStyle = {
                    borderRadius: '50%',
                    fontSize: '16px',
                };

                return (
                    <BootstrapAlert
                        key={task._id}
                        bsClass={classnames('custom-alert', { 'overdue': task.overdue })}
                    >
                        <div>
                            {task.overdue && <span className='overdue-badge'><i className='fa fa-warning'></i>OVERDUE</span>}
                            <span>{moment(task.createdAt).format('DD/MM/YYYY')}</span>
                            <span style={{ marginRight: '15px' }}>{task.text}</span>
                            {
                                this.state.notes 
                                &&
                                <OverlayTrigger placement='bottom' overlay={<Tooltip id='tooltip'>{this.state.notes}</Tooltip>}>
                                    <span style={infoStyle}><i className='fa fa-info-circle'></i></span>
                                </OverlayTrigger>
                            }
                            <button className='holiday-decline' onClick={() => onHolidayDecline(task.holiday)}>Decline</button>
                            <button className='holiday-approve' onClick={() => onHolidayApprove(task.holiday)}>Approve</button>
                        </div>
                    </BootstrapAlert>
                )
            default:
                return (
                    <BootstrapAlert
                        key={task._id}
                        bsClass={classnames('custom-alert', { 'overdue': task.overdue })}
                        onDismiss={() => onTaskDismiss(task._id)}
                    >
                        <div>
                            <Link to={{ pathname: '/absence', state: { absenceId: task.absence } }}>
                                {task.overdue && <span className='overdue-badge'><i className='fa fa-warning'></i>OVERDUE</span>}
                                <span>{moment(task.createdAt).format('DD/MM/YYYY')}</span>
                                <span>{task.text}</span>
                            </Link>
                        </div>
                    </BootstrapAlert>
                )
        }
    }
};

export default Alert;