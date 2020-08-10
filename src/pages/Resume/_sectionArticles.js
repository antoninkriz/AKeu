import React from "react";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";

// Components
import SvgIcon from "../../components/svg/SvgIcon";

import "./_sections.scss"
import ReactMarkdown from "react-markdown";
import renderers from "../../components/markdown/renderer";

class SectionArticles extends React.Component {
  render() {
    return (
      <section className="section section--articles">
        <h2 className="section__title">{this.props.title}</h2>
        <div className="section__list">
          {this.props.articles.map((a, i) => (
            <article className="section__list__project" key={i}>
              <img className="section__list__project__logo" src={a.logo} alt={a.title} />
              <div className="section__list__project__content">
                {a.link ?
                  (/^https?:\/\//i.test(a.link) ? (
                      <a className="section__list__project__content__title section__list__project__content__title--link" href={a.link} target="_blank"
                         rel="noopener noreferrer">
                        <h3 className="section__list__project__content__title__text">{a.title}</h3>
                      </a>
                    ) : (
                      <Link className="section__list__project__content__title section__list__project__content__title--link" to={`/post/${a.link}`}>
                        <h3 className="section__list__project__content__title__text">{a.title}</h3>
                      </Link>
                    )
                  ) : (
                    <div className="section__list__project__content__title">
                      <h3 className="section__list__project__content__title__text">{a.title}</h3>
                    </div>
                  )
                }
                {a.date && (
                  <span className="section__list__project__content__date">{a.date}</span>
                )}
                {a.description && (
                  <ReactMarkdown renderers={renderers} skipHtml={true} className="section__list__project__content__description" source={a.description} />
                )}
                {a.link &&
                (/^https?:\/\//i.test(a.link) ? (
                    <a className="section__list__project__content__link" href={a.link} target="_blank" rel="noopener noreferrer">
                      {this.props.readMore} <SvgIcon icon="chevronRight" />
                    </a>
                  ) : (
                    <Link className="section__list__project__content__link" to={`/post/${a.link}`}>
                      {this.props.readMore} <SvgIcon icon="chevronRight" />
                    </Link>
                  )
                )}
              </div>
            </article>
          ))}
        </div>
      </section>
    );
  }
}

SectionArticles.defaultProps = {
  readMore: 'READ MORE'
}

SectionArticles.propTypes = {
  title: PropTypes.string.isRequired,
  articles: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      logo: PropTypes.string.isRequired,
      link: PropTypes.string,
      description: PropTypes.string,
      date: PropTypes.string
    })
  ).isRequired,
  readMore: PropTypes.string
}

export default SectionArticles;
