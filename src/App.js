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
import Article from "./pages/Article/Article";

import "./App.scss";

const routes = [
  {
    path: '/',
    exact: true,
    triangles: true,
    component: Home
  },
  {
    path: '/cv',
    exact: true,
    triangles: false,
    component: Resume
  },
  {
    path: '/contact-me',
    exact: true,
    triangles: false,
    component: ContactMe
  },
  {
    path: '/post/:id',
    triangles: false,
    component: Article
  },
  {
    path: '/404',
    triangles: true,
    exact: true,
    component: () => <span>404 - whoopsie oopsie something fucked up</span> // TODO
  },
  {
    path: '*',
    redirect: '/404'
  }
]

const App = () => (
  <div className="App">
    <Provider store={store}>
      <Router>
        <Menu/>
        <Switch>
          {routes.map((r, i) => (
            <Route path={r.path} exact={r.exact} key={i} render={p =>
              <>
                {r.triangles && <Triangles/>}
                <r.component {...p}/>
              </>
            }>
            </Route>
          ))}
        </Switch>
      </Router>
    </Provider>
  </div>
);

export default App;
