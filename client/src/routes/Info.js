import { Container } from 'react-bootstrap';
import React ,{Component} from 'react';
import LocalStreamManager from '../utils/LocalStreamManager';
class Info extends Component {
    constructor(props) {
        super(props);
        this.flag=false;
        this.localStream=null;
        this.localStreamManager=new LocalStreamManager();
        this.go=async()=>{
            
            await this.toggle()
            .then(stream=>{
                console.log("go success")
            })
            .catch (error=>{
                console.log("Catched")
            }) 
            .finally(()=>{
                console.log("go finally");
            })
            
        }
        this.toggle=async ()=>{
            this.flag=!this.flag;
            if (this.localStream){
                this.localStream.getTracks().forEach(async track=>{
                    await track.stop();
                })
                this.localStream=null;
            }
            await this.localStreamManager.getMediaStream(this.flag,this.flag)
            .then (stream=>{
                this.localStream=stream;
                return stream
            })
            .catch(error=>{
                throw error
            })
            .finally(()=>{
                console.log("toggle finally");
            })
        }
    }
    
    componentDidMount() {
        var meetingInfo={"user":{"id":"392e80e9-c1ce-42a5-bc94-abd7c75ce579","isHost":true,"alias":"1","shareMedia":{"video":"false","audio":"false"}},"meetingId":"f6c73c8d-af62-486c-97d6-e0f4a211aa73"}
        //this.meetingUtil=new MeetingUtil(meetingInfo);
    }
    render() {
        return (
            <Container fluid>
                <button onClick={this.go}>Toggle</button>
            </Container>
        );
    }
}
export default Info;    