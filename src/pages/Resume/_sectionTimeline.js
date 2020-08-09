import React from "react";
import PropTypes from "prop-types";

import "./_sections.scss"

class SectionTimeline extends React.Component {
  render() {
    return (
      <section className="section section--timeline">
        <h2 className="section__title">{this.props.title}</h2>
        <div className="section__timeline">
          {this.props.events.map((e, i) => (
            <article className="section__timeline__event" key={i}>
              <img className="section__timeline__event__logo" src={e.logo} alt={e.name} />
              <div className="section__timeline__event__content">
                <a className="section__timeline__event__content__title section__timeline__event__content__title--link"
                   href={e.link} target="_blank" rel="noopener noreferrer">
                  <h3 className="section__timeline__event__content__title__text">{e.title}</h3>
                </a>
                <div className="section__timeline__event__content__duration">
                  {e.duration}
                </div>
                <div className="section__timeline__event__content__description">
                  <span className="section__timeline__event__content__stack__title">Description</span>
                  <p className="section__timeline__event__content__description__text">{e.description}</p>
                </div>
                {e.stack &&
                <div className="section__timeline__event__content__stack">
                  <span className="section__timeline__event__content__stack__title">Stack</span>
                  {e.stack.map((s, j) => (
                    <div className="section__timeline__event__content__stack__row" key={j}>
                      {s.map((t, k) => (
                        <span className="section__timeline__event__content__stack__row__item" key={k}>{t}</span>
                      ))}
                    </div>
                  ))}
                </div>
                }
              </div>
            </article>
          ))}
        </div>
      </section>
    );
  }
}

SectionTimeline.propTypes = {
  title: PropTypes.string.isRequired,
  events: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      logo: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      link: PropTypes.string.isRequired,
      duration: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      stack: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string.isRequired)),
    })
  ).isRequired
}

export default SectionTimeline;
