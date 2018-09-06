import expenseTypesReducer from '../../reducers/expense-types';
import expenseTypes from '../fixtures/expense-types';

test('set default state', () => {
  const state = expenseTypesReducer(undefined, { type: '@@INIT' });
  expect(state).toEqual([]);
});

test('remove expense type by id', () => {
  const action = {
    type: 'REMOVE_EXPENSE_TYPE',
    id: expenseTypes[1].id
  };
  const state = expenseTypesReducer(expenseTypes, action);
  expect(state).toEqual([expenseTypes[0], expenseTypes[2], expenseTypes[3]]);
});

test('do not remove expense type if id not found', () => {
  const action = {
    type: 'REMOVE_EXPENSE_TYPE',
    id: '-1'
  };
  const state = expenseTypesReducer(expenseTypes, action);
  expect(state).toEqual(expenseTypes);
});

test('add expense type', () => {
  const newExpenseType = {
    id: '5',
    description: 'Expense 5'
  };
  const action = {
    type: 'Add_EXPENSE_TYPE',
    expenseType: newExpenseType
  };
  const state = expenseTypesReducer(expenseTypes, action);
  expect(state).toEqual([...expenseTypes, newExpenseType]);
});

test('edit existing expense type', () => {
  const description = 'Expense 2 Edited';
  const action = {
    type: 'EDIT_EXPENSE_TYPE',
    id: expenseTypes[1].id,
    updates: { description }
  };
  const state = expenseTypesReducer(expenseTypes, action);
  expect(state[1].description).toBe(description);
});

test('do not edit non existing expense type', () => {
  const description = 'Expense 2 Edited';
  const action = {
    type: 'EDIT_EXPENSE_TYPE',
    id: '-1',
    updates: { description }
  };
  const state = expenseTypesReducer(expenseTypes, action);
  expect(state).toEqual(expenseTypes);
});

test('should set expense types', () => {
  const newExpenseTypes = [...expenseTypes, { ...expenseTypes[0], id: '123' }];
  const action = { type: 'SET_EXPENSE_TYPES', expenseTypes: newExpenseTypes };
  const state = expenseTypesReducer(expenseTypes, action);
  expect(state).toEqual(newExpenseTypes);
});
