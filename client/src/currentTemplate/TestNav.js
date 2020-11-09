import React from 'react';

import './TestNav.css';
import Collapse from 'react-bootstrap/Collapse';
import { Card,Nav,Tab} from 'react-bootstrap';

class TestNav extends React.Component{
    constructor(props){
        super(props);
        this.media=React.createRef();
        this.state={showControlBar: true};
        this.setShowPane=(paneName)=>{
            this.setState({"showPane":paneName});
        };        
    }
    componentDidMount(){
        document.getElementById("root").classList.add("p-1");
        
    }
    componentWillUnmount() {
        document.getElementById("root").classList.remove("p-1");
    }    
    render(){
        
        return (
        <div className="border border-info meeting p-0 rounded">
            <div className="d-flex flex-grow-1 p-1 rouned border border-warning  panel position-relative">
                <video autoPlay className="rounded w-100 bg-dark h-100" ref={this.media}>                   
                </video>
                <div className="controlLayer m-1 p-1" onClick={this.toggleControlBar}>
                    <Collapse
                    className="border-top border-white p-1 text-white w-100"
                    in={this.state.showControlBar}>
                        <span className="p-0 m-0">
                            <div className="d-flex flex-grow-1 flex-row justify-content-between">
                                <div>
                                    <div className="btnlink" title="UnMute">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style={{"fill":"white"}}>
                                            <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
                                        </svg>
                                    </div>
                                </div>
                                <div className="d-flex flex-row flex-grow-1 justify-content-around m-0 p-0">
                                    <div className="btn d-flex flex-column just-content-center p-0  text-white" onClick={this.clickHandler}>
                                        <div className="p-0">
                                            <svg width="24" height="24" viewBox="0 0 24 24" className="bi bi-camera-video d-block m-auto" fill="white" xmlns="http://www.w3.org/2000/svg">
                                                <path fillRule="evenodd" d="M2.667 3.5c-.645 0-1.167.522-1.167 1.167v6.666c0 .645.522 1.167 1.167 1.167h6.666c.645 0 1.167-.522 1.167-1.167V4.667c0-.645-.522-1.167-1.167-1.167H2.667zM.5 4.667C.5 3.47 1.47 2.5 2.667 2.5h6.666c1.197 0 2.167.97 2.167 2.167v6.666c0 1.197-.97 2.167-2.167 2.167H2.667A2.167 2.167 0 0 1 .5 11.333V4.667z"/>
                                                <path fillRule="evenodd" d="M11.25 5.65l2.768-1.605a.318.318 0 0 1 .482.263v7.384c0 .228-.26.393-.482.264l-2.767-1.605-.502.865 2.767 1.605c.859.498 1.984-.095 1.984-1.129V4.308c0-1.033-1.125-1.626-1.984-1.128L10.75 4.785l.502.865z"/>
                                            </svg>
                                        </div>
                                        <div className="p-0">Start Video</div>  
                                    </div>    
                                    <div className="btn d-flex flex-column just-content-center p-0 text-white" onClick={this.clickHandler}>
                                        <div className="p-0">
                                            <svg width="24" height="24" viewBox="0 0 24 24" className="bi bi-mic-mute-fill" fill="white" xmlns="http://www.w3.org/2000/svg">
                                                <path fillRule="evenodd" d="M12.734 9.613A4.995 4.995 0 0 0 13 8V7a.5.5 0 0 0-1 0v1c0 .274-.027.54-.08.799l.814.814zm-2.522 1.72A4 4 0 0 1 4 8V7a.5.5 0 0 0-1 0v1a5 5 0 0 0 4.5 4.975V15h-3a.5.5 0 0 0 0 1h7a.5.5 0 0 0 0-1h-3v-2.025a4.973 4.973 0 0 0 2.43-.923l-.718-.719zM11 7.88V3a3 3 0 0 0-5.842-.963L11 7.879zM5 6.12l4.486 4.486A3 3 0 0 1 5 8V6.121zm8.646 7.234l-12-12 .708-.708 12 12-.708.707z"/>
                                            </svg>
                                        </div>
                                        <div className="p-0">UnMute</div>
                                    </div>
                                </div>
                                <div>

                                    <div className="btnlink" title="Mirror the video" onClick={this.toggleMirror}>
                                    &#x21c4;
                                    </div>
                                    <div className="btnlink" title="To Full Screen mode">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style={{"fill":"white"}}>
                                            <path d="M15 3l2.3 2.3-2.89 2.87 1.42 1.42L18.7 6.7 21 9V3zM3 9l2.3-2.3 2.87 2.89 1.42-1.42L6.7 5.3 9 3H3zm6 12l-2.3-2.3 2.89-2.87-1.42-1.42L5.3 17.3 3 15v6zm12-6l-2.3 2.3-2.87-2.89-1.42 1.42 2.89 2.87L15 21h6z"/>
                                        </svg>
                                    </div>                                    
                                </div>
                            </div>
                        </span>
                    </Collapse>
                </div>

            </div>
            <div className="panel d-flex flex-grow-1">
                <Card className="rounded w-100">
                    <Card.Header className="align-items-center d-flex flex-row justify-content-around m-1 p-0 rounded">
                        <Nav as="ul" variant="pills">
                            <Nav.Item as="li">
                                <Nav.Link active={true} data-toggle="pill" href="#chatBox">
                                    Home
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item as="li">
                                <Nav.Link data-toggle="pill" href="#meetingInfo">
                                    Menu 1
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item as="li">
                                <Nav.Link data-toggle="pill" href="#userList">
                                    Menu 2
                                </Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Card.Header>
                    <Card.Body className="d-flex flex-grow-1 pb-0 pl-1 pr-1 pt-0">
                        <Tab.Content className="d-flex flex-grow-1">
                            <Tab.Pane id="chatBox" className="border border-primary container" active={true}>
                                <h3>HOME</h3>
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                            </Tab.Pane>
                            <Tab.Pane id="meetingInfo" className="border border-primary container fade">
                                <h3>Menu 1</h3>
                                <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                            </Tab.Pane>
                            <Tab.Pane id="userList" className="border border-primary container fade">
                                <h3>Menu 2</h3>
                                <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.</p>
                            </Tab.Pane>
                        </Tab.Content>
                    </Card.Body>
                    <Card.Footer class="m-1 p-1 rounded">
                        <div class="d-flex flex-row justify-content-around pt-1">
                            <div class="align-items-center btn d-flex flex-column just-content-center p-0">
                                <div class="p-0">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="sd-block m-auto" width="24" height="24" viewBox="0 0 24 24">
                                        <path d="M10.09 15.59L11.5 17l5-5-5-5-1.41 1.41L12.67 11H3v2h9.67l-2.58 2.59zM19 3H5c-1.11 0-2 .9-2 2v4h2V5h14v14H5v-4H3v4c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"></path>
                                    </svg>
                                </div>
                                <div class="p-0">Leave</div>
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