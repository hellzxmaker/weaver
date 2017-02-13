
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { Meteor } from 'meteor/meteor';

import { MuiThemeProvider } from 'material-ui';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';

export default class LoginDialog extends Component {

  constructor(props) {
    super(props);

    this.state = {
      userEmail: '',
      userPassword: '',
      showLoginDialog: true,
    };
  }

  toggleLoginDialog() {
    console.log('Toggle login dialog');
    this.setState({
      showLoginDialog: !this.state.showLoginDialog,
    });
  }

  loginUser() {
    const userEmail = this.state.userEmail;
    const userPassword = this.state.userPassword;

    Meteor.loginWithPassword(userEmail, userPassword);
    this.toggleLoginDialog();
  }

  logoutUser(){
    const userEmail = this.state.userEmail;
    Meteor.logout(userEmail);
  }

  getLoginDialogActions() {
    return actions = [
      <FlatButton
        primary={ true }
        onTouchTap={ this.loginUser.bind(this) }
      >
        Login
      </FlatButton>,
      <FlatButton
        primary={ false }
        onTouchTap={ this.toggleLoginDialog.bind(this) }
      >
        Cancel
      </FlatButton>,
    ];
  }

  renderLoginDialog() {
    return (
      <MuiThemeProvider>
        <Dialog
          title="Login"
          actions={ this.getLoginDialogActions() }
          modal={ false }
          open={ this.state.showLoginDialog }
        >
        <TextField
          hintText="email"
          errorText="This field is required"
          value={ this.state.userEmail }
          onChange={ e => this.setState({ userEmail: e.target.value })}
        />
        <p></p>
        <TextField
          hintText="password"
          type="password"
          errorText="This field is required"
          value={ this.state.userPassword }
          onChange={ e => this.setState({ userPassword: e.target.value })}
        />
        </Dialog>
      </MuiThemeProvider>
    );
  }

  render() {
    return (
      <div>
        { this.renderLoginDialog() }
      </div>
    );
  }
}
