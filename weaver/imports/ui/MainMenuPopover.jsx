import React from 'react';

import RaisedButton from 'material-ui/RaisedButton';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';

export default class MainMenuPopover extends Component {

  constructor(props) {
    super(props);

    this.state = {
      showMenuPopover: true,
      anchorEl: null,
    };
  }

  toggleShowMenuPopover() {
    this.setState({
      showMenuPopover: !this.state.showMenuPopover,
    });
  }

  handleTouchTap(event) {
    event.preventDefault();

    this.setState({
        showMenuPopover: true,
        anchorEl: event.currentTarget,
      });
    }

  renderPopover() {
    return (
      <div>
        <RaisedButton
          onTouchTap={this.handleTouchTap}
          label="Click me"
        />
        <Popover
          open={ this.state.showMenuPopover }
          anchorEl={ this.state.anchorEl }
          anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
          targetOrigin={{horizontal: 'left', vertical: 'top'}}
          onRequestClose={ this.toggleShowMenuPopover() }
        >
          <Menu>
            <MenuItem primaryText="Refresh" />
            <MenuItem primaryText="Help &amp; feedback" />
            <MenuItem primaryText="Settings" />
            <MenuItem primaryText="Sign out" />
          </Menu>
        </Popover>
      </div>
    );

  }

  render() {
    return (
      this.renderPopover();
    );
  }
}
