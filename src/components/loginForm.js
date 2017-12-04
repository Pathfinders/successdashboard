import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import { getCookie, setCookie } from '../js/global';

const paperstyle = {
    padding: '.5em',
    marginTop: '2em'
};

class LoginForm extends Component {
    constructor() {
        super();
        this.state = {
            username: '',
            password: '',
            data: '',
            loading: true,
            loggedin: false
        };
    }

    componentWillMount() {
        if(getCookie('loggedin') === 'true'){
            this.setState({
                loggedin: true,
            });
        }
    }

    onChange = (e) => {
        // Because we named the inputs to match their corresponding values in state, it's super easy to update the state
        const state = this.state
        state[e.target.name] = e.target.value;
        this.setState(state);
    }

    message() {
        if(this.state.loggedin) {
            return <Paper style={paperstyle} zDepth={2} >You're logged in already duder</Paper>;
        }
    }

    handleSubmit(){
        fetch("http://www.successdashboard.com.php7-34.lan3-1.websitetestlink.com/api/user/read_oneuser.php?username=" + this.state.username + "&password=" + this.state.password).then(
                results => {
                    return results.json();
                }).then(data => {
                    this.setState({
                        data: data,
                        loading: false
                    });
                    if(data.userid){
                        setCookie("loggedin", true, 1);
                        setCookie("userdata", JSON.stringify(data), 1);
                        window.location = "/projects";
                    }else{
                        this.setState({
                            loggedin: false
                        });
                        setCookie("loggedin", false, 1);
                    }
                }
            )
    }

    render(){
        return (<div className="innertube">
            <form onSubmit={this.handleSubmit}>
                <div><TextField hintText="Username" floatingLabelText="Username" name="username" type="text" onChange={this.onChange} /></div>
                <div><TextField hintText="Password" floatingLabelText="Password" name="password" type="password" onChange={this.onChange} /></div>
                <div><br/><RaisedButton onClick={this.handleSubmit.bind(this)} label="Log In" secondary={true} /></div>
            </form>
            {!this.state.loggedin && this.state.data !== '' && <Child />}
            <div>{this.message()}</div>
        </div>);
    }
}

const Child = () => (
<div className='modal'>
      Wrong Password Duder
  </div>
)

export default LoginForm;
