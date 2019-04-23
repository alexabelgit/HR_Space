import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

const BenefitsInKindTypes = new Mongo.Collection('benefitsInKindTypes');

BenefitInKindSchema = new SimpleSchema({
    name: String,
    businessId: String,
});

BenefitsInKindTypes.attachSchema(BenefitInKindSchema);

export default BenefitsInKindTypes;