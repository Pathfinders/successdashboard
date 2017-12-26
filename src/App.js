import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Navigation from './components/navigation';
import LoginForm from './components/loginForm';
import RequirementTable from './components/requirementTable';
import Summary from './components/summary';
import ProjectList from './components/projectList';
import Survey from './components/survey';
import { pfColors } from './js/global';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';

// Customize colors for our application

const pfTheme = getMuiTheme({
    palette: {
        primary1Color: pfColors["orange"],
        primary2Color: pfColors["dkgreen"],
        primary3Color: pfColors["grey"],
        accent1Color: pfColors["red"],
        accent2Color: pfColors["ltblue"],
        accent3Color: pfColors["grey"],
        textColor: pfColors["black"],
        alternateTextColor: pfColors["white"],
        canvasColor: pfColors["white"],
        borderColor: pfColors["grey"],
        disabledColor: pfColors["grey"],
        pickerHeaderColor: pfColors["ltgreen"],
        clockCircleColor: pfColors["black"],
        shadowColor: pfColors["black"],
    }
});

// Render the DOM
class Main extends Component {
    render(){
        return (
            <div>
                <MuiThemeProvider muiTheme={pfTheme}>
                    <Router>
                        <div>
                            <Navigation />
                            <Route exact path='/' component={LoginForm} />
                            <Route path='/requirements/:project/:group/:monthfor/:yearfor' component={RequirementTable} />
                            <Route path='/survey/:project/:group' component={Survey} />
                            <Route path='/projects' component={ProjectList} />
                            <Route path='/summary/:project/:monthfor/:yearfor' component={Summary} />
                        </div>
                    </Router>
                </MuiThemeProvider>
            </div>
        )
    }
}

export default Main;
