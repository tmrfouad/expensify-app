import React from 'react';
import ReactDOM from 'react-dom';
import { Provider, connect } from 'react-redux';
import AppRouter from './routers/AppRouter';
import configureStore from './store/confiureStore';
import getVisibleExpenses from './selectors/expenses';
import { addExpense } from './actions/expenses';
import { setTextFilter } from './actions/filters';
import 'normalize.css/normalize.css';
import './styles/styles.scss';

const store = configureStore();

// store.subscribe(() => {
//   const { expenses, filters } = store.getState();
//   console.log(getVisibleExpenses(expenses, filters));
// });

const expense1 = {
  description: 'Water bill',
  notes: 'Water bill',
  amount: 4500,
  createdAt: Date.parse('2018-08-18')
};
const expense2 = {
  description: 'Gas bill',
  notes: 'Gas bill',
  amount: 80,
  createdAt: Date.parse('2018-08-27')
};
const expense3 = {
  description: 'Rent',
  notes: 'Rent',
  amount: 109500,
  createdAt: Date.parse('2018-08-11')
};

store.dispatch(addExpense(expense1));
store.dispatch(addExpense(expense2));
store.dispatch(addExpense(expense3));
// store.dispatch(setTextFilter('bill'));

// setTimeout(() => {
//   store.dispatch(setTextFilter('water'));
// }, 2000);

const jsx = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);

ReactDOM.render(jsx, document.getElementById('app'));
