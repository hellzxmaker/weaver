import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { Meteor } from 'meteor/meteor';

import { MuiThemeProvider } from 'material-ui';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import Done from 'material-ui/svg-icons/action/done';
import ArrowForward from 'material-ui/svg-icons/navigation/arrow-forward'
import Clear from 'material-ui/svg-icons/content/clear';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';

import { Experiences } from '../api/experiences.js';

export default class CreateExperienceDialog extends Component {

  constructor(props) {
    super(props);

    this.state = {
      showNewExperienceDialog: false,
      showIntroDialog: true,
      newExperienceName: '',
      newExperienceMetric: '',
      newExperienceValue: '',
    };
  }

  handleSubmit(event) {
    event.preventDefault();

    const name = this.state.newExperienceName;
    const metric = this.state.newExperienceMetric;
    const value = this.state.newExperienceValue;

    Meteor.call('experiences.insert', name, metric, value);

    this.closeMenus();
  }

  closeMenus() {
    this.setState({
      showIntroDialog: false,
      showNewExperienceDialog: false,
    });
  }

  toggleNewExperienceDialog() {
    this.setState({
      showNewExperienceDialog: !this.state.showNewExperienceDialog,
    });
  }

  toggleIntroDialog() {
    if (this.state.showIntroDialog == false) {
      this.setState({
        showIntroDialog: !this.state.showIntroDialog,
        showNewExperienceDialog: false,
      });
    } else {
        this.setState({
          showIntroDialog: !this.state.showIntroDialog,
        });
    }
  }

  getAddDataActions() {
    return actions = [
      <IconButton onTouchTap={ this.closeMenus.bind(this) } tooltip="Cancel">
        <Clear hoverColor="red" />
      </IconButton>,
      <IconButton onTouchTap={ this.handleSubmit.bind(this) } tooltip="Save">
        <Done hoverColor="green" />
      </IconButton>,
    ];
  }

  getInitalPageActions() {
    return actions = [
      <IconButton onTouchTap={ this.closeMenus.bind(this) } tooltip="Cancel">
        <Clear hoverColor="red" />
      </IconButton>,
      <IconButton onTouchTap={ this.toggleNewExperienceDialog.bind(this) } tooltip="Next">
        <ArrowForward hoverColor="green" />
      </IconButton>,
    ];
  }

  renderNewExperienceDialog() {
    if (this.state.showNewExperienceDialog) {
      return (
        <div>
          <MuiThemeProvider>
          <Dialog
            title="Experience Details?"
            actions={ this.getAddDataActions() }
            modal={ false }
            open={ this.state.showNewExperienceDialog }
            onRequestClose={ this.toggleNewExperienceDialog.bind(this) }
            onSubmit={ this.handleSubmit.bind(this), this.toggleNewExperienceDialog.bind(this) }
          >
            What metric can we use to track your success?
            <p></p>
            <TextField
              hintText="metric"
              value={ this.state.newExperienceMetric }
              onChange={ e => this.setState({ newExperienceMetric: e.target.value })}
              onSubmit={ this.toggleNewExperienceDialog.bind(this) }
            />
            <p></p>
            Have you already started?
            <p></p>
            <TextField
              hintText="initial experience"
              value={ this.state.newExperienceValue }
              onChange={ e => this.setState({ newExperienceValue: e.target.value })}
              onSubmit={ this.toggleNewExperienceDialog.bind(this) }
            />
          </Dialog>
        </MuiThemeProvider>
        </div>
      );
    } else {
        return (
            <div>
            <Dialog
              title="Let's add an experience"
              actions={ this.getInitalPageActions() }
              modal={ false }
              open={ this.state.showIntroDialog }
              onRequestClose={ this.toggleIntroDialog.bind(this) }
              onSubmit={ this.handleSubmit.bind(this), this.toggleIntroDialog.bind(this) }
            >
              What can we call your experience?
              <p></p>
              <TextField
                 hintText="Ex: Cisco Systems Admin"
                 value={ this.state.newExperienceName }
                 onChange={ e => this.setState({ newExperienceName: e.target.value })}
                 onSubmit={ this.toggleNewExperienceDialog.bind(this) }
              />
            </Dialog>
          </div>
        );
    }
  }

  render() {
    return ( this.renderNewExperienceDialog() );
  }
}
