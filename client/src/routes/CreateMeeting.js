import React ,{Component} from 'react';
import { Col,Container,Row } from 'react-bootstrap';
import UserInput from '../utils/UserInput';
class CreateMeeting extends Component {
    constructor(props) {
        super(props);
        this.formRef=React.createRef();
        this.handleSubmit =(event)=>{
            console.log(this.formRef.current.reportValidity());
            event.preventDefault();     
        }
      }
      
//
//https://medium.com/frochu/constraint-validation-api-b589e8a2ac0f
//

    render(){
        return (
            <form ref={this.formRef}>
                <Container fluid>
                    <Row>
                        <Col>
                            <h3>Create A Meeting</h3>
                        </Col>
                    </Row>
                    <UserInput/>
                    <Row>
                        <div className="col-4 d-flex justify-content-center p-1">
                            <button type="submit" onClick={this.handleSubmit}>Create Meeting</button>
                        </div>
                    </Row>
            </Container> 
           </form>
        )
    }
}
export default CreateMeeting;