import React, { Component } from 'react';

import AppBar from 'material-ui/AppBar';
import AddBox from 'material-ui/svg-icons/content/add-box'
import Menu from 'material-ui/svg-icons/navigation/menu';
import MenuItem from 'material-ui/MenuItem';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';

import CreateExperienceDialog from './CreateExperienceDialog.jsx';

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

  renderNewExperienceDialog() {
    if ( this.state.showNewExperienceDialog ) {
      return (
      <div>
        <div id="app-bar">
          <AppBar iconElementRight={
                    <IconButton label="New Experience"
                      onTouchTap={ this.toggleNewExperienceDialog.bind(this) }
                    >
                    <AddBox/>
                    </IconButton>
                  }
                  iconElementLeft={
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
                  }
          />
        </div>
        <div id="create-new-experience-dialog">
          <CreateExperienceDialog open={ this.state.showNewExperienceDialog } />
        </div>
      </div>
    );
    } else {
        return (
          <div id="app-bar">
            <AppBar iconElementRight={
                      <IconButton label="New Experience"
                        onTouchTap={ this.toggleNewExperienceDialog.bind(this) }
                      >
                      <AddBox/>
                      </IconButton>
                    }
                    iconElementLeft={
                      <IconMenu
                        iconButtonElement={<IconButton><Menu color="000000" /></IconButton>}
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
                    }
              />
          </div>
        );
    }
  }

  render() {
    return this.renderNewExperienceDialog();
  }
}
