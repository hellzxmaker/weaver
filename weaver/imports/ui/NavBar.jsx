import React, { Component } from 'react';

import AppBar from 'material-ui/AppBar';
import Create from 'material-ui/svg-icons/content/create'
import Menu from 'material-ui/svg-icons/navigation/menu';
import MenuItem from 'material-ui/MenuItem';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import FlatButton from 'material-ui/FlatButton';
import Person from 'material-ui/svg-icons/social/person';

import CreateExperienceDialog from './CreateExperienceDialog.jsx';
import AccountsUIWrapper from './AccountsUIWrapper.jsx';

export default class NavBar extends Component {

  constructor(props) {
    super(props);

    this.state = {
      showNewExperienceDialog: false,
      showMenuDialog: false,
    };
  }

  toggleNewExperienceDialog() {
    this.setState({
      showNewExperienceDialog: !this.state.showNewExperienceDialog,
    });
  }

  toggleMenuDialog() {
    this.setState({
      showMenuDialog: !this.state.showMenuDialog,
    });
  }

  renderIconMenu() {
    return (
      <IconMenu
        iconButtonElement={<IconButton><Menu/></IconButton>}
        anchorOrigin={{horizontal: 'left', vertical: 'top'}}
        targetOrigin={{horizontal: 'left', vertical: 'top'}}
        onTouchTap={ this.toggleMenuDialog.bind(this) }
      >
        <MenuItem primaryText="Refresh" />
        <MenuItem primaryText="Send feedback" />
        <MenuItem primaryText="Settings" />
        <MenuItem primaryText="Help" />
        <MenuItem primaryText="Sign out" />
      </IconMenu>
    );
  }

  renderRightIconButton() {
    if ( null != Meteor.user() ) {
      return (
        <IconButton
          label="New Experience"
          onTouchTap={ this.toggleNewExperienceDialog.bind(this) }
        >
          <Create/>
        </IconButton>
      );
    } else {
      return (
        <FlatButton
          label="Login"
          labelPosition="before"
          primary={ true }
          icon={ <Person /> }
        />
      );
    }
  }

  renderAppBar() {
    return (
      <div id="app-bar">
        <AppBar iconElementRight={ this.renderRightIconButton() }
                iconElementLeft={ this.renderIconMenu() }
        />
      </div>
    );
  }

  renderNewExperienceDialog() {
    if ( this.state.showNewExperienceDialog ) {
      return (
      <div>
        <div>
          { this.renderAppBar() }
        </div>
        <div id="create-new-experience-dialog">
          <CreateExperienceDialog
            open={ this.state.showNewExperienceDialog }
          />
        </div>
      </div>
    );
    } else {
        return (
          <div>
            { this.renderAppBar() }
          </div>
        );
    }
  }

  render() {
    return this.renderNewExperienceDialog();
  }
}
