import React, { Component } from 'react';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import { getCookie, getProject, verification, pfColors, user, getMonth, getYear, getAnswer2, entryExists} from '../js/global';
import Chip from 'material-ui/Chip';
import { NavLink } from 'react-router-dom';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import Paper from 'material-ui/Paper';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import Divider from 'material-ui/Divider';
import TextField from 'material-ui/TextField';
import Question from '../components/question';

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
            loading: true,
            month: props.match.params.monthfor ? parseInt(props.match.params.monthfor) : getMonth(),
            year: props.match.params.yearfor ? parseInt(props.match.params.yearfor) : getYear(),
            question_data: [],
            answer_data: []
        };
    }

    componentWillMount() {

    }

    componentDidMount() {

    }

    /*buildPaper(){
        if(this.state.question_data){
            var questions = this.state.question_data.questions.map((question, index) => {
                var answer = {};
                if(this.state.answer_data){
                    answer = getAnswer2(this.state.answer_data,question.quesid);
                }
                return (
                    <Question question={question} answer={answer} />
                );
            });
            return questions;
        }
    }*/

    render(){
        if(!this.state.userdata.userid){
            return false;
        }
        return (<div className="innertube">
            <h1>Survey</h1>
            <h3><NavLink activeClassName="selected" to={'/projects/'}>Projects</NavLink> / <NavLink activeClassName="selected" to={'/summary/' + this.state.projectid}>{this.state.projectData.projectname}</NavLink> / {this.state.groupid === '1' ? 'Client' : 'Pathfinders'}</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam posuere et libero id ornare. Praesent varius risus dolor, sed varius turpis lobortis ut. Nam finibus varius semper. Cras hendrerit dapibus ligula sed pellentesque. Nam volutpat urna a accumsan ultrices. Proin eleifend volutpat pellentesque. Integer euismod eros risus, ultricies pretium ligula luctus ut. Curabitur et lacinia orci. Fusce congue tellus varius augue faucibus, sed pellentesque urna porttitor. Suspendisse finibus, mi vitae blandit aliquam, ex urna tempus eros, at lobortis eros orci lacinia ex. Fusce rutrum ex eget ligula aliquam commodo. Proin risus turpis, vehicula quis mauris ut, molestie consectetur tellus.</p>
            <Question userid={this.state.userdata.userid} projectid={this.state.projectid} projectData={this.state.projectData} groupid={this.state.groupid} month={this.state.month} year={this.state.year}/>
        </div>);
    }
}

export default Survey;
