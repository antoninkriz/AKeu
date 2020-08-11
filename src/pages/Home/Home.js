import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {Parallax, ParallaxLayer} from "react-spring/renderprops-addons";
import Typist from "react-typist";
import {Helmet} from "react-helmet";
import ReactMarkdown from "react-markdown";

// Utils
import windowUnit from "../../utils/windowUnit";
import isMobile from "../../utils/isMobile";
import renderers from "../../components/markdown/renderer";

// Redux
import {getProfile} from "../../redux/actions/userActions";

// Components
import HexagonImage from "../../components/hexagonImage/HexagonImage";

import "./Home.scss";

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
  constructor(props) {
    super(props);

    this.updateDimensions = this.updateDimensions.bind(this);
  }

  updateDimensions() {
    this.setState({width: window.innerWidth, height: window.innerHeight});
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions);
  }

  componentDidMount() {
    window.addEventListener('resize', this.updateDimensions);

    // Update only when required
    if (Object.keys(this.props.profile).filter(k => this.props.profile[k].length > 0).length === 0)
      this.props.getProfile();
  }

  render() {
    const {text, whoAmI, photo} = this.props.profile;

    const svg = [];
    for (let i = 0; i < 50; i++)
      svg.push(
        <ParallaxLayer key={i} {...getSwooshParams()}>
          <img src="/svg/swoosh.svg" alt="" />
        </ParallaxLayer>
      );

    return (
      <div className="home">
        <Helmet>
          <title>Who am I | Antonín Kříž</title>
          <meta name="description" content="The personal website of Antonín Kříž - web and mobile developer and a student" />
        </Helmet>
        <h1 className="home__title">{isMobile() ? 'AK' : 'Antonín Kříž'}</h1>
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
                <HexagonImage imageUrl={photo} size={`20${windowUnit()}`} />
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
                      className="home__section__content__heading__buttons__button home__section__content__heading__buttons__button--green" />
                    <div
                      className="home__section__content__heading__buttons__button home__section__content__heading__buttons__button--orange" />
                    <div
                      className="home__section__content__heading__buttons__button home__section__content__heading__buttons__button--red" />
                  </div>
                </div>
                <div className="home__section__content__body">
                  <ReactMarkdown renderers={renderers} skipHtml={true} className="home__section__content__body__content" source={whoAmI}/>
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
