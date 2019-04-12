import React from 'react';
import { Row, Col, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';

class FieldGroup extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    handleKeyPress(event) {
        const isNumeric = n => !isNaN(parseFloat(n)) && isFinite(n);

        if (!isNumeric(event.key)) {
            event.preventDefault();
        }
    }

    render() {
        const { numbersOnly, help, ...props } = this.props;

        if (this.props.type === 'textarea') {
            return (
                <Row>
                    <Col sm={12}>
                        <FormGroup bsSize='lg' controlId={props.id}>
                            <Col 
                                componentClass={ControlLabel} 
                                smOffset={props.offset || 0} 
                                sm={props.labelsize || 3}
                            >
                                {props.label}
                            </Col>
                            <Col sm={props.inputsize || 4}>
                                <FormControl 
                                    componentClass='textarea' 
                                    bsClass={help ? 'input error' : 'input'} 
                                    rows={props.rows || 5} 
                                    value={props.value} 
                                    onKeyPress={numbersOnly ? this.handleKeyPress : undefined}
                                    {...props}
                                />
                            </Col>
                        </FormGroup>
                    </Col>
                </Row>
            );
        } else {
            return (
                <Row>
                    <Col sm={12}>
                        <FormGroup bsSize='lg' controlId={props.id}>
                            <Col 
                                componentClass={ControlLabel} 
                                smOffset={props.offset || 0} 
                                sm={props.labelsize || 3}
                            >
                                {props.label} {props.labelicon && <i className={`fa fa-${props.labelicon}`} style={{ color: props.iconcolor || '#000000', fontSize: '24px', verticalAlign: 'middle' }}></i>}
                            </Col>
                            <Col sm={props.inputsize || 4}>
                                <FormControl 
                                    bsClass={help ? 'input error lg' : 'input lg'} 
                                    onKeyPress={numbersOnly ? this.handleKeyPress : undefined}
                                    {...props} 
                                />
                            </Col>
                        </FormGroup>
                    </Col>
                </Row>
            );
        }
    }
}

export default FieldGroup;