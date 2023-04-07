import { customInterIceptors } from '../../../lib/AxiosProvider';

const API = customInterIceptors();

export const addGoals = (type,payload) => {
  return API.post('user-goal/add_goalcreategoal/'+type, payload);
};
export const addActionPlan = (id,payload) => {
  return API.post('action-plans/add_goal_actionPlan/'+id,payload);
};
export const addSubGoals = (parentId,type,payload) => {
  return API.post('user-goal/add_goalcreategoal/'+type+"?parentId="+parentId, payload);
};
export const fetchGoals = (id) => {
  return API.get('user-goal/all_goals/'+id);
};
export const fetchSubGoals = (id) => {
  return API.get('user-goal/goals_By_parengoalId/'+id);
};
export const fetchActionPlan = (id) => {
  return API.get('action-plans/add_goal_actionPlan/'+id);
};

export const deleteGoals = (id) => {
  return API.delete('user-goal/remove_goal/'+id);
};
export const editGoals = (payload,id) => {
  return API.put('user-goal/update_goal_subgoal/' + id,payload);
};

// //categories
// export const fetchGoalsCategories = () => {
//   return API.get('/category/categoryDetails');
// };
// export const addGoalsCategories = (categoriesData) => {
//   return API.post('category/addCategory/' + categoriesData.id, categoriesData);
// };

// export const fetchGoalsCategoriesRank = (name) => {
//   return API.get('rank-category/category_rank_info/' + name);
// };
// export const addGoalsCategoriesRank = (formdata) => {
//   return API.post('rank-category/add_category_rank', formdata);
// };
