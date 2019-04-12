import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

const Announcements = new Mongo.Collection('announcements');

AnnouncementsSchema = new SimpleSchema({
    title: String,
    detail: String,
    startDate: Date,
    endDate: Date,
    type: String,
    mandatory: { type: Boolean, defaultValue: false },
    business: String,
    readBy: { type: Array, defaultValue: [] },
    'readBy.$': String,
    deletedFor: { type: Array, defaultValue: [] },
    'deletedFor.$': String
});

Announcements.attachSchema(AnnouncementsSchema);

export default Announcements;