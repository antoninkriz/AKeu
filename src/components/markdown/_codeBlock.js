import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import hljs from "highlight.js";

export default class CodeBlock extends PureComponent {
  static defaultProps = {
    language: ""
  };

  static propTypes = {
    value: PropTypes.string,
    language: PropTypes.string
  };

  constructor(props) {
    super(props);
    this.codeEl = React.createRef();
  }

  componentDidMount() {
    if (this.props.language)
      this.highlightCode()
  }

  componentDidUpdate() {
    if (this.props.language)
      this.highlightCode()
  }

  highlightCode() {
    hljs.highlightBlock(this.codeEl.current)
  }

  render() {
    return (
      <pre>
                <code ref={this.codeEl} className={this.props.language ? `language-${this.props.language}` : "hljs"}>
                    {this.props.value}
                </code>
            </pre>
    )
  }
}
