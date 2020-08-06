import React, {useState} from 'react';
import {useSpring, animated} from 'react-spring'

import './App.scss';

const springsConfig = {
  parallax: {mass: 10, tension: 550, friction: 150},
  menu: {mass: 15, tension: 500, friction: 150}
}

const toPercentMove = (n, p, w) => (((n - (w / 2)) / 100) * (p * 100));

const transitions = {
  triangle: {
    back: {
      transform: (x, y) => `translate(${-toPercentMove(x, 0.075, window.innerWidth)}px,${-toPercentMove(y, 0.075, window.innerHeight)}px)`
    },
    front: {
      transform: (x, y) => `translate(${toPercentMove(x, 0.05, window.innerWidth)}px,${toPercentMove(y, 0.05, window.innerHeight)}px)`
    },
  },
  menu: {
    circle: {
      width: n => `calc(${n}vw + 50px)`,
      height: n => `calc(${n}vw + 50px)`,
      top: n => `calc(${-n * .5}vw + 50px)`,
      right: n => `calc(${-n * .5}vw + 50px)`,
    },
    content: {
      top: n => `calc(${n * .5}vw - 50px)`,
      right: n => `calc(${n * .5}vw - 50px)`,
    },
  },
}

const calcCursorCenterPos = (x, y) => [x - (window.innerWidth / 2), y - (window.innerHeight / 2)]

const App = () => {
  const [menuOpen, menuSetState] = useState(false);
  const [parallaxProps, parallaxSet] = useSpring(() => ({
    xy: [0, 0],
    config: springsConfig.parallax
  }));

  const [menuProps, menuSet] = useSpring(() => ({
    n: 0,
    config: springsConfig.menu
  }));

  const toggleMenu = () => {
    menuSet({n: !menuOpen ? 400 : 0});
    menuSetState(!menuOpen);
  };

  return (
    <div className="App" onMouseMove={({clientX: x, clientY: y}) => parallaxSet({xy: calcCursorCenterPos(x, y)})}>
      <div className="parallax">
        <animated.div className="triangle triangle--back" style={{
          transform: parallaxProps.xy.interpolate(transitions.triangle.back.transform),
        }}/>
        <animated.div className="triangle triangle--front" style={{
          transform: parallaxProps.xy.interpolate(transitions.triangle.front.transform),
        }}/>
      </div>
      <animated.div className="menu" onClick={toggleMenu} style={{
        width: menuProps.n.interpolate(transitions.menu.circle.width),
        height: menuProps.n.interpolate(transitions.menu.circle.height),
        top: menuProps.n.interpolate(transitions.menu.circle.top),
        right: menuProps.n.interpolate(transitions.menu.circle.right),
      }}>
        <animated.div className="menu__content" style={{
          top: menuProps.n.interpolate(transitions.menu.content.top),
          right: menuProps.n.interpolate(transitions.menu.content.right),
        }}>
          Hello World :)
        </animated.div>
      </animated.div>
    </div>
  );
}

export default App;
