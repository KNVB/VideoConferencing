import React ,{Component,Fragment}  from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Button.css';
class PInPButton extends Component {
    constructor(props) {
        super(props);
        this.clickHandler=(()=>{
            this.props.togglePInP();
        })        
    }
    
    render() {
        var pInPButtonClass;
        if (this.props.showFullScreen){
            pInPButtonClass="invisible";
        } else {
            pInPButtonClass="btnlink";
        }
        return (
            <Fragment>
                <div className={pInPButtonClass} title="P In P" onClick={this.clickHandler}> 
                    <svg xmlns="http://www.w3.org/2000/svg" 
                                width="24" 
                                height="24" 
                                style={{"fill":"white"}} viewBox="0 0 24 24">
                                    <path d="M19 11h-8v6h8v-6zm4 8V4.98C23 3.88 22.1 3 21 3H3c-1.1 0-2 .88-2 1.98V19c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2zm-2 .02H3V4.97h18v14.05z"/>
                    </svg>
                </div>
            </Fragment>
        );
    }
}
export default PInPButton;