import React, {Component} from "react";
import PropTypes from "prop-types";

import {secondsToMinutesSeconds} from "../../utils/date";
import ProgressBar from "./_progressBar"
import PlayPause from "./_playPause"
import Mute from "./_mute";

export const supportedFileTypes = {
  audio: [
    "ogg", "oga", "aac", "flac", "vaw", "mp3"
  ],
  video: [
    "webm", "ogv", "mp4"
  ]
};

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
        this.state.mediaType = "audio";
      } else if (indexVideo !== -1) {
        this.state.mediaType = "video";
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
    this.addEventListeners();
  }

  addEventListeners = () => {
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
  };

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
    let ui, title;
    if (this.state.message) {
      ui = (
        <div className="ui message">
          <span>{this.state.message}</span>
        </div>
      );
    } else {
      if (this.state.duration) {
        ui = (
          <div className="ui">
            <span className="progress">
              {secondsToMinutesSeconds(this.state.duration * this.state.progress)}
            </span>
            <ProgressBar
              progress={this.state.progress}
              setTime={this.setTime} />
            <span className="duration">
              {secondsToMinutesSeconds(this.state.duration)}
            </span>
            <Mute
              handleClick={this.toggleAudio}
              mediaMuted={this.state.muted}
              buttons={this.props.buttons} />
            <PlayPause
              handleClick={this.togglePlay}
              mediaPlaying={this.state.playing}
              buttons={this.props.buttons} />
          </div>
        );
      } else {
        ui = (
          <div className="ui loading">
            <span>{this.props.messages.loading}</span>
          </div>
        );
      }
    }

    if (this.props.captions.title) {
      title = (
        <div className="captions">
          <span>{this.props.captions.title}</span>
          {
            this.props.captions.subtitle ?
              <span>{this.props.captions.subtitle}</span>
              :
              null
          }
        </div>
      );
    }

    return (
      <div className={"mediaPlayer" + (this.state.duration ? " loading" : "") + (" " + this.state.mediaType)}>
        <div className="media">
          {
            this.state.mediaType === "audio" ?
              (
                <audio ref={this.media} preload="metadata" />
              )
              :
              <video ref={this.media} preload="metadata" controls />
          }
          {this.state.mediaType === "audio" ? ui : null}
        </div>
        {title ? title : null}
      </div>
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
