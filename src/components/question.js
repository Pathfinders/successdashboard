import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import { getMonth, getYear } from '../js/global';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import Divider from 'material-ui/Divider';
import TextField from 'material-ui/TextField';

const paperstyle = {
    padding: '.5em',
    marginTop: '2em'
};

const radiostyle = {
    marginTop: '.5em',
    marginBottom: '.5em'
};

class Question extends Component {
    constructor(props) {
        super(props);
        this.state = {
            question: props.question,
            answer: props.answer,
            exists: false,
            month: props.month,
            year: props.year,
            userid: props.userid,
        };
    }

    componentDidMount() {
        // Check if this has already been answered
        if(this.state.answer){
            this.entryExists(this.state.answer.quesid,this.state.answer.monthfor,this.state.answer.yearfor,this.state.answer.userid);
        }
    }

    entryExists(q, m, y, u) {
        var results = fetch("http://www.successdashboard.com.php7-34.lan3-1.websitetestlink.com/api/entries/check.php?quesid=" + q + "&monthfor=" + m + "&yearfor=" + y + "&userid=" + u).then(function (response) {
            if(response.status !== 200){
                return false;
            }
            // Convert to JSON
            return response.json();
        }).then(data => {
            this.setState({
                exists: data,
            })
        });
        return results;
    }

    updateEntry(q, m, y, u, r, c) {
        fetch("http://www.successdashboard.com.php7-34.lan3-1.websitetestlink.com/api/entries/update.php?quesid=" + q + "&monthfor=" + m + "&yearfor=" + y + "&userid=" + u + "&ratingid=" + r + "&comment=" + c).then(function (response) {
            if(response.status !== 200){
                return false;
            }
            // Convert to JSON
            return response.json();
        }).then(data => {
            return data;
        });
    }

    createEntry(p, q, m, y, u, r, c) {
        console.log("http://www.successdashboard.com.php7-34.lan3-1.websitetestlink.com/api/entries/create.php?projectid=" + p + "&quesid=" + q + "&monthfor=" + m + "&yearfor=" + y + "&userid=" + u + "&ratingid=" + r + "&comment=" + c);
        fetch("http://www.successdashboard.com.php7-34.lan3-1.websitetestlink.com/api/entries/create.php?projectid=" + p + "&quesid=" + q + "&monthfor=" + m + "&yearfor=" + y + "&userid=" + u + "&ratingid=" + r + "&comment=" + c).then(function (response) {
            if(response.status !== 200){
                return false;
            }
            // Convert to JSON
            return response.json();
        }).then(data => {
            return data;
        });
    }

    radioChange(e,v){
        var val = v.split("-");
        if(this.state.exists){
            // Update
            this.updateEntry(val[1], this.state.month, this.state.year, this.state.answer.userid, val[0], null)
        }else{
            // Create
            this.createEntry(this.state.question.projectid, val[1], this.state.month, this.state.year, this.state.userid, val[0], null)
        }
    }

    textChange(e,v){
        var val = e.target.name.split("-");
        var qid = val[1];
        if(this.state.exists){
            // Update
            this.updateEntry(val[1], this.state.month, this.state.year, this.state.answer.userid, null, v);
        }else{
            // Create
            this.createEntry(this.state.question.projectid, val[1], this.state.month, this.state.year, this.state.userid, null, v)
        }
    }

    render(){
        return (
            <Paper style={paperstyle} zDepth={2}><p style={radiostyle}>{this.state.question.question}</p>
                <Divider />
                <div style={radiostyle}>
                    <RadioButtonGroup onChange={this.radioChange.bind(this)} name={"grade-" + this.state.question.quesid} defaultSelected={this.state.answer ? (this.state.answer.ratingid + "-" + this.state.question.quesid) : ""}>
                        <RadioButton
                        value={"1-" + this.state.question.quesid}
                        label="Bad"
                        />
                        <RadioButton
                        value={"2-" + this.state.question.quesid}
                        label="Ok"
                        />
                        <RadioButton
                        value={"3-" + this.state.question.quesid}
                        label="Good"
                        />
                    </RadioButtonGroup>
                    <div><TextField onChange={this.textChange.bind(this)} fullWidth={true} name={"comment-" + this.state.question.quesid} floatingLabelText="Additional Comments" type="text" defaultValue={this.state.answer ? this.state.answer.comment : ""} /><br/></div>
                </div>
            </Paper>
        );
    }
}

export default Question;
