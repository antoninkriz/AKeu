import React from 'react';
import PropTypes from 'prop-types';

// Icons
import icons from './icons';

class SvgIcon extends React.PureComponent {
  render() {
    return icons[this.props.icon]({
      fill: this.props.color
    })
  }
}

SvgIcon.propTypes = {
  icon: PropTypes.oneOf(Object.keys(icons)).isRequired,
  color: PropTypes.string
}

export default SvgIcon;
