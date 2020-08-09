import React, {Component} from "react";
import PropTypes from "prop-types";

class ProgressBar extends Component {
  mouseDown = (e) => {
    let percentage = e.nativeEvent.offsetX / e.currentTarget.offsetWidth;

    if (percentage > 1) {
      percentage = 1;
    }
    if (percentage < 0) {
      percentage = 0;
    }

    this.props.setTime(percentage);
  };

  render() {
    return (
      <div className="progressBar" onMouseUp={this.mouseDown}>
        <div className="timeBar" style={{width: (this.props.progress * 100) + "%"}} />
      </div>
    );
  }
}

ProgressBar.propTypes = {
  progress: PropTypes.number.isRequired,
  setTime: PropTypes.func.isRequired
};

export default ProgressBar;
