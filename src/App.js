import React from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {Provider} from "react-redux";

// Redux
import store from "./redux/store";

// Components
import Menu from "./components/menu/Menu";
import Triangles from "./components/triangles/Triangles";

// Pages
import Home from "./pages/Home/Home";
import Resume from "./pages/Resume/Resume";
import ContactMe from "./pages/ContactMe/ContactMe";

import "./App.scss";

const App = () => (
  <div className="App">
    <Provider store={store}>
      <Router>
        <Menu/>
        <Switch>
          <Route path="/" exact={true}>
            <Triangles/>
            <Home />
          </Route>
          <Route path="/cv" exact={true}>
            <Resume/>
          </Route>
          <Route path="/contact-me" exact={true}>
            <ContactMe/>
          </Route>
        </Switch>
      </Router>
    </Provider>
  </div>
);

export default App;
