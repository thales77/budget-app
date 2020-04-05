import expensesReducer from '../../reducers/expenses';
import expenses from '../fixtures/expenses';


test('Should set default state', () => {
    const state = expensesReducer(undefined, {
        type: '@@INIT'
    });
    expect(state).toEqual([]);
});

test('should remove an expense by id', () => {
    const action = {
        type: 'REMOVE_EXPENSE',
        id: expenses[1].id
    };

    const state = expensesReducer(expenses, action);
    expect(state).toEqual([expenses[0], expenses[2]]);
});

test('should not remove an expense if id is not found', () => {
    const action = {
        type: 'REMOVE_EXPENSE',
        id: '-1'
    };

    const state = expensesReducer(expenses, action);
    expect(state).toEqual(expenses);
});

test('should add an expense', () => {
    const expense = {
        id: '4',
        description: 'Condoms',
        note: '',
        amount: 50,
    }
    const action = {
        type: 'ADD_EXPENSE',
        expense
    };
    const state = expensesReducer(expenses, action);
    expect(state).toEqual([...expenses, expense]);
});

test('should edit an expense', () => {
    const updates = {
        description: 'Purple condoms'
    };
    const action = {
        type: 'EDIT_EXPENSE',
        id: expenses[2].id,
        updates
    };
    const state = expensesReducer(expenses, action);
    expect(state[2].description).toBe('Purple condoms');
});

test('should not edit an expense if id is not found', () => {
    const updates = {
            description: 'Purple Condoms'
    };
    const action = {
        type: 'EDIT_EXPENSE',
        id: '-1',
        updates
    };
    const state = expensesReducer(expenses, action);
    expect(state).toEqual(expenses);
});

test('Should set expenses', () => {
    const action = {
        type: 'SET_EXPENSES',
        expenses: [expenses[1]]
    };
    const state = expensesReducer(expenses, action);
    expect(state).toEqual([expenses[1]]);
});