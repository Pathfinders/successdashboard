import React, { Component } from 'react';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import { getCookie } from '../js/global'

class RequirementTable extends Component {
    constructor() {
        super();
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
            projectid: 1,
            groupid: 1,
            data: ''
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

    loadData(){
        fetch("http://www.successdashboard.com.php7-34.lan3-1.websitetestlink.com/api/question/readquestions.php?projectid=" + this.state.projectid + "&groupid=" + this.state.groupid).then(
                results => {
                    return results.json();
                }).then(data => {
                    this.setState({
                        data: data,
                        loading: false
                    });

                }
            )
    }

    buildRows(){
        if(this.state.data){
            var questions = this.state.data.questions.map((question, index) => {
                console.log(question);
                return (
                    <TableRow>
                        <TableRowColumn>{index}</TableRowColumn>
                        <TableRowColumn>{question.question}</TableRowColumn>
                        <TableRowColumn>"merp"</TableRowColumn>
                    </TableRow>
                );
            });
            return questions;
        }
    }

    render(){
        return (<div className="innertube">
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
