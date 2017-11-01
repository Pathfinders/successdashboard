import React, { Component } from 'react';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Navigation from './components/navigation';
import LoginForm from './components/loginForm';
import RequirementTable from './components/requirementTable';
import ProjectList from './components/projectList';

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

const Main = () => (
    <div>
        <MuiThemeProvider muiTheme={pfTheme}>
            <Navigation />
        </MuiThemeProvider>
        <MuiThemeProvider muiTheme={pfTheme}>
            <LoginForm />
        </MuiThemeProvider>
        <MuiThemeProvider muiTheme={pfTheme}>
            <RequirementTable />
        </MuiThemeProvider>
        <MuiThemeProvider muiTheme={pfTheme}>
            <ProjectList />
        </MuiThemeProvider>
    </div>
);

export default Main;
