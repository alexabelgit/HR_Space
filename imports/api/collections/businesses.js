import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

const Businesses = new Mongo.Collection('businesses');

BusinessSchema = new SimpleSchema({
    name: String,
    address: { type: String, optional: true },
    city: { type: String, optional: true },
    country: { type: String, optional: true },
    postcode: { type: String, optional: true },
    employeesCount: { type: String, allowedValues: ['1-5', '6-10', '11-15', '16-20', '21-25'] },
    webAddress: { type: String, optional: true },
    contactName: { type: String, optional: true },
    email: String,
    startDate: { type: Date, defaultValue: new Date(0) },
    endDate: { type: Date, defaultValue: new Date(0) },
    price: { type: Number, optional: true },
    paymentFrequency: { type: String, allowedValues: ['per month', 'per year'], optional: true },
    status: { type: String, allowedValues: ['live', 'expired', 'trial', 'trial_ended'] },
    bank: { type: Object, optional: true },
    'bank.name': { type: String, optional: true },
    'bank.accountNumber': { type: Number, optional: true },
    'bank.sortCode': { type: String, optional: true },
    'bank.accountName': { type: String, optional: true },
    'bank.IBAN': { type: String, optional: true },
    'bank.swift': { type: String, optional: true },
    'bank.BIC': { type: String, optional: true },
    'bank.address': { type: String, optional: true },
    'bank.city': { type: String, optional: true },
    'bank.country': { type: String, optional: true },
    'bank.postcode': { type: String, optional: true }
});

Businesses.attachSchema(BusinessSchema);

export default Businesses;