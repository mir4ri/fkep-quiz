import React, { Component } from 'react';
import Quiz from "./components/Quiz";
import Result from "./components/Result";
import data from "./api/data"
import './App.css';



class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      counter: 0,
      question: "",
      questionId: 1,
      result: "",
      answers: [],
      answer: "",
      answersCount: [],
      isLoading: false,
    }
    this.handleAnswerSelected = this.handleAnswerSelected.bind(this);
  }


  componentDidMount() {
    // this.setState({ isLoading: true});
    // var request = new Request("http://localhost:8080/getTest");
    // fetch(request)
    //   .then(function(response) {
    //     return response.json();
    //   })
    //   .then(quiz => {
    //     this.setState({ data: quiz, isLoading: false });
    //   })
    //   .catch(console.log);

    const AnswerOptions = data.map(question =>
      this.shuffleArray(question.answers) 
    );
    this.setState({
      question: data[0].question,
      answers: AnswerOptions[0]
    });
  }

  handleAnswerSelected(event) {
    this.setUserAnswer(event.currentTarget.value);

    if (this.state.questionId < data.length) {
      setTimeout(() => this.setNextQuestion(), 300);
    } else {
      setTimeout(() => this.setResults(this.getResults()), 300);
    }
  }

  setUserAnswer(answer) {
    this.setState((state, props) => ({
      answersCount: this.state.answersCount.concat(answer)
    }));
  }

  getResults() {
    const answersCount = this.state.answersCount;

    return answersCount;
  }

  setResults(result) {
    if (result.length) {
      fetch('http://localhost:8080/getResult', {
                method: 'POST',
                headers : new Headers(),
                body:JSON.stringify({"answers": this.state.answersCount})
            }).then((res) => res.json())
            .then((data) => this.setState({ result: data }))
            .catch((err)=>console.log(err))
    } else {
      this.setState({ result: "Err" });
    }
  }

  setNextQuestion() {
    const counter = this.state.counter + 1;
    const questionId = this.state.questionId + 1;

    this.setState({
      counter: counter,
      questionId: questionId,
      question: data[counter].question,
      answers: data[counter].answers,
      answer: ""
    });
  }

  shuffleArray(array) {
    var currentIndex = array.length,
      temporaryValue,
      randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

  renderQuiz() {

    const { question, answers,questionId, isLoading } = this.state;

    if (isLoading) {
      return <p>isLoading ...</p>
    }
    return (
      <Quiz
        question={question}
        answers={answers}
        questionId={questionId}
        dataTotal={data.length}
        onAnswerSelected={this.handleAnswerSelected}
      />
    )
  }

  renderResult() {
    return <Result quizResult={this.state.result} total={this.state.questionId} />
  }

  render() {
    return (
      <div className="App">
        <div className="bg-container">
          <div className="bg-gradient"></div>
          {this.state.result ? this.renderResult() : this.renderQuiz()}
        </div>
      </div>
    );
  }
}

export default App;
