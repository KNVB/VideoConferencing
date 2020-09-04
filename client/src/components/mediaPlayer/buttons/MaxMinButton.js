import React ,{Component}  from 'react';
class MaxMinButton extends Component {
    constructor(props) {
        super(props);
        this.maxSvg=(
                    <svg xmlns="http://www.w3.org/2000/svg" 
                        width="24" 
                        height="24" 
                        style={{"fill":"white"}}
                        viewBox="0 0 24 24">
                            <path d="M15 3l2.3 2.3-2.89 2.87 1.42 1.42L18.7 6.7 21 9V3zM3 9l2.3-2.3 2.87 2.89 1.42-1.42L6.7 5.3 9 3H3zm6 12l-2.3-2.3 2.89-2.87-1.42-1.42L5.3 17.3 3 15v6zm12-6l-2.3 2.3-2.87-2.89-1.42 1.42 2.89 2.87L15 21h6z"/>    
                    </svg>);
        this.minSvg =(<svg xmlns="http://www.w3.org/2000/svg" 
                        width="24"
                        height="24"
                        style={{"fill":"white"}}
                        viewBox="0 0 24 24">
			                <path d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z"/>
			            </svg>);
        this.clickHandler=(()=>{
            this.props.toggFullScreen();
        })        
    }
    
    render() {
        if (this.props.showFullScreen){
            return (
                <div className="btnlink" title="Exit From Full Screen mode" onClick={this.clickHandler}> 
                    {this.minSvg}
                </div>);    
        } else {
            return (
                <div className="btnlink" title="To Full Screen mode" onClick={this.clickHandler}> 
                    {this.maxSvg}
                </div>);
        }
    }
}
export default MaxMinButton;