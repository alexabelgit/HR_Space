import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

const WorkingPatterns = new Mongo.Collection('workingPatterns');

WorkingPatternsSchema = new SimpleSchema({
    name: String,
    isActive: Boolean,
    weekHours: { type: Array, defaultValue: [0, 0, 0, 0, 0, 0, 0] }, // count of working hours for each day of week starting from sunday
    'weekHours.$': Number,
    businessId: String,
});

WorkingPatterns.attachSchema(WorkingPatternsSchema);

export default WorkingPatterns;