import React,{Component}  from 'react';

class ShareVideoButton extends Component {
    constructor(props){
        super(props);
        this.clickHandler=(e)=>{
            this.props.toggleShareVideo();
        };
    }
    render(){
        var buttonContent,description;
        if (this.props.shareVideoState){
            description="Stop Video";
            buttonContent=( <svg width="24" height="24" viewBox="0 0 24 24" className="bi bi-camera-video d-block m-auto" fill="white" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M2.667 3.5c-.645 0-1.167.522-1.167 1.167v6.666c0 .645.522 1.167 1.167 1.167h6.666c.645 0 1.167-.522 1.167-1.167V4.667c0-.645-.522-1.167-1.167-1.167H2.667zM.5 4.667C.5 3.47 1.47 2.5 2.667 2.5h6.666c1.197 0 2.167.97 2.167 2.167v6.666c0 1.197-.97 2.167-2.167 2.167H2.667A2.167 2.167 0 0 1 .5 11.333V4.667z"/>
                                <path fillRule="evenodd" d="M11.25 5.65l2.768-1.605a.318.318 0 0 1 .482.263v7.384c0 .228-.26.393-.482.264l-2.767-1.605-.502.865 2.767 1.605c.859.498 1.984-.095 1.984-1.129V4.308c0-1.033-1.125-1.626-1.984-1.128L10.75 4.785l.502.865z"/>
                            </svg>)
        } else {
            description="Start Video";
            buttonContent=( <svg width="24" height="24" viewBox="0 0 24 24" className="bi bi-camera-video d-block m-auto" fill="white" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M2.667 3.5c-.645 0-1.167.522-1.167 1.167v6.666c0 .645.522 1.167 1.167 1.167h6.666c.645 0 1.167-.522 1.167-1.167V4.667c0-.645-.522-1.167-1.167-1.167H2.667zM.5 4.667C.5 3.47 1.47 2.5 2.667 2.5h6.666c1.197 0 2.167.97 2.167 2.167v6.666c0 1.197-.97 2.167-2.167 2.167H2.667A2.167 2.167 0 0 1 .5 11.333V4.667z"/>
                                <path fillRule="evenodd" d="M11.25 5.65l2.768-1.605a.318.318 0 0 1 .482.263v7.384c0 .228-.26.393-.482.264l-2.767-1.605-.502.865 2.767 1.605c.859.498 1.984-.095 1.984-1.129V4.308c0-1.033-1.125-1.626-1.984-1.128L10.75 4.785l.502.865z"/>
                            </svg>)
        }
        return (
            <div className="btn d-flex flex-column just-content-center p-0  text-white" onClick={this.clickHandler}>
                <div className="p-0">
                    {buttonContent}
                </div>
                <div className="p-0">{description}</div>  
            </div>    
        )
    }
}
export default ShareVideoButton;