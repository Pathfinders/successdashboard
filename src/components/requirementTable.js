import React, { Component } from 'react';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import { getCookie } from '../js/global';
import Chip from 'material-ui/Chip';

const pfColors = {
    red: "#c64034",
    orange: "#e87800",
    ltgreen: "#b0c182",
    dkgreen: "#708043",
    ltblue: "#c7d5ec",
    grey: "#77777a",
    black: "#231f20",
    white: "#ffffff"
}

class RequirementTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fixedHeader: true,
            fixedFooter: true,
            stripedRows: true,
            showRowHover: false,
            selectable: false,
            multiSelectable: false,
            enableSelectAll: false,
            deselectOnClickaway: false,
            showCheckboxes: false,
            height: '300px',
            loggedIn: false,
            projectid: props.match.params.project,
            groupid: props.match.params.group,
            question_data: '',
            answer_data: '',
        };
    }
    
    getAnswer(arr, val){
        for (var i=0; i < arr.length; i++) {
            if (arr[i].quesid === val) {
                return arr[i].ratingid;
            }
        }
    }
    
    verification() {
        var loggedin = getCookie('loggedin');
        var userdataStr = getCookie('userdata');
        if(!userdataStr){
            return false;
        }
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
        fetch("http://www.successdashboard.com.php7-34.lan3-1.websitetestlink.com/api/entries/tallyentries.php?projectid=" + this.state.projectid + "&monthfor=12&yearfor=2017&groupid=" + this.state.groupid).then(
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
            case '1':
                color = pfColors.red;
                break;
            case '2':
                color = pfColors.orange;
                break;
            case '3':
                color = pfColors.dkgreen;
                break;
            default:
                color = pfColors.black;
                break;
        }
        return (color);
    }

    buildRows(){
        if(this.state.question_data){
            if(!this.state.question_data || !this.state.answer_data){
                return false;
            }
            var questions = this.state.question_data.questions.map((question, index) => {
                var val = this.getAnswer(this.state.answer_data,question.quesid);
                return (
                    <TableRow key={index}>
                        <TableRowColumn>{question.quesid}</TableRowColumn>
                        <TableRowColumn>{question.question}</TableRowColumn>
                        <TableRowColumn><Chip labelColor={pfColors.white} backgroundColor={this.valueToColor(val)}>{val}</Chip></TableRowColumn>
                    </TableRow>
                );
            });
            return questions;
        }
    }

    render(){

        return (<div className="innertube">
            <h1>Project Name</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam posuere et libero id ornare. Praesent varius risus dolor, sed varius turpis lobortis ut. Nam finibus varius semper. Cras hendrerit dapibus ligula sed pellentesque. Nam volutpat urna a accumsan ultrices. Proin eleifend volutpat pellentesque. Integer euismod eros risus, ultricies pretium ligula luctus ut. Curabitur et lacinia orci. Fusce congue tellus varius augue faucibus, sed pellentesque urna porttitor. Suspendisse finibus, mi vitae blandit aliquam, ex urna tempus eros, at lobortis eros orci lacinia ex. Fusce rutrum ex eget ligula aliquam commodo. Proin risus turpis, vehicula quis mauris ut, molestie consectetur tellus.</p>
            <Table fixedHeader={this.state.fixedHeader}
            fixedFooter={this.state.fixedFooter}
            selectable={this.state.selectable}
            multiSelectable={this.state.multiSelectable}>
            <TableHeader displaySelectAll={this.state.showCheckboxes}
            adjustForCheckbox={this.state.showCheckboxes}
            enableSelectAll={this.state.enableSelectAll}>
            <TableRow>
            <TableHeaderColumn>ID</TableHeaderColumn>
            <TableHeaderColumn>Name</TableHeaderColumn>
            <TableHeaderColumn>Status</TableHeaderColumn>
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
