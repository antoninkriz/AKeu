import React from "react";
import {MediaPlayer, supportedFileTypes} from "../mediaPlayer/MediaPlayer";
import CodeBlock from "./_codeBlock";
import SvgIcon from "../svg/SvgIcon";
import {Link} from "react-router-dom";

/** Render root tag as a "section" with class "content" */
const rootRenderer = (props) => {
  return React.createElement("section", {className: props.className ? `${props.className} markdown` : 'markdown'}, props.children);
};

/** Renders code block with syntax highlighting */
const codeRenderer = CodeBlock;

/** Render image as a "figure" with "figcaption", video, or audio */
const imageRenderer = (props) => {
  if (!props.src)
    return null;

  let split = props.src.split(".");
  let ext = split[split.length - 1];
  if (supportedFileTypes.audio.indexOf(ext) !== -1 || supportedFileTypes.video.indexOf(ext) !== -1) {
    const buttons = {
      play: <SvgIcon icon="play" />,
      pause: <SvgIcon icon="pause" />,
      mute: <SvgIcon icon="volumeOn" />,
      unmute: <SvgIcon icon="volumeOff" />
    };

    const captions = {
      title: props.title,
      subtitle: props.alt
    };

    return (
      <MediaPlayer src={props.src} buttons={buttons} captions={captions} />
    );
  } else {
    return (
      <figure>
        <div className="wrapper">
          <img alt="" {...props} />
        </div>
        {
          props.title ?
            <figcaption>
              <span>{props.title}</span>
              {props.alt ? <span>{props.alt}</span> : null}
            </figcaption>
            :
            null
        }
      </figure>
    );
  }
};

/** Render paragraph make images as their own elements */
// Makes paragraph key somehow unique
let pCount = 0;
const paragraphRenderer = (props) => {

  let returnVal = [];
  let temp = React.createElement("p", Object.assign({key: ("paragraph-" + pCount)}, getCoreProps(props)), []);

  props.children.forEach(obj => {
    if (typeof (obj) !== "string") {
      if (obj.key.startsWith("image")) {
        if (temp.props.children.length > 0) {
          returnVal.push(temp);
          pCount++;
          temp = React.createElement("p", Object.assign({key: ("paragraph-" + pCount)}, getCoreProps(props)), []);
        }

        returnVal.push(obj);
      } else {
        temp.props.children.push(obj);
      }
    } else {
      temp.props.children.push(obj);
    }
  });

  if (temp.props.children.length > 0) {
    returnVal.push(temp);
  }

  return (returnVal);
};

const linkRenderer = (props) => {
  if (!props.href)
    return null;

  return (
    /^https?:\/\//i.test(props.href) ? (
      <a href={props.href} target="_blank" rel="noopener noreferrer">{props.children}</a>
    ) : (
      <Link to={props.href}>{props.children}</Link>
    )
  );
}

/** Render heading, allowed only lvl1-3, lvl1 = h2, lvl2 = h3, lvl3 = h4, lvlX = paragraph  */
// eslint-disable-next-line no-unused-vars
const headingRenderer = (props) => {
  if (props.level > 3) {
    props.children.unshift('#'.repeat(props.level) + ' ');
    return React.createElement(`p`, getCoreProps(props), props.children);
  }

  return React.createElement(`h${props.level + 1}`, getCoreProps(props), props.children);
};

/** Get core props - code from default react-markdown source */
const getCoreProps = (props) => {
  return props['data-sourcepos'] ? {'data-sourcepos': props['data-sourcepos']} : {};
};

/** Objects containing renderers */
const renderers = {
  root: rootRenderer,
  code: codeRenderer,
  image: imageRenderer,
  imageReference: imageRenderer,
  paragraph: paragraphRenderer,
  link: linkRenderer
};

export default renderers;
