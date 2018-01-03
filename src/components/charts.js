import React, { Component } from 'react';
import { user, getYear } from '../js/global';
import { Chart } from 'react-google-charts';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import RaisedButton from 'material-ui/RaisedButton';
import { NavLink } from 'react-router-dom';
import MenuItem from 'material-ui/MenuItem';

class SummaryChart extends Component {

    constructor(props) {
        var userdata = user();
        super(props);
        this.state = {
            data: props.data,
            projectid: props.projectid,
            month: props.month,
            year: props.year,
            details: false,
            edit: false,
            groupid: props.groupid,
            userdata: userdata,
            answer_data: props.answer_data,
        };
    }

    componentDidMount() {

    }

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

    takenSurvey(){
        // Check if the user has taken this survey
        var answeredQuestions = [];
        for (var i=0; i < this.state.answer_data.length; i++) {
            if(this.state.answer_data[i].userid === this.state.userdata.userid){
                answeredQuestions.push(true);
            }
        }
        if(answeredQuestions.length > 0){
            return true;
        }
        return false;
    }

    makeButtons(group){
        // Check if the user is in the group specified
        var inGroup = false;
        if(parseInt(this.state.userdata.groupid,10) === group){
            inGroup = true;
        }
        // Determine which buttons should be active
        var button1;
        if(this.state.data.length > 0){
            button1 = <NavLink activeClassName="selected" to={'/requirements/' + this.state.projectid + '/' + group + '/' + this.state.month + '/' + this.state.year}><RaisedButton label="View Details" primary={true} fullWidth={true}/></NavLink>;
        }else{
            button1 = <RaisedButton label="View Details" primary={true} fullWidth={true} disabled={true}/>;
        }
        var button2;
        if(!this.takenSurvey(this.state.groupid) && inGroup){
            button2 = <NavLink activeClassName="selected" to={'/survey/' + this.state.projectid + '/' + group + '/' + this.state.month + '/' + this.state.year}><RaisedButton secondary={true} label="Take Survey" fullWidth={true}/></NavLink>;
        }else{
            button2 = <RaisedButton secondary={true} disabled={true} label="Take Survey" fullWidth={true}/>;
        }
        var button3;
        if(this.takenSurvey(this.state.groupid) && inGroup){
            button3 = <NavLink activeClassName="selected" to={'/survey/' + this.state.projectid + '/' + group + '/' + this.state.month + '/' + this.state.year}><RaisedButton secondary={true} label="Edit Survey" fullWidth={true}/></NavLink>;
        }else{
            button3 = <RaisedButton secondary={true} disabled={true} label="Edit Survey" fullWidth={true}/>;
        }
        return (<div>{button1}{button2}{button3}</div>);
    }

    render() {
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
            <Paper style={style} zDepth={2} >
                <h2>{this.state.groupid === 1 ? 'Client' : 'Pathfinders'}</h2>
                <Divider />
                <Chart
                    chartType="PieChart"
                    width="100%"
                    data={this.state.data}
                    options={pieOptions}
                />
                {this.makeButtons(this.state.groupid)}
            </Paper>
        );
    }
}

export default SummaryChart;
