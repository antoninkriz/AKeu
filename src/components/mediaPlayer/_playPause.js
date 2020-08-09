import React, {Component} from "react";
import PropTypes from "prop-types";

class PlayPause extends Component {
  render() {
    return (
      <span className={this.props.className + ' play'} onClick={this.props.onClick}>
        {this.props.mediaPlaying
          ? this.props.buttons.pause
          : this.props.buttons.play
        }
      </span>
    );
  }
}

PlayPause.propTypes = {
  className: PropTypes.string,
  mediaPlaying: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  buttons: PropTypes.shape({
    play: PropTypes.oneOfType([
      PropTypes.string.isRequired,
      PropTypes.element.isRequired
    ]).isRequired,
    pause: PropTypes.oneOfType([
      PropTypes.string.isRequired,
      PropTypes.element.isRequired
    ]).isRequired
  })
};

export default PlayPause;
