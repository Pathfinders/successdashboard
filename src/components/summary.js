import React, { Component } from 'react';
import { getProject, verification, user, getMonth, getYear } from '../js/global';
import { NavLink } from 'react-router-dom';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import SummaryChart from '../components/charts';
import RaisedButton from 'material-ui/RaisedButton';

class Summary extends Component {

    constructor(props) {
        var userdata = user();
        super(props);
        this.state = {
            loading: true,
            loggedIn: verification(),
            userdata: userdata,
            projectid: props.match.params.project,
            projectData: getProject(userdata.projects,props.match.params.project),
            clientChartData: [],
            pfChartData: [],
            client_answer_data: [],
            pf_answer_data: [],
            month: props.match.params.monthfor ? parseInt(props.match.params.monthfor, 10) : getMonth(),
            year: props.match.params.yearfor ? parseInt(props.match.params.yearfor, 10) : getYear(),
        };
    }

    componentDidMount() {
        this.setState({
            pfChartData: this.loadPFAnswers(this.state.month,this.state.year)
        });
        this.setState({
            clientChartData: this.loadClientAnswers(this.state.month,this.state.year)
        });
    }

    loadClientAnswers(m,y){
        this.setState({
            loading: true,
        })
        var clientChartData = [["Task","Hours per Day"],["Bad",0],["Ok",0],["Good",0]];
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
        this.setState({
            loading: true,
        });
        var pfChartData = [["Task","Hours per Day"],["Bad",0],["Ok",0],["Good",0]];
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
                }
                this.setState({
                    loading: false,
                    pf_answer_data: data
                })
            }
        );
        return pfChartData;
    }

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

    buildMonths(){
        var currentmonth = getMonth();
        var currentyear = getYear();
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
        if(this.state.year === currentyear){
            for (var i=currentmonth; i < 12; i++) {
                m.splice(i);
            }
        }
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

    render() {
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
                                {this.state.clientChartData[0] && this.state.client_answer_data[0] ? (
                                    <SummaryChart answer_data={this.state.client_answer_data} data={this.state.clientChartData} projectid={this.state.projectid} month={this.state.month} year={this.state.year} groupid={1} />
                                ) : (
                                    <div>
                                        <RaisedButton label="View Details" primary={true} fullWidth={true} disabled={true}/>
                                        {parseInt(this.state.userdata.groupid,10) === 1 ? (
                                            <NavLink activeClassName="selected" to={'/survey/' + this.state.projectid + '/1/' + this.state.month + '/' + this.state.year}><RaisedButton secondary={true} label="Take Survey" fullWidth={true}/></NavLink>
                                        ) : (
                                            <RaisedButton label="Take Survey" primary={true} fullWidth={true} disabled={true}/>
                                        )}
                                        <RaisedButton label="Edit Survey" primary={true} fullWidth={true} disabled={true}/>
                                    </div>
                                )}
                            </td>
                            <td width="10">&nbsp;</td>
                            <td align="center" width="50%">
                                {this.state.pfChartData[0] && this.state.pf_answer_data[0] ? (
                                    <SummaryChart answer_data={this.state.pf_answer_data} data={this.state.pfChartData} projectid={this.state.projectid} month={this.state.month} year={this.state.year} groupid={2}  />
                                ) : (
                                    <div>
                                        <RaisedButton label="View Details" primary={true} fullWidth={true} disabled={true}/>
                                        {parseInt(this.state.userdata.groupid,10) === 2 ? (
                                            <NavLink activeClassName="selected" to={'/survey/' + this.state.projectid + '/2/' + this.state.month + '/' + this.state.year}><RaisedButton secondary={true} label="Take Survey" fullWidth={true}/></NavLink>
                                        ) : (
                                            <RaisedButton label="Take Survey" primary={true} fullWidth={true} disabled={true}/>
                                        )}
                                        <RaisedButton label="Edit Survey" primary={true} fullWidth={true} disabled={true}/>
                                    </div>
                                )}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

export default Summary;
