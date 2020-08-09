import React from "react";

// Utils
import {dateToHumanDuration, dateToYear, dateToYearMonths} from "../../utils/date";

// Components
import SectionTimeline from "./_sectionTimeline";
import SectionArticles from "./_sectionArticles";
import SectionItems from "./_sectionItems";

import "./Resume.scss";

class Resume extends React.Component {
  constructor(props) {
    super(props);

    // TODO: Request data from a server
    this.state = {
      experience: [
        {
          position: 'Web Developer',
          name: 'Alza.cz',
          logo: 'https://www.antoninkriz.eu/assets/images/logo/alza.png',
          link: 'https://www.alza.cz',
          from: new Date('2017-07'),
          to: null,
          place: 'Prague',
          text: 'This is some short description lorem ipsum dolor sit amet',
          stack: [
            ['C#', 'ASP.Net', '.Net Core'],
            ['React', 'JavaScript', 'TypeScript', 'jQuery'],
            ['SCSS / SASS', 'LESS', 'HTML5'],
            ['SQL', 'T-SQL'],
            ['JetBrains WebStorm', 'Microsoft Visual Studio', 'SQL Server Management Studio', 'Storybook'],
            ['Jira', 'MS Teams']
          ]
        },
        {
          position: 'Web Developer',
          name: 'Alza.cz',
          logo: 'https://www.antoninkriz.eu/assets/images/logo/alza.png',
          link: 'https://www.alza.cz',
          from: new Date('2017-07'),
          to: null,
          place: 'Prague',
          text: 'This is some short description lorem ipsum dolor sit amet',
          stack: [
            ['C#', 'ASP.Net', '.Net Core'],
            ['React', 'JavaScript', 'TypeScript', 'jQuery'],
            ['SCSS / SASS', 'LESS', 'HTML5'],
            ['SQL', 'T-SQL'],
            ['JetBrains WebStorm', 'Microsoft Visual Studio', 'SQL Server Management Studio', 'Storybook'],
            ['Jira', 'MS Teams']
          ]
        }
      ],
      education: [
        {
          name: 'FIT CTU',
          logo: 'https://www.antoninkriz.eu/assets/images/logo/cvut.png',
          link: 'https://fit.cvut.cz',
          from: new Date('2019'),
          to: new Date('2020'),
          place: 'Prague',
          text: '» 3rd semester // TODO\n' +
            '\n' +
            '✓ 2nd semester\n' +
            '• C++ - programming and OOP, 2nd place out of 654 students\n' +
            '• C# - .Net Framework, ASP.Net, WPF\n' +
            '• Python - numpy, Pandas\n' +
            '• Databases - Oracle SQL, database design\n' +
            '• Linear Algebra\n' +
            '• Assembler/ Computer structures and architectures\n' +
            '\n' +
            '✓ 1st semester\n' +
            '• C - programming and algorithms, 26th place out of 834 students\n' +
            '• Bash Shell scripting and programming\n' +
            '• Linux basics\n' +
            '• Electronics - Digital and Analog Circuits\n' +
            '• Elements of Calculus\n' +
            '• Mathematical logic',
        },
        {
          name: 'FIT CTU',
          logo: 'https://www.antoninkriz.eu/assets/images/logo/cvut.png',
          link: 'https://fit.cvut.cz',
          from: new Date('2019'),
          to: new Date('2020'),
          place: 'Prague',
          text: '» 3rd semester // TODO\n' +
            '\n' +
            '✓ 2nd semester\n' +
            '• C++ - programming and OOP, 2nd place out of 654 students\n' +
            '• C# - .Net Framework, ASP.Net, WPF\n' +
            '• Python - numpy, Pandas\n' +
            '• Databases - Oracle SQL, database design\n' +
            '• Linear Algebra\n' +
            '• Assembler/ Computer structures and architectures\n' +
            '\n' +
            '✓ 1st semester\n' +
            '• C - programming and algorithms, 26th place out of 834 students\n' +
            '• Bash Shell scripting and programming\n' +
            '• Linux basics\n' +
            '• Electronics - Digital and Analog Circuits\n' +
            '• Elements of Calculus\n' +
            '• Mathematical logic',
        },
      ],
      projects: [
        {
          title: 'PedF CUNI - User-friendly Recognition of Completion of Courses',
          logo: 'https://www.antoninkriz.eu/assets/images/content/karolinka/logo.png',
          link: 'karolinka',
          description: 'High-school seminary work written as microservices in NetCore, Angular and deployed using Docker',
        },
        {
          title: 'PedF CUNI - User-friendly Recognition of Completion of Courses',
          logo: 'https://www.antoninkriz.eu/assets/images/content/karolinka/logo.png',
          link: 'karolinka',
          description: 'High-school seminary work written as microservices in NetCore, Angular and deployed using Docker',
        },
        {
          title: 'PedF CUNI - User-friendly Recognition of Completion of Courses',
          logo: 'https://www.antoninkriz.eu/assets/images/content/karolinka/logo.png',
          link: 'karolinka',
          description: 'High-school seminary work written as microservices in NetCore, Angular and deployed using Docker',
        }
      ],
      certifications: [
        {
          title: 'Front End Libraries',
          from: 'freeCodeCamp',
          when: new Date('2020-07'),
          logo: 'https://media-exp1.licdn.com/dms/image/C560BAQHli6etYJTCrA/company-logo_100_100/0?e=1605139200&v=beta&t=cx38WLKM_B4H2QVhXT99dO3Txt88cJzxnIbCK88dS-Y',
          link: 'karolinka',
        },
        {
          title: 'Front End Libraries',
          from: 'freeCodeCamp',
          when: new Date('2020-07'),
          logo: 'https://media-exp1.licdn.com/dms/image/C560BAQHli6etYJTCrA/company-logo_100_100/0?e=1605139200&v=beta&t=cx38WLKM_B4H2QVhXT99dO3Txt88cJzxnIbCK88dS-Y',
          link: 'karolinka',
        },
      ],
      accomplishments: [
        {
          title: '#hack19 - Flutter Hackathon Prague - 2nd place',
          logo: 'https://www.antoninkriz.eu/assets/images/logo/flutterhack19.png',
          description: '#hack19 Prague was a Flutter hackathon organized by Inventi <Labs/>. Vitaliy Misurenko and I had a few hours to pitch some flutter-community related idea, build an app and present it. To that point, both Vitaliy and I haven\'t really worked with Flutter before, so learning on the go with a short deadline was a really interesting experience.',
        }
      ],
      stack: [
        ['React', 'C#', 'React', 'C#'],
        ['React', 'C#'],
        ['React', 'C#', 'React', 'C#', 'React', 'C#', 'React', 'C#', 'React', 'C#', 'React', 'C#']
      ],
      languages: [
        {
          title: 'Czech',
          text: 'Native / Mother tongue'
        },
        {
          title: 'English',
          text: 'Full professional proficiency'
        },
        {
          title: 'Slovak',
          text: 'Professional working proficiency'
        },
        {
          title: 'German',
          text: 'Limited proficiency'
        },
      ],
      other: [
        {
          title: 'Driver\'s licence',
          text: 'Type B, not an active driver'
        },
      ]
    }
  }


