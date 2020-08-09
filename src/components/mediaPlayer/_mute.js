import React, {Component} from "react";
import PropTypes from "prop-types";

class Mute extends Component {
  render() {
    return (
      <span className={this.props.className + ' mute'} onClick={this.props.onClick}>
        {this.props.mediaMuted
          ? this.props.buttons.unmute
          : this.props.buttons.mute
        }
      </span>
    );
  }
}

Mute.propTypes = {
  className: PropTypes.string,
  mediaMuted: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  buttons: PropTypes.shape({
    mute: PropTypes.oneOfType([
      PropTypes.string.isRequired,
      PropTypes.element.isRequired
    ]).isRequired,
    unmute: PropTypes.oneOfType([
      PropTypes.string.isRequired,
      PropTypes.element.isRequired
    ]).isRequired
  })
};

export default Mute;
