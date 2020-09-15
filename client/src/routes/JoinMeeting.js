import { Button,Col,Container,Modal,Row,Spinner } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import fetchApi from '../utils/fetch';
import MeetingAPI from '../utils/MeetingAPI';
import React ,{Component, Fragment} from 'react';
import UserAttrib from '../utils/UserAttrib';

class JoinMeeting extends Component {
    constructor(props) {
        super(props);
        this.state = {authErrMsg:"",
                    showModal : false,
                    passAuth:false,
                    buttonDisabled:true}

        this.formRef=React.createRef();
        this.timer=null;
        this.meetingId=this.props.match.params.meetingId;
        
        this.handleClose=(event)=>{
            this.setState({'showModal': false});
            event.preventDefault(); 
        }
        this.handleSubmit =(event)=>{
            var form=this.formRef.current;
           
            if(form.reportValidity()){
                this.approvalReq={};
                this.setState({'showModal': true});
                this.approvalReq['alias']=form.alias.value;
                this.approvalReq['meetingId']=form.meetingId.value;
                this.approvalReq['meetingPwd']=form.meetingPwd.value;
                this.approvalReq['shareAudio']=form.shareAudio.value;
                this.approvalReq['shareVideo']=form.shareVideo.value;	
                fetchApi('/authMeeting','POST',{},this.approvalReq,'json')
                .then(x=>{
                    //console.log(x);
                    this.setState({className:"align-items-center d-flex flex-column justify-content-center",
                                   passAuth:true});
                    this.meetingAPI=new MeetingAPI();
                    this.approvalReq["tempId"]=x.tempId;               
                    this.meetingAPI.connect();
                    this.meetingAPI.submitApprovalReq(this.approvalReq,this.approvalResponseHandler);
                })
                .catch(err => {
                    this.setState({authErrMsg:err.message,
                                    className:"d-none",
                                    passAuth:false,
                                    buttonDisabled:false});
                });
            }
            event.preventDefault();
        }
        this.approvalResponseHandler=(result)=>{
            //console.log(result);
            if(result.error===0){
                if (Object.keys(result).length>1){
                    //console.log(result.user);
                    clearInterval(this.timer);
                    this.setState({'meeting':{"meetingId":result.meetingId,"user":result.user}});
                } else {
                    this.count=0;
                    this.timer=setInterval(this.counter,1000);
                }
            } else {
                clearInterval(this.timer);
                this.setState({authErrMsg:result.message,
                    className:"d-none",
                    passAuth:false,
                    buttonDisabled:false});
            }            
        }
        this.counter=(()=>{
            this.count++;
            if (this.count===180){ //time out = 3min.
                clearInterval(this.timer);
                this.meetingAPI.cancelApprovalReq(this.approvalReq);
                this.meetingAPI.disconnect();
                var message='The approval time out, please try again.';
                this.setState({authErrMsg:message,
                    className:"d-none",
                    passAuth:false,
                    buttonDisabled:false});
            }
        })
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
                                    <button type="submit" onClick={this.handleSubmit}>Join The Meeting</button>
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
                            <div className={(this.state.passAuth===false)?"":"d-none"}>
                                {this.state.authErrMsg}
                            </div>
                        </Modal.Body>
                        <Modal.Footer ref={this.modalFooter}>
                            <Button disabled={this.state.buttonDisabled} variant="secondary" onClick={this.handleClose}>
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