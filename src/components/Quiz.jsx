import React from 'react';
import AnswerOption from "./AnswerOption"
import QuestionCount from './QuestionCounter';
import Question from './Question';

export default function (props) {
  const { question, answers } = props;
  function renderAnswerOptions(key) {
    return (
      <AnswerOption
        key={key.answer}
        answer={key.answer}
        questionId={props.questionId}
        onAnswerSelected={props.onAnswerSelected}
      />
    );
  }
 
  return (
    <div key={props.questionId}>
      <QuestionCount counter={props.questionId} total={props.dataTotal}  />
      <Question question={question} />
      <div className="answerOptions">
      {answers.map(renderAnswerOptions)}  
      </div>
     
    </div>
  );
}



