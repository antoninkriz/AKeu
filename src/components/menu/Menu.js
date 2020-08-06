import React from "react";
import {animated, useSpring} from "react-spring";
import {useDispatch, useSelector} from 'react-redux';

// Redux
import {menuClose, menuOpen} from "../../redux/actions/uiActions";

// Components
import NavIcon from "./NavIcon";

import './Menu.scss';

const springsConfig = {
  menu: {mass: 15, tension: 500, friction: 150}
};

const windowUnit = () => ((window?.innerHeight ?? 0) > (window?.innerWidth ?? 0)) ? 'vh' : 'vw';

const transitions = {
  menu: {
    circle: {
      width: n => `calc(${n}${windowUnit()} + 50px)`,
      height: n => `calc(${n}${windowUnit()} + 50px)`,
      top: n => `calc(${-n * .5}${windowUnit()} + 50px)`,
      right: n => `calc(${-n * .5}${windowUnit()} + 50px)`,
    },
    content: {
      top: n => `calc(${n * .5}${windowUnit()} - 50px)`,
      right: n => `calc(${n * .5}${windowUnit()} - 50px)`,
    },
  },
};

const Menu = () => {
  const isMenuOpen = useSelector(state => state.ui.isMenuOpen);
  const dispatch = useDispatch();

  const [menuProps, menuSet] = useSpring(() => ({
    n: isMenuOpen ? 400 : 0,
    config: springsConfig.menu
  }));

  const toggleMenu = () => {
    menuSet({n: !isMenuOpen ? 400 : 0});
    dispatch(isMenuOpen ? menuClose() : menuOpen());
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
        <NavIcon className="menu__content__icon" isMenuOpen={isMenuOpen}/>
        Hello World :)
      </animated.div>
    </animated.div>
  );
}

export default Menu;
