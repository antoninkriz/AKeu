import React, {useEffect} from "react";
import {BrowserRouter as Router, Redirect, Route, Switch, useLocation} from "react-router-dom";
import {Provider} from "react-redux";
import ReactGA from 'react-ga';

// Redux
import store from "./redux/store";

// Components
import Menu from "./components/menu/Menu";
import Triangles from "./components/triangles/Triangles";

// Pages
import Home from "./pages/Home/Home";
import Resume from "./pages/Resume/Resume";
import Print from "./pages/Print/Print";
import ContactMe from "./pages/ContactMe/ContactMe";
import Article from "./pages/Article/Article";
import NotFound from "./pages/NotFound/NotFound";

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
    path: '/print',
    exact: true,
    triangles: false,
    component: Print
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
    component: NotFound
  },
  {
    path: '*',
    component: () => <Redirect to="/404"/>
  }
]

ReactGA.initialize('UA-83580150-4');

const AppContent = () => {
  const location = useLocation();

  useEffect(
    () => ReactGA.pageview(window.location.pathname + window.location.search),
    [location]
  );

  return (
    <div className="App">
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
    </div>
  );
}

const App = () => (
  <Provider store={store}>
    <Router>
      <AppContent/>
    </Router>
  </Provider>
);

export default App;
