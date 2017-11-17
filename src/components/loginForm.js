import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { setCookie } from '../js/global';

class LoginForm extends Component {
    constructor() {
        super();
        this.state = {
            username: '',
            password: '',
            data: '',
            loading: true
        };
    }
    onChange = (e) => {
        // Because we named the inputs to match their corresponding values in state, it's super easy to update the state
        const state = this.state
        state[e.target.name] = e.target.value;
        this.setState(state);
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
                        setCookie("loggedin", false, 1);
                    }
                }
            )
    }
    render(){
        //const { fname, lname, email } = this.state;
        return (<div className="innertube">
            <form onSubmit={this.handleSubmit}>
                <div><TextField hintText="Username" floatingLabelText="Username" name="username" type="text" onChange={this.onChange} /></div>
                <div><TextField hintText="Password" floatingLabelText="Password" name="password" type="password" onChange={this.onChange} /></div>
                <div><br/><RaisedButton onClick={this.handleSubmit.bind(this)} label="Log In" secondary={true} /></div>
            </form>
        </div>);
    }
}

export default LoginForm;
