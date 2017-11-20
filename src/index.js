import registerServiceWorker from './registerServiceWorker';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import App from './app/app'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import todoApp from './reducers'
import thunk from 'redux-thunk'
import './index.css'

 const middleware = applyMiddleware(thunk)
 const store = createStore (todoApp, middleware)
 const app = document.getElementById('root')


ReactDOM.render(
  <Provider store = {store}>
  <BrowserRouter><App/></BrowserRouter>
  </Provider>
  ,app
)
registerServiceWorker();
