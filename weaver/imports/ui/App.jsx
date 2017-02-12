import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import { Meteor } from 'meteor/meteor';


import { Experiences } from '../api/experiences.js';
import AddExperience from './AddExperience.jsx';

import { MuiThemeProvider } from 'material-ui';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Dialog from 'material-ui/Dialog';
import NavBar from './NavBar.jsx';
import Experience from './Experience.jsx';
import LoginDialog from './LoginDialog.jsx';

// App component - represents the whole app
class App extends Component {

  constructor(props) {
    super(props);
  }


  renderLoginDialog() {
    return (
      <LoginDialog/>
    );
  }

  renderExperiences() {
    let filteredExperiences = this.props.experiences;
    if (null != Meteor.user()) {
      filteredExperiences = filteredExperiences.filter(experience => experience.email == Meteor.user().emails[0].address );
    } else {
      return '';
    }
    return filteredExperiences.map(( experience ) => (
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

  renderAddExperience() {
    return (
      <MuiThemeProvider>
        <AddExperience />
      </MuiThemeProvider>
    );
  }

  renderExperienceList() {
    return(
      <MuiThemeProvider>
      <List>
          { this.renderExperiences() }
      </List>
      </MuiThemeProvider>
    );
  }

  render() {
    return (
      <div id="main">
        <div id="navbar-component">
          { this.renderNavBar() }
        </div>
        <span id="add-exp-component">
          { this.renderAddExperience() }
        </span>
        <div>
          <ul>
            { this.props.currentUser ? this.renderExperienceList() : '' }
          </ul>
        </div>
      </div>
    );
  }
}

App.propTypes = {
  experiences: PropTypes.array.isRequired,
  currentUser: PropTypes.object,
};

export default createContainer(() => {
  return {
    experiences: Experiences.find({}, { sort: { createdAt: -1 } }).fetch(),
    currentUser: Meteor.user(),
  };
}, App);
