import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

const Summary = new Mongo.Collection('userSummary');

SummarySchema = new SimpleSchema({
    userId: { type: String, optional: true },
    businessId: { type: String, optional: true },
    firstName: { type: String, defaultValue: '' },
    surname: { type: String, defaultValue: '' },
    employeeId: { type: String, defaultValue: '' },
    manager: { type: String, defaultValue: '' },
    email: { type: String, defaultValue: '' },
    location: { type: String, defaultValue: '', optional: true },
    telephone: { type: String, defaultValue: '', optional: true },
    mobile: { type: String, defaultValue: '', optional: true },
    linkedin: { type: String, defaultValue: '', optional: true },
    twitter: { type: String, defaultValue: '', optional: true },
    facebook: { type: String, defaultValue: '', optional: true },
    photo: { type: String, optional: true },
    bio: { type: String, defaultValue: '', optional: true }
});

Summary.attachSchema(SummarySchema);

export default Summary;