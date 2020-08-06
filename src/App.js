import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {Provider} from 'react-redux';

// Redux
import store from "./redux/store";

// Components
import Menu from "./components/menu/Menu";
import Triangles from "./components/triangles/Triangles";

import './App.scss';

const App = () => (
  <div className="App">
    <Provider store={store}>
      <Router>
        <Triangles/>
        <Menu/>
        <Switch>
          <Route path="/">
          </Route>
        </Switch>
      </Router>
    </Provider>
  </div>
);

export default App;
