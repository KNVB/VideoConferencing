import React ,{Component,Fragment} from 'react';
import { Row } from 'react-bootstrap';
class UserAttrib extends Component {
    render(){
        return (
            <Fragment>
                <Row>
                    <div className="col-6 d-flex justify-content-end">
                        <label htmlFor="alias">Your Alias:</label>
                    </div>
                    <div className="col-6 m-0 p-0">    
                        <input autoComplete="off" id="alias" name="alias" required type="text" placeholder="李四"/>
                    </div>
                </Row>
                <Row>
                    <div className="col-6 d-flex justify-content-end">
                        <label htmlFor="shareVideo">Share Video:</label>
                    </div>
                    <div className="col-6 m-0 p-0">    
                        <select id="shareVideo" name="shareVideo"> 
	                        <option value="no" >No</option>
		                    <option value="yes">Yes</option>
	                    </select>
                    </div>
                </Row>
                <Row>
                    <div className="col-6 d-flex justify-content-end">
                        <label htmlFor="shareAudio">Share Audio:</label>
                    </div>
                    <div className="col-6 m-0 p-0">    
                        <select id="shareAudio" name="shareAudio"> 
	                        <option value="no" >No</option>
		                    <option value="yes">Yes</option>
	                    </select>
                    </div>
                </Row>
            </Fragment>
        );
    }
}
export default UserAttrib;