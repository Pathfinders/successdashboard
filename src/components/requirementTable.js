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
            groupid: '',
            data: ''
        };
    }

    verification() {
        var loggedin = getCookie('loggedin');
        var userdataStr = getCookie('userdata');
        var userdataObj = JSON.parse(userdataStr);
        if(loggedin !== "true"){
            window.location = "/login";
            return false;
        }else{
            this.setState({
                loggedIn: true,
                groupid: userdataObj.groupid,
            });
        }
    }

    componentWillMount() {
        this.verification();
    }

    componentDidMount() {
        this.loadData();
    }

    loadData(){
        fetch("http://www.successdashboard.com.php7-34.lan3-1.websitetestlink.com/api/question/readquestions.php?projectid=" + this.state.projectid + "&groupid=" + this.state.groupid).then(
                results => {
                    return results.json();
                }).then(data => {
                    this.setState({
                        data: data,
                        loading: false,
                    });
                }
            )
    }

    buildRows(){
        if(this.state.data){
            if(!this.state.data.questions){
                return false;
            }
            var questions = this.state.data.questions.map((question, index) => {
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
