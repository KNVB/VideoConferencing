import React from 'react';
import ChatHistory from './components/meeting/ChatHistory';

import MemberList from './components/meeting/MemberList';
import MeetingInfo from './components/meeting/MeetingInfo';
import MaxMinButton from './components/mediaplayer/buttons/MaxMinButton';
import MuteButton from './components/mediaplayer/buttons/MuteButton';
import PInPButton from './components/mediaplayer/buttons/PInPButton';

import './Test1.css';
import Collapse from 'react-bootstrap/Collapse';
import { Card } from 'react-bootstrap';

class Test1 extends React.Component{
    constructor(props){
        super(props);
        this.state={};
        this.chatHistory=React.createRef();
        this.meetingInfo=React.createRef();
        this.memberList=React.createRef();
        this.paneList={};
        this.state={showPane:'memberList'};
        this.setShowPane=(paneName)=>{
            this.setState({"showPane":paneName});
        };        
    }
    componentDidMount(){
        document.getElementById("root").classList.add("p-1");
        this.paneList['chatHistory']=this.chatHistory.current;
        this.paneList['memberList']=this.memberList.current;
        this.paneList['meetingInfo']=this.meetingInfo.current;        
    }
    componentWillUnmount() {
        document.getElementById("root").classList.remove("p-1");
    }    
    render(){
        
        Object.keys(this.paneList).forEach(paneName=>{    
            if (this.state.showPane===paneName){
                this.paneList[paneName].classList.remove("d-none");
                this.paneList[paneName].classList.add("d-flex");
            } else {
                this.paneList[paneName].classList.remove("d-flex");
                this.paneList[paneName].classList.add("d-none");
            }
        });
        return (
            <div className="border border-primary p-1 meeting">
                <div className="d-flex flex-grow-1 panel 
                            p-1 position-relative">
                    <div className="position-relative m-0 
                                p-0 rounded w-100">
                        <video muted className="rounded">
                            <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4"/>
                        </video>
                    </div>
                    <div className="align-items-center
                                bg-dark    
                                border border-primary
                                d-none
                                justify-content-center 
                                p-1 playerInfoLayer
                                playerOverlay position-absolute
                                m-0 rounded text-white w-100">
                        2
                    </div>
                    <div className="align-items-end                                
                                border border-primary
                                d-flex m-0 p-1
                                playerOverlay
                                position-absolute m-0 
                                rounded w-100">
                        <Collapse className="bg-secondary p-1 rounded w-100"
                            in={true}>
                            <span className="p-1 m-0 text-white">
                                <div className="align-items-center d-flex flex-row justify-content-between p-0">
                                    <MuteButton toggleMute={this.toggleMute}  muted={this.state.muted}/>
                                    <div><span>{this.state.elapseTime}</span></div>
                                </div>
                                <div className="align-items-center d-flex flex-row justify-content-between p-0">
                                    <PInPButton 
                                        showFullScreen={this.state.showFullScreen}
                                        togglePInP={this.togglePInP}/>
                                    <div onClick={this.toggleMirror}>
                                        &#x21c4;
                                    </div>
                                    <MaxMinButton 
                                        toggFullScreen={this.toggFullScreen} 
                                        showFullScreen={this.state.showFullScreen}/>    
                                </div>
                            </span>
                        </Collapse>                    
                    </div>
                </div>
                <div className="border border-primary 
                                d-flex flex-grow-1 
                                panel p-1 rounded">
                    <Card className="border border-primary w-100">
                        <Card.Header className="align-items-center 
                                                d-flex flex-row 
                                                justify-content-around 
                                                m-0 p-1">
                            <div className="align-items-end                                             
                                            btn d-flex pt-1" 
                                onClick={()=>this.setShowPane('memberList')}>                            
                                <svg width="24px" height="24px" viewBox="0 0 24 24" className="bi bi-people-fill d-block m-auto" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-5.784 6A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216zM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z"/>
                                </svg>
                            </div>
                            <div className="align-items-end                                             
                                            btn d-flex pt-1" 
                                onClick={()=>this.setShowPane('meetingInfo')}>                            
                                <svg width="24px" height="24px" viewBox="0 0 24 24" className="bi bi-info-circle d-block m-auto" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"></path>
                                    <path d="M8.93 6.588l-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588z"></path>
                                    <circle cx="8" cy="4.5" r="1"></circle>
                                </svg>
                            </div>
                            <div className="align-items-end                                             
                                            btn d-flex pt-1" 
                                onClick={()=>this.setShowPane('chatHistory')}>                            
                                <svg width="24px" height="24px" viewBox="0 0 24 24" className="bi bi-chat-dots d-block m-auto" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" d="M2.678 11.894a1 1 0 0 1 .287.801 10.97 10.97 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8.06 8.06 0 0 0 8 14c3.996 0 7-2.807 7-6 0-3.192-3.004-6-7-6S1 4.808 1 8c0 1.468.617 2.83 1.678 3.894zm-.493 3.905a21.682 21.682 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a9.68 9.68 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9.06 9.06 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105z"/>
                                    <path d="M5 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
                                </svg>
                            </div>  
                        </Card.Header>
                        <Card.Body className="d-flex flex-grow-1 p-1">
                            <Card className="border border-primary 
                                         d-none flex-grow-1 w-100"
                                ref={this.chatHistory}>
                                <Card.Body className="h-100 p-0 position-relative">
                                    <div className="h-100 overflow-auto
                                                    p-1 position-absolute w-100">
                                        Chat History
                                    </div>
                                </Card.Body>                                
                            </Card>
                            <Card className="border border-primary 
                                            d-flex flex-grow-1 w-100"
                                ref={this.memberList}>
                                <Card.Body className="h-100 p-0 position-relative">
                                    <div className="h-100 overflow-auto
                                                    p-1 position-absolute w-100">
                                        <div>dsfsdf</div>
                                        <div>dsfsdf</div>
                                        <div>dsfsdf</div>
                                        <div>dsfsdf</div>
                                        <div>dsfsdf</div>
                                        <div>dsfsdf</div>
                                        <div>dsfsdf</div>
                                        <div>dsfsdf</div>
                                        <div>dsfsdf</div>
                                        <div>dsfsdf</div>
                                        <div>dsfsdf</div>
                                        <div>dsfsdf</div>
                                        <div>dsfsdf</div>
                                        <div>dsfsdf</div>
                                        <div>dsfsdf</div>
                                        <div>dsfsdf</div>
                                        <div>dsfsdf</div>
                                        <div>dsfsdf</div>
                                        <div>dsfsdf</div>
                                        <div>dsfsdf</div>
                                        <div>dsfsdf</div>
                                        <div>dsfsdf</div>
                                        <div>dsfsdf</div>
                                        <div>dsfsdf</div>
                                    </div>
                                </Card.Body>                                
                            </Card>
                            <Card className="border border-primary 
                                            d-none w-100"
                                    ref={this.meetingInfo}>
                                <Card.Body className="p-0 position-relative">
                                    <div className="h-100 overflow-auto
                                                    p-1 position-absolute w-100">
                                        Meeting Info
                                    </div>
                                </Card.Body>
                            </Card>
                        </Card.Body>
                        <Card.Footer className="d-flex flex-column p-1 rounded">
                            <div className="p-0">
                                <input type="text" className="w-100"/>
                            </div>
                            <div className="d-flex flex-row justify-content-around pt-1">
                                <div className="btn d-flex flex-column just-content-center p-0">
                                    <div className="p-0">
                                        <svg width="24" height="24" viewBox="0 0 24 24" className="bi bi-mic-fill d-block m-auto" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M5 3a3 3 0 0 1 6 0v5a3 3 0 0 1-6 0V3z"/>
                                            <path fillRule="evenodd" d="M3.5 6.5A.5.5 0 0 1 4 7v1a4 4 0 0 0 8 0V7a.5.5 0 0 1 1 0v1a5 5 0 0 1-4.5 4.975V15h3a.5.5 0 0 1 0 1h-7a.5.5 0 0 1 0-1h3v-2.025A5 5 0 0 1 3 8V7a.5.5 0 0 1 .5-.5z"/>
                                        </svg>
                                    </div>
                                    <div className="p-0">Mute</div>
                                </div>
                                <div className="btn d-flex flex-column just-content-center p-0">
                                    <div className="p-0">
                                        <svg width="24" height="24" viewBox="0 0 24 24" className="bi bi-camera-video d-block m-auto" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" d="M2.667 3.5c-.645 0-1.167.522-1.167 1.167v6.666c0 .645.522 1.167 1.167 1.167h6.666c.645 0 1.167-.522 1.167-1.167V4.667c0-.645-.522-1.167-1.167-1.167H2.667zM.5 4.667C.5 3.47 1.47 2.5 2.667 2.5h6.666c1.197 0 2.167.97 2.167 2.167v6.666c0 1.197-.97 2.167-2.167 2.167H2.667A2.167 2.167 0 0 1 .5 11.333V4.667z"/>
                                            <path fillRule="evenodd" d="M11.25 5.65l2.768-1.605a.318.318 0 0 1 .482.263v7.384c0 .228-.26.393-.482.264l-2.767-1.605-.502.865 2.767 1.605c.859.498 1.984-.095 1.984-1.129V4.308c0-1.033-1.125-1.626-1.984-1.128L10.75 4.785l.502.865z"/>
                                        </svg>
                                    </div>
                                    <div className="p-0">Start Video</div>
                                </div>
                                <div className="align-items-center 
                                                btn d-flex                                                
                                                flex-column just-content-center 
                                                p-0">
                                    <div className="p-0">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="sd-block m-auto" width="24" height="24" viewBox="0 0 24 24">
                                            <path d="M10.09 15.59L11.5 17l5-5-5-5-1.41 1.41L12.67 11H3v2h9.67l-2.58 2.59zM19 3H5c-1.11 0-2 .9-2 2v4h2V5h14v14H5v-4H3v4c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"/>
                                        </svg>
                                    </div>                
                                    <div className="p-0">Leave</div>
                                </div>
                            </div>
                        </Card.Footer>
                    </Card>                    
                </div>
            </div>    
        );
    }
}
export default Test1;