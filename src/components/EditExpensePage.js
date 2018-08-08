import React from 'react';
import ExpenseForm from './ExpenseForm';

const EditExpensePage = props => {
  return (
    <div>
      <h2>Edit Expense: {props.match.params.id}</h2>
      <ExpenseForm />
    </div>
  );
};

export default EditExpensePage;
