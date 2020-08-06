import React from "react";
import PropTypes from "prop-types";

import "./NavIcon.scss";
import classNames from "../../utils/classNames";

class NavIcon extends React.PureComponent {
  render() {
    const {isMenuOpen, className} = this.props;

    return (
      <div className={classNames({
        [className]: !!className,
        'icon': true,
        'icon--menu': !isMenuOpen,
        'icon--close': isMenuOpen
      })}>
        <span className="icon__line"/>
      </div>
    );
  }
}

NavIcon.propTypes = {
  isMenuOpen: PropTypes.bool.isRequired
}

export default NavIcon;
