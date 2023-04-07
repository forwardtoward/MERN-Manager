import { createSlice } from '@reduxjs/toolkit';

export const goals = createSlice({
  name: 'goals',
  initialState: {
    // goals
    // isgoalsLoading: false,
    goalsList: [],
    subGoalsList:[],
    actionPlanList:[],

    goalsListSuccess: false,
    goalsListFail: false,
    // Add goals
    goalsAddSuccess: false,
    goalsAddFail: false,
    // Edit goals
    goalsEditSuccess: false,
    goalsEditFail: false,
    // Delete goals
    goalsDeleteSuccess: false,
    goalsDeleteFail: false

    // //goalsCategories
    // goalsCategories: [],
    // goalsCategoriesAddSuccess: false,
    // goalsCategoriesAddFail: false,
    // //
    // goalsCategoriesRank: [],
    // goalsCategoriesRankAddSuccess: false,
    // goalsCategoriesRankAddFail: false
  },
  reducers: {
    // fetching goals
    fetchGoals: (state, action) => {
      state.goalsList = action?.payload;
    },
    fetchSubGoals: (state, action) => {
      state.subGoalsList = action?.payload;
    },
    fetchActionPlan: (state, action) => {
      state.actionPlanList = action?.payload;
    },
    resetGoals:(state)=>{
      state.goalsList=[];
    },
    resetSubGoals:(state)=>{
      state.subGoalsList=[];
    },
    resetActionPlan:(state)=>{
      state.actionPlanList=[];
    },
    fetchGoalsSuccess: (state, action) => {
      state.goalsListSuccess = action?.payload;
    },
    fetchGoalsFail: (state, action) => {
      state.goalsListFail = action?.payload;
    },
    fetchGoalsStatusReset: (state, action) => {
      state.goalsListSuccess = false;
      state.goalsListSuccess = false;
    },

    //addin goals

    addGoalsSuccess: (state, action) => {
      state.goalsAddSuccess = action?.payload;
    },
    addGoalsFail: (state, action) => {
      state.goalsAddFail = action?.payload;
    },
    resetAddGoalsStatus: (state, action) => {
      state.goalsAddSuccess = false;
      state.goalsAddFail = false;
    },
    editGoalsSuccess: (state, action) => {
      state.goalsEditSuccess = action?.payload;
    },
    editGoalsFail: (state, action) => {
      state.goalsEditFail = action?.payload;
    },
    resetEditGoalsStatus: (state) => {
      state.goalsEditSuccess = false;
      state.goalsEditFail = false;
    },
    deleteGoalsSuccess: (state) => {
      state.goalsDeleteSuccess = true;
    },
    deleteGoalsFail: (state) => {
      state.goalsDeleteFail = true;
    },
    resetDeleteGoalsStatus: (state, action) => {
      state.goalsDeleteSuccess = false;
      state.goalsDeleteFail = false;
    }
    // //delete goals
    // deletegoalsSuccess: (state, action) => {
    //   state.goalsDeleteSuccess = action?.payload;
    // },
    // deletegoalsFail: (state, action) => {
    //   state.goalsDeleteFail = action?.payload;
    // },
    // resetDeletegoalsStatus: (state) => {
    //   state.goalsDeleteSuccess = false;
    //   state.goalsDeleteFail = false;
    // },

    // // fetch goals CAtegories
    // fetchgoalsCategories: (state, action) => {
    //   state.goalsCategories = action?.payload;
    // },
    // fetchgoalsCategoriesSuccess: (state, action) => {
    //   state.goalsCategoriesAddSuccess = action?.payload;
    // },
    // fetchgoalsCategoriesFail: (state, action) => {
    //   state.goalsCategoriesAddFail = action?.payload;
    // },
    // resetFetchgoalsCategories: (state) => {
    //   state.goalsCategoriesAddFail = false;
    //   state.goalsCategoriesAddSuccess = false;
    // },
    // //fetch rank
    // fetchgoalsCategoriesRank: (state, action) => {
    //   state.goalsCategoriesRank = action?.payload;
    // },
    // fetchgoalsCategoriesRankSuccess: (state, action) => {
    //   state.goalsCategoriesRankAddSuccess = action?.payload;
    // },
    // fetchgoalsCategoriesRankFail: (state, action) => {
    //   state.goalsCategoriesRankAddFail = action?.payload;
    // }
  }
});

export const {
  // goals
  fetchGoals,
  fetchSubGoals,
  fetchActionPlan,
  resetSubGoals,
  resetGoals,
  resetActionPlan,
  fetchGoalsFail,
  fetchGoalsSuccess,
  fetchGoalsStatusReset,
  addGoalsFail,
  addGoalsSuccess,
  resetAddGoalsStatus,
  editGoalsFail,
  editGoalsSuccess,
  resetEditGoalsStatus,
  deleteGoalsFail,
  deleteGoalsSuccess,
  resetDeleteGoalsStatus
  // //categories
  // fetchgoalsCategories,
  // fetchgoalsCategoriesSuccess,
  // fetchgoalsCategoriesFail,
  // resetFetchgoalsCategories,
  // //categories rank
  // fetchgoalsCategoriesRank,
  // fetchgoalsCategoriesRankSuccess,
  // fetchgoalsCategoriesRankFail
} = goals.actions;

export default goals.reducer;
