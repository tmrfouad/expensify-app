import uuid from 'uuid';
import database from '../firebase/firebase';

// Add_EXPENSE
export const addExpense = expense => ({
  type: 'Add_EXPENSE',
  expense
});

export const startAddExpense = (expenseData = {}) => {
  return dispatch => {
    const {
      description = '',
      notes = '',
      amount = 0,
      createdAt = 0
    } = expenseData;

    const expense = {
      description,
      notes,
      amount,
      createdAt
    };

    return database
      .ref('expenses')
      .push(expense)
      .then(ref => {
        dispatch(addExpense({ id: ref.key, ...expense }));
      })
      .catch(() => {});
  };
};

// REMOVE_EXPENSE
export const removeExpense = ({ id } = {}) => ({
  type: 'REMOVE_EXPENSE',
  id
});

// EDIT_EXPENSE
export const editExpense = ({ id } = {}, expense) => ({
  type: 'EDIT_EXPENSE',
  id,
  expense
});

// SET_EXPENSES
export const setExpenses = expenses => ({ type: 'SET_EXPENSES', expenses });

export const startSetExpenses = () => {
  return dispatch => {
    return database.ref('expenses').once('value', snap => {
      const expenses = [];
      snap.forEach(childSnap => {
        expenses.push({
          id: childSnap.key,
          ...childSnap.val()
        });
      });
      dispatch(setExpenses(expenses));
    });
  };
};
