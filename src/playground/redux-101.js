import { createStore } from 'redux';

//Action generators - functions that return action objects
const incrementCount = ({ incrementBy = 1 } = {}) => ({
    type: 'INCREMENT',
    incrementBy
});

const decrementCount = ({ decrementBy = 1 } = {}) => ({
    type: 'DECREMENT',
    decrementBy
});

const setCount = ({ count }) => ({
    type: 'SET',
    count
});

const resetCount = () => ({
    type: 'RESET'
});

// Reducer
//Reducers are pure functions (output only depends on variables inside function scope)
// Never change state or action
const countReducer = (state = { count: 10}, action) => {
    switch (action.type) {
        case 'INCREMENT':
            return {
                count: state.count + action.incrementBy
            };
        case 'DECREMENT':          
            return {
                count: state.count - action.decrementBy
            };
        case 'SET':
            return {
                count: action.count
            };
        case 'RESET': 
            return {
                count: 0
            };
        default:
            return state;
    }
};

const store = createStore(countReducer);


// return value of .subscribe() is a function for unsubscibing
const unsubscribe = store.subscribe(() => {
    console.log(store.getState());
});

store.dispatch(incrementCount({ incrementBy: 5 }));
// store.dispatch({
//     type: 'INCREMENT', //action type names in capital in redux
//     incrementBy: 5
// });

store.dispatch(decrementCount());


store.dispatch(decrementCount({ decrementBy: 10 }));
// store.dispatch({
//     type: 'DECREMENT', //action type names in capital in redux
//     decrementBy: 10
// });

store.dispatch(resetCount());
// store.dispatch({
//     type: 'RESET' //action type names in capital in redux
// });

store.dispatch(setCount({ count: 101 }));
// store.dispatch({
//     type: 'SET', //action type names in capital in redux
//     count: 101
// });

