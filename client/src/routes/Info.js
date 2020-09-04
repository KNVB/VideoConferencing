import { Container } from 'react-bootstrap';
import React ,{Component} from 'react';

class Info extends Component {
    constructor(props) {
        super(props);
        this.userName=this.props.data.userName;
        this.email=this.props.data.emailAddress;
    }
    render() {
        return (
            <Container>
                <div className="bg-danger font-weight-bold text-white">Hi {this.userName}</div>
                <div className="bg-success font-weight-bold text-white">You email address:{this.email}</div>
                
            </Container>
        );
    }
}
export default Info;    