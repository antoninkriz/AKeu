import React from "react";
import {Helmet} from "react-helmet";
import {withRouter} from "react-router-dom";

import "./NotFound.scss";

class NotFound extends React.Component {
  render() {
    return (
      <section className="notfound">
        <Helmet>
          <title>404 | Antonín Kříž</title>
          <meta name="description" content="Page not found. Antonín Kříž - web and mobile developer and a student." />
          <link rel="canonical" href={`https://www.antoninkriz.eu${this.props.location.pathname}`} />
        </Helmet>
        <h1 className="notfound__title">404</h1>
        <span className="notfound__oopsie">OOPSIE WOOPSIE!!</span>
        <p className="notfound__fucky">UwU We made a fucky wucky!! A little fucko boingo! The code monekeys at our headquarters are working VEWY HAWD to fix this!</p>
        <a className="notfound__link" href="https://knowyourmeme.com/memes/oopsie-woopsie" target="_blank" rel="noopener noreferrer">what the fuck?</a>
      </section>
    );
  }
}

export default withRouter(NotFound);
