import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Properties from './components/property/Properties';
import PropertyProfile from './components/property/PropertyProfile';


function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path='/' exact component={ Properties }/>
          <Route path='/property/:id' component={ PropertyProfile }/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
