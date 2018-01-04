import React, { Component } from 'react';
import Question from '../components/question';

class Questions extends Component {
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
                if(this.state.answer_data[index]){
                    answer = this.findAnswer(this.state.answer_data,question.quesid);
                    if(!answer){
                        return false;
                    }
                }
                return (
                    <Question key={index} question={question} answer={answer} month={this.state.month} year={this.state.year} userid={this.state.userid} />
                );
            });
            return questions;
        }
    }
}

export default Questions;
