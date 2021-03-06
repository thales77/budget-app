import database from '../firebase/firebase';

//ADD_EXPENSE
export const addExpense = (expense) => ({
    type: 'ADD_EXPENSE',
    expense
});

export const startAddExpense = (expenseData = {}) => {
    return (dispatch, getState) => {
        //get use uid from state
        const uid = getState().auth.uid;
        //default object destructuring
        const {
            description = '',
            note = '',
            amount = 0,
            createdAt = 0,
            category = ''
        } = expenseData;

        const expense = { description, note, amount, createdAt, category };

        return database.ref(`users/${uid}/expenses`).push(expense).then((ref) => {
            dispatch(addExpense({
                id: ref.key,
                ...expense
            }));
        });
    };
};

//REMOVE_EXPENSE
export const removeExpense = ({ id } = {}) => ({
    type: 'REMOVE_EXPENSE',
    id
});

export const startRemoveExpense = ( { id } = {} ) => {
//delete expense from db and dispatch removeExpense    
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        return database.ref(`users/${uid}/expenses/${ id }`).remove().then(() => {
            dispatch(removeExpense({ id }));
        });
    };
};


//EDIT_EXPENSE
export const editExpense = (id, updates) => ({
    type: 'EDIT_EXPENSE',
    id,
    updates
});

export const startEditExpense = (id, updates) => {
    //update expense in db and call edit expense
        return (dispatch, getState) => {
            const uid = getState().auth.uid;
            return database.ref(`users/${uid}/expenses/${id}`)
            .update(updates)
            .then(() => {
                dispatch(editExpense(id, updates));
            });
        };
    };

// SET_EXPENSES
export const setExpenses = (expenses) => ({
    type: 'SET_EXPENSES',
    expenses
});

export const startSetExpenses = () => {
    return (dispatch, getState) => {
//Get data from database, parse it 
//and dispatch the resulting object array 
//to redux store
    const uid = getState().auth.uid;
        return database.ref(`users/${uid}/expenses`)
            .once('value')
            .then((snapshot) => {
                const expenses = [];
                snapshot.forEach((childSnapshot) => {
                    expenses.push({
                        id: childSnapshot.key,
                        ...childSnapshot.val()
                    });
                });
                dispatch(setExpenses(expenses));
            });
    };
};