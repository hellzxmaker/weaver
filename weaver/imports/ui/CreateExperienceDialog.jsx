import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { MuiThemeProvider } from 'material-ui';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import Done from 'material-ui/svg-icons/action/done';
import Clear from 'material-ui/svg-icons/content/clear';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';

import { Experiences } from '../api/experiences.js';

export default class CreateExperienceDialog extends Component {

  constructor(props) {
    super(props);

    this.state = {
      showNewExperienceDialog: true,
      newExperienceName: '',
      newExperienceMetric: '',
      newExperienceValue: '',
    };
  }

  handleSubmit(event) {
    event.preventDefault();

    // Find the text field via the React ref
    const name = this.state.newExperienceName;
    const metric = this.state.newExperienceMetric;
    const value = this.state.newExperienceValue;

    Experiences.insert({
      name,
      metric,
      value,
      createdAt: new Date(), // current time
    });

    this.toggleNewExperienceDialog();
  }

  toggleNewExperienceDialog() {
    console.log('toggleNewExperienceDialog');
    this.setState({
      showNewExperienceDialog: !this.state.showNewExperienceDialog,
    });
  }

  getActions() {
    return actions = [
      <IconButton onTouchTap={ this.toggleNewExperienceDialog.bind(this) } tooltip="Cancel">
        <Clear hoverColor="red" />
      </IconButton>,
      <IconButton onTouchTap={ this.handleSubmit.bind(this) } tooltip="Save">
        <Done hoverColor="green" />
      </IconButton>,
    ];
  }

  render() {
    return (
    <div>
      <MuiThemeProvider>
      <Dialog
        title="Let's add some experience..."
        actions={ this.getActions() }
        modal={ false }
        open={ this.state.showNewExperienceDialog }
        onRequestClose={ this.toggleNewExperienceDialog.bind(this) }
        onSubmit={ this.handleSubmit.bind(this), this.toggleNewExperienceDialog.bind(this) }
      >
        To help you track your successes, we need a short task name:
        <p></p>
        <TextField
           hintText="Enter the task here..."
           value={ this.state.newExperienceName }
           onChange={ e => this.setState({ newExperienceName: e.target.value })}
           onSubmit={ this.toggleNewExperienceDialog.bind(this) }
        />
        <p></p>
        the metric of importance ( Ex: hours, bugs filed, people managed, inventory
        value in dollars, etc.)
        <p></p>
        <TextField
          hintText="metric"
          value={ this.state.newExperienceMetric }
          onChange={ e => this.setState({ newExperienceMetric: e.target.value })}
          onSubmit={ this.toggleNewExperienceDialog.bind(this) }
        />
        <p></p>
        initial value of that metric ( if you have already started )
        <p></p>
        <TextField
          hintText="initial metric value"
          value={ this.state.newExperienceValue }
          onChange={ e => this.setState({ newExperienceValue: e.target.value })}
          onSubmit={ this.toggleNewExperienceDialog.bind(this) }
        />
      </Dialog>
    </MuiThemeProvider>
    </div>
    );
  }
}
