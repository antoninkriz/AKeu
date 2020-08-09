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
    const {className, progress} = this.props;

    return (
      <div className={className ?? 'bar'} onMouseUp={this.mouseDown}>
        <div className={className ? `${className}__time` : 'bar__time'} style={{width: (progress * 100) + "%"}} />
      </div>
    );
  }
}

ProgressBar.propTypes = {
  className: PropTypes.string,
  progress: PropTypes.number.isRequired,
  setTime: PropTypes.func.isRequired
};

export default ProgressBar;
