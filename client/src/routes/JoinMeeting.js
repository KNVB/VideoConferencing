import $ from "jquery";
import { Button,Col,Container,Modal,Row,Spinner } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import JoinMeetingUtil from '../utils/JoinMeetingUtil';
import React ,{Component, Fragment} from 'react';
import UserAttrib from '../utils/UserAttrib';

class JoinMeeting extends Component {
    constructor(props) {
        super(props);
        this.state = {errorMsg:"",
                    showModal : false,                   
                    buttonDisabled:true}

        this.formRef=React.createRef();
        this.timer=null;
        this.meetingId=this.props.match.params.meetingId;
        
        this.closeModal=(event)=>{
            this.setState({'showModal': false});
            event.preventDefault(); 
        }
        this.submitJoinReq=(event)=>{
            var form=this.formRef.current;
            if(form.reportValidity()){
                this.joinReq={};
                this.setState({ buttonDisabled:true,
                                errorMsg:"",
                                'showModal': true});
                this.joinReq['alias']=form.alias.value;
                this.joinReq['meetingId']=form.meetingId.value;
                this.joinReq['meetingPwd']=form.meetingPwd.value;
                this.joinReq['shareAudio']=form.shareAudio.value;
                this.joinReq['shareVideo']=form.shareVideo.value;

                if ($(form.shareAudio).val()==="true")
                    this.joinReq['shareAudio']=true;
                else     
                    this.joinReq['shareAudio']=false;
                if ($(form.shareVideo).val()==="true")
                    this.joinReq['shareVideo']=true;
                else
                    this.joinReq['shareVideo']=false;

                this.jointMeetingUtil=new JoinMeetingUtil();
                this.jointMeetingUtil.getJoinReqId(this.joinReq,(result)=>{
                    if (result.error===0){
                        this.joinReq['joinReqId']=result.joinReqId;
                        this.setState({className:"align-items-center d-flex flex-column justify-content-center"});
                        this.jointMeetingUtil.submitJoinReq(this.joinReq,(result)=>{
                            if (result.error===0){
                                this.jointMeetingUtil.joinReqResultHandlder=this.joinReqResultHandlder;
                                this.count=0;
                                this.timer=setInterval(this.counter,1000); 
                            }else{                                
                                this.setState({
                                        className:"d-none",
                                        errorMsg:result.message,
                                        buttonDisabled:false});        
                            }
                        });
                        
                    } else {
                        clearInterval(this.timer);
                        this.setState({
                                        className:"d-none",
                                        errorMsg:result.message,
                                        buttonDisabled:false});
                    }
                });
            }
            event.preventDefault();
        }
        this.counter=(()=>{
            this.count++;
            if (this.count===180){ //time out = 3min.
                clearInterval(this.timer);
                this.jointMeetingUtil.cancelJoinReq(this.joinReq);
                this.jointMeetingUtil.disconnect();
                var message='This join request is time out, please try again.';
                this.setState({errorMsg:message,
                    className:"d-none",
                    buttonDisabled:false});
            }
        })
        this.joinReqResultHandlder=(result)=>{
            
            clearInterval(this.timer);
            if (result.error===0){
                delete this.joinReq['joinReqId'];
                this.setState({meeting:{"user":result.user,"meetingId":result.meetingId}});
            } else {
                var message=result.message;
                
                this.setState({errorMsg:message,
                    className:"d-none",
                    buttonDisabled:false});
            }
            this.jointMeetingUtil.disconnect();
        }
    }            
    render(){
        if (this.state.meeting){
            sessionStorage.setItem("meetingInfo",JSON.stringify(this.state.meeting));
            return <Redirect to={"/meeting/"+this.state.meeting.meetingId}/>
        } else {
            return (
                <Fragment>
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
                                        readOnly={(this.meetingId===undefined)?false:true}/>
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
                                    <button type="submit" onClick={this.submitJoinReq}>Join The Meeting</button>
                                </Col>
                            </Row>
                        </Container> 
                    </form>
                    <Modal show={this.state.showModal}
                        backdrop="static"
                        keyboard={false}>
                        <Modal.Body className="align-items-center d-flex flex-column justify-content-center">
                            <div 
                                className={this.state.className}>
                                <div>
                                    The Meeting Authentication is passed.<br/>
                                    Waiting for the host approval.
                                </div>
                                <Spinner animation="border" role="status">
                                    <span className="sr-only">Loading...</span>
                                </Spinner>
                            </div>
                            <div>
                                {this.state.errorMsg}
                            </div>
                        </Modal.Body>
                        <Modal.Footer ref={this.modalFooter}>
                            <Button disabled={this.state.buttonDisabled} variant="secondary" onClick={this.closeModal}>
                                Close
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </Fragment>    
            );
        }    
    }
}
export default JoinMeeting;