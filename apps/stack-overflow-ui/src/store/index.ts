import { configureStore } from "@reduxjs/toolkit";
import UserReducer from "../features/user.slice";
import QuestionReducer from "../features/question.slice";
import AnswerReducer from "../features/answer.slice";

export default configureStore({
  reducer: {
    user: UserReducer,
    questions: QuestionReducer,
    answer: AnswerReducer
  },
  devTools: true,
});
