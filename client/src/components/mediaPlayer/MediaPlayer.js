import NormalPlayer from './NormalPlayer';
import React, { Fragment } from 'react';
import MiniPlayer from './MiniPlayer';
class MediaPlayer extends React.Component {
    constructor(props) {
        super(props);
        this.normalPlayer=React.createRef(); 
        this.state={};
        
        this.state["showFullScreen"]=false;
        this.state["showMiniPlayer"]=false;
        this.playerClass="h-100 rounded p-1";
        this.state.muted=true;
    }
    hideMiniPlayer=()=>{
        this.setState({
            showMiniPlayer:false
        },()=>{
            this.normalPlayer.showControlBar();
        });
    }
    toggFullScreen=()=>{
        this.setState({
                    showFullScreen:!this.state.showFullScreen
                })
    }
    togglePInP=()=>{
        this.setState({
            showMiniPlayer:!this.state.showMiniPlayer
        });
    }
    toggleMute = () => {
        this.setState({
          muted: !this.state.muted
        });
    };
    render(){
        var media=null;
        if (this.state.showMiniPlayer){
            media=<MiniPlayer hideMiniPlayer={this.hideMiniPlayer} muted={this.state.muted}/>
        }  
        return (
            <Fragment>
                <NormalPlayer
                    muted={this.state.muted} 
                    ref={instance => { this.normalPlayer = instance; }}
                    showFullScreen={this.state.showFullScreen}  
                    showMiniPlayer={this.state.showMiniPlayer}
                    toggFullScreen={this.toggFullScreen} 
                    toggleMute={this.toggleMute}
                    togglePInP={this.togglePInP}>
                </NormalPlayer>
               {media}
            </Fragment>    
        )
    }
}
export default MediaPlayer;