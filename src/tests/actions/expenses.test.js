import {
  startAddExpense,
  addExpense,
  editExpense,
  removeExpense,
  setExpenses,
  startSetExpenses,
  startRemoveExpense
} from '../../actions/expenses';
import expenses from '../fixtures/expenses';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import database from '../../firebase/firebase';

const createMockStore = configureMockStore([thunk]);

beforeEach(done => {
  const expensesData = {};
  expenses.forEach(({ id, description, amount, notes, createdAt }) => {
    expensesData[id] = {
      description,
      amount,
      notes,
      createdAt
    };
  });
  database
    .ref('expenses')
    .set(expensesData)
    .then(() => done())
    .catch(error => console.log(error));
});

// REMOVE_EXPENSE
test('generate remove expense action', () => {
  const result = removeExpense({ id: '1' });

  expect(result).toEqual({
    type: 'REMOVE_EXPENSE',
    id: '1'
  });
});

test('should remove an expense from firebase', done => {
  const store = createMockStore({});
  const id = '1';
  store.dispatch(startRemoveExpense({ id })).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: 'REMOVE_EXPENSE',
      id
    });

    database.ref(`expenses/${id}`).once('value', snap => {
      expect(snap.val()).toBeNull();
      done();
    });
  });
});

// EDIT_EXPENSE
test('generate edit expense action', () => {
  const result = editExpense(
    { id: '1' },
    {
      description: 'test description',
      notes: 'test notes',
      amount: 100,
      createdAt: 10000
    }
  );

  expect(result).toEqual({
    type: 'EDIT_EXPENSE',
    id: '1',
    expense: {
      description: 'test description',
      notes: 'test notes',
      amount: 100,
      createdAt: 10000
    }
  });
});

// ADD_EXPENSE
test('generate add expense action using specific values', () => {
  const expense = expenses[0];

  const result = addExpense(expense);

  expect(result).toEqual({
    type: 'Add_EXPENSE',
    expense
  });
});

test('should add expense to database with provided values', done => {
  const store = createMockStore({});
  const expenseData = {
    description: 'Mouse',
    amount: 3500,
    notes: 'new mouse',
    createdAt: 2000
  };
  store
    .dispatch(startAddExpense(expenseData))
    .then(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual({
        type: 'Add_EXPENSE',
        expense: {
          id: expect.any(String),
          ...expenseData
        }
      });

      return database.ref(`expenses/${actions[0].expense.id}`).once('value');
    })
    .then(snap => {
      expect(snap.val()).toEqual(expenseData);
      done();
    });
});

test('should add expense to database with default values', done => {
  const store = createMockStore({});
  const defaultExpenseData = {
    description: '',
    notes: '',
    amount: 0,
    createdAt: 0
  };
  store
    .dispatch(startAddExpense())
    .then(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual({
        type: 'Add_EXPENSE',
        expense: {
          id: expect.any(String),
          ...defaultExpenseData
        }
      });

      return database.ref(`expenses/${actions[0].expense.id}`).once('value');
    })
    .then(snap => {
      expect(snap.val()).toEqual(defaultExpenseData);
      done();
    });
});

// SET_EXPENSES
test('should generate set expenses action correctly', () => {
  const action = setExpenses(expenses);
  expect(action).toEqual({
    type: 'SET_EXPENSES',
    expenses
  });
});

test('should fetch expenses from firebase', done => {
  const store = createMockStore({});
  store.dispatch(startSetExpenses()).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: 'SET_EXPENSES',
      expenses
    });

    done();
  });
});
