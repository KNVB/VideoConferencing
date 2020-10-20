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
{/*}
                    <Row>
                        <Col>config.API_URL={config.API_URL}</Col>
                        <Col>config.API_HOST={config.API_HOST}</Col>
                        <Col>config.API_PORT={config.API_PORT}</Col>
                        <Col>config.SOCKET_URL={config.SOCKET_URL}</Col>
                        <Col>process.env.REACT_APP_DEFAULT_MEETING_PWD={((process.env.REACT_APP_DEFAULT_MEETING_PWD===undefined)?"null":"not null")}</Col>
                        <Col>config.DEFAULT_MEETING_PWD={config.DEFAULT_MEETING_PWD}</Col>
                    </Row>
*/}
                </Container>
            );
    }
}

export default FirstForm;
