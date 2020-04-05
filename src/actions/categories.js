import database from '../firebase/firebase';

//ADD_CATEGORY
export const addCategory = (category) => ({
    type: 'ADD_CATEGORY',
    category
});

export const startAddCategory = (categoryData = {}) => {
    return (dispatch, getState) => {
        //get use uid from state
        const uid = getState().auth.uid;
        //default object destructuring
        const {
            description = '',
            note = '',
            budgetAmount = 0,
        } = categoryData;

        const category = { description, note, budgetAmount };

        return database.ref(`users/${uid}/categories`).push(category).then((ref) => {
            dispatch(addCategory({
                id: ref.key,
                ...category
            }));
        });
    };
};

// REMOVE CATEGORY
export const removeCategory = ({ id } = {}) => ({
    type: 'REMOVE_CATEGORY',
    id
});

export const startRemoveCategory = ( { id } = {} ) => {
//delete category from db and dispatch removeCategory    
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        return database.ref(`users/${uid}/categories/${ id }`).remove().then(() => {
            dispatch(removeCategory({ id }));
        });
    };
};


//EDIT CATEGORY
export const editCategory = (id, updates) => ({
    type: 'EDIT_CATEGORY',
    id,
    updates
});

export const startEditCategory = (id, updates) => {
    //update category in db and call edit category
        return (dispatch, getState) => {
            const uid = getState().auth.uid;
            return database.ref(`users/${uid}/categories/${id}`)
            .update(updates)
            .then(() => {
                dispatch(editCategory(id, updates));
            });
        };
    };

// SET_CATEGORIES
export const setCategories = (categories) => ({
    type: 'SET_CATEGORIES',
    categories
});

export const startSetCategories = () => {
    return (dispatch, getState) => {
//Get data from database, parse it 
//and dispatch the resulting object array 
//to redux store
    const uid = getState().auth.uid;
        return database.ref(`users/${uid}/categories`)
            .once('value')
            .then((snapshot) => {
                const categories = [];
                snapshot.forEach((childSnapshot) => {
                    categories.push({
                        id: childSnapshot.key,
                        ...childSnapshot.val()
                    });
                });
                dispatch(setCategories(categories));
            });
    };
};