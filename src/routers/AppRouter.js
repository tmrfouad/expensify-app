import React from 'react';
import { Router, Switch } from 'react-router-dom';
import LoginPage from '../components/LoginPage';
import ExpenseDashbourdPage from '../components/ExpenseDashbourdPage';
import ExpenseTypesPage from '../components/ExpenseTypesPage';
import ExpenseTypesForm from '../components/ExpenseTypeForm';
import AddExpensePage from '../components/AddExpensePage';
import EditExpensePage from '../components/EditExpensePage';
import PublicRoute from './PublicRoute';
import NotFoundPage from '../components/NotFoundPage';
import createHistory from 'history/createBrowserHistory';
import PrivateRoute from './PrivateRoute';

export const history = createHistory();

const AppRouter = () => (
  <Router history={history}>
    <div>
      <Switch>
        <PublicRoute path="/" component={LoginPage} exact={true} />
        <PrivateRoute path="/dashboard" component={ExpenseDashbourdPage} />
        <PrivateRoute path="/create" component={AddExpensePage} />
        <PrivateRoute path="/edit/:id" component={EditExpensePage} />
        <PrivateRoute path="/expensetypes" component={ExpenseTypesPage} />
        <PrivateRoute
          path="/expensetypeform/:id"
          component={ExpenseTypesForm}
        />
        <PrivateRoute path="/expensetypeform" component={ExpenseTypesForm} />
        <PublicRoute component={NotFoundPage} />
      </Switch>
    </div>
  </Router>
);

export default AppRouter;
