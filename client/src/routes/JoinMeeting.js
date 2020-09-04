import React ,{Component} from 'react';
import { Col,Container,Row } from 'react-bootstrap';
import UserAttrib from '../utils/UserAttrib';
class JoinMeeting extends Component {
    render(){
        return (
            <form>
                <Container fluid>
                    <Row>
                        <Col>
                            <h3>Join A Meeting</h3>
                        </Col>
                    </Row>
                    <UserAttrib/>
                    <Row>
                        <div className="col-6 d-flex justify-content-end">
                            <label htmlFor="meetingId">Meeting Id:</label>
                        </div>
                        <div className="col-6 m-0 p-0">    
                            <input type="text" required id="meetingId"/>
                        </div>
                    </Row>
                    <Row>
                        <div className="col-6 d-flex justify-content-end">
                            <label htmlFor="meetingPwd">Meeting Password:</label>
                        </div>
                        <div className="col-6 m-0 p-0">    
                            <input text="password" id="meetingPwd"/>
                        </div>
                    </Row>                    
                    <Row>
                        <Col className="d-flex justify-content-center p-1">
                            <button>Join Meeting</button>
                        </Col>
                    </Row>
                </Container> 
            </form>
        );
    }
}
export default JoinMeeting;