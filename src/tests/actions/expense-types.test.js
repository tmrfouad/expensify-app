import {
  addExpenseType,
  startAddExpenseType,
  editExpenseType,
  startEditExpenseType,
  removeExpenseType,
  startRemoveExpenseType,
  setExpenseTypes,
  startSetExpenseTypes
} from '../../actions/expense-types';
import database from '../../firebase/firebase';
import expenseTypes from '../fixtures/expense-types';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

//#region prepair pre test data
const createMockStore = configureMockStore([thunk]);
const uid = '123456abcde';
const defaultAuthState = { auth: { uid } };

beforeEach(done => {
  const expenseTypesData = {};
  expenseTypes.forEach(({ id, description }) => {
    expenseTypesData[id] = {
      description
    };
  });

  database
    .ref(`users/${uid}/expenseTypes`)
    .set(expenseTypesData)
    .then(() => {
      done();
    });
});
//#endregion

//#region add expense type
test('should generate addExpenseType action correctly', () => {
  const expenseType = expenseTypes[0];
  const action = addExpenseType(expenseType);
  expect(action).toEqual({
    type: 'ADD_EXPENSE_TYPE',
    expenseType
  });
});

test('should add expenseType to database with provided values', done => {
  const store = createMockStore(defaultAuthState);
  const newExpenseType = {
    description: 'Expense 5'
  };
  store
    .dispatch(startAddExpenseType(newExpenseType))
    .then(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual({
        type: 'ADD_EXPENSE_TYPE',
        expenseType: {
          id: expect.any(String),
          ...newExpenseType
        }
      });

      return database
        .ref(`users/${uid}/expenseTypes/${actions[0].expenseType.id}`)
        .once('value');
    })
    .then(snapshot => {
      expect(snapshot.val()).toEqual(newExpenseType);
      done();
    });
});
//#endregion

//#region edit expense type
test('should generate editExpenseType action correctly', () => {
  const updates = { description: 'Expense 1 Edited' };
  const id = expenseTypes[0].id;
  const action = editExpenseType({ id }, updates);
  expect(action).toEqual({
    type: 'EDIT_EXPENSE_TYPE',
    id,
    updates
  });
});

test('should modify exspenseType in database', done => {
  const store = createMockStore(defaultAuthState);
  const id = expenseTypes[1].id;
  const description = 'Expense 2 Edited';
  const updates = { description };
  store
    .dispatch(startEditExpenseType({ id }, updates))
    .then(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual({
        type: 'EDIT_EXPENSE_TYPE',
        id,
        updates
      });

      return database
        .ref(`users/${uid}/expenseTypes/${id}/description`)
        .once('value');
    })
    .then(snapshot => {
      expect(snapshot.val()).toBe(description);
      done();
    });
});
//#endregion

//#region remove expense type
test('should generate removeExpenseType action correctly', () => {
  const id = expenseTypes[0].id;
  const action = removeExpenseType({ id });
  expect(action).toEqual({
    type: 'REMOVE_EXPENSE_TYPE',
    id
  });
});

test('should remove expenseType from database', done => {
  const store = createMockStore(defaultAuthState);
  const id = expenseTypes[2].id;
  store
    .dispatch(startRemoveExpenseType({ id }))
    .then(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual({
        type: 'REMOVE_EXPENSE_TYPE',
        id
      });

      return database.ref(`users/${uid}/expenseTypes/${id}`).once('value');
    })
    .then(snapshot => {
      expect(snapshot.val()).toBeFalsy();
      done();
    });
});
//#endregion

//#region set expense types
test('should generate setExpenseTypes action correctly', () => {
  const action = setExpenseTypes(expenseTypes);
  expect(action).toEqual({
    type: 'SET_EXPENSE_TYPES',
    expenseTypes
  });
});

test('should fetch expenseTypes from database', done => {
  const store = createMockStore(defaultAuthState);
  store.dispatch(startSetExpenseTypes()).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: 'SET_EXPENSE_TYPES',
      expenseTypes
    });

    done();
  });
});
//#endregion
