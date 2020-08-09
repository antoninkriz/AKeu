import React, {Component} from "react";
import PropTypes from "prop-types";

class PlayPause extends Component {
  render() {
    return (
      <span className="button play" onClick={this.props.handleClick}>
        {this.props.mediaPlaying
          ? this.props.buttons.pause
          : this.props.buttons.play
        }
      </span>
    );
  }
}

PlayPause.propTypes = {
  mediaPlaying: PropTypes.bool.isRequired,
  handleClick: PropTypes.func.isRequired,
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
