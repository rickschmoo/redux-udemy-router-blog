import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import {BrowserRouter, Route } from 'react-router-dom';


import App from './components/app';
import reducers from './reducers';

// this strips out payload from promise returned by axios
const createStoreWithMiddleware = applyMiddleware()(createStore);


class Hello extends React.Component {
	render() {
		return <div>Hello</div>
	}
}

class Goodbye extends React.Component {
	render() {
		return <div>Goodbye</div>
	}
}


ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
  	<BrowserRouter>
      <div>
        Header
  		  <Route path="/hello" component={Hello} />
  		  <Route path="/goodbye" component={Goodbye} />
      </div>
  	</BrowserRouter>
  </Provider>
  , document.querySelector('.container'));
