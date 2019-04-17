import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

const Roles = new Mongo.Collection('roles');

RoleSchema = new SimpleSchema({
    name: String,
    id: String,
});

Roles.attachSchema(RoleSchema);

export default Roles;