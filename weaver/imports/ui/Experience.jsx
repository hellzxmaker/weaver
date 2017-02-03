import React, { Component, PropTypes } from 'react';

import { MuiThemeProvider } from 'material-ui';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

import { Experiences } from '../api/experiences.js';

export default class Experience extends Component {

  constructor(props) {
    super(props);
  }

  deleteExperience() {
    Experiences.remove(this.props.experience._id);
  }

  renderExperienceCard() {
    return (
      <MuiThemeProvider>
        <Card>
          <CardHeader
            title={ this.props.experience.title }
            subtitle={ this.props.experience.metric }
            actAsExpander={ true }
            showExpandableButton={ true }
          />
          <CardText expandable={ true }>
            { this.props.experience.description + " " + this.props.experience.metric }
          </CardText>
          <CardActions expandable={ true } >
              <FlatButton label="Delete" onTouchTap={ this.deleteExperience.bind(this) } />
              <FlatButton label="Edit" />
            </CardActions>
          </Card>
      </MuiThemeProvider>
    );
  }

  render() {
    return (
      <span id="experience-card">
        { this.renderExperienceCard() }
      </span>
    );
  }
}

Experience.propTypes = {
  // This component gets the experience to display through a React prop.
  // We can use propTypes to indicate it is required
  experience: PropTypes.object.isRequired,
};
