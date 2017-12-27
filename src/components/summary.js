import React, { Component } from 'react';
import { getCookie, getProject, verification, user, getMonth, getYear } from '../js/global';
import { Chart } from 'react-google-charts';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import RaisedButton from 'material-ui/RaisedButton';
import { NavLink } from 'react-router-dom';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

class Summary extends Component {

    constructor(props) {
        var userdata = user();
        var projects = userdata.projects;
        super(props);
        this.state = {
            loggedIn: verification(),
            userdata: userdata,
            projectid: props.match.params.project,
            projectData: getProject(userdata.projects,props.match.params.project),
            clientChartData: [],
            pfChartData: [],
            client_answer_data: [],
            pf_answer_data: [],
            month: props.match.params.monthfor ? parseInt(props.match.params.monthfor) : getMonth(),
            year: props.match.params.yearfor ? parseInt(props.match.params.yearfor) : getYear()
        };
    }

    componentDidMount() {
        this.setState({
            pfChartData: this.loadPFAnswers(this.state.month,this.state.year),
        });
        this.setState({
            clientChartData: this.loadClientAnswers(this.state.month,this.state.year),
        });
    }

    loadClientAnswers(m,y){
        var clientChartData = [["Task","Hours per Day"],["Bad",0],["Ok",0],["Good",0]];
        this.setState({
            loading: true,
        });
        fetch("http://www.successdashboard.com.php7-34.lan3-1.websitetestlink.com/api/entries/tallyentries.php?projectid=" + this.state.projectid + "&monthfor=" + m + "&yearfor=" + y + "&groupid=" + 1).then(
            results => {
                return results.json();
            }).then(data => {
                for (var i = 0; i < data.length; i++) {
                    if(data[i].ratingid === '1'){
                        clientChartData[1][1] ++;
                    }
                    if(data[i].ratingid === '2'){
                        clientChartData[2][1] ++;
                    }
                    if(data[i].ratingid === '3'){
                        clientChartData[3][1] ++;
                    }
                };
                this.setState({
                    loading: false,
                    client_answer_data: data
                })
            }
        );
        return clientChartData;
    }

    loadPFAnswers(m,y){
        var pfChartData = [["Task","Hours per Day"],["Bad",0],["Ok",0],["Good",0]];
        this.setState({
            loading: true,
        });
        fetch("http://www.successdashboard.com.php7-34.lan3-1.websitetestlink.com/api/entries/tallyentries.php?projectid=" + this.state.projectid + "&monthfor=" + m + "&yearfor=" + y + "&groupid=" + 2).then(
            results => {
                return results.json();
            }).then(data => {
                for (var i = 0; i < data.length; i++) {
                    if(data[i].ratingid === '1'){
                        pfChartData[1][1] ++;
                    }
                    if(data[i].ratingid === '2'){
                        pfChartData[2][1] ++;
                    }
                    if(data[i].ratingid === '3'){
                        pfChartData[3][1] ++;
                    };
                    this.setState({
                        loading: false,
                        pf_answer_data: data
                    })
                }
            }
        );
        return pfChartData;
    }

    /*
    changeYear = (event, index, value) => this.setState({
        year: value,
        pfChartData: this.loadPFAnswers(this.state.month,value),
        clientChartData: this.loadClientAnswers(this.state.month,value)
    });

    changeMonth = (event, index, value) => this.setState({
        month: value,
        pfChartData: this.loadPFAnswers(value,this.state.year),
        clientChartData: this.loadClientAnswers(value,this.state.year)
    });
    */

    changeYear = (event, index, value) => window.location = "/summary/" + this.state.projectid + "/" + this.state.month + "/" + value;

    changeMonth = (event, index, value) => window.location = "/summary/" + this.state.projectid + "/" + value + "/" + this.state.year;

    buildMonths(){
        var m = [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December'
        ];
        var months = m.map((month, index) => {
            return (
                <MenuItem key={index} value={index + 1} primaryText={month} />
            );
        });
        return months;
    }

    buildYears(){
        var currentyear = getYear();
        var y = [];
        for (var i=0; i < 5; i++) {
            y.push(currentyear --);
        }
        var years = y.map((year, index) => {
            return (
                <MenuItem key={index} value={year} primaryText={year} />
            );
        });
        return years;
    }

