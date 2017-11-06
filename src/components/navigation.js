import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import FontIcon from 'material-ui/FontIcon';
import onClickOutside from 'react-onclickoutside'
import { NavLink } from 'react-router-dom';

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
    render() {
        return (<div>
            <AppBar title="Success Dashboard" onLeftIconButtonTouchTap={this.toggleDrawer.bind(this)} />
            <Drawer open={this.state.open} onToggleDrawer={this.toggleDrawer.bind(this)}>
                <MenuItem><NavLink activeClassName="selected" to="/">Home</NavLink></MenuItem>
                <MenuItem><NavLink activeClassName="selected" to="/login">Login</NavLink></MenuItem>
                <MenuItem><NavLink activeClassName="selected" to="/requirements">Requirements</NavLink></MenuItem>
                <MenuItem><NavLink activeClassName="selected" to="/projects">Projects</NavLink></MenuItem>
            </Drawer>
        </div>);
    }
}

var clickOutsideConfig = {
    excludeScrollbar: true
}
var EnhancedComponent = onClickOutside(Navigation, clickOutsideConfig);

export default onClickOutside(Navigation);
