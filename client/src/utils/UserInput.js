import React ,{Component,Fragment} from 'react';
import { Row } from 'react-bootstrap';
class UserInput extends Component {
    render(){
        return (
            <Fragment>
                <Row>
                    <div className="col-2 d-flex justify-content-end">
                        <label htmlFor="alias">Your Alias:</label>
                    </div>
                    <div className="col-10 m-0 p-0">    
                        <input type="text" id="alias" required />
                    </div>
                </Row>
                <Row>
                    <div className="col-2 d-flex justify-content-end">
                        <label htmlFor="emailAddress">Your Email Address:</label>
                    </div>
                    <div className="col-10 m-0 p-0">    
                        <input type="email" required id="emailAddress"/>
                    </div>
                </Row>
            </Fragment>
        );
    }
}
export default UserInput;