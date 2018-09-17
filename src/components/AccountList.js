import React from 'react';
import { connect } from 'react-redux';
import AccountListItem from './AccountListItem';
import { Link } from 'react-router-dom';

export class AccountList extends React.Component {
  render() {
    return (
      <div>
        <div className="page-header">
          <div className="content-container">
            <h2 className="page-header__title">Expense Types</h2>
            <div className="page-header__actions">
              <Link className="button" to="/accountform">
                Add Expense Type
              </Link>
            </div>
          </div>
        </div>
        <div className="content-container">
          <div className="list-header">
            <div>Name</div>
          </div>
          <div className="list-body">
            {this.props.accounts.map(acc => (
              <AccountListItem key={acc.id} {...acc} />
            ))}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  accounts: state.accounts
});

export default connect(mapStateToProps)(AccountList);
