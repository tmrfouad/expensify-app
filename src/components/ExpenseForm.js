import React from 'react';
import moment from 'moment';
import { SingleDatePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import 'react-dates/initialize';

const now = moment();
console.log(now.format('MMM Do, YYYY'));

export default class ExpenseForm extends React.Component {
  constructor(props) {
    super(props);
    const expense = props.expense;
    this.state = {
      description: expense ? expense.description : '',
      notes: expense ? expense.notes : '',
      amount: expense ? (expense.amount / 100).toString() : '',
      createdAt: expense ? moment(expense.createdAt) : moment(),
      createdAtFocused: false,
      error: '',
      mode: expense ? 'edit' : 'add'
    };
  }

  onDescriptionChange = e => {
    const description = e.target.value;
    this.setState(() => ({ description }));
  };

  onNotesChange = e => {
    const notes = e.target.value;
    this.setState(() => ({ notes }));
  };

  onAmountChange = e => {
    const amount = e.target.value;
    if (!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)) {
      this.setState(() => ({ amount }));
    }
  };

  onCreatedAtChange = createdAt => {
    if (createdAt) {
      this.setState(() => ({ createdAt }));
    }
  };

  onCreatedAtFocusChange = ({ focused: createdAtFocused }) => {
    this.setState(() => ({ createdAtFocused }));
  };

  onSubmit = e => {
    e.preventDefault();
    if (!this.state.description || !this.state.amount) {
      this.setState(() => ({
        error: 'Please provide description and amount.'
      }));
    } else {
      this.setState(() => ({ error: '' }));
      this.props.onSubmit({
        description: this.state.description,
        amount: parseFloat(this.state.amount) * 100,
        createdAt: this.state.createdAt.valueOf(),
        notes: this.state.notes
      });
    }
  };

  render() {
    return (
      <div>
        {this.state.error && <p>{this.state.error}</p>}
        <form onSubmit={this.onSubmit}>
          <input
            type="text"
            placeholder="Description"
            autoFocus
            value={this.state.description}
            onChange={this.onDescriptionChange}
          />
          <input
            type="text"
            placeholder="Amount"
            value={this.state.amount}
            onChange={this.onAmountChange}
          />
          <SingleDatePicker
            date={this.state.createdAt}
            onDateChange={this.onCreatedAtChange}
            focused={this.state.createdAtFocused}
            onFocusChange={this.onCreatedAtFocusChange}
            numberOfMonths={1}
            isOutsideRange={() => false}
          />
          <textarea
            placeholder="Add a note for your expense (optional)"
            value={this.state.notes}
            onChange={this.onNotesChange}
          />
          <button>
            {this.state.mode === 'add' ? 'Add Expense' : 'Edit Expense'}
          </button>
        </form>
      </div>
    );
  }
}
