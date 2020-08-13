import React from "react";
import {Link} from "react-router-dom";
import {animated, useSpring} from "react-spring";
import {useDispatch, useSelector} from "react-redux";

// Utils
import windowUnit from "../../utils/windowUnit";
import {isMobile} from "../../utils/isMobile";
import windowSize from "../../utils/windowSize";
import classNames from "../../utils/classNames";

// Redux
import {menuClose, menuOpen} from "../../redux/actions/uiActions";

// Components
import NavIcon from "./_NavIcon";

import "./Menu.scss";

const springsConfig = {
  menu: {mass: 15, tension: 475, friction: 150}
};

const menuPos = () => isMobile() ? 30 : 60;

const transitions = {
  menu: {
    circle: {
      width: n => `calc(${n}${windowUnit()} + 60px)`,
      height: n => `calc(${n}${windowUnit()} + 60px)`,
      top: n => `calc(${-n * .5}${windowUnit()} + ${menuPos()}px)`,
      right: n => `calc(${-n * .5}${windowUnit()} + ${menuPos()}px)`,
    },
    content: {
      top: n => `calc(${n * .5}${windowUnit()} - ${menuPos()}px)`,
      right: n => `calc(${n * .5}${windowUnit()} - ${menuPos()}px)`,
    },
  },
};

const Menu = () => {
  // Rerender on window resize
  windowSize();

  // Menu stuff
  let isMenuOpen;
  const [menuProps, menuSet] = useSpring(() => ({
    n: isMenuOpen ? 400 : 0,
    config: springsConfig.menu
  }));

  const openMenu = () => {
    menuSet({n: 400});
    dispatch(menuOpen());
  }

  const closeMenu = () => {
    menuSet({n: 0});
    dispatch(menuClose());
  }

  // Redux stuff
  const dispatch = useDispatch();
  isMenuOpen = useSelector(state => {
    menuSet({n: state.ui.isMenuOpen ? 400 : 0});
    return state.ui.isMenuOpen
  });

  const menuContent = (
    <>
      <NavIcon className="menu__content__icon" isMenuOpen={isMenuOpen} onClick={isMenuOpen ? closeMenu : openMenu} />
      <div className="menu__content__links">
        <Link className="menu__content__links__link" to="/" onClick={closeMenu}>Who am I</Link>
        <Link className="menu__content__links__link" to="/cv" onClick={closeMenu}>CV</Link>
        <Link className="menu__content__links__link" to="/contact-me" onClick={closeMenu}>Contact Me</Link>
      </div>
    </>
  )

  return isMobile() ? (
    <div className={classNames({
      'menu': true,
      'menu--open': isMenuOpen
    })}>
      <div className="menu__content">
        {menuContent}
      </div>
    </div>
  ) : (
    <animated.div  className={classNames({
      'menu': true,
      'menu--open': isMenuOpen
    })} style={{
      width: menuProps.n.interpolate(transitions.menu.circle.width),
      height: menuProps.n.interpolate(transitions.menu.circle.height),
      top: menuProps.n.interpolate(transitions.menu.circle.top),
      right: menuProps.n.interpolate(transitions.menu.circle.right),
    }}>
      <animated.div className="menu__content" style={{
        top: menuProps.n.interpolate(transitions.menu.content.top),
        right: menuProps.n.interpolate(transitions.menu.content.right),
      }}>
        {menuContent}
      </animated.div>
    </animated.div>
  );
}

export default Menu;
