import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter, { history } from './routers/AppRouter';
import configureStore from './store/configureStore';
import { startSetExpenses } from './actions/expenses';
import { startSetCategories} from './actions/categories';
import { login, logout } from './actions/auth';
import 'normalize.css/normalize.css'; //reset library for crossbrowser support
import './styles/styles.scss';
import 'react-dates/lib/css/_datepicker.css';
import 'react-dates/initialize';
import { firebase } from './firebase/firebase';
import LoadingPage from './components/LoadingPage'

const store = configureStore();

//React-redux connect redux using <Provider /> HOC
const jsx = (
    <Provider store={store}>
        <AppRouter />
    </Provider>
);

//make sure app only renders one time
let hasRendered = false;
const renderApp = () => {
    if (!hasRendered) {
        ReactDOM.render(jsx, document.getElementById('app'));
        hasRendered = true;
    }
};


ReactDOM.render(<LoadingPage />, document.getElementById('app'));

firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        store.dispatch(login(user.uid));
        //fetch user expenses and render app if use is logged in
        store.dispatch(startSetExpenses())
        .then(store.dispatch(startSetCategories()))
        .then(() => {
            renderApp();

            //if we are in the login page go to dashboard
            if (history.location.pathname === '/') {
                history.push('/dashboard');
            }
        });
    } else {
        store.dispatch(logout());
        //if user is not logged in render login page
        renderApp();
        history.push('/');
    }
});

