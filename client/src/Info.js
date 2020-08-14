import { Container } from 'react-bootstrap';
import React ,{Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
class Info extends Component {
    constructor(props) {
        super(props);
        this.userName=this.props.data.userName;
        this.email=this.props.data.emailAddress;
    }
    render() {
        return (
            <Container>
                <div class="bg-danger font-weight-bold text-white">Hi {this.userName}</div>
                <div class="bg-success font-weight-bold text-white">You email address:{this.email}</div>
                
            </Container>
        );
    }
}
export default Info;    