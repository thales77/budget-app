import moment from 'moment';
import filtersReducer from '../../reducers/filters';

test('Should setup default filter values', () => {
    const state = (filtersReducer(undefined, {
        type: '@@INIT'
    }));
    expect(state).toEqual({
        text: '',
        sortBy: 'date',
        startDate: moment().startOf('month'),
        endDate: moment().endOf('month')
    });
});

test('Should set sortBy to amount', () => {
    const state = (filtersReducer(undefined, {
        type: 'SORT_BY_AMOUNT'
    }));
    expect(state.sortBy).toBe('amount');
});

test('Should set sortBy date', () => {
    const currentState = {
        text: '',
        sortBy: 'date',
        startDate: undefined,
        endDate: undefined
    };
    const action = {
        type: 'SORT_BY_DATE'
    };
    const state = (filtersReducer(currentState, action));
    expect(state.sortBy).toBe('date');
});

test('Should set text filter', () => {
    const state = (filtersReducer(undefined, {
        type: 'SET_TEXT_FILTER',
        text: 'test'
    }));
    expect(state.text).toBe('test');
});

test('Should set start date filter', () => {
    const startDate = moment();
    const state = (filtersReducer(undefined, {
        type: 'SET_START_DATE',
        startDate
    }));
    expect(state.startDate).toBe(startDate);
});

test('Should set end date filter', () => {
    const endDate = moment();
    const state = (filtersReducer(undefined, {
        type: 'SET_END_DATE',
        endDate
    }));
    expect(state.endDate).toBe(endDate);
});