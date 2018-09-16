import React from 'react';
import { connect } from 'react-redux';
import {
  startAddExpenseType,
  startEditExpenseType,
  startSetExpenseTypes,
  startRemoveExpenseType
} from '../actions/expense-types';
import ConfirmModal from './ConfirmModal';

export class ExpenseTypeForm extends React.Component {
  constructor(props) {
    super(props);
    const expenseType = this.props.expenseType;
    this.state = {
      description: expenseType ? expenseType.description : '',
      error: undefined,
      mode: expenseType ? 'edit' : 'add',
      isModalOpen: false
    };
  }

  onDescriptionChange = e => {
    this.setState({ description: e.target.value });
  };

  onFormSubmit = e => {
    e.preventDefault();
    if (!this.state.description) {
      this.setState({ error: 'Please enter a description!' });
    } else {
      this.props.startSetExpenseTypes().then(() => {
        if (
          this.props.expenseTypes.find(
            exType => exType.description === this.state.description
          )
        ) {
          this.setState({ error: 'This expense type already exists!' });
        } else {
          if (this.state.mode === 'edit') {
            this.props.startEditExpenseType(this.props.match.params.id, {
              description: this.state.description
            });
          } else {
            this.props.startAddExpenseType({
              description: this.state.description
            });
          }
          this.props.history.push('/expensetypes');
        }
      });
    }
  };

  removeExpenseType = () => {
    this.props.startRemoveExpenseType(this.props.match.params.id);
    this.props.history.push('/expensetypes');
  };

  openRemoveItemDialog = e => {
    e.preventDefault();
    this.setState(() => ({ isModalOpen: true }));
  };

  closeRemoveItemDialog = () => {
    this.setState(() => ({ isModalOpen: false }));
  };

  render() {
    return (
      <div>
        <div className="page-header">
          <div className="content-container">
            <h2 className="page-header__title">
              {this.state.mode === 'edit' ? 'Edit' : 'Add'} Expense Type
            </h2>
          </div>
        </div>
        <form className="form content-container" onSubmit={this.onFormSubmit}>
          {this.state.error && (
            <div className="form__error">{this.state.error}</div>
          )}
          <input
            type="text"
            className="text-input"
            value={this.state.description}
            onChange={this.onDescriptionChange}
          />
          <div>
            <button className="button form__action">Save Expense Type</button>
            <button
              className="button form__action button--secondary"
              onClick={this.openRemoveItemDialog}
            >
              Remove Expense Type
            </button>
          </div>
        </form>
        <ConfirmModal
          id="confirmModal"
          messageTitle="Remove Expense Type!"
          messageBody="Are you sure you want to remove this item?"
          isOpen={this.state.isModalOpen}
          onModalClose={this.closeRemoveItemDialog}
          onModalOk={this.removeExpenseType}
        />
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  expenseType: state.expenseTypes.find(t => t.id === props.match.params.id),
  expenseTypes: state.expenseTypes
});

const mapDispatchToProps = dispatch => ({
  startAddExpenseType: expenseType => {
    dispatch(startAddExpenseType(expenseType));
  },
  startEditExpenseType: (id, expenseType) => {
    dispatch(startEditExpenseType({ id }, expenseType));
  },
  startRemoveExpenseType: id => {
    dispatch(startRemoveExpenseType({ id }));
  },
  startSetExpenseTypes: () => {
    return dispatch(startSetExpenseTypes());
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ExpenseTypeForm);
