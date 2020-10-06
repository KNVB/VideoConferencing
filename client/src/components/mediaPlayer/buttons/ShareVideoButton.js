import React,{Component}  from 'react';

class ShareVideoButton extends Component {
    constructor(props){
        super(props);
        this.clickHandler=(e)=>{
            this.props.toggleShareVideo();
        };
    }
    render(){
        if (this.props.shareVideoState){
            return (
                    <div className="btn d-flex flex-column just-content-center p-0 text-white" onClick={this.clickHandler}>
                        <div className="p-0">
                            <svg width="24" height="24" viewBox="0 0 24 24" className="bi bi-camera-video d-block m-auto" fill="white" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M2.667 3.5c-.645 0-1.167.522-1.167 1.167v6.666c0 .645.522 1.167 1.167 1.167h6.666c.645 0 1.167-.522 1.167-1.167V4.667c0-.645-.522-1.167-1.167-1.167H2.667zM.5 4.667C.5 3.47 1.47 2.5 2.667 2.5h6.666c1.197 0 2.167.97 2.167 2.167v6.666c0 1.197-.97 2.167-2.167 2.167H2.667A2.167 2.167 0 0 1 .5 11.333V4.667z"/>
                                <path fillRule="evenodd" d="M11.25 5.65l2.768-1.605a.318.318 0 0 1 .482.263v7.384c0 .228-.26.393-.482.264l-2.767-1.605-.502.865 2.767 1.605c.859.498 1.984-.095 1.984-1.129V4.308c0-1.033-1.125-1.626-1.984-1.128L10.75 4.785l.502.865z"/>
                            </svg>
                        </div>
                        <div className="p-0">Stop Video</div>
                    </div>
                );
        } else {
            return ( 
                        <div className="btn d-flex flex-column just-content-center p-0  text-white" onClick={this.clickHandler}>
                            <div className="p-0">
                                <svg width="24" height="24" viewBox="0 0 24 24" className="bi bi-camera-video-off" fill="white" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" d="M10.961 12.365a1.99 1.99 0 0 0 .522-1.103l3.11 1.382A1 1 0 0 0 16 11.731V4.269a1 1 0 0 0-1.406-.913l-3.111 1.382A2 2 0 0 0 9.5 3H4.272l.714 1H9.5a1 1 0 0 1 1 1v6a1 1 0 0 1-.144.518l.605.847zM1.428 4.18A.999.999 0 0 0 1 5v6a1 1 0 0 0 1 1h5.014l.714 1H2a2 2 0 0 1-2-2V5c0-.675.334-1.272.847-1.634l.58.814zM15 11.73l-3.5-1.555v-4.35L15 4.269v7.462zm-4.407 3.56l-10-14 .814-.58 10 14-.814.58z"/>
                                </svg>
                            </div>
                            <div className="p-0">Start Video</div>        
                        </div>
                    );   
        }
        
    }
}
export default ShareVideoButton;