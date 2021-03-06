import React from "react";
import {connect} from "react-redux";
import {Helmet} from "react-helmet";
import PropTypes from "prop-types";
import {withRouter} from "react-router-dom";

// Utils
import {dateToHumanDuration, dateToYear, dateToYearMonths} from "../../utils/date";

// Redux
import {getResume} from "../../redux/actions/dataActions";
import {getProfile} from "../../redux/actions/userActions";

// Components
import HexagonImage from "../../components/hexagonImage/HexagonImage";
import SectionTimeline from "./_sectionTimeline";
import SectionArticles from "./_sectionArticles";
import SectionItems from "./_sectionItems";
import SvgIcon from "../../components/svg/SvgIcon";

import "./Print.scss";

class Print extends React.Component {
  componentDidMount() {
    // Update only when required
    const profileKeys = Object.keys(this.props.profile)
    if (profileKeys.filter(k => this.props.profile[k].length > 0).length !== profileKeys.length)
      this.props.getProfile();

    // Update only when required
    if (Object.keys(this.props.resume).filter(k => this.props.resume[k].length > 0).length === 0)
      this.props.getResume();
  }

  render() {
    const profile = this.props.profile;
    const resume = this.props.resume;

    const experience = resume.experience.map(x => ({
      title: `${x.position}`,
      logo: x.logo,
      name: x.name,
      link: x.link,
      duration: `${x.name} | ${dateToHumanDuration(x.from, x.to)} • ${dateToYearMonths(x.from)} – ${x.to ? dateToYearMonths(x.to) : 'now'}`,
      description: x.text,
      stack: x.stack
    }));

    const education = resume.education.map(x => ({
      title: x.name,
      logo: x.logo,
      name: x.name,
      link: x.link,
      duration: `${dateToYear(x.from)} – ${dateToYear(x.to)}`,
      description: x.text
    }));

    const activities = resume.activities.map(x => ({
      title: x.name,
      logo: x.logo,
      name: x.name,
      link: x.link,
      duration: `${dateToYearMonths(x.from)} – ${x.to ? dateToYearMonths(x.to) : 'now'}`,
      description: x.text
    }));

    const accomplishments = resume.accomplishments.map(x => ({
      ...x,
      description: ''
    }));

    return (
      <div className="print">
        <Helmet>
          <title>Print resume | Antonín Kříž</title>
          <meta name="description" content="Printer friendly version of a CV of Antonín Kříž - web and mobile developer and a student." />
          <link rel="canonical" href={`https://www.antoninkriz.eu${this.props.location.pathname}`} />
        </Helmet>
        <aside className="aside">
          <div className="aside__photo">
            <HexagonImage imageUrl={profile.photo} size={`5cm`} />
          </div>
          <section className="aside__links">
            <a className="aside__links__link" href="https://www.antoninkriz.eu">
              <SvgIcon icon="cloud"/> www.antoninkriz.eu
            </a>
            <a className="aside__links__link" href={`mailto:${profile.email}`}>
              <SvgIcon icon="mail"/> {profile.email}
            </a>
            <a className="aside__links__link" href={profile.linkedin}>
              <SvgIcon icon="linkedin"/> {profile.linkedin.split('/').filter(x => x.length > 0).pop()}
            </a>
            <a className="aside__links__link" href={profile.github}>
              <SvgIcon icon="github"/> @{profile.github.split('/').filter(x => x.length > 0).pop()}
            </a>
          </section>
          <SectionItems title="LANGUAGES" items={resume.languages} type="titled"/>
          <SectionItems title="OTHER" items={resume.other} type="titled"/>
        </aside>
        <section className="resume">
          <h1 className="resume__title">Antonín Kříž</h1>
          <h2 className="resume__subtitle">Web Developer & Student</h2>
          <SectionTimeline title="EXPERIENCE" events={experience}/>
          <SectionTimeline title="EDUCATION" events={education}/>
          <SectionTimeline title="ACTIVITIES" events={activities}/>
          <SectionArticles title="HONORS/AWARDS" articles={accomplishments}/>
        </section>
      </div>
    );
  }
}

Print.propTypes = {
  getResume: PropTypes.func.isRequired,
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
  resume: state.data.resume,
  profile: state.user.profile
});

export default connect(
  mapStateToProps,
  {getResume, getProfile}
)(withRouter(Print));
