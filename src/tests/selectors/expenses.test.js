import selectExpenses from '../../selectors/expenses';
import moment from 'moment';

const expenses = [
  {
    description: 'Water bill',
    notes: 'Water bill',
    amount: 30000,
    createdAt: moment(2000)
  },
  {
    description: 'Gas bill',
    notes: 'Gas bill',
    amount: 20000,
    createdAt: moment(1000)
  },
  {
    description: 'Apartment Rent',
    notes: 'Apartment Rent',
    amount: 40000,
    createdAt: moment(4000)
  },
  {
    description: 'Electricity bill',
    notes: 'power bill',
    amount: 10000,
    createdAt: moment(3000)
  }
];

test('filter by text value', () => {
  const result = selectExpenses(expenses, { text: 'rent' });
  expect(result).toEqual([
    {
      description: 'Apartment Rent',
      notes: 'Apartment Rent',
      amount: 40000,
      createdAt: moment(4000)
    }
  ]);
});
