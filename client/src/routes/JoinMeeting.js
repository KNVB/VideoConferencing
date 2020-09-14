import fetchApi from '../utils/fetch';
import React ,{Component, Fragment} from 'react';
import { Button,Col,Container,Modal,Row } from 'react-bootstrap';
import UserAttrib from '../utils/UserAttrib';
import { Redirect } from 'react-router-dom';
class JoinMeeting extends Component {
    constructor(props) {
        super(props);
        this.modalBody=React.createRef();
        this.modalFooter=React.createRef();
        this.state = {showModal : false}
        this.state.show=false;
        this.meetingId=this.props.match.params.meetingId;
        this.formRef=React.createRef();
        this.handleClose=(event)=>{
            this.setState({'showModal': false});
            event.preventDefault(); 
        }
        this.handleSubmit =(event)=>{
            var form=this.formRef.current;
           
            if(form.reportValidity()){
                var data={};
                var modalBody=this.modalBody.current;
                this.setState({'showModal': true});
                data['alias']=form.alias.value;
                data['shareAudio']=form.shareAudio.value;
                data['shareVideo']=form.shareVideo.value;
                data['meetingId']=form.meetingId.value;
                data['meetingPwd']=form.meetingPwd.value;
                fetchApi('/authMeeting','POST',{},data,'json')
                .then(x=>{
                    //this.setState({'meeting': x});
                    this.modalBody.current.innerHTML+="The Meeting Authentication is passed.";
                })
                .catch(err => {
                    this.modalBody.current.innerHTML+="<div>"+err.message+"</div>";
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
                        <Modal.Body ref={this.modalBody}>
                            
                        </Modal.Body>
                        <Modal.Footer ref={this.modalFooter}>
                            <Button variant="secondary" onClick={this.handleClose}>
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