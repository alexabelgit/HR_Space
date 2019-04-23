import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

const PersonalSettings = new Mongo.Collection('personalSettings');

PersonalSettingsSchema = new SimpleSchema({
    userId: { type: String, optional: true },
    businessId: { type: String, optional: true },
    holidayEmails: { type: Boolean, defaultValue: true },
    companyUpdatesEmails: { type: Boolean, defaultValue: true },
    newTasksEmails: { type: Boolean, defaultValue: true }
});

PersonalSettings.attachSchema(PersonalSettingsSchema);

export default PersonalSettings;