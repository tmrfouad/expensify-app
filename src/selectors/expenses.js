// Get visible expenses

export default (expenses, { text, sortBy, startDate, endDate }) => {
  return expenses
    .filter(expense => {
      return (
        (!text ||
          expense.description.toLowerCase().includes(text.toLowerCase())) &&
        (!startDate || expense.createdAt >= startDate) &&
        (!endDate || expense.createdAt <= endDate)
      );
    })
    .sort((a, b) => {
      if (!sortBy) {
        return 0;
      }

      if (sortBy === 'date') {
        return a.createdAt < b.createdAt ? 1 : -1;
      } else if (sortBy === 'amount') {
        return a.amount < b.amount ? 1 : -1;
      }

      return 0;
    });
};
