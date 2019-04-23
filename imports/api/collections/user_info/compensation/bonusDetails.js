import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

const BonusDetails = new Mongo.Collection('userBonusDetails');

BonusDetailsSchema = new SimpleSchema({
    userId: String,
    date: Date,
    amount: Number,
    currency: String
});

BonusDetails.attachSchema(BonusDetailsSchema);

export default BonusDetails;