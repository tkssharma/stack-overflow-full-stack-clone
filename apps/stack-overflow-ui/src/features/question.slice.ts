import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export interface Question {
  status: "idle" | "pending" | "rejected";
  data: any;
  error: any;
}

interface QuestionsState {
  question: Question;
  selectedQuestion: Question;
}

export const fetchQuestions = createAsyncThunk("fetch/Questions", async () => {
  const response = await axios.get(`/questions?page=1&limit=1000`);
  return response.data.questions;
});

export const fetchQuestionsById = createAsyncThunk(
  "fetch/QuestionAnswers",
  async (id: string) => {
    const response = await axios.get(`/questions/${id}`);
    return response.data;
  }
);

const initialState = {
  question: {
    status: "idle",
    data: [],
    error: null,
  },
  selectedQuestion: {
    status: "idle",
    data: [],
    error: null,
  },
} as QuestionsState;

export const QuestionSlice = createSlice({
  name: "questions",
  initialState: initialState,
  reducers: {},
  extraReducers: {
    [fetchQuestions.pending.type]: (state: QuestionsState, action) => {
      state.question = {
        status: "pending",
        data: [],
        error: null,
      };
    },
    [fetchQuestions.fulfilled.type]: (state: QuestionsState, action) => {
      console.log(action);
      state.question = {
        status: "idle",
        data: action.payload,
        error: null,
      };
    },
    [fetchQuestions.rejected.type]: (state: QuestionsState, action) => {
      state.question = {
        status: "idle",
        data: [],
        error: action.payload,
      };
    },
    [fetchQuestionsById.pending.type]: (state: QuestionsState, action) => {
      console.log(state);
      state.selectedQuestion = {
        status: "pending",
        data: [],
        error: null,
      };
    },
    [fetchQuestionsById.fulfilled.type]: (state: QuestionsState, action) => {
      console.log(state);
      console.log(action);
      state.selectedQuestion = {
        status: "idle",
        data: action.payload,
        error: null,
      };
    },
    [fetchQuestionsById.rejected.type]: (state: QuestionsState, action) => {
      state.selectedQuestion = {
        status: "idle",
        data: [],
        error: action.payload,
      };
    },
  },
});

export const questionsSelector = (state: any) => state.questions.question.data;
export default QuestionSlice.reducer;
