import React, { Component } from 'react';
import { getCookie } from '../js/global';
import { Chart } from 'react-google-charts';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';

class Summary extends Component {
    constructor() {
        super();
        this.state = {
            loggedIn: false,
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
            <div className="wrapper">
                <h1>Summary</h1>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi iaculis eleifend ligula, venenatis molestie mi sagittis sed. Suspendisse nec metus vitae odio vulputate viverra ac aliquam justo. Pellentesque non justo imperdiet, pretium ligula non, accumsan risus. Nam vestibulum vestibulum metus, sit amet volutpat dui porttitor sed. Quisque dolor ligula, lobortis ultricies sem sed, faucibus congue libero. Maecenas egestas congue odio at dapibus. Maecenas a cursus sapien.</p>
                <table width="100%">
                    <tr>
                        <td align="center" width="50%">
                            <Paper style={style} zDepth={2} >
                            <h2>Client</h2>
                                <Divider />
                                <Chart
                                    chartType="PieChart"
                                    width="100%"
                                    data={[["Task","Hours per Day"],["Bad",6],["Ok",2],["Good",13]]}
                                    options={pieOptions}
                                />
                            </Paper>
                        </td>
                        <td align="center" width="50%">
                            <Paper style={style} zDepth={2} >
                                <h2>Pathfinders</h2>
                                <Divider />
                                <Chart
                                    chartType="PieChart"
                                    width="100%"
                                    data={[["Task","Hours per Day"],["Bad",4],["Ok",4],["Good",6]]}
                                    options={pieOptions}
                                />
                            </Paper>
                        </td>
                    </tr>
                </table>
            </div>
        );
    }
}

export default Summary;
