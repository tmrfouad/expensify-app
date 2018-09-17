import React from 'react';
import { connect } from 'react-redux';
import {
  startAddAccount,
  startEditAccount,
  startSetAccounts,
  startRemoveAccount
} from '../actions/accounts';
import ConfirmModal from './ConfirmModal';

export class AccountForm extends React.Component {
  constructor(props) {
    super(props);
    const account = this.props.account;
    this.state = {
      name: account ? account.name : '',
      error: undefined,
      mode: account ? 'edit' : 'add',
      isModalOpen: false
    };
  }

  onNameChange = e => {
    this.setState({ name: e.target.value });
  };

  onFormSubmit = e => {
    e.preventDefault();
    if (!this.state.name) {
      this.setState({ error: 'Please enter a name!' });
    } else {
      this.props.startSetAccounts().then(() => {
        if (this.props.accounts.find(acc => acc.name === this.state.name)) {
          this.setState({ error: 'This expense type already exists!' });
        } else {
          if (this.state.mode === 'edit') {
            this.props.startEditAccount(this.props.match.params.id, {
              name: this.state.name
            });
          } else {
            this.props.startAddAccount({
              name: this.state.name
            });
          }
          this.props.history.push('/accounts');
        }
      });
    }
  };

  removeAccount = () => {
    this.props.startRemoveAccount(this.props.match.params.id);
    this.props.history.push('/accounts');
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
            value={this.state.name}
            onChange={this.onNameChange}
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
          onModalOk={this.removeAccount}
        />
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  account: state.accounts.find(t => t.id === props.match.params.id),
  accounts: state.accounts
});

const mapDispatchToProps = dispatch => ({
  startAddAccount: account => {
    dispatch(startAddAccount(account));
  },
  startEditAccount: (id, account) => {
    dispatch(startEditAccount({ id }, account));
  },
  startRemoveAccount: id => {
    dispatch(startRemoveAccount({ id }));
  },
  startSetAccounts: () => {
    return dispatch(startSetAccounts());
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AccountForm);
