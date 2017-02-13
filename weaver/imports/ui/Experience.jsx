import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';

import { MuiThemeProvider } from 'material-ui';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider'
import Checkbox from 'material-ui/Checkbox';
import IconButton from 'material-ui/IconButton';
import Delete from 'material-ui/svg-icons/action/delete';

import { Experiences } from '../api/experiences.js';

export default class Experience extends Component {

  constructor(props) {
    super(props);

  }

  deleteExperience() {
    Meteor.call('experiences.remove', this.props.experience._id);
  }

  checkExperience() {
    Meteor.call('experiences.setChecked', this.props.experience._id, true);
  }

  renderExperienceCard() {
    return (
      <MuiThemeProvider>
        <ListItem
          primaryText={ this.props.experience.description }
          leftCheckbox={ <Checkbox onCheck={ this.checkExperience.bind(this) } /> }
          rightIconButton={<IconButton touch={ true }><Delete hoverColor="red" onTouchTap={ this.deleteExperience.bind(this) } /></IconButton>}
        />
      </MuiThemeProvider>
    );
  }

  renderDivider() {
    return (
      <MuiThemeProvider>
        <Divider/>
      </MuiThemeProvider>
    );
  }

  render() {
    return (
      <div>
        { this.renderExperienceCard() }
        { this.renderDivider() }
      </div>
    );

  }
}

Experience.propTypes = {
  // This component gets the experience to display through a React prop.
  // We can use propTypes to indicate it is required
  experience: PropTypes.object.isRequired,
};
