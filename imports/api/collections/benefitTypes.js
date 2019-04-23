import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

const BenefitTypes = new Mongo.Collection('benefitTypes');

BenefitTypeSchema = new SimpleSchema({
    name: String,
    businessId: String,
});

BenefitTypes.attachSchema(BenefitTypeSchema);

export default BenefitTypes;