import config from './utils/config'
import Info from './routes/Info';
import React ,{Component} from 'react';
import './App.css';
import fetchApi from './utils/fetch';
import { Col,Container,Row } from 'react-bootstrap';
class FirstForm extends Component {
    constructor(props) {
        super(props);
        this.state={};
        this.callAPI=()=>{
            fetchApi('/testAPI','GET')
            .then(x=>{
                console.log(x);
            })
        }       
    }    
    

    render(){
        if (this.state.userName){
            return <Info data={this.state}/>
        } else  
            return(
                <Container fluid>
                    <Row>
                        <Col>
                            <h3>Welcome</h3>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="p-3">
                            <a href="/createMeeting/">Create a meeting</a>
                            &nbsp; &nbsp;&nbsp;
                            <a href="/joinMeeting/">Join a meeting</a>
                        </Col>
                    </Row>
{/*                    
                    <Row>
                        <Col>config.API_URL={config.API_URL},process.env.REACT_APP_API_URL={process.env.REACT_APP_API_URL}</Col>
                        <Col>config.DEFAULT_MEETING_PWD={config.DEFAULT_MEETING_PWD},process.env.REACT_APP_DEFAULT_MEETING_PWD={process.env.REACT_APP_DEFAULT_MEETING_PWD}</Col>
                        <Col>config.PEER_SERVER={config.PEER_SERVER},process.env.REACT_APP_PEER_SERVER={process.env.REACT_APP_PEER_SERVER}</Col>
                        <Col>config.SOCKET_URL={config.SOCKET_URL},process.env.REACT_APP_SOCKET_IO_URL={process.env.REACT_APP_SOCKET_IO_URL}</Col>
                        <Col>config.SOCKET_PORT={config.SOCKET_PORT},process.env.REACT_APP_SOCKET_IO_PORT={process.env.REACT_APP_SOCKET_IO_PORT}</Col>
                    </Row>
*/}                    
                </Container>
            );
    }
}

export default FirstForm;
