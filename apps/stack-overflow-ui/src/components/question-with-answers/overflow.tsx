import React, { useEffect } from "react";
import { logout, selectUser } from "../../features/user.slice";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../../firebase";
import { signOut } from "firebase/auth";
import { BrowserRouter, Routes, Route, Navigate, Link, useNavigate } from "react-router-dom";
import { fetchQuestions, fetchQuestionsById } from "../../features/question.slice";


function Overflow(){

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchQuestions())
    dispatch(fetchQuestionsById('a2cf4c60-0605-485c-aeb8-b84171771cca'))
    
  }, [dispatch])

  const handleLogout = () => {
      signOut(auth)
        .then(() => {
          dispatch(logout());
          navigate("/login");
          console.log("Logged out");
        })
        .catch(() => {
          console.log("error in logout");
        });
    
  };
  const user = useSelector(selectUser);

  return (
    <div>
        <h1>{JSON.stringify(user)}</h1>
        <button onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default Overflow;