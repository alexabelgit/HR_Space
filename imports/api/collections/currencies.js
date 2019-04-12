import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

const Currencies = new Mongo.Collection('currencies');

CurrencySchema = new SimpleSchema({
    name: String,
    businessId: String,
});

Currencies.attachSchema(CurrencySchema);

export default Currencies;