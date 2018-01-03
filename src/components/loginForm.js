import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import { NavLink } from 'react-router-dom';
import { getCookie, setCookie } from '../js/global';

const paperstyle = {
    padding: '.5em',
    marginTop: '2em'
};

const BadPW = () => (
    <Paper style={paperstyle} zDepth={2} >Wrong Password Duder</Paper>
)

class LoginForm extends Component {

    constructor(props) {
        super(props);
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
            return <Paper style={paperstyle} zDepth={2} >You're logged in already duder. Go check out <NavLink activeClassName="selected" to="/projects">your projects</NavLink>.</Paper>;
        }
    }

    handleSubmit(){
        this.setState({
            loading: true
        });
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
            <h1>Log In</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam posuere et libero id ornare. Praesent varius risus dolor, sed varius turpis lobortis ut.</p>
            <form onSubmit={this.handleSubmit}>
                <div><TextField hintText="Username" floatingLabelText="Username" name="username" type="text" onChange={this.onChange} /></div>
                <div><TextField hintText="Password" floatingLabelText="Password" name="password" type="password" onChange={this.onChange} /></div>
                <div><br/><RaisedButton onClick={this.handleSubmit.bind(this)} label="Log In" secondary={true} /></div>
            </form>
            {!this.state.loggedin && !this.state.loading && this.state.data !== '' && <BadPW />}
            <div>{this.message()}</div>
        </div>);
    }
}

export default LoginForm;
