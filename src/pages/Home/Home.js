import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {Parallax, ParallaxLayer} from "react-spring/renderprops-addons";
import Typist from "react-typist";

// Utils
import windowUnit from "../../utils/windowUnit";
import isMobile from "../../utils/isMobile";

// Redux
import {getProfile} from "../../redux/actions/userActions";

// Components
import HexagonImage from "../../components/hexagonImage/HexagonImage";

import './Home.scss';

const getSwooshParams = () => {
  let width = (.5 + Math.random()) * 50;
  let horizon = `${100 * Math.random()}%`;
  let offset = 1 + Math.random();
  let speed = (Math.random() * .5) - .25;

  if (offset + speed < 1)
    speed = -speed;

  return {
    offset: offset,
    speed: speed,
    style: {
      position: 'absolute',
      left: horizon,
      width: width
    }
  };
}

class Home extends React.Component {
  componentDidMount() {
    this.props.getProfile();
  }

  render() {
    const {text, photo} = this.props.profile;

    const svg = [];
    for (let i = 0; i < 50; i++)
      svg.push(
        <ParallaxLayer key={i} {...getSwooshParams()}>
          <img src="/svg/swoosh.svg" alt=""/>
        </ParallaxLayer>
      );

    return (
      <div className="home">
        <Parallax pages={2}>
          {!isMobile() && svg}
          <ParallaxLayer offset={0} speed={-.2}>
            <section className="home__hello">
              <div className="home__hello__content">
                {text &&
                <Typist avgTypingDelay={40} cursor={{
                  show: true,
                  blink: false,
                  element: '_',
                  hideWhenDone: true,
                  hideWhenDoneDelay: 500
                }}>{text}</Typist>
                }
              </div>
              <div className="home__hello__photo">
                <HexagonImage imageUrl={photo} size={`20${windowUnit()}`}/>
              </div>
            </section>
          </ParallaxLayer>
          <ParallaxLayer offset={1} speed={.2}>
            <section className="home__section">
              <div className="home__section__content">
                <div className="home__section__content__heading">
                  <div className="home__section__content__heading__title">Who am I?</div>
                  <div className="home__section__content__heading__buttons">
                    <div
                      className="home__section__content__heading__buttons__button home__section__content__heading__buttons__button--green"/>
                    <div
                      className="home__section__content__heading__buttons__button home__section__content__heading__buttons__button--orange"/>
                    <div
                      className="home__section__content__heading__buttons__button home__section__content__heading__buttons__button--red"/>
                  </div>
                </div>
                <div className="home__section__content__body">
                  <h1>Hi</h1> {/* TODO add to API */}
                  <p>
                    I'm Antonín Kříž, 21 y.o. web developer from Prague, Czech Republic and a student at FIT CTU.<br/>
                    I mainly focus on both front-end and back-end web development, but I have experience with and
                    passion for mobile development too!
                    I have over 3 years of professional experience and many more as a hobbyist.<br/>
                    If you want to talk feel free to contact me <Link to="/contact-me">here</Link>
                  </p>
                </div>
              </div>
            </section>
          </ParallaxLayer>
        </Parallax>
      </div>
    );
  }
}

Home.propTypes = {
  getProfile: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  profile: PropTypes.shape({
    text: PropTypes.string.isRequired,
    photo: PropTypes.string.isRequired
  }).isRequired
}

const mapStateToProps = (state) => ({
  loading: state.ui.loading,
  profile: state.user.profile
});

export default connect(
  mapStateToProps,
  {getProfile}
)(Home);
