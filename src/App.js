import React from "react";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {Provider} from 'react-redux';

// Redux
import store from "./redux/store";

// Components
import Menu from "./components/menu/Menu";
import Triangles from "./components/triangles/Triangles";

// Pages
import Home from "./pages/Home/Home"

import './App.scss';

const App = () => (
  <div className="App">
    <Provider store={store}>
      <Router>
        <Triangles/>
        <Menu/>
        <Switch>
          <Route path="/" exact={true}>
            <Home />
          </Route>
          <Route path="/contact-me" exact={true}>
            <h1>contact me</h1>
          </Route>
        </Switch>
      </Router>
    </Provider>
  </div>
);

export default App;
