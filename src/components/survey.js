import React, { Component } from 'react';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import { getCookie, getProject, verification, pfColors, user, getMonth, getYear, getAnswer2} from '../js/global';
import Chip from 'material-ui/Chip';
import { NavLink } from 'react-router-dom';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import Paper from 'material-ui/Paper';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import Divider from 'material-ui/Divider';
import TextField from 'material-ui/TextField';

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
            loading: true,
            answer_data: [],
            month: props.match.params.monthfor ? parseInt(props.match.params.monthfor) : getMonth(),
            year: props.match.params.yearfor ? parseInt(props.match.params.yearfor) : getYear()
        };
    }

    componentWillMount() {

    }

    componentDidMount() {
        this.loadQuestions();
        this.setState({
            answer_data: this.loadAnswers(this.state.month,this.state.year,1),
        });
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

    loadAnswers(m,y,g){
        this.setState({
            loading: true,
        });
        var results = fetch("http://www.successdashboard.com.php7-34.lan3-1.websitetestlink.com/api/entries/tallyentries.php?projectid=" + this.state.projectid + "&monthfor=" + m + "&yearfor=" + y + "&groupid=" + 2).then(function(response) {
            // Convert to JSON
            return response.json();
        }).then(data => {
                var userdata = [];
                for (var i = 0; i < data.length; i++) {
                    if(data[i].userid == this.state.userdata.userid){
                        userdata.push(data[i]);
                    }
                };
                this.setState({
                    loading: false,
                    answer_data: userdata
                })
            }
        );
    }

    buildPaper(){
        if(this.state.question_data){
            if(!this.state.question_data){
                return false;
            }
            var questions = this.state.question_data.questions.map((question, index) => {

                var answer = {};
                if(this.state.answer_data){
                    answer = getAnswer2(this.state.answer_data,question.quesid);
                }
                console.log(answer.comment);
                return (
                    <Paper style={paperstyle} zDepth={2} key={index} ><p style={radiostyle}>{question.question}</p>
                        <Divider />
                        <div style={radiostyle}>
                            <RadioButtonGroup name="shipSpeed" defaultSelected="not_light" valueSelected={answer.ratingid}>
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
                            <div><TextField fullWidth={true} floatingLabelText="Additional Comments" name="comment" type="text" defaultValue={answer.comment} /><br/></div>
                        </div>
                    </Paper>
                );
            });
            return questions;
        }
    }

    render(){
        console.log(this.state);
        return (<div className="innertube">
            <h1>Survey</h1>
            <h3><NavLink activeClassName="selected" to={'/projects/'}>Projects</NavLink> / <NavLink activeClassName="selected" to={'/summary/' + this.state.projectid}>{this.state.projectData.projectname}</NavLink> / {this.state.groupid === '1' ? 'Client' : 'Pathfinders'}</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam posuere et libero id ornare. Praesent varius risus dolor, sed varius turpis lobortis ut. Nam finibus varius semper. Cras hendrerit dapibus ligula sed pellentesque. Nam volutpat urna a accumsan ultrices. Proin eleifend volutpat pellentesque. Integer euismod eros risus, ultricies pretium ligula luctus ut. Curabitur et lacinia orci. Fusce congue tellus varius augue faucibus, sed pellentesque urna porttitor. Suspendisse finibus, mi vitae blandit aliquam, ex urna tempus eros, at lobortis eros orci lacinia ex. Fusce rutrum ex eget ligula aliquam commodo. Proin risus turpis, vehicula quis mauris ut, molestie consectetur tellus.</p>
            {this.buildPaper()}
        </div>);
    }
}

export default Survey;
