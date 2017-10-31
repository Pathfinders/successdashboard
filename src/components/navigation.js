import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';

class Navigation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false
        };
    }
    toggleDrawer() {
        this.setState({
            open: !this.state.open
        })
    }
    render() {
        return (<div>
            <AppBar title="Success Dashboard" onLeftIconButtonTouchTap={this.toggleDrawer.bind(this)} />
            <Drawer open={this.state.open} onToggleDrawer={this.toggleDrawer.bind(this)}>
                <MenuItem>Help</MenuItem>
                <MenuItem>Home</MenuItem>
            </Drawer>
        </div>);
    }
}

export default Navigation;
