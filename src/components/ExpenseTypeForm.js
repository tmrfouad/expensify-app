import React from 'react';

export class ExpenseTypeForm extends React.Component {
  constructor(props) {
    super(props);
    const expenseType = this.props.expenseType;
    this.state = {
      description: expenseType ? expenseType.description : ''
    };
  }

  render() {
    return (
      <form>
        <input type="text" value={this.state.description} />
        <input type="submit" value="Save Expense Type" />
      </form>
    );
  }
}

export default ExpenseTypeForm;
