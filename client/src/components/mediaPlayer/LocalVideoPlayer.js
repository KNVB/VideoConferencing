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
        if (this.props.stream){
            this.media.current.setStream(this.props.stream);
        }
    }
    render() {
        return (
            <Draggable>
                <div className="border border-primary d-flex flex-grow-1 localVideoPlayer p-0">
                    <Media ref={ this.media }  meetingControl={this.props.meetingControl}></Media>
                </div>
            </Draggable>
        )
    }
}
export default LocalVideoPlayer