import React from "react";

class Draggable extends React.Component {
  constructor(props) {
    super(props);
    this.container = React.createRef();
    this.active = false;
    this.currentX=null;
    this.currentY=null;
    this.initialX=null;
    this.initialY=null;
    this.xOffset = 0;
    this.yOffset = 0;
    this.container = React.createRef();
  }
  componentDidMount() {
    this.container.current.className +=" "+this.props.children.props.className;
    this.container.current.onmousedown = this.dragStart;
    this.container.current.onmousemove = this.drag;
    this.container.current.onmouseup = this.dragEnd;

    this.container.current.ontouchstart = this.dragStart;
    this.container.current.ontouchend = this.dragEnd;
    this.container.current.ontouchmove = this.drag;
  }
  drag = e => {
    if (this.active) {
      e.preventDefault();

      if (e.type === "touchmove") {
        this.currentX = e.touches[0].clientX - this.initialX;
        this.currentY = e.touches[0].clientY - this.initialY;
      } else {
        this.currentX = e.clientX - this.initialX;
        this.currentY = e.clientY - this.initialY;
      }

      this.xOffset = this.currentX;
      this.yOffset = this.currentY;

      this.setTranslate(this.currentX, this.currentY, this.container.current);
    }
  };
  dragEnd = e => {
    this.initialX = this.currentX;
    this.initialY = this.currentY;

    this.active = false;
  };
  dragStart = e => {
    if (e.type === "touchstart") {
      this.initialX = e.touches[0].clientX - this.xOffset;
      this.initialY = e.touches[0].clientY - this.yOffset;
    } else {
      this.initialX = e.clientX - this.xOffset;
      this.initialY = e.clientY - this.yOffset;
    }

  //  if (e.target === this.dragItem.current) {
      this.active = true;
  //  }
  };
  setTranslate = (xPos, yPos, el) => {
    el.style.transform = "translate3d(" + xPos + "px, " + yPos + "px, 0)";
  };
  render() {
    return (
      <div className="border-0 p-0" ref={this.container}>
        {this.props.children}
      </div>);
  }
}
export default Draggable;
