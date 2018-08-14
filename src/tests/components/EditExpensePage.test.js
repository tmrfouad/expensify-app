import React from 'react';
import { shallow } from 'enzyme';
import { EditExpensePage } from '../../components/EditExpensePage';
import expenses from '../fixtures/expenses';

let editExpense, removeExpense, history, wrapper, expense;

beforeEach(() => {
  editExpense = jest.fn();
  removeExpense = jest.fn();
  history = { push: jest.fn() };
  wrapper = shallow(
    <EditExpensePage
      expense={expenses[0]}
      editExpense={editExpense}
      removeExpense={removeExpense}
      history={history}
    />
  );
  expense = {
    description: expenses[0].description,
    amount: expenses[0].amount,
    createdAt: expenses[0].createdAt,
    notes: expenses[0].notes
  };
});

test('should render EditExpensePage correctly', () => {
  expect(wrapper).toMatchSnapshot();
});

test('should handle editExpense', () => {
  wrapper.find('ExpenseForm').prop('onSubmit')(expense);
  expect(editExpense).toHaveBeenLastCalledWith(expenses[0].id, expense);
  expect(history.push).toHaveBeenLastCalledWith('/');
});

test('should handle removeExpense', () => {
  wrapper.find('button').simulate('click');
  expect(removeExpense).toHaveBeenLastCalledWith(expenses[0].id);
  expect(history.push).toHaveBeenLastCalledWith('/');
});
