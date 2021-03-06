import React from "react";
import Draggable from '../../utils/Draggable';
import ExpandButton from './buttons/ExpandButton';
import Media from '../media/Media';
import "./PInPPlayer.css";

class PInPPlayer extends React.Component {
    constructor(props){
        super(props);
        this.draggable=React.createRef();
        this.media=React.createRef();
        this.pInP=React.createRef();
        this.pInPVideoTag=React.createRef();
        this.state={};
    }
    componentDidMount(){
        if (this.props.stream){
            this.media.current.setStream(this.props.stream);
        }
    }
    render(){
        return (
            <Draggable>
                <div className="border border-primary d-flex flex-grow-1 p-0 pinp">
                    <Media
                        elapseTime={this.props.elapseTime}
                        meetingUtil={this.props.meetingUtil}
                        muted={this.props.muted}                        
                        timeUpdateHandler={this.timeUpdateHandler}
                        ref={ this.media }/>
                    <div className="expandButton">
                        <ExpandButton hidePInPPlayer={this.props.hidePInPPlayer}/>
                    </div>    
                </div>            
            </Draggable>
        )
    }
}
export default PInPPlayer;