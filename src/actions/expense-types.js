import database from '../firebase/firebase';

// Add_EXPENSE_TYPE
export const addExpenseType = expenseType => ({
  type: 'ADD_EXPENSE_TYPE',
  expenseType
});

export const startAddExpenseType = (expenseTypeData = {}) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    const { description = '' } = expenseTypeData;

    const expenseType = {
      description
    };

    return database
      .ref(`users/${uid}/expenseTypes`)
      .push(expenseType)
      .then(ref => {
        dispatch(addExpenseType({ id: ref.key, ...expenseType }));
      })
      .catch(() => {});
  };
};

// REMOVE_EXPENSE_TYPE
export const removeExpenseType = ({ id }) => ({
  type: 'REMOVE_EXPENSE_TYPE',
  id
});

export const startRemoveExpenseType = ({ id } = {}) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return database
      .ref(`users/${uid}/expenseTypes/${id}`)
      .remove()
      .then(() => {
        dispatch(removeExpenseType({ id }));
      });
  };
};

// EDIT_EXPENSE_TYPE
export const editExpenseType = ({ id } = {}, updates) => ({
  type: 'EDIT_EXPENSE_TYPE',
  id,
  updates
});

export const startEditExpenseType = ({ id } = {}, updates) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return database
      .ref(`users/${uid}/expenseTypes/${id}`)
      .update(updates)
      .then(() => {
        dispatch(editExpenseType({ id }, updates));
      });
  };
};

// SET_EXPENSE_TYPES
export const setExpenseTypes = expenseTypes => ({
  type: 'SET_EXPENSE_TYPES',
  expenseTypes
});

export const startSetExpenseTypes = () => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return database.ref(`users/${uid}/expenseTypes`).once('value', snap => {
      const expenseTypes = [];
      snap.forEach(childSnap => {
        expenseTypes.push({
          id: childSnap.key,
          ...childSnap.val()
        });
      });
      dispatch(setExpenseTypes(expenseTypes));
    });
  };
};
