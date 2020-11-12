import { Nav } from "react-bootstrap";

import React from "react";
class MeetingInfoButton extends React.Component {
  render() {
    return (
      <Nav.Item as="li" title="Meeting Info.">
        <Nav.Link data-toggle="pill" eventKey="meetingInfo">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <path d="M11 17h2v-6h-2v6zm1-15C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zM11 9h2V7h-2v2z"/>
            </svg>
        </Nav.Link>
      </Nav.Item>
    );
  }
}
export default MeetingInfoButton;
