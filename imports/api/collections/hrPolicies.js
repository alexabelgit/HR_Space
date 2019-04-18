import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

const HRPolicies = new Mongo.Collection('hrPolicies');

HRPoliciesSchema = new SimpleSchema({
    name: String,
    summary: String,
    details: String,
    isActive: Boolean,
    access: String,
    business: String,
    order: Number,
});

HRPolicies.attachSchema(HRPoliciesSchema);

export default HRPolicies;