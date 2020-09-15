import fetchApi from '../utils/fetch';
import { Col,Container,Row } from 'react-bootstrap';
import React ,{Component} from 'react';
import { Redirect } from 'react-router-dom';
import UserAttrib from '../utils/UserAttrib';

class CreateMeeting extends Component {
    constructor(props) {
        super(props);
        this.state={};
        this.formRef=React.createRef();
        this.handleSubmit =(event)=>{
            var form=this.formRef.current;
            
            if(form.reportValidity()){
                if (form.meetingPwd.value!==form.cfmPwd.value) {
                    alert("The meeting password and the confirm password do not match.");
                } else {
                    var data={};
                    data['alias']=form.alias.value;
                    data['meetingPwd']=form.meetingPwd.value;
                    data['shareAudio']=form.shareAudio.value;
                    data['shareVideo']=form.shareVideo.value;                    
                    fetchApi('/initMeeting','POST',{},data,'json')
                    .then(x=>{
                        this.setState({'meeting': x});
                    })
                    .catch(err => {
                        alert("Something wrong when creating a meeting : "+err.message);
                    });
                }
            }
            event.preventDefault();     
        }
      }
      
//
//https://medium.com/frochu/constraint-validation-api-b589e8a2ac0f
//

    render(){
        if (this.state.meeting){
            sessionStorage.setItem("meetingInfo",JSON.stringify(this.state.meeting));
            return <Redirect to={"/meeting/"+this.state.meeting.meetingId}/>
        } else {
            return (
                <form ref={this.formRef}>
                    <Container fluid>
                        <Row>
                            <Col>
                                <h3>Create A Meeting</h3>
                            </Col>
                        </Row>
                        <UserAttrib/>
                        <Row>
                            <div className="col-6 d-flex justify-content-end">
                                <label htmlFor="meetingPwd">Meeting Password:</label>
                            </div>
                            <div className="col-6 m-0 p-0">    
                                <input id="meetingPwd" name="meetingPwd" type="password" defaultValue="1" required/>
                            </div>
                        </Row>
                        <Row>
                            <div className="col-6 d-flex justify-content-end">
                                <label htmlFor="cfmPwd">Confirm Password:</label>
                            </div>
                            <div className="col-6 m-0 p-0">    
                                <input id="cfmPwd" name="cfmPwd" type="password" defaultValue="1" required/>
                            </div>
                        </Row>     
                        <Row>
                            <Col className="d-flex justify-content-center p-1">
                                <button type="submit" onClick={this.handleSubmit}>Create Meeting</button>
                            </Col>
                        </Row>
                </Container> 
            </form>
            )
        }    
    }
}
export default CreateMeeting;