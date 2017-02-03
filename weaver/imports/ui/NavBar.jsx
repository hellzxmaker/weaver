import React, { Component } from 'react';

import AppBar from 'material-ui/AppBar';
import AddBox from 'material-ui/svg-icons/content/add-box';
import IconButton from 'material-ui/IconButton';

import CreateExperienceDialog from './CreateExperienceDialog.jsx';

export default class NavBar extends Component {

  constructor(props) {
    super(props);

    this.state = {
      showNewExperienceDialog: false,
    };
  }

  toggleNewExperienceDialog() {
    this.setState({
      showNewExperienceDialog: !this.state.showNewExperienceDialog,
    });
  }

  renderNewExperienceDialog() {
    if ( this.state.showNewExperienceDialog ) {
      return (
      <div>
        <div id="app-bar">
          <AppBar iconElementRight={ <IconButton label="New Experience" onTouchTap={ this.toggleNewExperienceDialog.bind(this) }><AddBox/></IconButton> } />
        </div>
        <div id="create-new-experience-dialog">
          <CreateExperienceDialog open={ this.state.showNewExperienceDialog } />
        </div>
      </div>
    );
    } else {
        return (
          <div id="app-bar">
            <AppBar iconElementRight={ <IconButton label="New Experience" tooltip="Add Experience" onTouchTap={ this.toggleNewExperienceDialog.bind(this) }><AddBox/></IconButton> } />
          </div>
        );
    }
  }

  render() {
    return this.renderNewExperienceDialog();
  }
}
