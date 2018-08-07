import { createStore, combineReducers } from 'redux';
import uuid from 'uuid';

// Add_EXPENSE
const addExpense = ({
  description = '',
  notes = '',
  amount = 0,
  createdAt = 0
} = {}) => ({
  type: 'Add_EXPENSE',
  expense: {
    id: uuid(),
    description,
    notes,
    amount,
    createdAt
  }
});

// REMOVE_EXPENSE
const removeExpense = ({ id } = {}) => ({
  type: 'REMOVE_EXPENSE',
  id
});

// EDIT_EXPENSE
const editExpense = (id, expense) => ({
  type: 'EDIT_EXPENSE',
  id,
  expense
});

// ----------------------
// SET_TEXT_FILTER
const setTextFilter = (text = '') => ({ type: 'SET_TEXT_FILTER', text });

// SORT_BY_DATE
const sortByDate = () => ({ type: 'SORT_BY_DATE' });

// SORT_BY_AMOUNT
const sortByAmount = () => ({ type: 'SORT_BY_AMOUNT' });

// SET_START_DATE
const setStartDate = startDate => ({
  type: 'SET_START_DATE',
  startDate
});

// SET_END_DATE
const setEndDate = endDate => ({ type: 'SET_END_DATE', endDate });

// Expenses Reducer

const expensesReducerDefaultState = [];
const expensesReducer = (state = expensesReducerDefaultState, action) => {
  switch (action.type) {
    case 'Add_EXPENSE':
      return [...state, action.expense];
    case 'REMOVE_EXPENSE':
      return state.filter(({ id }) => id !== action.id);
    case 'EDIT_EXPENSE':
      return state.map(
        expense =>
          expense.id === action.id ? { ...expense, ...action.expense } : expense
      );
    default:
      return state;
  }
};

// Filters Reducer

const filtersReducerDefaultState = {
  text: '',
  sortBy: 'date', // date or amount
  startDate: undefined,
  endDate: undefined
};
const filtersReducer = (state = filtersReducerDefaultState, action) => {
  switch (action.type) {
    case 'SET_TEXT_FILTER':
      return { ...state, text: action.text };
    case 'SORT_BY_DATE':
      return { ...state, sortBy: 'date' };
    case 'SORT_BY_AMOUNT':
      return { ...state, sortBy: 'amount' };
    case 'SET_START_DATE':
      return { ...state, startDate: action.startDate };
    case 'SET_END_DATE':
      return { ...state, endDate: action.endDate };
    default:
      return state;
  }
};

// Get visible expenses
const getVisibleExpenses = (expenses, { text, sortBy, startDate, endDate }) => {
  return expenses
    .filter(expense => {
      return (
        (!text ||
          expense.description.toLowerCase().includes(text.toLowerCase())) &&
        (!startDate || expense.createdAt >= startDate) &&
        (!endDate || expense.createdAt <= endDate)
      );
    })
    .sort((a, b) => {
      if (!sortBy) {
        return 0;
      }

      if (sortBy === 'date') {
        return a.createdAt < b.createdAt ? 1 : -1;
      } else if (sortBy === 'amount') {
        return a.amount < b.amount ? 1 : -1;
      }

      return 0;
    });
};

// Store creation

const store = createStore(
  combineReducers({
    expenses: expensesReducer,
    filters: filtersReducer
  })
);

store.subscribe(() => {
  const { expenses, filters } = store.getState();
  const visibleExpenses = getVisibleExpenses(expenses, filters);
  console.log(visibleExpenses);
});

const expenseTwo = store.dispatch(
  addExpense({
    description: 'Coffee',
    notes: 'Morning caffee',
    amount: 100,
    createdAt: 126
  })
);

const expenseOne = store.dispatch(
  addExpense({
    description: 'January Rent',
    notes: 'This was the final payment for that address',
    amount: 54500,
    createdAt: 100
  })
);

// store.dispatch(removeExpense(expenseOne.expense));

// store.dispatch(
//   editExpense(expenseTwo.expense.id, {
//     description: 'Caffee (iced)',
//     amount: 150
//   })
// );

// store.dispatch(setTextFilter('ee'));
// store.dispatch(setTextFilter());

store.dispatch(sortByAmount());
// store.dispatch(sortByDate());

// store.dispatch(setStartDate(90));
// store.dispatch(setStartDate());
// store.dispatch(setEndDate(126));

// const demoState = {
//   expenses: [
//     {
//       id: 'jhg342jh3g42jh3gv2j',
//       description: 'January Rent',
//       note: 'This was the final payment for that address',
//       amount: 54500,
//       createdAt: 0
//     }
//   ],
//   filters: {
//     text: 'rent',
//     sortBy: 'amount', // date or amount
//     startDate: null,
//     endDate: null
//   }
// };

// const user = {
//   name: 'Ahmed',
//   age: 28
// };

// console.log({
//   ...user,
//   city: 'Cairo',
//   age: 35
// });
