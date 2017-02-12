import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Experiences = new Mongo.Collection('experiences');

Meteor.methods({
  'experiences.insert'(description) {
    check(description, String);

    // Make sure the user is logged in before inserting a task
    if (! this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    Experiences.insert({
      description,
      metric: 0,
      unit: '',
      completed: false,
      createdAt: new Date(), // current time
      owner: Meteor.userId(), // _id of logged in user
      email: Meteor.user().emails[0].address, // email address of the user
    });
  },
  'experiences.remove'(experienceId) {
    check(experienceId, String);

    Experiences.remove(experienceId);
  },
});
