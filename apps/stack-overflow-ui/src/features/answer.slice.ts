import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export interface Answer {
  status: "idle" | "pending" | "rejected";
  data: any;
  error: any;
}

interface QuestionsAnswerState {
  answers: Answer;
}

export const fetchQuestionsAnswers = createAsyncThunk(
  "fetch/QuestionsAnswers",
  async (id: string) => {
    axios
      .get(`/questions/${id}/answers`)
      .then((res) => res.data)
      .catch((error) => error);
  }
);
export const updateAnswersVotes = createAsyncThunk(
  "fetch/QuestionsAnswers",
  async ({ questionId, answerId, vote }: { questionId: string, answerId: string, vote: boolean }, { getState }) => {
    const state = getState() as any;
    const access_token = state?.user?.user?.access_token;
    const url = `/questions/${questionId}/answers/${answerId}?${vote ? `action_type=upvote` : `action_type=downvote`}`
    const response = await axios.put(url, {}, {
      headers: {
        Authorization: `Bearer ${access_token}`
      }
    });
    return response.data.questions;
  }
);



const initialState = {
  answers: {
    status: "idle",
    data: [],
    error: null,
  },
} as QuestionsAnswerState;

export const QuestionAnswerSlice = createSlice({
  name: "answers",
  initialState: initialState,
  reducers: {},
  extraReducers: {
    [fetchQuestionsAnswers.pending.type]: (
      state: QuestionsAnswerState,
      action
    ) => {
      state.answers = {
        status: "pending",
        data: [],
        error: null,
      };
    },
    [fetchQuestionsAnswers.fulfilled.type]: (
      state: QuestionsAnswerState,
      action
    ) => {
      state.answers = {
        status: "idle",
        data: action.payload,
        error: null,
      };
    },
    [fetchQuestionsAnswers.rejected.type]: (
      state: QuestionsAnswerState,
      action
    ) => {
      state.answers = {
        status: "idle",
        data: [],
        error: action.payload,
      };
    },
  },
});

export const selectQuestions = (state: QuestionsAnswerState) =>
  state.answers.data;
export default QuestionAnswerSlice.reducer;
