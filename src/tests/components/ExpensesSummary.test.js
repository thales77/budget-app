import React from 'react';
import { shallow } from 'enzyme';
import { ExpensesSummary } from '../../components/ExpensesSummary';
import getExpensesTotal from '../../selectors/expenses-total';
import expenses from '../fixtures/expenses';

const expenseCount = expenses.length;
const expensesTotal = getExpensesTotal(expenses);

test('Render expense summary item', () => {
    const wrapper = shallow(
        < ExpensesSummary
            expenseCount={expenseCount}
            expensesTotal={expensesTotal}
        />
    );
    expect(wrapper).toMatchSnapshot();
});