import React from 'react';
import ExpenseForm from './ExpenseForm';
import { editExpense, removeExpense } from '../actions/expenses';
import { connect } from 'react-redux';

const EditExpensePage = ({ expense, dispatch, history }) => {
  return (
    <div>
      <h2>Edit Expense: {expense.id}</h2>
      <ExpenseForm
        expense={expense}
        onSubmit={exp => {
          dispatch(editExpense({ id: expense.id }, exp));
          history.push('/');
        }}
      />
      <button
        onClick={() => {
          dispatch(removeExpense({ id: expense.id }));
          history.push('/');
        }}
      >
        Remove
      </button>
    </div>
  );
};

const mapStateToProps = (state, props) => ({
  expense: state.expenses.find(expense => expense.id === props.match.params.id)
});

export default connect(mapStateToProps)(EditExpensePage);
