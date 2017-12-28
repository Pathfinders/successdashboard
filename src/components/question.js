import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
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
            userid: props.userid,
            projectid: props.projectid,
            projectData: props.projectData,
            groupid: props.groupid,
            month: props.month,
            year: props.year,
            question_data: [],
            answer_data: []
        };
    }

    componentWillMount() {

    }

    componentDidMount() {
        this.loadQuestions(this.state.projectid,this.state.groupid);
        this.loadAnswers(this.state.projectid, this.state.month, this.state.year, this.state.groupid, this.state.userid);
    }

    loadQuestions(p,g) {
        fetch("http://www.successdashboard.com.php7-34.lan3-1.websitetestlink.com/api/question/readquestions.php?projectid=" + p + "&groupid=" + g).then(function (response) {
            // Convert to JSON
            return response.json();
        }).then(data => {
            this.setState({
                question_data: data.questions
            });
        });
    }

    loadAnswers(p, m, y, g, u) {
        fetch("http://www.successdashboard.com.php7-34.lan3-1.websitetestlink.com/api/entries/tallyentries.php?projectid=" + p + "&monthfor=" + m + "&yearfor=" + y + "&groupid=" + g).then(function (response) {
            // Convert to JSON
            return response.json();
        }).then(data => {
            var user_answer_data = [];
            for (var i = 0; i < data.length; i++) {
                if (data[i].userid === u) {
                    user_answer_data.push(data[i]);
                }
            };
            this.setState({
                answer_data: user_answer_data
            });
        });
    }

    entryExists(q, m, y, u) {
        var results = fetch("http://www.successdashboard.com.php7-34.lan3-1.websitetestlink.com/api/entries/check.php?quesid=" + q + "&monthfor=" + m + "&yearfor=" + y + "&userid=" + u).then(function (response) {
            // Convert to JSON
            return response.json();
        }).then(data => {
            return data;
        });
        return results;
    }

    updateEntry(q, m, y, u, r, c) {
        fetch("http://www.successdashboard.com.php7-34.lan3-1.websitetestlink.com/api/entries/update.php?quesid=" + q + "&monthfor=" + m + "&yearfor=" + y + "&userid=" + u + "&ratingid=" + r + "&comment=" + c).then(function (response) {
            // Convert to JSON
            return response.json();
        }).then(data => {
            return data;
        });
    }

    createEntry(p, q, m, y, u, r, c) {
        fetch("http://www.successdashboard.com.php7-34.lan3-1.websitetestlink.com/api/entries/create.php?projectid=" + p + "&quesid=" + q + "&monthfor=" + m + "&yearfor=" + y + "&userid=" + u + "&ratingid=" + r + "&comment=" + c).then(function (response) {
            // Convert to JSON
            return response.json();
        }).then(data => {
            return data;
        });
    }

    radioChange(e,v){
        var val = v.split("-");
        if(val[0]){
            // Create
            this.createEntry(this.state.projectid, val[1], this.state.month, this.state.year, this.state.userid, val[0], 'test')
        }else{
            // Update
            this.updateEntry(val[1], this.state.month, this.state.year, this.state.userid, val[0], 'test')
        }
    }

    findAnswer(arr, val) {
        for (var i = 0; i < arr.length; i++) {
            if (arr[i].quesid === val) {
                return arr[i];
            }
        }
    }

    render(){
        if(this.state.question_data){
            var questions = this.state.question_data.map((question, index) => {
                var answer = {};
                if(this.state.answer_data){
                    answer = this.findAnswer(this.state.answer_data,question.quesid);
                }
                if(!answer){
                    return false;
                }
                return (
                    <Paper style={paperstyle} zDepth={2} key={index} ><p style={radiostyle}>{question.question}</p>
                        <Divider />
                        <div style={radiostyle}>
                            <RadioButtonGroup onChange={this.radioChange.bind(this)} name={"grade-" + index} defaultSelected={answer ? (answer.ratingid + "-" + question.quesid) : ""}>
                                <RadioButton
                                value={"1-" + question.quesid}
                                label="Bad"
                                />
                                <RadioButton
                                value={"2-" + question.quesid}
                                label="Ok"
                                />
                                <RadioButton
                                value={"3-" + question.quesid}
                                label="Good"
                                />
                            </RadioButtonGroup>
                            <div><TextField fullWidth={true} floatingLabelText="Additional Comments" name="comment" type="text" defaultValue={answer ? answer.comment : ""} /><br/></div>
                        </div>
                    </Paper>
                );
            });
            return questions;
        }
    }
}

export default Question;
