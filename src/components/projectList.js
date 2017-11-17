import React, { Component } from 'react';
import {List, ListItem} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import FileFolder from 'material-ui/svg-icons/file/folder';
import { getCookie } from '../js/global'

class ProjectList extends Component {
    constructor() {
        super();
        this.state = {
            loggedIn: false,
            userdata: '',
        };
    }

    verification() {
        var loggedin = getCookie('loggedin');
        if(loggedin !== "true"){
            window.location = "/login";
            return false;
        }else{
            this.setState({
                loggedIn: true,
            });
        }
    }

    componentWillMount() {
        this.verification();
        this.loadData();
    }

    loadData() {
        this.setState({
            userdata: JSON.parse(getCookie('userdata')),
        });
    }

    render() {
        var content = this.state.userdata.projects.map((project, index) => {
            return (
                <ListItem
                    leftAvatar={<Avatar icon={<FileFolder />} />}
                    primaryText={project.description}
                    secondaryText={project.projectname}
                    key={index}
                />
            );
        });
        return (<div className="innertube">
            <List>
                {content}
            </List>
        </div>);
    }
}

export default ProjectList;
