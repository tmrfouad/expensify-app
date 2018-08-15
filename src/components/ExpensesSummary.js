import React from 'react';
import selectExpenses from '../selectors/expenses';
import selectExpensesTotal from '../selectors/expenses-total';
import { connect } from 'react-redux';
import numeral from 'numeral';

export const ExpensesSummary = ({ expenseCount, expensesTotal }) => (
  <div>
    <h2>
      Viewing {expenseCount || 0} expense
      {expenseCount === 1 ? '' : 's'} totalling{' '}
      {numeral(expensesTotal / 100).format('$0,0.00')}
    </h2>
  </div>
);

const mapStateToProps = state => {
  const visibleExpenses = selectExpenses(state.expenses, state.filters);
  return {
    expenseCount: visibleExpenses.length,
    expensesTotal: selectExpensesTotal(visibleExpenses)
  };
};

export default connect(mapStateToProps)(ExpensesSummary);
