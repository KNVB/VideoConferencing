import React from 'react';

import './TestNav.css';
import Collapse from 'react-bootstrap/Collapse';
import Draggable from '../utils/Draggable';
import LocalStreamManager from '../utils/LocalStreamManager';
import { Card,Nav,Tab} from 'react-bootstrap';

class TestNav extends React.Component{
    constructor(props){
        super(props);
        this.localStreamManager=new LocalStreamManager();
        this.localMedia=React.createRef();
        this.media=React.createRef();
        this.state={showControlBar: true};
        this.localVideoPlayer=React.createRef();
        this.setShowPane=(paneName)=>{
            this.setState({"showPane":paneName});
        };        
    }
    componentDidMount(){
        document.getElementById("root").classList.add("p-1");
        this.localStreamManager.getMediaStream(true,false)
        .then(stream=>{
            this.media.current.srcObject=stream;
            this.localMedia.current.srcObject=stream;
        })
        .catch(error=>{
            console.log(error);
        })
    }
    componentWillUnmount() {
        document.getElementById("root").classList.remove("p-1");
    } 
    toggleControlBar = (event) => {
        if (event.target.classList.contains("gg"))
            this.setState({ showControlBar: !this.state.showControlBar });
    };   
    render(){
        
        return (
            <div className="border border-info flex-grow-1 meeting p-0 rounded">
                <div className="d-flex flex-grow-1 p-1 rouned border border-warning  panel position-relative">
                    <div className="m-0 p-0 h-100 w-100 position-relative">
                        <video autoPlay className="bg-danger h-100 position-absolute rounded w-100" ref={this.media}></video>
                        <div className="d-none mediaStatus text-white">
                            <svg xmlns="http://www.w3.org/2000/svg" width="70%" height="70%" viewBox="0 0 24 24" fill="white">
                                <path d="M12 1c-4.97 0-9 4.03-9 9v7c0 1.66 1.34 3 3 3h3v-8H5v-2c0-3.87 3.13-7 7-7s7 3.13 7 7v2h-4v8h3c1.66 0 3-1.34 3-3v-7c0-4.97-4.03-9-9-9z"></path>
                            </svg>
                        </div>
                    </div>
                    <div className="d-flex flex-column gg justify-content-end m-1 p-1" onClick={this.toggleControlBar}>
                        <div className="align-self-end h-25 w-25 position-relative">
                            <video autoPlay className="bg-dark h-100 position-absolute rounded w-100" ref={this.localMedia}></video>
                        </div>
                        <Collapse
                            className="p-1 text-white w-100"
                            in={this.state.showControlBar}>
                                <div>
                                    <div className="border-top border-white d-flex flex-grow-1 flex-row justify-content-between">
                                        <div>
                                            <div className="btnlink" title="UnMute">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style={{"fill":"white"}}>
                                                <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"></path>
                                                </svg>
                                            </div>
                                            <div className="btnlink" title="P In P">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style={{"fill":"white"}}>
                                                <path d="M19 11h-8v6h8v-6zm4 8V4.98C23 3.88 22.1 3 21 3H3c-1.1 0-2 .88-2 1.98V19c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2zm-2 .02H3V4.97h18v14.05z"></path>
                                                </svg>
                                            </div>
                                        </div>
                                        <div className="d-flex flex-row flex-grow-1 justify-content-around m-0 p-0">
                                            <div className="btn d-flex flex-column just-content-center p-0 text-white">
                                                <div className="p-0">
                                                    <svg width="24" height="24" viewBox="0 0 24 24" className="bi bi-mic-mute-fill" fill="white" xmlns="http://www.w3.org/2000/svg">
                                                        <path fill-rule="evenodd" d="M12.734 9.613A4.995 4.995 0 0 0 13 8V7a.5.5 0 0 0-1 0v1c0 .274-.027.54-.08.799l.814.814zm-2.522 1.72A4 4 0 0 1 4 8V7a.5.5 0 0 0-1 0v1a5 5 0 0 0 4.5 4.975V15h-3a.5.5 0 0 0 0 1h7a.5.5 0 0 0 0-1h-3v-2.025a4.973 4.973 0 0 0 2.43-.923l-.718-.719zM11 7.88V3a3 3 0 0 0-5.842-.963L11 7.879zM5 6.12l4.486 4.486A3 3 0 0 1 5 8V6.121zm8.646 7.234l-12-12 .708-.708 12 12-.708.707z"></path>
                                                    </svg>
                                                </div>
                                                <div className="p-0">UnMute</div>
                                            </div>
                                            <div className="btn d-flex flex-column just-content-center p-0  text-white">
                                                <div className="p-0">
                                                    <svg width="24" height="24" viewBox="0 0 24 24" className="bi bi-camera-video d-block m-auto" fill="white" xmlns="http://www.w3.org/2000/svg">
                                                        <path fill-rule="evenodd" d="M2.667 3.5c-.645 0-1.167.522-1.167 1.167v6.666c0 .645.522 1.167 1.167 1.167h6.666c.645 0 1.167-.522 1.167-1.167V4.667c0-.645-.522-1.167-1.167-1.167H2.667zM.5 4.667C.5 3.47 1.47 2.5 2.667 2.5h6.666c1.197 0 2.167.97 2.167 2.167v6.666c0 1.197-.97 2.167-2.167 2.167H2.667A2.167 2.167 0 0 1 .5 11.333V4.667z"></path>
                                                        <path fill-rule="evenodd" d="M11.25 5.65l2.768-1.605a.318.318 0 0 1 .482.263v7.384c0 .228-.26.393-.482.264l-2.767-1.605-.502.865 2.767 1.605c.859.498 1.984-.095 1.984-1.129V4.308c0-1.033-1.125-1.626-1.984-1.128L10.75 4.785l.502.865z"></path>
                                                    </svg>
                                                </div>
                                                <div className="p-0">Start Video</div>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="btnlink" title="Mirror the video">
                                                ⇄
                                            </div>
                                            <div className="btnlink" title="To Full Screen mode">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style={{"fill":"white"}}>
                                                <path d="M15 3l2.3 2.3-2.89 2.87 1.42 1.42L18.7 6.7 21 9V3zM3 9l2.3-2.3 2.87 2.89 1.42-1.42L6.7 5.3 9 3H3zm6 12l-2.3-2.3 2.89-2.87-1.42-1.42L5.3 17.3 3 15v6zm12-6l-2.3 2.3-2.87-2.89-1.42 1.42 2.89 2.87L15 21h6z"></path>
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                        </Collapse>        
                    </div>
                </div>
                <div className="panel d-flex flex-grow-1">
                    <Card className="rounded w-100">
                        <Card.Header className="p-1 m-1 rounded">
                            <Nav as="ul" className="p-0 m-0" justify={true} ref={this.nav} variant="pills">
                                <Nav.Item as="li" title="Chat History">
                                    <Nav.Link data-toggle="pill" href="#chatBox">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24">
                                        <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 9h12v2H6V9zm8 5H6v-2h8v2zm4-6H6V6h12v2z" />
                                    </svg>
                                    </Nav.Link>
                                </Nav.Item>
                                <Nav.Item as="li" title="Meeting Info.">
                                    <Nav.Link data-toggle="pill" href="#meetingInfo">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                        <path d="M11 17h2v-6h-2v6zm1-15C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zM11 9h2V7h-2v2z"/>
                                        </svg>
                                    </Nav.Link>
                                </Nav.Item>
                                <Nav.Item as="li" title="User List">
                                    <Nav.Link data-toggle="pill" href="#userList">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24">
                                        <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
                                    </svg>
                                    </Nav.Link>
                                </Nav.Item>
                            </Nav>
                        </Card.Header>
                        <Card.Body className="d-flex flex-grow-1 pb-0 pl-1 pr-1 pt-0 w-100">
                            <Tab.Content className="d-flex flex-grow-1">
                                <Tab.Pane
                                    active={true}
                                    className="border border-primary container p-1 rounded"
                                    id="meetingInfo">
                                    <div>
                                        Click
                                        <svg className="btnlink" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                            <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z"></path>
                                        </svg>to get the join meeting link<br/>User Alias:1
                                    </div>
                                </Tab.Pane>
                                <Tab.Pane
                                    className="border border-primary container fade p-0 position-relative rounded"
                                    id="userList">
                                    <div className="h-100 overflow-auto position-absolute w-100">
                                        <div className="border-bottom border-info p-1 media">
                                            <div className="m-0 p-0" style={{"width":"80px","height":"64px"}}>
                                                <div className="m-0 p-0 h-100 w-100 position-relative">
                                                    <video autoplay="" className="bg-dark h-100 position-absolute rounded w-100"></video>
                                                    <div className="d-none mediaStatus text-white">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="70%" height="70%" viewBox="0 0 24 24" fill="white">
                                                            <path d="M12 1c-4.97 0-9 4.03-9 9v7c0 1.66 1.34 3 3 3h3v-8H5v-2c0-3.87 3.13-7 7-7s7 3.13 7 7v2h-4v8h3c1.66 0 3-1.34 3-3v-7c0-4.97-4.03-9-9-9z"></path>
                                                        </svg>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="align-self-center ml-1 media-body">
                                                1(Host)*
                                            </div>
                                        </div>
                                    </div>
                                </Tab.Pane>
                                <Tab.Pane
                                    className="border border-primary container fade p-0 position-relative rounded"
                                    id="chatBox">
                                        <div className="d-flex flex-column flex-grow-1 h-100 p-1 position-absolute w-100">
                                            <div className="border border-primary d-flex flex-grow-1 position-relative rounded">
                                                <div className="h-100 p-1 overflow-auto position-absolute w-100">
                                                    <div className="font-italic text-secondary">1 join the meeting @ 16:15:41</div>
                                                </div>
                                            </div>
                                            <form className="mt-1">
                                                <input required="" type="text" name="msg" placeholder="Send message to all user"/>
                                                <button variant="primary" className="float-right">Send</button>
                                            </form>
                                        </div>
                                </Tab.Pane>
                            </Tab.Content>                        
                        </Card.Body>
                        <Card.Footer className="m-1 p-1 rounded">
                            <div className="d-flex flex-row justify-content-around pt-1">
                                <div className="align-items-center 
                                            btn d-flex                                                
                                            flex-column just-content-center 
                                            p-0"
                                    onClick={()=>this.leaveMeeting()}>
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
export default TestNav;