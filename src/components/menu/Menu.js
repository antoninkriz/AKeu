import React, {useState} from "react";
import {animated, useSpring} from "react-spring";

import './Menu.scss';
import NavIcon from "./NavIcon";

const springsConfig = {
  menu: {mass: 15, tension: 500, friction: 150}
};

const transitions = {
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
};

const Menu = () => {
  const [menuOpen, menuSetState] = useState(false);
  const [menuProps, menuSet] = useSpring(() => ({
    n: 0,
    config: springsConfig.menu
  }));

  const toggleMenu = () => {
    menuSet({n: !menuOpen ? 400 : 0});
    menuSetState(!menuOpen);
  };
  return (
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
        <NavIcon className="menu__content__icon" flag={menuOpen}/>
        Hello World :)
      </animated.div>
    </animated.div>
  );
}

export default Menu;
