import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

const Roles = new Mongo.Collection('Roles');

RoleSchema = new SimpleSchema({
    userId: { type: String, optional: true },
    businessId: { type: String, optional: true },
    effectiveDate: Date,
    salary: Number,
    frequency: String,
    currency: String,
    notes: String
});

Roles.attachSchema(RoleSchema);

export default Roles;