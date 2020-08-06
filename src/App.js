import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import './App.scss';

// Components
import Menu from "./components/menu/Menu";
import Triangles from "./components/triangles/Triangles";

const App = () => (
  <Router>
    <div className="App">
      <Triangles/>
      <Menu/>
      <Switch>
        <Route path="/">
        </Route>
      </Switch>
    </div>
  </Router>
);

export default App;
