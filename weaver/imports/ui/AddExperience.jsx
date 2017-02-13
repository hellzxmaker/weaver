import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import { Meteor } from 'meteor/meteor';
import { Experiences } from '../api/experiences.js';

import { MuiThemeProvider } from 'material-ui';
import Done from 'material-ui/svg-icons/action/done';
import Clear from 'material-ui/svg-icons/content/clear';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import Snackbar from 'material-ui/Snackbar';

// App component - represents the whole app
export default class AddExperience extends Component {

  constructor(props) {
    super(props);

    this.state = {
      experienceDescription: '',
      openCreateSnackBar: false,
    };
  }

  onEnterSubmit(event) {
    if (event.charCode == 13) {
      event.preventDefault();
      const description = this.state.experienceDescription;

      Meteor.call('experiences.insert', description);

      this.clearAddExperienceText();
      this.toggleCreateSnackBar();
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    const description = this.state.experienceDescription;

    Meteor.call('experiences.insert', description);

    this.clearAddExperienceText();
    this.toggleCreateSnackBar();
  }

  clearAddExperienceText() {
    this.setState({
      experienceDescription: '',
    });
  }

  toggleCreateSnackBar() {
    this.setState({
      openCreateSnackBar: !this.state.openCreateSnackBar,
    });
  }

  renderAddExperienceBar() {
    return (
      <div id="add-experience-bar-container" display="inline-block">
        <TextField
          hintText="Add an experience here..."
          style={{width: "90%", marginLeft: "40px", fontFamily: "Roboto"}}
          value={ this.state.experienceDescription }
          onChange={ e => this.setState({ experienceDescription: e.target.value })}
          onKeyPress={ !this.state.experienceDescription == '' ? this.onEnterSubmit.bind(this) : '' }
        />
      <IconButton
        style={{width: "auto"}}
        onTouchTap={ this.handleSubmit.bind(this) }
        tooltip="Save"
        touch={ true }
      >
          <Done hoverColor="green" />
        </IconButton>
      </div>
    );
  }

  renderCreateSnackBar() {
    return (
      <Snackbar
        open={this.state.openCreateSnackBar}
        message="Experience added to your list!"
        autoHideDuration={3000}
        onRequestClose={ this.toggleCreateSnackBar.bind(this) }
      />
    );
  }

  render() {
    return (
      <div>
        <span>
          { this.renderAddExperienceBar() }
        </span>
        <div>
          { this.renderCreateSnackBar() }
        </div>
      </div>
    );
  }

}
