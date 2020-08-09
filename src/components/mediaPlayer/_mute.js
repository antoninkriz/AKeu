import React, {Component} from "react";
import PropTypes from "prop-types";

class Mute extends Component {
  render() {
    return (
      <span className="button mute" onClick={this.props.handleClick}>
        {this.props.mediaMuted
          ? this.props.buttons.mute
          : this.props.buttons.unmute
        }
      </span>
    );
  }
}

Mute.propTypes = {
  mediaMuted: PropTypes.bool.isRequired,
  handleClick: PropTypes.func.isRequired,
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
