import React from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";

// Redux
import {getProfile} from "../../redux/actions/userActions";

import './Home.scss';

class Home extends React.Component {
  componentDidMount() {
    this.props.getProfile();
  }

  render() {
    return (
      <h1 style={{margin: 0}}>{this.props.loading ? 'LOADING' : 'HOME'}</h1>
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
  { getProfile }
)(Home);
