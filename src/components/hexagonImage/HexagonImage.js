import React from "react";
import PropTypes from "prop-types";
import classNames from "../../utils/classNames";

import "./HexagonImage.scss";

class HexagonImage extends React.Component {
  render() {
    const {
      className,
      size,
      shadow,
      alt,
      imageUrl
    } = this.props;

    return (
      <div className={
        classNames({
          [className]: !!className,
          'hex': true,
          'hex--shadow': shadow
        })
      } style={{
        width: size,
        height: size
      }}>
        <img className="hex__image" src={imageUrl} alt={alt}/>
      </div>
    );
  }
}

HexagonImage.propTypes = {
  className: PropTypes.string,
  size: PropTypes.oneOfType([
    PropTypes.string.isRequired, PropTypes.number.isRequired
  ]).isRequired,
  shadow: PropTypes.bool,
  alt: PropTypes.string,
  imageUrl: PropTypes.string.isRequired,
}

HexagonImage.defaultProps = {
  size: 'auto',
  shadow: false,
  alt: 'Hexagon Image'
}

export default HexagonImage;
