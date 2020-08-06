import React from "react";

import "./NavIcon.scss";
import classNames from "../../utils/classNames";

const NavIcon = (props) => {
  return (
    <div className={classNames({
      [props.className]: !!props.className,
      'icon': true,
      'icon--menu': !props.flag,
      'icon--close': props.flag
    })}>
      <span className="icon__line"/>
    </div>
  )
};

export default NavIcon;
