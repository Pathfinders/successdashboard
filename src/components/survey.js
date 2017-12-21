import React, { Component } from 'react';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import { getCookie, getProject, verification, pfColors, user } from '../js/global';
import Chip from 'material-ui/Chip';
import { NavLink } from 'react-router-dom';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import Paper from 'material-ui/Paper';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import Divider from 'material-ui/Divider';

const paperstyle = {
    padding: '.5em',
    marginTop: '2em'
};

const radiostyle = {
    marginTop: '.5em',
    marginBottom: '.5em'
};

class Survey extends Component {
    constructor(props) {
        var userdata = user();
        var projects = userdata.projects;
        super(props);
        this.state = {
            loggedIn: verification(),
            userdata: userdata,
            projectid: props.match.params.project,
            projectData: getProject(userdata.projects,props.match.params.project),
            groupid: props.match.params.group,
            question_data: '',
            loading: true
        };
    }

    componentWillMount() {

    }

    componentDidMount() {
        this.loadQuestions();
    }

    loadQuestions(){
        this.setState({
            loading: true,
        });
        fetch("http://www.successdashboard.com.php7-34.lan3-1.websitetestlink.com/api/question/readquestions.php?projectid=" + this.state.projectid + "&groupid=" + this.state.groupid).then(
            results => {
                return results.json();
            }).then(data => {
                this.setState({
                    question_data: data,
                    loading: false,
                });
            }
        );

    }

    buildPaper(){
        if(this.state.question_data){
            if(!this.state.question_data){
                return false;
            }
            var questions = this.state.question_data.questions.map((question, index) => {
                return (
                    <Paper style={paperstyle} zDepth={2} key={index} ><p style={radiostyle}>{question.question}</p>
                        <Divider />
                        <div style={radiostyle}>
                            <RadioButtonGroup name="shipSpeed" defaultSelected="not_light">
                                <RadioButton
                                value="1"
                                label="Bad"
                                />
                                <RadioButton
                                value="2"
                                label="Ok"
                                />
                                <RadioButton
                                value="3"
                                label="Good"
                                />
                            </RadioButtonGroup>
                        </div>
                    </Paper>
                );
            });
            return questions;
        }
    }

    render(){
        return (<div className="innertube">
            <h1>Survey</h1>
            <h3><NavLink activeClassName="selected" to={'/projects/'}>Projects</NavLink> / <NavLink activeClassName="selected" to={'/summary/' + this.state.projectid}>{this.state.projectData.projectname}</NavLink> / {this.state.groupid === '1' ? 'Client' : 'Pathfinders'}</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam posuere et libero id ornare. Praesent varius risus dolor, sed varius turpis lobortis ut. Nam finibus varius semper. Cras hendrerit dapibus ligula sed pellentesque. Nam volutpat urna a accumsan ultrices. Proin eleifend volutpat pellentesque. Integer euismod eros risus, ultricies pretium ligula luctus ut. Curabitur et lacinia orci. Fusce congue tellus varius augue faucibus, sed pellentesque urna porttitor. Suspendisse finibus, mi vitae blandit aliquam, ex urna tempus eros, at lobortis eros orci lacinia ex. Fusce rutrum ex eget ligula aliquam commodo. Proin risus turpis, vehicula quis mauris ut, molestie consectetur tellus.</p>
            {this.buildPaper()}
        </div>);
    }
}

export default Survey;
