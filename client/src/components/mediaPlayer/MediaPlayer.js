import Collapse from "react-bootstrap/Collapse";
import MaxMinButton from "./buttons/MaxMinButton";
import Media from "../media/Media";
import MuteButton from "./buttons/MuteButton";
import PInPButton from "./buttons/PInPButton";
import PInPPlayer from "./PInPPlayer";
import React, { Fragment } from "react";
import "./MediaPlayer.css";
class MediaPlayer extends React.Component {
  constructor(props) {
    super(props);
    this.media = React.createRef();
    this.state = {};
    this.state["muted"] = true;
    this.state["showControlBar"] = true;
    this.state["timeUpdateHandler"] = "00:00:00";
    this.state["showFullScreen"] = false;
    this.state["showPInPPlayer"] = false;
  }
  componentDidMount() {}
  hidePInPPlayer = () => {
    this.setState({ showControlBar: true });
    this.setState(
      {
        showPInPPlayer: false,
      },
      () => {
        if (!this.media.current.isEnded()) this.media.current.play();
      }
    );
  };
  timeUpdateHandler = (timeValue) => {
    this.setState({ elapseTime: timeValue });
  };
  toggleControlBar = (event) => {
    if (event.target.classList.contains("controlLayer"))
      this.setState({ showControlBar: !this.state.showControlBar });
  };
  toggFullScreen = () => {
    this.setState({
      showFullScreen: !this.state.showFullScreen,
    });
  };
  toggleMirror = () => {
    this.media.current.toggleMirror();
  };
  toggleMute = () => {
    this.setState({
      muted: !this.state.muted,
    });
  };
  showPInP = () => {
    this.setState({ showControlBar: false });
    this.setState(
      {
        showPInPPlayer: !this.state.showPInPPlayer,
      },
      () => {
        this.media.current.pause();
      }
    );
  };
  render() {
    var pInPClass = "",
      pInPPlayer = null;
    var playerClass = "d-flex flex-grow-1 p-1 rouned";
    if (this.state.showFullScreen === true) {
      playerClass += " full_screen";
    } else {
      playerClass += " border border-warning ";
      playerClass += " panel position-relative";
    }
    if (this.state.showPInPPlayer) {
      pInPClass = "showPInPPlayer";
      pInPPlayer = (
        <PInPPlayer
          hidePInPPlayer={this.hidePInPPlayer}
          elapseTime={this.media.current.getElapseTime()}
          muted={this.state.muted}
        />
      );
    } else {
      pInPClass = "hidePInPPlayer";
    }
    return (
      <Fragment>
        <div className={playerClass}>
          <Media
            muted={this.state.muted}
            ref={this.media}
            timeUpdateHandler={this.timeUpdateHandler}
          />
          <div className="controlLayer m-1 p-1" onClick={this.toggleControlBar}>
            <Collapse
              className="bg-secondary p-1 rounded text-white w-100"
              in={this.state.showControlBar}
            >
              <span className="p-0 m-0">
                <div className="align-items-center d-flex flex-row justify-content-between p-0">
                  <MuteButton
                    toggleMute={this.toggleMute}
                    muted={this.state.muted}
                  />
                  <div>
                    <span>{this.state.elapseTime}</span>
                  </div>
                </div>
                <div className="align-items-center d-flex flex-row justify-content-between p-0">
                  <PInPButton
                    showFullScreen={this.state.showFullScreen}
                    togglePInP={this.showPInP}
                  />
                  <div type="button" onClick={this.toggleMirror}>
                    &#x21c4;
                  </div>
                  <MaxMinButton
                    toggFullScreen={this.toggFullScreen}
                    showFullScreen={this.state.showFullScreen}
                  />
                </div>
              </span>
            </Collapse>
          </div>
          <div className={pInPClass}></div>
          {pInPPlayer}
        </div>
      </Fragment>
    );
  }
}
export default MediaPlayer;
