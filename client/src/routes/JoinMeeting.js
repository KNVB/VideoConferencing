import React ,{Component} from 'react';
import { Col,Container,Row } from 'react-bootstrap';
import UserInput from '../utils/UserInput';
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
                    <UserInput/>
                    <Row>
                        <div className="col-2 d-flex justify-content-end">
                            <label htmlFor="meetingId">Meeting Id:</label>
                        </div>
                        <div className="col-10 m-0 p-0">    
                            <input type="text" required id="meetingId"/>
                        </div>
                    </Row>
                    <Row>
                        <div className="col-4 d-flex justify-content-center p-1">
                            <button>Join Meeting</button>
                        </div>
                    </Row>
                </Container> 
            </form>
        );
    }
}
export default JoinMeeting;