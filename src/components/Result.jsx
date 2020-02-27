import React from "react";
import PropTypes from "prop-types";
// import { CSSTransitionGroup } from "react-transition-group";

function Result(props) {
  return (
    <div className="container result">
      Результат: {"  "} <strong>{props.quizResult} / {props.total}</strong>
    </div>
  );
}

Result.propTypes = {
  quizResult: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired
};

export default Result;
