import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
// import Store from './components/Store';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import weatherReducer from './store/reducers';
import thunk from 'redux-thunk';

// const rootReducer = combineReducers({
//   // ctr: counterReducer,
//   // res: resultReducer
// });

const store = createStore(
  weatherReducer,
  applyMiddleware(thunk)
);

function Index() {
  return (
    // <Store>
    <Provider store={store}>
      <App />
    </Provider>
    // </Store>
  );
}

ReactDOM.render(<Index />, document.getElementById('root'));
