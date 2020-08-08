import React from "react";

import "./Resume.scss";
import {dateToHumanDuration, dateToYearMonths} from "../../utils/date";

class Resume extends React.Component {
  constructor(props) {
    super(props);

    // TODO: Request data from a server
    this.state = {
      workplaces: [
        {
          position: 'Web Developer',
          name: 'Alza.cz',
          logo: 'https://www.antoninkriz.eu/assets/images/logo/alza.png',
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
      ]
    };
  }


  render() {
    return (
      <section className="resume">
        <div className="resume__timeline">
          {this.state.workplaces.map((w, i) => (
            <div className="resume__timeline__event" key={i}>
              <img className="resume__timeline__event__logo" src={w.logo} alt={w.name} />
              <div className="resume__timeline__event__content">
                <h3 className="resume__timeline__event__content__title">{w.position} @ {w.name}</h3>
                <div className="resume__timeline__event__content__duration">
                  {dateToHumanDuration(w.from, w.to)} • {dateToYearMonths(w.from)} – {w.to ? dateToYearMonths(w.to) : 'now'}
                </div>
                <div className="resume__timeline__event__content__description">
                  <span className="resume__timeline__event__content__stack__title">Description</span>
                  <p className="resume__timeline__event__content__description__text">{w.text}</p>
                </div>
                <div className="resume__timeline__event__content__stack">
                  <span className="resume__timeline__event__content__stack__title">Stack</span>
                  {w.stack.map((s, i) => (
                    <div className="resume__timeline__event__content__stack__row" key={i}>
                      {s.map((t, j) => (
                        <span className="resume__timeline__event__content__stack__row__item" key={j}>{t}</span>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }
}

export default Resume;
