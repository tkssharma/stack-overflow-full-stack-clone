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

export const fetchQuestions = createAsyncThunk("fetch/Questions", async (tags?: string) => {
  const url = tags ? `/questions?tags=${tags}&page=1&limit=1000` : `/questions?page=1&limit=1000`
  const response = await axios.get(url);
  return response.data.questions;
});

export const createQuestion = createAsyncThunk("fetch/CreateQuestions",
  async (payload: any, { getState }: any) => {
    const state = getState() as any;
    const access_token = state?.user?.user?.access_token;
    const response = await axios.post(`/questions`, payload, {
      headers: {
        Authorization: `Bearer ${access_token}`
      }
    });
    return response.data;
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
    data: {},
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
        data: {},
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
        data: {},
        error: action.payload,
      };
    },
    [createQuestion.pending.type]: (state: QuestionsState, action) => {
      return state;
    },
    [createQuestion.fulfilled.type]: (state: QuestionsState, action) => {
      console.log(action);
      state.question.data.push(action.payload)
    },
    [createQuestion.rejected.type]: (state: QuestionsState, action) => {
      return state;
    },


  },
});


export const questionsSelector = (state: any) => state.questions.question.data;
export const selectedQuestionSelector = (state: any) => state.questions.selectedQuestion.data;
export default QuestionSlice.reducer;
