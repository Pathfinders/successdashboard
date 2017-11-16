import React, { Component } from 'react';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';
import FileFolder from 'material-ui/svg-icons/file/folder';
import { getCookie, setCookie } from '../js/global'

class ProjectList extends Component {
    constructor() {
        super();
        this.state = {

        };
    }
    loggedin = getCookie('loggedin');
    render() {
        if(this.loggedin != "true"){
            window.location = "/login";
            return false;
        }
        return (<div className="innertube">
            <List>
                <Subheader inset={true}>Folders</Subheader>
                <ListItem
                    leftAvatar={<Avatar icon={<FileFolder />} />}
                    primaryText="Photos"
                    secondaryText="Jan 9, 2014"
                />
                <ListItem
                    leftAvatar={<Avatar icon={<FileFolder />} />}
                    primaryText="Recipes"
                    secondaryText="Jan 17, 2014"
                />
                <ListItem
                    leftAvatar={<Avatar icon={<FileFolder />} />}
                    primaryText="Work"
                    secondaryText="Jan 28, 2014"
                />
            </List>
        </div>);
    }
}

export default ProjectList;
