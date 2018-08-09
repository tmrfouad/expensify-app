import { addExpense, editExpense, removeExpense } from '../../actions/expenses';

// ADD_EXPENSE
test('generate add expense action using default values', () => {
  const result = addExpense();

  expect(result).toEqual({
    type: 'Add_EXPENSE',
    expense: {
      id: expect.any(String),
      description: '',
      notes: '',
      amount: 0,
      createdAt: 0
    }
  });
});

test('generate add expense action using specific values', () => {
  const expense = {
    description: 'test description',
    notes: 'test notes',
    amount: 100,
    createdAt: 10000
  };

  const result = addExpense(expense);

  expect(result).toEqual({
    type: 'Add_EXPENSE',
    expense: {
      id: expect.any(String),
      ...expense
    }
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

// REMOVE_EXPENSE
test('generate remove expense action', () => {
  const result = removeExpense({ id: '1' });

  expect(result).toEqual({
    type: 'REMOVE_EXPENSE',
    id: '1'
  });
});
