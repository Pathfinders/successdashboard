import React, { Component } from 'react';
import { getProject, verification, user, getMonth, getYear} from '../js/global';
import { NavLink } from 'react-router-dom';
import Question from '../components/question';

class Survey extends Component {
    constructor(props) {
        var userdata = user();
        super(props);
        this.state = {
            loggedIn: verification(),
            userdata: userdata,
            projectid: props.match.params.project,
            projectData: getProject(userdata.projects,props.match.params.project),
            groupid: props.match.params.group,
            loading: true,
            month: props.match.params.monthfor ? parseInt(props.match.params.monthfor,10) : getMonth(),
            year: props.match.params.yearfor ? parseInt(props.match.params.yearfor,10) : getYear(),
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
            <h3><NavLink activeClassName="selected" to={'/projects/'}>Projects</NavLink> / <NavLink activeClassName="selected" to={'/summary/' + this.state.projectid + '/' + this.state.month + '/' + this.state.year}>{this.state.projectData.projectname}</NavLink> / {this.state.groupid === '1' ? 'Client' : 'Pathfinders'}</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam posuere et libero id ornare. Praesent varius risus dolor, sed varius turpis lobortis ut. Nam finibus varius semper. Cras hendrerit dapibus ligula sed pellentesque. Nam volutpat urna a accumsan ultrices. Proin eleifend volutpat pellentesque. Integer euismod eros risus, ultricies pretium ligula luctus ut. Curabitur et lacinia orci. Fusce congue tellus varius augue faucibus, sed pellentesque urna porttitor. Suspendisse finibus, mi vitae blandit aliquam, ex urna tempus eros, at lobortis eros orci lacinia ex. Fusce rutrum ex eget ligula aliquam commodo. Proin risus turpis, vehicula quis mauris ut, molestie consectetur tellus.</p>
            <Question userid={this.state.userdata.userid} projectid={this.state.projectid} projectData={this.state.projectData} groupid={this.state.groupid} month={this.state.month} year={this.state.year}/>
        </div>);
    }
}

export default Survey;
