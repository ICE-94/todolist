import React from 'react';
import './App.css';
import './Components/common.scss';
import './Components/style.scss';

import {
	BrowserRouter,
	Switch,
  Route,
} from 'react-router-dom';
//test
import GoogleAuthTest from './Components/GoogleAuthTest/GoogleAuthTest';
import List from './Components/List/List';


function App() {
  
  
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/list">
            <List />
          </Route>
          <Route>
            <GoogleAuthTest />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
