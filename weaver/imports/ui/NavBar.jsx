import React, { Component } from 'react';

import AppBar from 'material-ui/AppBar';
import Create from 'material-ui/svg-icons/content/create'
import Menu from 'material-ui/svg-icons/navigation/menu';
import MenuItem from 'material-ui/MenuItem';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import FlatButton from 'material-ui/FlatButton';
import Person from 'material-ui/svg-icons/social/person';

import LoginDialog from './LoginDialog.jsx';

export default class NavBar extends Component {

  constructor(props) {
    super(props);

    this.state = {
      showMenuDialog: false,
      showLoginDialog: false,
    };
  }

  toggleLoginDialog() {
    this.setState({
      showLoginDialog: !this.state.showLoginDialog,
    });
  }

  toggleMenuDialog() {
    this.setState({
      showMenuDialog: !this.state.showMenuDialog,
    });
  }

  logoutUser() {
    this.toggleLoginDialog();
    Meteor.logout();
  }

  renderIconMenu() {
    return (
      <IconMenu
        iconButtonElement={<IconButton touch={ true }><Menu color="white" /></IconButton>}
        anchorOrigin={ {horizontal: 'left', vertical: 'top'} }
        targetOrigin={ {horizontal: 'left', vertical: 'top'} }
        onTouchTap={ this.toggleMenuDialog.bind(this) }
      >
        <MenuItem primaryText="Manage Goals" />
        <MenuItem primaryText="Send feedback" />
        <MenuItem primaryText="Settings" />
        <MenuItem primaryText="Sign out" onTouchTap={ this.logoutUser.bind(this) } />
      </IconMenu>
    );
  }

  renderRightIconButton() {
    if ( null != Meteor.user() ) {
      return (
        <IconButton
          label="New Experience"
          touch={ true }
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
          onTouchTap={ this.toggleLoginDialog.bind(this) }
        />
      );
    }
  }

  renderLoginDialog() {
    return (
      <LoginDialog/>
    );
  }

  renderAppBar() {
    return (
      <div id="app-bar">
        <AppBar
          iconElementRight={ this.renderRightIconButton() }
          iconElementLeft={ this.renderIconMenu() }
        />
      </div>
    );
  }

  renderLogin() {
    if ( this.state.showLoginDialog ) {
      return (
        <div>
          <div>
            { this.renderAppBar() }
          </div>
          <div>
            { this.renderLoginDialog() }
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
    return this.renderLogin();
  }
}
