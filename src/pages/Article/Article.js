import React from 'react';
import PropTypes from "prop-types";
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";
import ReactMarkdown from "react-markdown";

// Utils
import renderers from "../../components/markdown/renderer";

// Redux
import {getPost} from "../../redux/actions/dataActions";

import "./Article.scss"
import {dateToYearMonths} from "../../utils/date";
import {Helmet} from "react-helmet";

class Article extends React.Component {
  componentDidMount() {
    const {id} = this.props.match.params;

    // Update only when required
    if (typeof this.props.posts[id] === "undefined" || Object.keys(this.props.posts[id]).filter(k => this.props.posts[id][k].length > 0).length === 0)
      this.props.getPost(id);
  }

  render() {
    const {id} = this.props.match.params;
    let post = this.props.posts[id];

    if (post === 404)
      return (<Redirect to="/404"/>);


    if (!post) {
      post = {
        title: "Loading...",
        description: "The post is loading...",
        createdAt: new Date(Date.now()),
        content: ""
      }
    }

    return (
      <article className="article">
        <Helmet>
          <title>{post.title} | Antonín Kříž</title>
          <meta name="description" content={`${post.description} - Antonín Kříž - web and mobile developer and a student.`} />
        </Helmet>
        <div className="article__title">
          <h1 className="article__title__text">{post.title}</h1>
        </div>
        <div className="article__wrapper">
          <span className="article__wrapper__date">{dateToYearMonths(post.createdAt)}</span>
          <ReactMarkdown className="article__wrapper__content" renderers={renderers} skipHtml={true} source={post.content}/>
        </div>
      </article>
    );
  }

}

Article.propTypes = {
  getPost: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  posts: PropTypes.objectOf(
    PropTypes.oneOfType([
      PropTypes.shape({
        createdAt: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired
      }),
      PropTypes.number
    ])
  ).isRequired
}

const mapStateToProps = (state) => ({
  loading: state.ui.loading,
  posts: state.data.posts
});

export default connect(
  mapStateToProps,
  {getPost}
)(Article);
