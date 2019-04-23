import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

const BenefitsInKind = new Mongo.Collection('userBenefitsInKind');

BenefitInKindSchema = new SimpleSchema({
    userId: String,
    benefitType: String,
    startDate: Date,
    endDate: Date,
    value: Number,
    frequency: String
});

BenefitsInKind.attachSchema(BenefitInKindSchema);

export default BenefitsInKind;