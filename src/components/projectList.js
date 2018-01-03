import React, { Component } from 'react';
import {List, ListItem} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import FileFolder from 'material-ui/svg-icons/file/folder';
import { verification, user, getMonth, getYear } from '../js/global';
import { NavLink } from 'react-router-dom';

class ProjectList extends Component {
    constructor(props) {
        var userdata = user();
        super(props);
        this.state = {
            loggedIn: verification(),
            userdata: userdata,
            firstname: userdata.firstname ? userdata.firstname : 'back',
        };
    }

    render() {
        if(!this.state.userdata){
            return false;
        }
        var content = this.state.userdata.projects.map((project, index) => {
            var url = "/summary/" + project.projectid + "/" + getMonth() + "/" + getYear();
            return (
                <div>
                    <NavLink activeClassName="selected" to={url}>
                        <ListItem
                            leftAvatar={<Avatar icon={<FileFolder />} />}
                            primaryText={project.description}
                            secondaryText={project.projectname}
                            key={index}
                        />
                    </NavLink>
                </div>
            );
        });
        return (<div className="innertube">
            <h1>Welcome {this.state.firstname}</h1>
            <h3>Projects</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam posuere et libero id ornare. Praesent varius risus dolor, sed varius turpis lobortis ut. Nam finibus varius semper. Cras hendrerit dapibus ligula sed pellentesque. Nam volutpat urna a accumsan ultrices. Proin eleifend volutpat pellentesque. Integer euismod eros risus, ultricies pretium ligula luctus ut. Curabitur et lacinia orci. Fusce congue tellus varius augue faucibus, sed pellentesque urna porttitor. Suspendisse finibus, mi vitae blandit aliquam, ex urna tempus eros, at lobortis eros orci lacinia ex. Fusce rutrum ex eget ligula aliquam commodo. Proin risus turpis, vehicula quis mauris ut, molestie consectetur tellus.</p>
            <List>
                {content}
            </List>
        </div>);
    }
}

export default ProjectList;
