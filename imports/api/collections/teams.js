import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

const Teams = new Mongo.Collection('teams');

TeamSchema = new SimpleSchema({
    name: String,
    businessId: String,
});

Teams.attachSchema(TeamSchema);

export default Teams;