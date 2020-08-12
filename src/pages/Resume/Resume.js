import React from "react";
import {connect} from "react-redux";
import {Helmet} from "react-helmet";

// Utils
import {dateToHumanDuration, dateToYear, dateToYearMonths} from "../../utils/date";

// Redux
import {getResume} from "../../redux/actions/dataActions";

// Components
import SectionTimeline from "./_sectionTimeline";
import SectionArticles from "./_sectionArticles";
import SectionItems from "./_sectionItems";

import "./Resume.scss";

class Resume extends React.Component {
  componentDidMount() {
    // Update only when required
    if (Object.keys(this.props.resume).filter(k => this.props.resume[k].length > 0).length === 0)
      this.props.getResume();
  }

  render() {
    const resume = this.props.resume;

    const experience = resume.experience.map(x => ({
      title: `${x.position} @ ${x.name}`,
      logo: x.logo,
      name: x.name,
      link: x.link,
      duration: `${dateToHumanDuration(x.from, x.to)} • ${dateToYearMonths(x.from)} – ${x.to ? dateToYearMonths(x.to) : 'now'}`,
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

    const certifications = resume.certifications.map(x => ({
      title: `${x.title} – ${x.from}`,
      logo: x.logo,
      name: x.title,
      link: x.link,
      date: dateToYearMonths(x.when)
    }));

    return (
      <div className="resume">
        <h1 className="resume__title">CV</h1>
        <Helmet>
          <title>Resume | Antonín Kříž</title>
          <meta name="description" content="Resume of Antonín Kříž - web and mobile developer and a student. Work experience, education, projects, certifications, awards and more." />
        </Helmet>
        <SectionTimeline title="EXPERIENCE" events={experience}/>
        <SectionTimeline title="EDUCATION" events={education}/>
        <SectionArticles title="PROJECTS" articles={resume.projects}/>
        <SectionArticles title="CERTIFICATIONS" articles={certifications} readMore="LINK"/>
        <SectionArticles title="HONORS/AWARDS" articles={resume.accomplishments}/>
        <SectionItems title="TECH STACK" items={resume.stack} type="enum"/>
        <SectionItems title="LANGUAGES" items={resume.languages} type="titled"/>
        <SectionItems title="OTHER" items={resume.other} type="titled"/>
      </div>
    );
  }
}


const mapStateToProps = (state) => ({
  loading: state.ui.loading,
  resume: state.data.resume
});

export default connect(
  mapStateToProps,
  {getResume}
)(Resume);
