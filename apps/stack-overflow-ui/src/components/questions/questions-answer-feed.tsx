import React, { useEffect, useState } from "react";
import QuoraBox from "./overflow-box";
import "./css/Feed.css";

import Question from "./question";
import axios from "axios";
import { fetchQuestions, fetchQuestionsById, questionsSelector, selectedQuestionSelector } from "../../features/question.slice";
import { useDispatch, useSelector } from "react-redux";
import { fetchQuestionsAnswers } from "../../features/answer.slice";

function QuestionAnswerFeed({id }: any) {
  const dispatch = useDispatch();
  const question = useSelector(selectedQuestionSelector);

  useEffect(() => {
    dispatch(fetchQuestionsById(id))
  }, [dispatch]);
  return (
    <div className="feed">
      <QuoraBox />
        <Question  post={question} />
    </div>
  );
}

export default QuestionAnswerFeed;
