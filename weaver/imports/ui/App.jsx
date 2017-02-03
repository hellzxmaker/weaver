import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import { Experiences } from '../api/experiences.js';

import { MuiThemeProvider } from 'material-ui';
import NavBar from './NavBar.jsx';
import Experience from './Experience.jsx';

// App component - represents the whole app
class App extends Component {

  constructor(props) {
    super(props);
  }

  renderExperiences() {
    return this.props.experiences.map(( experience ) => (
      <Experience key={ experience._id } experience={ experience } />
    ));
  }

  renderNavBar() {
    return (
      <MuiThemeProvider>
        <NavBar/>
      </MuiThemeProvider>
    );
  }

  render() {
    return (
    <div id="main">
      <div id="app-component">
        { this.renderNavBar() }
      </div>
      <div>
        <ul>
          { this.renderExperiences() }
        </ul>
      </div>
    </div>
    );
  }
}

App.propTypes = {
  experiences: PropTypes.array.isRequired,
};

export default createContainer(() => {
  return {
    experiences: Experiences.find({}, { sort: { createdAt: -1 } }).fetch(),
  };
}, App);
