import React, { useEffect } from "react";
import { logout, selectUser } from "../../features/user.slice";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../../firebase";
import { signOut } from "firebase/auth";
import { BrowserRouter, Routes, Route, Navigate, Link, useNavigate, useParams } from "react-router-dom";
import { fetchQuestions, fetchQuestionsById } from "../../features/question.slice";
import OverflowHeader from "./overflow-header";
import Sidebar from "./sidebar";
import QuestionFeed from "./questions-feed";
import Widget from "./widget";
import "./css/Overflow.css";
import QuestionAnswerFeed from "./questions-answer-feed";


function Overflow(){

  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div className="overflow">
       <OverflowHeader />
       <div className="overflow__contents">
       <div className="overflow__content">
          <Sidebar />
          {!id ?  <QuestionFeed /> : <QuestionAnswerFeed id={id} />}
          <Widget />
        </div>
       </div>
    </div>
  )
}

export default Overflow;