import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Routes, Route, Navigate, Link, useNavigate } from "react-router-dom";
import Questions from "./components/questions/overflow";
import QuestionWithAnswers from "./components/question-with-answers/overflow";

import Login from "./components/auth/login";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import { login } from "./features/user.slice";

function App() {
  const dispatch =  useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, async (authUser) => {
      if(authUser) {
        dispatch(login({
          userName: authUser.displayName,
          access_token: await authUser.getIdToken(),
          photo: authUser.photoURL,
          email: authUser.email,
          uid: authUser.uid
        }))
      }
      navigate("/")
    })
  }, [dispatch])

  return (
      <div>
        <Routes>
           <Route path="/" element={<Questions />} />
           <Route path="/:id" element={<QuestionWithAnswers />} />
           <Route path="/login" element={<Login />} />
        </Routes>
      </div>
  );
}

export default App;
