import React from 'react';
import { connect } from 'react-redux';
import ExpenseTypeListItem from './ExpenseTypeListItem';
import { Link } from 'react-router-dom';

export class ExpenseTypeList extends React.Component {
  render() {
    return (
      <div>
        <div className="page-header">
          <div className="content-container">
            <h2 className="page-header__title">Expense Types</h2>
            <div className="page-header__actions">
              <Link className="button" to="/expensetypeform">
                Add Expense Type
              </Link>
            </div>
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

export default connect(mapStateToProps)(ExpenseTypeList);
