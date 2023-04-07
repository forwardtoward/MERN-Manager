import { createSlice } from '@reduxjs/toolkit';

export const finance = createSlice({
  name: 'finance',
  initialState: {
    // Income
    isIncomeLoading: false,
    IncomeList: [],
    IncomeListSuccess: false,
    IncomeListFail: false,

    // Add Income
    incomeAddSuccess: false,
    incomeAddFail: false,
    resetAddIncomeStatus: false,

    // Income
    isExpenseLoading: false,
    ExpenseList: [],
    ExpenseListSuccess: false,
    ExpenseListFail: false,

    // Add Expense
    ExpenseAddSuccess: false,
    ExpenseAddFail: false,
    resetAddExpenseStatus: false,

    isCategoryLoading: false,
    categoryList: [],
    CategoryListSuccess: false,
    CategoryListFail: false,

    //INVOICE
    invoice: {}
  },

  reducers: {
    // fetching Income
    fetchIncome: (state, action) => {
      state.incomeList = action?.payload;
    },
    //addin Income
    addIncomeSuccess: (state, action) => {
      state.incomeAddSuccess = action?.payload;
    },
    addIncomeFail: (state, action) => {
      state.incomeAddFail = action?.payload;
    },
    fetchAllCategories: (state, action) => {
      state.categoryList = action?.payload;
    },
    resetAddIncomeStatus: (state, action) => {
      state.progressionAddSuccess = false;
      state.progressionAddFail = false;
    },
    // fetching Expense
    fetchExpense: (state, action) => {
      state.expenseList = action?.payload;
    },
    //addin Expense
    addExpenseSuccess: (state, action) => {
      state.expenseAddSuccess = action?.payload;
    },
    addExpenseFail: (state, action) => {
      state.expenseAddFail = action?.payload;
    },
    resetAddExpenseStatus: (state, action) => {
      state.progressionAddSuccess = false;
      state.progressionAddFail = false;
    }
  }
});

export const {
  // Income
  fetchIncome,
  addIncomeFail,
  addIncomeSuccess,
  resetAddIncomeStatus,
  fetchExpense,
  addExpenseFail,
  addExpenseSuccess,
  resetAddExpenseStatus,
  fetchAllCategories
} = finance.actions;

export default finance.reducer;
