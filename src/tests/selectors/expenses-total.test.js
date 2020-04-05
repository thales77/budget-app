import selectExpensesTotal from '../../selectors/expenses-total';
import expenses from '../fixtures/expenses';


test('Should return 0 if no expense', () => {
    const res = selectExpensesTotal([]);
    expect(res).toBe(0);
});

test('Should correctly add up a single expense', () => {
    const res = selectExpensesTotal([expenses[0]]);
    expect(res).toBe(expenses[0].amount);
});

test('Should calculate the total expenses from expense array', () => {
    const res = selectExpensesTotal(expenses);
    expect(res).toBe(expenses[0].amount + expenses[1].amount + expenses[2].amount);
});