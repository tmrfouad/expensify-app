import { createStore, combineReducers } from 'redux';
import uuid from 'uuid';

const expenses = [];

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
// SORT_BY_DATE
// SORT_BY_AMOUNT
// SET_START_DATE
// SET_END_DATE

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
  startDate: null,
  endDate: null
};
const filtersReducer = (state = filtersReducerDefaultState, action) => {
  switch (action.type) {
    case 'SET_TEXT_FILTER':
      return state;
    case 'SORT_BY_DATE':
      return state;
    case 'SORT_BY_AMOUNT':
      return state;
    case 'SET_START_DATE':
      return state;
    case 'SET_END_DATE':
      return state;
    default:
      return state;
  }
};

// Store creation

const store = createStore(
  combineReducers({
    expenses: expensesReducer,
    filters: filtersReducer
  })
);

store.subscribe(() => {
  console.log(store.getState());
});

expenses.push(
  store.dispatch(
    addExpense({
      description: 'January Rent',
      notes: 'This was the final payment for that address',
      amount: 54500,
      createdAt: 0
    })
  )
);

expenses.push(
  store.dispatch(
    addExpense({
      description: 'Coffee',
      notes: 'Morning caffee',
      amount: 100,
      createdAt: 0
    })
  )
);

store.dispatch(removeExpense(expenses[0].expense));
expenses.splice(0, 1);

expenses[0] = store.dispatch(
  editExpense(expenses[0].expense.id, {
    description: 'Caffee (iced)',
    amount: 150
  })
);

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
