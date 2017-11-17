import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import onClickOutside from 'react-onclickoutside'
import { NavLink } from 'react-router-dom';
import { getCookie } from '../js/global'

class Navigation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
        };
    }
    toggleDrawer() {
        this.setState({
            open: !this.state.open
        })
    }
    closeDrawer() {
        this.setState({
            open: false
        })
    }
    handleClickOutside(evt) {
        this.closeDrawer()
    }
    loggedin = getCookie('loggedin');
    render() {
        if(this.loggedin === "true"){
            return (<div>
                <AppBar title="Success Dashboard" onLeftIconButtonTouchTap={this.toggleDrawer.bind(this)} />
                <Drawer open={this.state.open} onToggleDrawer={this.toggleDrawer.bind(this)}>
                    <MenuItem><NavLink activeClassName="selected" to="/">Home</NavLink></MenuItem>
                    <MenuItem><NavLink activeClassName="selected" to="/login">Login</NavLink></MenuItem>
                    <MenuItem><NavLink activeClassName="selected" to="/requirements">Requirements</NavLink></MenuItem>
                    <MenuItem><NavLink activeClassName="selected" to="/projects">Projects</NavLink></MenuItem>
                </Drawer>
            </div>);
        }else{
            return (<div>
                <AppBar title="Success Dashboard" onLeftIconButtonTouchTap={this.toggleDrawer.bind(this)} />
                <Drawer open={this.state.open} onToggleDrawer={this.toggleDrawer.bind(this)}>
                    <MenuItem><NavLink activeClassName="selected" to="/">Home</NavLink></MenuItem>
                    <MenuItem><NavLink activeClassName="selected" to="/login">Login</NavLink></MenuItem>
                </Drawer>
            </div>);
        }
    }
}

// Handle clicks outside of drawer
export default onClickOutside(Navigation);
