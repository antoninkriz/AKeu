import React from "react";
import PropTypes from "prop-types";

import "./_sections.scss"

class SectionItems extends React.Component {
  render() {
    return (
      <section className="section section--items">
        <h2 className="section__title">{this.props.title}</h2>
        <div className="section__items">
          {this.props.items.map((x, i) => (this.props.type === 'titled' ? (
            <article className="section__items__item" key={i}>
              <h3 className="section__items__item__title">{x.title}</h3>
              <p className="section__items__item__text">{x.text}</p>
            </article>
          ) : (
            <div className="section__items__row" key={i}>
              {x.map((t, j) => (
                <span className="section__items__row__token" key={j}>{t}</span>
              ))}
            </div>
          )))}
        </div>
      </section>
    );
  }
}

SectionItems.propTypes = {
  type: PropTypes.oneOf(['titled', 'enum']).isRequired,
  title: PropTypes.string.isRequired,
  items:
  PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired
      }),
      PropTypes.arrayOf(PropTypes.string.isRequired)
    ])
  ).isRequired,
  readMore: PropTypes.string
}

export default SectionItems;
