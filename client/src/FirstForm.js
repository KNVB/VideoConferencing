import React ,{Component} from 'react';
import Info from './Info';
import './App.css';
import MediaPlayer from './components/mediaPlayer/MediaPlayer';
class FirstForm extends Component {
    constructor(props) {
        super(props);
        this.state={};
        this.callAPI=(()=>{
            fetch("http://localhost:9000/testAPI")
                .then(res => res.json())
                .then(res => {
                    console.log("App.js:"+res);
                    this.setState(res);
                });
        });
    }    
    

    render(){
        if (this.state.userName){
            return <Info data={this.state}/>
        } else 
        return (
            <div style={{width:'300px',height:'200px'}}>
                <button onClick={this.callAPI}>
                    Go
                </button>
                <MediaPlayer/>   
            </div>
        )
    }
}

export default FirstForm;
