import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

const BenefitDetails = new Mongo.Collection('userBenefitDetails');

BenefitDetailsSchema = new SimpleSchema({
    userId: String,
    benefitType: String,
    startDate: Date,
    endDate: Date,
    value: Number,
    frequency: String
});

BenefitDetails.attachSchema(BenefitDetailsSchema);

export default BenefitDetails;