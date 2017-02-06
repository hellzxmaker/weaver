import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Experiences = new Mongo.Collection('experiences');

Meteor.methods({
  'experiences.insert'(name, metric, value) {
    check(name, String);
    check(metric, String);
    check(value, String);

    // Make sure the user is logged in before inserting a task
    if (! this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    Experiences.insert({
      name,
      metric,
      value,
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
