import expensesReducer from '../../reducers/expenses';
import expenses from '../fixtures/expenses';

test('set default state', () => {
  const state = expensesReducer(undefined, { type: '@@INIT' });
  expect(state).toEqual([]);
});

test('remove expense by id', () => {
  const action = {
    type: 'REMOVE_EXPENSE',
    id: expenses[1].id
  };
  const state = expensesReducer(expenses, action);
  expect(state).toEqual([expenses[0], expenses[2], expenses[3]]);
});

test('do not remove expense if id not found', () => {
  const action = {
    type: 'REMOVE_EXPENSE',
    id: '-1'
  };
  const state = expensesReducer(expenses, action);
  expect(state).toEqual(expenses);
});

test('add expense', () => {
  const newExpense = {
    id: '5',
    description: 'Gum',
    notes: 'Gum',
    amount: 250,
    createdAt: 5000
  };
  const action = {
    type: 'Add_EXPENSE',
    expense: newExpense
  };
  const state = expensesReducer(expenses, action);
  expect(state).toEqual([...expenses, newExpense]);
});

test('edit existing expense', () => {
  const description = 'Water bill test';
  const action = {
    type: 'EDIT_EXPENSE',
    id: expenses[0].id,
    expense: { description }
  };
  const state = expensesReducer(expenses, action);
  expect(state[0].description).toBe('Water bill test');
});

test('do not edit non existing expense', () => {
  const description = 'Water bill test';
  const action = {
    type: 'EDIT_EXPENSE',
    id: '-1',
    expense: { description }
  };
  const state = expensesReducer(expenses, action);
  expect(state).toEqual(expenses);
});
