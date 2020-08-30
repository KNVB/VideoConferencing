import React ,{Component,Fragment}  from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Button.css';
class ExpandButton extends Component {
    constructor(props) {
        super(props);
        this.clickHandler=(()=>{
            this.props.hidePInPPlayer();
        })        
    }
    
    render() {
        return (
            <Fragment>
                <div type="button" title="Expand" onClick={this.clickHandler}> 
                    <svg xmlns="http://www.w3.org/2000/svg" 
                        style={{"fill":"white","transform":"scaleX(-1)"}} 
                        width="24" height="24" 
                        viewBox="0 0 24 24">
                        <path d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"/>
                    </svg>
                </div>
            </Fragment>
        );
    }
}
export default ExpandButton;