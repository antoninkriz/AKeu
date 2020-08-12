import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import copy from "copy-to-clipboard";
import {withRouter} from "react-router-dom";

// Redux
import {getProfile} from "../../redux/actions/userActions";

// Components
import SvgIcon from "../../components/svg/SvgIcon"

import "./ContactMe.scss";
import {Helmet} from "react-helmet";

class ContactMe extends React.Component {
  copyEmail() {
    copy(this.props.profile.email);
  }

  componentDidMount() {
    // Update only when required
    if (Object.keys(this.props.profile).filter(k => this.props.profile[k].length > 0).length === 0)
      this.props.getProfile();
  }

  render() {
    const profile = this.props.profile;

    return (
      <div className="contacts">
        <Helmet>
          <title>Contact Me | Antonín Kříž</title>
          <meta name="description" content="Contacts Antonín Kříž - web and mobile developer and a student. Email, link to LinkedIn, GitHub and Keybase." />
          <link rel="canonical" href={`https://www.antoninkriz.eu${this.props.location.pathname}`} />
        </Helmet>
        <h1 className="contacts__title">Contact Me</h1>
        <a className="contacts__email" href={`mailto:${profile.email}`} onClick={this.copyEmail.bind(this)}>
          {profile.email}
        </a>
        <div className="contacts__links">
          <a className="contacts__links__link" href={profile.linkedin} target="_blank" rel="noopener noreferrer">
            <SvgIcon icon="linkedin"/>
          </a>
          <a className="contacts__links__link" href={profile.github} target="_blank" rel="noopener noreferrer">
            <SvgIcon icon="github"/>
          </a>
          <a className="contacts__links__link" href={profile.keybase} target="_blank" rel="noopener noreferrer">
            <SvgIcon icon="keybase"/>
          </a>
        </div>
      </div>
    )
  }
}

ContactMe.propTypes = {
  getProfile: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  profile: PropTypes.shape({
    email: PropTypes.string.isRequired,
    linkedin: PropTypes.string.isRequired,
    github: PropTypes.string.isRequired,
    keybase: PropTypes.string.isRequired
  }).isRequired
}

const mapStateToProps = (state) => ({
  loading: state.ui.loading,
  profile: state.user.profile
});

export default connect(
  mapStateToProps,
  {getProfile}
)(withRouter(ContactMe));
