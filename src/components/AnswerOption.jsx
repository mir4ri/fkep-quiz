import React from 'react';
import PropTypes from "prop-types";

function AnswerOption(props) {
  return (
    <div className="answerOption">
      <input
        type="radio"
        className="radioCustomButton"
        name="radioGroup"
        checked={props.id_Question === props.answer}
        id={props.answer}
        value={props.answer}
        onChange={props.onAnswerSelected}
      />
      <label className="radioCustomLabel" htmlFor={props.answer}>
        {props.answer}
      </label>
    </div>
  )
}

AnswerOption.propTypes = {
  answer: PropTypes.string.isRequired,
  onAnswerSelected: PropTypes.func.isRequired
}

export default AnswerOption;