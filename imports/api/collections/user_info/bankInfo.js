import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

const BankInfo = new Mongo.Collection('userBankInfo');

BankInfoSchema = new SimpleSchema({
    userId: { type: String, optional: true },
    businessId: { type: String, optional: true },
    accountNumber: { type: String, optional: true },
    sortCode: { type: String, optional: true },
    accountName: { type: String, optional: true },
    bankName: { type: String, optional: true },
    IBAN: { type: String, optional: true },
    Swift: { type: String, optional: true },
    BIC: { type: String, optional: true },
    bankAddress: { type: Object, optional: true },
    'bankAddress.line1': { type: String, optional: true },
    'bankAddress.line2': { type: String, optional: true },
    'bankAddress.city': { type: String, optional: true },
    'bankAddress.country': { type: String, optional: true },
    'bankAddress.postcode': { type: String, optional: true },
    'bankAddress.taxCode': { type: String, optional: true }
});

BankInfo.attachSchema(BankInfoSchema);

export default BankInfo;