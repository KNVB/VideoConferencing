import React from 'react';

import './Template.css';
import Collapse from 'react-bootstrap/Collapse';
import { Card, Media } from 'react-bootstrap';

class Template extends React.Component{
    constructor(props){
        super(props);
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
                <video autoPlay className="rounded w-100">
                    <source src="https://www.w3schools.com/html/movie.mp4" type="video/mp4"/>
                </video>
                <div className="bg-dark d-none mediaStatus text-white">dsfsdf</div>
                <div className="controlLayer m-1 p-1">
                    <Collapse
                        className="bg-secondary p-1 rounded text-white w-100"
                        in={true}>
                        <span className="p-0 m-0">
                            <div className="align-items-center d-flex flex-row justify-content-between p-0">
                                <div className="btnlink" title="UnMute">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style={{"fill":"white"}}>
                                        <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
                                    </svg>
                                </div>
                                <div>
                                    <span>00:00:13</span>
                                </div>
                            </div>
                            <div className="align-items-center d-flex flex-row justify-content-between p-0">
                                <div className="btnlink" title="P In P">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style={{"fill":"white"}}>
                                        <path d="M19 11h-8v6h8v-6zm4 8V4.98C23 3.88 22.1 3 21 3H3c-1.1 0-2 .88-2 1.98V19c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2zm-2 .02H3V4.97h18v14.05z"/>
                                    </svg>
                                </div>
                                <div className="btnlink">⇄</div>
                                <div className="btnlink" title="To Full Screen mode">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style={{"fill":"white"}}>
                                        <path d="M15 3l2.3 2.3-2.89 2.87 1.42 1.42L18.7 6.7 21 9V3zM3 9l2.3-2.3 2.87 2.89 1.42-1.42L6.7 5.3 9 3H3zm6 12l-2.3-2.3 2.89-2.87-1.42-1.42L5.3 17.3 3 15v6zm12-6l-2.3 2.3-2.87-2.89-1.42 1.42 2.89 2.87L15 21h6z"/>
                                    </svg>
                                </div>
                            </div>
                        </span>
                    </Collapse>    
                </div>
                <div className="hidePInPPlayer"></div>
            </div>
            <div className="panel d-flex flex-grow-1">
                <Card className="rounded w-100">
                    <Card.Header className="align-items-center d-flex flex-row justify-content-around m-1 p-0 rounded">
                        <div className="align-items-center btn d-inline-flex" title="Chat History">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 9h12v2H6V9zm8 5H6v-2h8v2zm4-6H6V6h12v2z"></path>
                            </svg>
                        </div>
                        <div className="align-items-end btn d-flex" title="Meeting Info" type="button">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                <path d="M11 17h2v-6h-2v6zm1-15C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zM11 9h2V7h-2v2z"></path>
                            </svg>
                        </div>
                        <div className="align-items-end btn d-flex" title="User List" type="button">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"></path>
                            </svg>
                        </div>
                    </Card.Header>
                    <Card.Body className="d-flex flex-grow-1 pb-0 pl-1 pr-1 pt-0">
                        <Card className="d-none w-100">
                            <Card.Body className="border border-primary d-flex flex-grow-1 position-relative p-0 rounded">
                                <div class="position-absolute h-100 overflow-auto w-100">
                                </div>
                            </Card.Body>
                            <Card.Footer className="p-1">
                                <form>
                                    <input required="" type="text" name="msg" placeholder="Send message to all user"/>
                                    <button variant="primary" style={{"float":"right"}}>Send</button>
                                </form>
                            </Card.Footer>
                        </Card>
                        <Card className="border border-primary d-none w-100">
                            <Card.Body className="d-flex flex-grow-1 position-relative p-0 rounded">
                                <div className="position-absolute h-100 overflow-auto w-100">Click
                                    
                                </div>
                            </Card.Body>
                        </Card>
                        <Card className="border border-primary w-100">
                            <Card.Body className="d-flex flex-grow-1 position-relative p-0 rounded">
                                <div className="position-absolute h-100 overflow-auto w-100">
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
                    </Card.Body>
                    <Card.Footer class="m-1 p-1 rounded">
                        <div class="d-flex flex-row justify-content-around pt-1">
                            <div class="btn d-flex flex-column just-content-center p-0">
                                <div class="p-0">
                                    <svg width="24" height="24" viewBox="0 0 24 24" class="bi bi-mic-mute-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd" d="M12.734 9.613A4.995 4.995 0 0 0 13 8V7a.5.5 0 0 0-1 0v1c0 .274-.027.54-.08.799l.814.814zm-2.522 1.72A4 4 0 0 1 4 8V7a.5.5 0 0 0-1 0v1a5 5 0 0 0 4.5 4.975V15h-3a.5.5 0 0 0 0 1h7a.5.5 0 0 0 0-1h-3v-2.025a4.973 4.973 0 0 0 2.43-.923l-.718-.719zM11 7.88V3a3 3 0 0 0-5.842-.963L11 7.879zM5 6.12l4.486 4.486A3 3 0 0 1 5 8V6.121zm8.646 7.234l-12-12 .708-.708 12 12-.708.707z"></path>
                                    </svg>
                                </div>
                                <div class="p-0">UnMute</div>
                            </div>
                            <div class="btn d-flex flex-column just-content-center p-0">
                                <div class="p-0">
                                    <svg width="24" height="24" viewBox="0 0 24 24" class="bi bi-camera-video-off" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd" d="M10.961 12.365a1.99 1.99 0 0 0 .522-1.103l3.11 1.382A1 1 0 0 0 16 11.731V4.269a1 1 0 0 0-1.406-.913l-3.111 1.382A2 2 0 0 0 9.5 3H4.272l.714 1H9.5a1 1 0 0 1 1 1v6a1 1 0 0 1-.144.518l.605.847zM1.428 4.18A.999.999 0 0 0 1 5v6a1 1 0 0 0 1 1h5.014l.714 1H2a2 2 0 0 1-2-2V5c0-.675.334-1.272.847-1.634l.58.814zM15 11.73l-3.5-1.555v-4.35L15 4.269v7.462zm-4.407 3.56l-10-14 .814-.58 10 14-.814.58z"></path>
                                    </svg>
                                </div>
                                <div class="p-0">
                                    Start Video
                                </div>
                            </div>                            
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
export default Template;