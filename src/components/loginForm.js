import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

class LoginForm extends Component {
    constructor() {
        super();
        this.state = {
            username: '1',
            password: '2',
        };
    }

    onChange = (e) => {
        // Because we named the inputs to match their corresponding values in state, it's super easy to update the state
        const state = this.state
        state[e.target.name] = e.target.value;
        this.setState(state);
    }

    handleSubmit(){
        console.log('giddyup');
        fetch("http://www.successdashboard.com.php7-34.lan3-1.websitetestlink.com/api/user/read_oneuser.php?userid=1").then(results => {return results.json();}).then(data => {console.log(data)})
    }

    render(){
        const { fname, lname, email } = this.state;
        return (<div className="innertube">
            <form onSubmit={this.handleSubmit}>
                <div><TextField hintText="Username" floatingLabelText="Username" name="username" type="text" onChange={this.onChange} /></div>
                <div><TextField hintText="Password" floatingLabelText="Password" name="password" type="password" onChange={this.onChange} /></div>
                <div><br/><RaisedButton onClick={this.handleSubmit} label="Log In" secondary={true} /></div>
            </form>
        </div>);
    }
}

export default LoginForm;
