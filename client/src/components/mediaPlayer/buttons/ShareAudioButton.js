import React,{Component}  from 'react';

class ShareAudioButton extends Component {
    constructor(props){
        super(props);
        this.clickHandler=(e)=>{
            this.props.toggleShareAudio();
        };
    }
    render(){
        let buttonContent,description;
        if (this.props.shareAudioState){
            description="Mute";
            buttonContent=(
                <svg width="24" height="24" viewBox="0 0 24 24" className="bi bi-mic-fill d-block m-auto" fill="white" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 3a3 3 0 0 1 6 0v5a3 3 0 0 1-6 0V3z"/>
                    <path fillRule="evenodd" d="M3.5 6.5A.5.5 0 0 1 4 7v1a4 4 0 0 0 8 0V7a.5.5 0 0 1 1 0v1a5 5 0 0 1-4.5 4.975V15h3a.5.5 0 0 1 0 1h-7a.5.5 0 0 1 0-1h3v-2.025A5 5 0 0 1 3 8V7a.5.5 0 0 1 .5-.5z"/>
                </svg>
            );
        } else {
            description="UnMute";
            buttonContent=(
                <svg width="24" height="24" viewBox="0 0 24 24" className="bi bi-mic-mute-fill" fill="white" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M12.734 9.613A4.995 4.995 0 0 0 13 8V7a.5.5 0 0 0-1 0v1c0 .274-.027.54-.08.799l.814.814zm-2.522 1.72A4 4 0 0 1 4 8V7a.5.5 0 0 0-1 0v1a5 5 0 0 0 4.5 4.975V15h-3a.5.5 0 0 0 0 1h7a.5.5 0 0 0 0-1h-3v-2.025a4.973 4.973 0 0 0 2.43-.923l-.718-.719zM11 7.88V3a3 3 0 0 0-5.842-.963L11 7.879zM5 6.12l4.486 4.486A3 3 0 0 1 5 8V6.121zm8.646 7.234l-12-12 .708-.708 12 12-.708.707z"/>
                </svg>
            );
        }
        return (
            <div className="btn d-flex flex-column just-content-center p-0 text-white" onClick={this.clickHandler}>
                <div className="p-0">
                    {buttonContent}
                </div>
                <div className="p-0">{description}</div>
            </div>    
        )
    }
}
export default ShareAudioButton;