import {
  addExpenseType,
  startAddExpenseType,
  editExpenseType,
  startEditExpenseType,
  removeExpenseType,
  startRemoveExpenseType,
  setExpenseTypes,
  startSetExpenseTypes
} from '../../actions/expense-types';
import expenseTypes from '../fixtures/expense-types';

test('should generate addExpenseType action correctly', () => {
  const expenseType = expenseTypes[0];
  const action = addExpenseType(expenseType);
  expect(action).toEqual({
    type: 'ADD_EXPENSE_TYPE',
    expenseType
  });
});
