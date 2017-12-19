import React, { Component } from 'react';
import { getCookie, getProject, verification, user } from '../js/global';
import { Chart } from 'react-google-charts';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import RaisedButton from 'material-ui/RaisedButton';
import { NavLink } from 'react-router-dom';

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
            clientChartData: '',
            pfChartData: '',
            client_answer_data: '',
            pf_answer_data: ''
        };
    }

    componentDidMount() {
        this.loadClientAnswers();
        this.loadPFAnswers();
    }

    loadClientAnswers(){
        var clientChartData = [["Task","Hours per Day"],["Bad",0],["Ok",0],["Good",0]];
        this.setState({
            loading: true,
        });
        fetch("http://www.successdashboard.com.php7-34.lan3-1.websitetestlink.com/api/entries/tallyentries.php?projectid=" + this.state.projectid + "&monthfor=12&yearfor=2017&groupid=" + 1).then(
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
                }
                this.setState({
                    clientChartData: clientChartData,
                    loading: false,
                });
            }
        );
    }

    loadPFAnswers(){
        var pfChartData = [["Task","Hours per Day"],["Bad",0],["Ok",0],["Good",0]];
        this.setState({
            loading: true,
        });
        fetch("http://www.successdashboard.com.php7-34.lan3-1.websitetestlink.com/api/entries/tallyentries.php?projectid=" + this.state.projectid + "&monthfor=12&yearfor=2017&groupid=" + 2).then(
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
                    }
                }
                this.setState({
                    pfChartData: pfChartData,
                    loading: false,
                });
            }
        );
    }

    render() {
        const pieOptions = {
            title: '',
            pieHole: 0.4,
            slices: [{color: '#c64034'},{color: '#e87800'},{color: '#708043'}],
            pieSliceText: 'none',
            fontName: 'Roboto',
            legend: {
                position: 'bottom',
                alignment: 'center',
            },
        };
        const style = {
            padding: '1em',
            margin: '1em',
        };
        return (
            <div className="innertube">
                <h1>Summary</h1>
                <h3><NavLink activeClassName="selected" to={'/projects/'}>Projects</NavLink> / {this.state.projectData.projectname}</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi iaculis eleifend ligula, venenatis molestie mi sagittis sed. Suspendisse nec metus vitae odio vulputate viverra ac aliquam justo. Pellentesque non justo imperdiet, pretium ligula non, accumsan risus. Nam vestibulum vestibulum metus, sit amet volutpat dui porttitor sed. Quisque dolor ligula, lobortis ultricies sem sed, faucibus congue libero. Maecenas egestas congue odio at dapibus. Maecenas a cursus sapien.</p>
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
                                    <NavLink activeClassName="selected" to={'/requirements/' + this.state.projectid + '/1'}><RaisedButton label="View Details" secondary={false} fullWidth={true}/></NavLink>
                                </Paper>
                            </td>
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
                                    <NavLink activeClassName="selected" to={'/requirements/' + this.state.projectid + '/2'}><RaisedButton label="View Details" secondary={false} fullWidth={true}/></NavLink>
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
