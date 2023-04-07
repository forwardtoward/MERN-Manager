import * as api from './api';
import { toast } from 'react-toastify';
import {
  fetchIncome,
  addIncomeFail,
  addIncomeSuccess,
  resetAddIncomeStatus,
  fetchExpense,
  addExpenseFail,
  addExpenseSuccess,
  resetAddExpenseStatus,
  fetchAllCategories
} from './reducer';

//parent Income
export const IncomeFetchAction = () => async (dispatch) => {
  try {
    const { data } = await api.fetchIncome();
    dispatch(fetchIncome(data));
  } catch (error) {}
};

export const ExpenseFetchAction = () => async (dispatch) => {
  try {
    const { data } = await api.fetchExpense();
    dispatch(fetchExpense(data));
  } catch (error) {}
};

export const IncomeAddAction = (IncomeData) => async (dispatch) => {
  try {
    const { data } = await api.addIncome(IncomeData);
    dispatch(addIncomeSuccess(true));
    toast.success('Income created successfully');
    dispatch(resetAddIncomeStatus());
    dispatch(IncomeFetchAction());
  } catch (error) {}
};

export const ExpenseAddAction = (expenseData) => async (dispatch) => {
  try {
    const { data } = await api.addExpense(expenseData);
    dispatch(addExpenseSuccess(true));
    toast.success('Expense created successfully');
    dispatch(resetAddExpenseStatus());
    dispatch(ExpenseFetchAction());
  } catch (error) {}
};

export const TotalCategoriesAction = () => async (dispatch) => {
  try {
    const { data } = await api.fetchAllCategories();
    dispatch(fetchAllCategories(data));
  } catch (error) {}
};

export const addFinanceCategoryAction = (categoryData) => async (dispatch) => {
  try {
    const { data } = await api.addFinanceCategory(categoryData);
    toast.success("Add category successfully")
  } catch (error) {}
};

export const DeleteFinanceCategoryAction = (id) => async (dispatch) => {
  try {
    const { data } = await api.deleteFinanceCategory(id);
    toast.success(data.message)
  } catch (error) {}
}

export const UpdateFinanceCategoryAction = (updateData) => async (dispatch) => {
  try {
    const { data } = await api.updateFinanceCategory(updateData);
    toast.success(data.message);
    dispatch(fetchAllCategories(data.data))
  } catch (error) {}
}