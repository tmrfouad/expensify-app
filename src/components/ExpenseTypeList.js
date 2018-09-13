import React from 'react';
import { connect } from 'react-redux';
import ExpenseTypeListItem from './ExpenseTypeListItem';
import { startSetExpenseTypes } from '../actions/expense-types';

export class ExpenseTypeList extends React.Component {
  componentDidMount() {
    this.props.startSetExpenseTypes();
  }

  render() {
    return (
      <div>
        <div className="page-header">
          <div className="content-container">
            <h2 className="page-header__title">Expense Types</h2>
          </div>
        </div>
        <div className="content-container">
          <div className="list-header">
            <div>Description</div>
          </div>
          <div className="list-body">
            {this.props.expenseTypes.map(type => (
              <ExpenseTypeListItem key={type.id} {...type} />
            ))}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  expenseTypes: state.expenseTypes
});

const mapDispatchToProps = dispatch => ({
  startSetExpenseTypes: () => dispatch(startSetExpenseTypes())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ExpenseTypeList);