  render() {
    const experience = this.state.experience.map(x => ({
      title: `${x.position} @ ${x.name}`,
      logo: x.logo,
      name: x.name,
      link: x.link,
      duration: `${dateToHumanDuration(x.from, x.to)} • ${dateToYearMonths(x.from)} – ${x.to ? dateToYearMonths(x.to) : 'now'}`,
      description: x.text,
      stack: x.stack
    }));

    const education = this.state.education.map(x => ({
      title: x.name,
      logo: x.logo,
      name: x.name,
      link: x.link,
      duration: `${dateToYear(x.from)} – ${dateToYear(x.to)}`,
      description: x.text
    }));

    const certifications = this.state.certifications.map(x => ({
      title: `${x.title} – ${x.from}`,
      logo: x.logo,
      name: x.title,
      link: x.link,
      date: dateToYearMonths(x.when)
    }));

    return (
      <div className="resume">
        <h1 className="resume__title">CV</h1>
        <SectionTimeline title="EXPERIENCE" events={experience}/>
        <SectionTimeline title="EDUCATION" events={education}/>
        <SectionArticles title="PROJECTS" articles={this.state.projects}/>
        <SectionArticles title="CERTIFICATIONS" articles={certifications} readMore="LINK"/>
        <SectionArticles title="HONORS/AWARDS" articles={this.state.accomplishments}/>
        <SectionItems title="TECH STACK" items={this.state.stack} type="enum"/>
        <SectionItems title="LANGUAGES" items={this.state.languages} type="titled"/>
      </div>
    );
  }
}

export default Resume;