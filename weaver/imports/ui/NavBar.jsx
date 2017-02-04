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
      logged: false,
      showNewExperienceDialog: false,
      showMenuDialog: false,
    };
  }

  toggleLogged() {
    this.setState({
      logged: !this.state.logged,
    });
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
        anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
        targetOrigin={{horizontal: 'right', vertical: 'bottom'}}
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
    if ( this.state.logged ) {
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
          onTouchTap={ this.toggleLogged.bind(this) }
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
