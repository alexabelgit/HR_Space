import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

const CompanyDetails = new Mongo.Collection('companyDetails');

CompanyDetaislSchema = new SimpleSchema({
    business: String,
    holidaysToCarry: Number,
    monthsBeforeAlerts: Number,
    defaultCurrency: String,
    country: String,
    defaultProbationWeeks: Number,
    taskAlerts1: Number,
    taskAlerts2: Number,
    taskAlerts3: Number
});

CompanyDetails.attachSchema(CompanyDetaislSchema);

export default CompanyDetails;