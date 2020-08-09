import React, {Component} from "react";
import PropTypes from "prop-types";

import {secondsToMinutesSeconds} from "../../utils/date";
import ProgressBar from "./_progressBar"
import PlayPause from "./_playPause"
import Mute from "./_mute";
import classNames from "../../utils/classNames";

export const supportedFileTypes = {
  audio: [
    "ogg", "oga", "aac", "flac", "vaw", "mp3"
  ],
  video: [
    "webm", "ogv", "mp4"
  ]
};

const TYPE_AUDIO = 'AUDIO';
const TYPE_VIDEO = 'VIDEO';

export class MediaPlayer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      playing: false,
      muted: false,
      progress: 0,
      duration: 0,
      timeDrag: false,
      message: null,
      mediaType: null
    };

    let urlSplit = this.props.src.split(".");
    if (urlSplit.length === 0) {
      console.error("MediaPlayer: Invalid url");
      return;
    } else {
      let ext = urlSplit[urlSplit.length - 1];
      let indexAudio = supportedFileTypes.audio.indexOf(ext);
      let indexVideo = supportedFileTypes.video.indexOf(ext);

      if (indexAudio !== -1) {
        this.state.mediaType = TYPE_AUDIO;
      } else if (indexVideo !== -1) {
        this.state.mediaType = TYPE_VIDEO;
      } else {
        console.error("MediaPlayer: Invalid file type");
        return;
      }
    }

    this.media = React.createRef();

    this.togglePlay = this.togglePlay.bind(this);
    this.toggleAudio = this.toggleAudio.bind(this);
    this.setTime = this.setTime.bind(this);
  }

  componentDidMount() {
    this.media.current.src = this.props.src;

    this.media.current.addEventListener("error", () => {
      this.setState({message: this.props.messages.error});
    });

    this.media.current.addEventListener("pause", () => {
      this.setState({playing: false});
      this.media.current.pause();
    });

    this.media.current.addEventListener("loadedmetadata", () => {
      this.setState({duration: this.media.current.duration});
    });

    this.media.current.addEventListener("timeupdate", () => {
      this.updateProgress();
    });
  }

  updateProgress = () => {
    const {duration, currentTime} = this.media.current;
    const progress = (currentTime) / duration;

    this.setState({
      progress: progress
    });
  };

  toggleAudio = () => {
    this.media.current.muted = !this.state.muted;
    this.setState({muted: !this.state.muted});
  };

  togglePlay = () => {
    if (this.state.playing) {
      this.media.current.pause();
    } else {
      this.media.current.play();
    }

    this.setState({playing: !this.state.playing});
  };

  setTime = (percentage) => {
    if (!this.media.current.duration || !percentage)
      return;

    this.media.current.currentTime = this.media.current.duration * percentage;
  };

  render() {
    const {duration, mediaType, muted, playing, progress} = this.state;
    const {captions, buttons} = this.props;

    return (
      <figure className={classNames({
        'media': true,
        [`media--${mediaType.toLowerCase()}`]: true
      })}>
        {captions.title &&
        <figcaption className="media__caption">
          <span className="media__caption__title">{captions.title}</span>
          {captions.subtitle && <span className="media__caption__subtitle">{captions.subtitle}</span>}
        </figcaption>
        }
        {mediaType === TYPE_AUDIO ? (
          <div className="media__wrapper">
            <audio className="media__wrapper__content" ref={this.media} preload="metadata"/>
            <div className="media__wrapper__ui">
              <span className="media__wrapper__ui__progress">
                {secondsToMinutesSeconds(duration * progress)}
              </span>
              <ProgressBar
                className="media__wrapper__ui__bar"
                progress={progress}
                setTime={this.setTime}/>
              <span className="media__wrapper__ui__progress">
                {secondsToMinutesSeconds(duration)}
              </span>
              <Mute
                className="media__wrapper__ui__button"
                onClick={this.toggleAudio}
                mediaMuted={muted}
                buttons={buttons}/>
              <PlayPause
                className="media__wrapper__ui__button"
                onClick={this.togglePlay}
                mediaPlaying={playing}
                buttons={buttons}/>
            </div>
          </div>
        ) : (
          <div className="media__wrapper">
            <video className="media__wrapper__content" ref={this.media} preload="metadata" controls/>
          </div>
        )}
      </figure>
    );
  }
}

MediaPlayer.defaultProps = {
  captions: {
    title: null,
    subtitle: null
  },
  messages: {
    error: "Can not load the media",
    loading: "Loading media..."
  },
  buttons: {
    play: "Play",
    pause: "Pause",
    mute: "Mute",
    unmute: "Unmute"
  }
};

MediaPlayer.propTypes = {
  src: PropTypes.string.isRequired,
  text: PropTypes.shape({
    title: PropTypes.string,
    subtitle: PropTypes.string
  }),
  messages: PropTypes.shape({
    error: PropTypes.string,
    loading: PropTypes.string
  }),
  buttons: PropTypes.shape({
    play: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.element
    ]),
    pause: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.element
    ]),
    mute: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.element
    ]),
    unmute: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.element
    ])
  })
};
