import React, { useEffect, useState } from "react";
import QuoraBox from "./overflow-box";
import "./css/Feed.css";
import Question from "./question";
import axios from "axios";
import { fetchQuestions, questionsSelector } from "../../features/question.slice";
import { useDispatch, useSelector } from "react-redux";

function QuestionFeed() {
  const dispatch = useDispatch();
  const questions = useSelector(questionsSelector);

  useEffect(() => {
    dispatch(fetchQuestions())
  }, [dispatch]);
  return (
    <div className="feed">
      <QuoraBox />
      {questions.map((question: any, index: number) => (
        <Question key={index} post={question} />
      ))}
    </div>
  );
}

export default QuestionFeed;
