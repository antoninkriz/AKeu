import React from 'react';

import './App.scss';

// Components
import Menu from "./components/menu/Menu";
import Triangles from "./components/triangles/Triangles";

const App = () => (
  <div className="App">
    <Triangles/>
    <Menu/>
  </div>
);

export default App;
