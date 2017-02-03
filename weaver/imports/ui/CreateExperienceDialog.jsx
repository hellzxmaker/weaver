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
      newExperienceTitle: '',
      newExperienceDescription: '',
      newExperienceJobTitle: '',
    };
  }

  handleSubmit(event) {
    event.preventDefault();

    // Find the text field via the React ref
    const title = this.state.newExperienceTitle;
    const description = this.state.newExperienceDescription;
    const job_title = this.state.newExperienceJobTitle;

    Experiences.insert({
      title,
      description,
      job_title,
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
        To help you track your successes, we need a short task description:
        <p></p>
        <TextField
           hintText="Enter the task here..."
           value={ this.state.newExperienceTitle }
           onChange={ e => this.setState({ newExperienceTitle: e.target.value })}
           onSubmit={ this.toggleNewExperienceDialog.bind(this) }
        />
        <p></p>
        the metric of importance ( Ex: hours, bugs filed, people managed, inventory
        value in dollars, etc.)
        <p></p>
        <TextField
          hintText="metric"
          value={ this.state.newExperienceJobTitle }
          onChange={ e => this.setState({ newExperienceJobTitle: e.target.value })}
          onSubmit={ this.toggleNewExperienceDialog.bind(this) }
        />
        <p></p>
        initial value of that metric ( if you have already started )
        <p></p>
        <TextField
          hintText="initial metric value"
          value={ this.state.newExperienceDescription }
          onChange={ e => this.setState({ newExperienceDescription: e.target.value })}
          onSubmit={ this.toggleNewExperienceDialog.bind(this) }
        />
      </Dialog>
    </MuiThemeProvider>
    </div>
    );
  }
}
