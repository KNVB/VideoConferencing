import Card  from 'react-bootstrap/Card';
import Draggable from 'react-draggable';
import ExpandButton from './buttons/ExpandButton';
import Media from './Media';
import React from 'react';
import './MediaPlayer.css'
class MiniPlayer extends React.Component{
    constructor(props){
        super(props);
        
        this.media=React.createRef();
        this.pInP=React.createRef();
        this.pInPVideoTag=React.createRef();

        this.state={};

    }

    render() {
        return(
            <Draggable>
                <Card className="pinp rounded p-1" ref={instance => {this.pInP = instance; }}>
                    <Media mediaClass="card-body p-0 rounded w-100" 
                        muted={this.props.muted}                        
                        src="https://www.w3schools.com/html/mov_bbb.mp4"
                        timeUpdateHandler={this.timeUpdateHandler}
                        ref={instance => { this.media = instance; }}/>
                    <div 
                        className="p-1 playerOverlay">
                        <ExpandButton hideMiniPlayer={this.props.hideMiniPlayer}/>    
                    </div>
                </Card>                        
            </Draggable>
        )
    }
}
export default MiniPlayer;   