import React from 'react';
import ExpenseForm from './ExpenseForm';
import { startAddExpense } from '../actions/expenses';
import { connect } from 'react-redux';

export class AddExpensePage extends React.Component {
  onSubmit = expense => {
    this.props.startAddExpense(expense);
    this.props.history.push('/');
  };
  render() {
    return (
      <div>
        <div className="page-header">
          <div className="content-container">
            <h2 className="page-header__title">Add Expense</h2>
          </div>
        </div>
        <div className="content-container">
          <ExpenseForm onSubmit={this.onSubmit} />
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  startAddExpense: expense => dispatch(startAddExpense(expense))
});

export default connect(
  undefined,
  mapDispatchToProps
)(AddExpensePage);
