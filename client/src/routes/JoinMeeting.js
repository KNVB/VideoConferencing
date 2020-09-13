import fetchApi from '../utils/fetch';
import React ,{Component} from 'react';
import { Col,Container,Row } from 'react-bootstrap';
import UserAttrib from '../utils/UserAttrib';
import { Redirect } from 'react-router-dom';
class JoinMeeting extends Component {
    constructor(props) {
        super(props);
        this.state={};
        this.meetingId=this.props.match.params.meetingId;
        this.formRef=React.createRef();
        this.handleSubmit =(event)=>{
            var form=this.formRef.current;
            if(form.reportValidity()){
                var data={};
                data['alias']=form.alias.value;
                data['shareAudio']=form.shareAudio.value;
                data['shareVideo']=form.shareVideo.value;
                data['meetingId']=form.meetingId.value;
                data['meetingPwd']=form.meetingPwd.value;
                fetchApi('/joinMeeting','POST',{},data,'json')
                .then(x=>{
                    this.setState({'meeting': x});
                })
                .catch(err => {
                    alert(err.message);
                });
            }
            event.preventDefault();
        }
    }            
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
                                <h3>Join A Meeting</h3>
                            </Col>
                        </Row>
                        <UserAttrib/>
                        <Row>
                            <div className="col-6 d-flex justify-content-end">
                                <label htmlFor="meetingId">Meeting Id:</label>
                            </div>
                            <div className="col-6 m-0 p-0">    
                                <input autoComplete="off" type="text" required id="meetingId" 
                                    name="meetingId" defaultValue={this.meetingId}
                                    readOnly={(this.meetingId===null)?false:true}/>
                            </div>
                        </Row>
                        <Row>
                            <div className="col-6 d-flex justify-content-end">
                                <label htmlFor="meetingPwd">Meeting Password:</label>
                            </div>
                            <div className="col-6 m-0 p-0">    
                                <input type="password" id="meetingPwd" name="meetingPwd" required/>
                            </div>
                        </Row>                    
                        <Row>
                            <Col className="d-flex justify-content-center p-1">
                                <button type="submit" onClick={this.handleSubmit}>Join The Meeting</button>
                            </Col>
                        </Row>
                    </Container> 
                </form>
            );
        }    
    }
}
export default JoinMeeting;