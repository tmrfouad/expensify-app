import React from 'react';
import ExpenseForm from './ExpenseForm';
import { editExpense, startRemoveExpense } from '../actions/expenses';
import { connect } from 'react-redux';

export class EditExpensePage extends React.Component {
  onSubmit = exp => {
    this.props.editExpense(this.props.expense.id, exp);
    this.props.history.push('/');
  };

  onRemoveExpense = () => {
    this.props.startRemoveExpense(this.props.expense.id);
    this.props.history.push('/');
  };

  render() {
    return (
      <div>
        <h2>Edit Expense: {this.props.expense.id}</h2>
        <ExpenseForm expense={this.props.expense} onSubmit={this.onSubmit} />
        <button onClick={this.onRemoveExpense}>Remove</button>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  expense: state.expenses.find(expense => expense.id === props.match.params.id)
});

const mapDispatchToProps = dispatch => ({
  editExpense: (id, exp) => {
    dispatch(editExpense({ id }, exp));
  },
  startRemoveExpense: id => {
    dispatch(startRemoveExpense({ id }));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditExpensePage);
