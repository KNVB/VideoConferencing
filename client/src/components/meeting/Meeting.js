import Card from "react-bootstrap/Card";
import InfoPane from "./InfoPane";
import MediaPlayer from '../mediaplayer/MediaPlayer';
import React,{ Fragment } from "react";
import "./Meeting.css";
class Meeting extends React.Component {
  componentDidMount() {
    document.getElementById("root").classList.add("p-1");
  }
  componentWillUnmount() {
    document.getElementById("root").classList.remove("p-1");
  }
  render() {
    return (
      <div className="border border-info meeting p-0 rounded">
        <MediaPlayer/>
        <div className="panel d-flex flex-grow-1">
          <InfoPane/>
        </div>
      </div>);
  }
}
export default Meeting;                      