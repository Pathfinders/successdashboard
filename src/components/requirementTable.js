import React, { Component } from 'react';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import { getAnswer, getProject, verification, pfColors, user } from '../js/global';
import Chip from 'material-ui/Chip';
import { NavLink } from 'react-router-dom';

class RequirementTable extends Component {
    constructor(props) {
        var userdata = user();
        super(props);
        this.state = {
            loading: true,
            fixedHeader: true,
            fixedFooter: true,
            stripedRows: false,
            showRowHover: false,
            selectable: false,
            multiSelectable: false,
            enableSelectAll: false,
            deselectOnClickaway: false,
            showCheckboxes: false,
            height: '300px',
            loggedIn: verification(),
            userdata: userdata,
            projectid: props.match.params.project,
            month: props.match.params.monthfor,
            year: props.match.params.yearfor,
            projectData: getProject(userdata.projects,props.match.params.project),
            groupid: props.match.params.group,
            question_data: '',
            answer_data: '',
        };
    }

    componentWillMount() {

    }

    componentDidMount() {
        this.loadQuestions();
        this.loadAnswers();
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
    
    loadAnswers(){
        this.setState({
            loading: true,
        });
        fetch("http://www.successdashboard.com.php7-34.lan3-1.websitetestlink.com/api/entries/tallyentries.php?projectid=" + this.state.projectid + "&monthfor=" + this.state.month + "&yearfor=" + this.state.year + "&groupid=" + this.state.groupid).then(
            results => {
                return results.json();
            }).then(data => {
                this.setState({
                    answer_data: data,
                    loading: false,
                });
            }
        );
    }

    valueToColor(val){
        var color = pfColors.black;
        switch(val) {
            case 1:
                color = pfColors.red;
                break;
            case 2:
                color = pfColors.orange;
                break;
            case 3:
                color = pfColors.dkgreen;
                break;
            default:
                color = pfColors.black;
                break;
        }
        return (color);
    }

    renderComments(a){
        var html = '<ul>';
        for (var i = 0; i < a.length; i++) {
            html += "<li>" + a[i]['firstname'] + ' ' + a[i]['lastname'] + ": <em>" + a[i]['comment'] + "</em></li>";
        }
        html += "</ul>"
        return {__html: html};
    }

    buildRows(){
        if(this.state.question_data){
            if(!this.state.question_data || !this.state.answer_data){
                return false;
            }
            var questions = this.state.question_data.questions.map((question, index) => {
                var val = getAnswer(this.state.answer_data,question.quesid);
                return (
                    <TableRow key={index}>
                        <TableRowColumn>{question.question}</TableRowColumn>
                        <TableRowColumn><Chip labelColor={pfColors.white} backgroundColor={this.valueToColor(val.average)}>{val.average}</Chip></TableRowColumn>
                        <TableRowColumn><div dangerouslySetInnerHTML={this.renderComments(val.data)} /></TableRowColumn>
                    </TableRow>
                );
            });
            return questions;
        }
    }

    render(){
        return (<div className="innertube">
            <h1>Requirements</h1>
            <h3><NavLink activeClassName="selected" to={'/projects/'}>Projects</NavLink> / <NavLink activeClassName="selected" to={'/summary/' + this.state.projectid + '/' + this.state.month + '/' + this.state.year}>{this.state.projectData.projectname}</NavLink> / {this.state.groupid === '1' ? 'Client' : 'Pathfinders'}</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam posuere et libero id ornare. Praesent varius risus dolor, sed varius turpis lobortis ut. Nam finibus varius semper. Cras hendrerit dapibus ligula sed pellentesque. Nam volutpat urna a accumsan ultrices. Proin eleifend volutpat pellentesque. Integer euismod eros risus, ultricies pretium ligula luctus ut. Curabitur et lacinia orci. Fusce congue tellus varius augue faucibus, sed pellentesque urna porttitor. Suspendisse finibus, mi vitae blandit aliquam, ex urna tempus eros, at lobortis eros orci lacinia ex. Fusce rutrum ex eget ligula aliquam commodo. Proin risus turpis, vehicula quis mauris ut, molestie consectetur tellus.</p>
            <Table fixedHeader={this.state.fixedHeader}
            fixedFooter={this.state.fixedFooter}
            selectable={this.state.selectable}
            multiSelectable={this.state.multiSelectable}>
            <TableHeader displaySelectAll={this.state.showCheckboxes}
            adjustForCheckbox={this.state.showCheckboxes}
            enableSelectAll={this.state.enableSelectAll}>
            <TableRow>
            <TableHeaderColumn>Question</TableHeaderColumn>
            <TableHeaderColumn>Grade</TableHeaderColumn>
            <TableHeaderColumn>Reviewers / Comments</TableHeaderColumn>
            </TableRow>
            </TableHeader>
            <TableBody
            displayRowCheckbox={this.state.showCheckboxes}
            deselectOnClickaway={this.state.deselectOnClickaway}
            showRowHover={this.state.showRowHover}
            stripedRows={this.state.stripedRows}
            >
            {this.buildRows()}
            </TableBody>
            </Table>
        </div>);
    }
}

export default RequirementTable;
