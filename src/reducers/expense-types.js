// ExpenseTypes Reducer

const expenseTypesReducerDefaultState = [];

export default (state = expenseTypesReducerDefaultState, action) => {
  switch (action.type) {
    case 'Add_EXPENSE_TYPE':
      return [...state, action.expenseType];
    case 'REMOVE_EXPENSE_TYPE':
      return state.filter(({ id }) => id !== action.id);
    case 'EDIT_EXPENSE_TYPE':
      return state.map(
        expenseType =>
          expenseType.id === action.id
            ? { ...expenseType, ...action.updates }
            : expenseType
      );
    case 'SET_EXPENSE_TYPES':
      return action.expenseTypes;
    default:
      return state;
  }
};
