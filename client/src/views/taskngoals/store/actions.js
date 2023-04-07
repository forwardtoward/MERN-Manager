import * as api from './api';
import {
  fetchGoals,
  resetGoals,
  fetchSubGoals,
  fetchActionPlan,
  resetActionPlan,
  deleteGoalsSuccess,
  deleteGoalsFail,
  resetDeleteGoalsStatus,
  addGoalsFail,
  addGoalsSuccess,
  resetAddGoalsStatus,
  editGoalsFail,
  editGoalsSuccess,
  resetEditGoalsStatus,
} from './reducer';
//parent goals
export const goalsFetchAction = (id,type) => async (dispatch) => {
  try {
    type==="reset"&&dispatch(resetGoals())
    const { data } = await api.fetchGoals(id);
    if(data?.success)
    {
      dispatch(fetchGoals(data.data));
    }
    else{
      dispatch(fetchGoals([]))
    }
    
  } catch (error) {}
};
export const subGoalsFetchAction = (id) => async (dispatch) => {
  try {

    const { data } = await api.fetchSubGoals(id);
    if(data?.success)
    {
      dispatch(fetchSubGoals(data.data));
    }
    else{
      dispatch(fetchSubGoals([]))
    }
    
  } catch (error) {}
};
export const actionPlanFetchAction = (id) => async (dispatch) => {
  try {
    dispatch(resetActionPlan())
    const { data } = await api.fetchActionPlan(id);
    if(data?.success)
    {
      dispatch(fetchActionPlan(data.data));
    }
    else{
      dispatch(fetchActionPlan([]))
    }
    
  } catch (error) {}
};
export const actionPlanAddAction = (id,workspaceId,payload) => async (dispatch) => {
  try {
    const { data } = await api.addActionPlan(id,payload);
    // if (data.success === true) {
    //   dispatch(addGoalsSuccess(true));
    // } else {
    //   dispatch(addGoalsFail(true));
    // }
    // dispatch(resetAddGoalsStatus());
    dispatch(goalsFetchAction(workspaceId));
  } catch (error) {}
};
export const goalsAddAction = (workSpaceId,type,payload) => async (dispatch) => {
  try {
    const { data } = await api.addGoals(type,payload);
    if (data.success === true) {
      dispatch(addGoalsSuccess(true));
    } else {
      dispatch(addGoalsFail(true));
    }
    dispatch(resetAddGoalsStatus());
    dispatch(goalsFetchAction(workSpaceId));
  } catch (error) {}
};
export const subGoalsAddAction = (parentId,workSpaceId,type,payload) => async (dispatch) => {
  try {
    const { data } = await api.addSubGoals(parentId,type,payload);
    if (data.success === true) {
      dispatch(addGoalsSuccess(true));
    } else {
      dispatch(addGoalsFail(true));
    }
    dispatch(resetAddGoalsStatus());
    dispatch(goalsFetchAction(workSpaceId));
    parentId&&dispatch(subGoalsFetchAction(parentId))
  } catch (error) {}
};
export const goalsEditAction = (id,workspaceId,payload) => async (dispatch) => {
  try {
    const { data } = await api.editGoals(payload,id);
    if (data.success === true) {
      dispatch(editGoalsSuccess(true));
    } else {
      dispatch(editGoalsFail(true));
    }
    dispatch(resetEditGoalsStatus())
    dispatch(goalsFetchAction(workspaceId));
  } catch (error) {}
};
export const goalsEditActionMuted = (id,payload) => async (dispatch) => {
  try {
    const { data } = await api.editGoals(payload,id);
    // if (data.success === true) {
    //   dispatch(editGoalsSuccess(true));
    // } else {
    //   dispatch(editGoalsFail(true));
    // }
    // dispatch(resetEditGoalsStatus())
    // dispatch(goalsFetchAction(workspaceId));
  } catch (error) {}
};
export const subGoalsEditAction = (id,payload,parentId) => async (dispatch) => {
  try {
    const { data } = await api.editGoals(payload,id);
    if (data.success === true) {
      dispatch(editGoalsSuccess(true));
    } else {
      dispatch(editGoalsFail(true));
    }
    dispatch(resetEditGoalsStatus())
    dispatch(subGoalsFetchAction(parentId));
  } catch (error) {}
};
export const goalsDeleteAction = (workspaceId,id) => async (dispatch) => {
  try {
    const { data } = await api.deleteGoals(id);
    if (data.success === true) {
      dispatch(deleteGoalsSuccess());
    } else {
      dispatch(deleteGoalsFail());
    }
    dispatch(resetDeleteGoalsStatus());
    dispatch(goalsFetchAction(workspaceId));
  } catch (error) {}
};
export const subGoalsDeleteAction = (id,parentId) => async (dispatch) => {
  try {
    const { data } = await api.deleteGoals(id);
    if (data.success === true) {
      dispatch(deleteGoalsSuccess());
    } else {
      dispatch(deleteGoalsFail());
    }
    dispatch(resetDeleteGoalsStatus());
    dispatch(subGoalsFetchAction(parentId));
  } catch (error) {}
};
