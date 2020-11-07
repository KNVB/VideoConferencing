import Draggable from '../../utils/Draggable';
import './LocalVideoPlayer.css';
import Media from "../media/Media";
import React from "react";
class LocalVideoPlayer extends React.Component {
    constructor(props) {
        super(props);
        this.media=React.createRef();
        this.setStream=(stream)=>{
            console.log("LocalVideoPlayer.setStream");
            
            if (stream){
              console.log("This stream has "+stream.getAudioTracks().length+" Audio track.");
              console.log("This stream has "+stream.getVideoTracks().length+" video track.");
              this.media.current.setStream(stream);
            }else {
              this.media.current.closeMedia();
            }
        }
    }
    componentDidMount(){
        if (this.props.stream){
            this.media.current.setStream(this.props.stream);
        }
    }
    render() {
        return (
            <Draggable>
                <div className="border border-primary d-flex flex-grow-1 localVideoPlayer p-0">
                    <Media meetingControl={this.props.meetingControl} muted={true} ref={ this.media }  ></Media>
                </div>
            </Draggable>
        )
    }
}
export default LocalVideoPlayer