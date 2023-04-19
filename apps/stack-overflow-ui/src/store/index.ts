import { configureStore } from "@reduxjs/toolkit";
import UserReducer from "../features/user.slice";
import QuestionReducer from "../features/question.slice";

export default configureStore({
  reducer: {
    user: UserReducer,
    questions: QuestionReducer,
  },
  devTools: true,
});
