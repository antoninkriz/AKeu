import React from "react";

import "./NotFound.scss";

class NotFound extends React.Component {
  render() {
    return (
      <section className="notfound">
        <h1 className="notfound__title">404</h1>
        <span className="notfound__oopsie">OOPSIE WOOPSIE!!</span>
        <p className="notfound__fucky">Uwu we made a fucky wucky! A little fucko boingo! The code monekeys at our headquarters are working vewy hawd to fix this!</p>
        <a className="notfound__link" href="https://knowyourmeme.com/memes/oopsie-woopsie" target="_blank" rel="noopener noreferrer">what the fuck?</a>
      </section>
    );
  }
}

export default NotFound;
