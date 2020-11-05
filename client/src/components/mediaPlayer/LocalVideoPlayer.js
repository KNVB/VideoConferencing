import Draggable from '../../utils/Draggable';
import './LocalVideoPlayer.css';
import Media from "../media/Media";
import React from "react";
class LocalVideoPlayer extends React.Component {
    constructor(props) {
        super(props);
        this.media=React.createRef();
    }
    componentDidMount(){
        console.log(this.props.stream);
        if (this.props.stream){
            console.log("LocalVideoPlayer.setStream");
            this.media.current.setStream(this.props.stream);
        }
    }
    render() {
        return (
            <Draggable>
                <div className="border border-primary d-flex flex-grow-1 localVideoPlayer p-0">
                    <Media 
                        meetingControl={this.props.meetingControl}
                        ref={ this.media }
                        stream={this.props.stream}></Media>
                </div>
            </Draggable>
        )
    }
}
export default LocalVideoPlayer