import React from "react";
import PropTypes from "prop-types";

// Icons
import icons from "./_icons";

class SvgIcon extends React.PureComponent {
  render() {
    const icon = icons[this.props.icon];
    return icon.f({svg: {
      className: icon.color.join(' ')
      }});
  }
}

SvgIcon.propTypes = {
  icon: PropTypes.oneOf(Object.keys(icons)).isRequired
}

export default SvgIcon;
