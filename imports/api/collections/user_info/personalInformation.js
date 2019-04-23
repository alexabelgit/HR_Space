import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

const PersonalInformation = new Mongo.Collection('personalInformation');

PersonalInformationSchema = new SimpleSchema({
    userId: { type: String },
    middleName: { type: String, optional: true },
    address: { type: String, optional: true },
    city: { type: String, optional: true },
    country: { type: String, optional: true },
    postcode: { type: String, optional: true },
    email: { type: String, optional: true },
    mobile: { type: String, optional: true },
    maritalStatus: { type: String, optional: true },
    nationality: { type: String, optional: true },
    dateOfBirth: { type: Date, defaultValue: new Date(0) },
});

PersonalInformation.attachSchema(PersonalInformationSchema);

export default PersonalInformation;