    makeButtons(group){
        // Check if the user is in the group specified
        var inGroup = false;
        if(this.state.userdata.groupid == group){
            inGroup = true;
        }
        // Check if the user has taken this survey
        var takenSurvey = false;
        var answeredClientQuestions = [];
        var answeredPFQuestions = [];

        for (var i=0; i < this.state.client_answer_data.length; i++) {
            if(this.state.client_answer_data[i].userid == this.state.userdata.userid){
                answeredClientQuestions.push(true);
            }
        }
        for (var i=0; i < this.state.pf_answer_data.length; i++) {
            if(this.state.pf_answer_data[i].userid == this.state.userdata.userid){
                answeredPFQuestions.push(true);
            }
        }
        if(group == 1 && answeredClientQuestions.length > 0){
            takenSurvey = true;
        }
        if(group == 2 && answeredPFQuestions.length > 0){
            takenSurvey = true;
        }
        // Check if there is any data from the survey
        var blankSurvey = true;
        if(group == 1 && this.state.client_answer_data.length > 0){
            blankSurvey = false;
        }
        if(group == 2 && this.state.pf_answer_data.length > 0){
            blankSurvey = false;
        }
        // Determine which buttons should be active
        if(!blankSurvey){
            var button1 = <NavLink activeClassName="selected" to={'/requirements/' + this.state.projectid + '/' + group + '/' + this.state.month + '/' + this.state.year}><RaisedButton label="View Details" primary={true} fullWidth={true}/></NavLink>;
        }else{
            var button1 = <RaisedButton label="View Details" primary={true} fullWidth={true} disabled={true}/>;
        }
        if(!takenSurvey && inGroup){
            var button2 = <NavLink activeClassName="selected" to={'/survey/' + this.state.projectid + '/' + group + '/' + this.state.month + '/' + this.state.year}><RaisedButton secondary={true} label="Take Survey" fullWidth={true}/></NavLink>;
        }else{
            var button2 = <RaisedButton secondary={true} disabled={true} label="Take Survey" fullWidth={true}/>;
        }
        if(takenSurvey && inGroup){
            var button3 = <NavLink activeClassName="selected" to={'/survey/' + this.state.projectid + '/' + group + '/' + this.state.month + '/' + this.state.year}><RaisedButton secondary={true} label="Edit Survey" fullWidth={true}/></NavLink>;
        }else{
            var button3 = <RaisedButton secondary={true} disabled={true} label="Edit Survey" fullWidth={true}/>;
        }
        return (<div>{button1}{button2}{button3}</div>);
    }

    inGroup(group){

    }

    render() {
        console.log(this.state);
        const pieOptions = {
            title: '',
            pieHole: 0.4,
            slices: [{color: '#c64034'},{color: '#e87800'},{color: '#708043'}],
            pieSliceText: 'none',
            legend: {
                position: 'bottom',
                alignment: 'center',
            },
        };
        const style = {
            padding: '1em',
        };
        return (
            <div className="innertube">
                <h1>Summary</h1>
                <h3><NavLink activeClassName="selected" to={'/projects/'}>Projects</NavLink> / {this.state.projectData.projectname}</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi iaculis eleifend ligula, venenatis molestie mi sagittis sed. Suspendisse nec metus vitae odio vulputate viverra ac aliquam justo. Pellentesque non justo imperdiet, pretium ligula non, accumsan risus. Nam vestibulum vestibulum metus, sit amet volutpat dui porttitor sed. Quisque dolor ligula, lobortis ultricies sem sed, faucibus congue libero. Maecenas egestas congue odio at dapibus. Maecenas a cursus sapien.</p>
                <SelectField floatingLabelText="Month" onChange={this.changeMonth} value={this.state.month} >{this.buildMonths()}</SelectField>
                &nbsp;
                <SelectField floatingLabelText="Year" onChange={this.changeYear} value={this.state.year} >{this.buildYears()}</SelectField>
                <table width="100%">
                    <tbody>
                        <tr>
                            <td align="center" width="50%">
                                <Paper style={style} zDepth={2} >
                                <h2>Client</h2>
                                    <Divider />
                                    <Chart
                                        chartType="PieChart"
                                        width="100%"
                                        data={this.state.clientChartData}
                                        options={pieOptions}
                                    />
                                    {this.makeButtons(1)}
                                </Paper>
                            </td>
                            <td width="10">&nbsp;</td>
                            <td align="center" width="50%">
                                <Paper style={style} zDepth={2} >
                                    <h2>Pathfinders</h2>
                                    <Divider />
                                    <Chart
                                        chartType="PieChart"
                                        width="100%"
                                        data={this.state.pfChartData}
                                        options={pieOptions}
                                    />
                                    {this.makeButtons(2)}
                                </Paper>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

export default Summary;
