import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

const Job = new Mongo.Collection('userJob');

JobSchema = new SimpleSchema({
    userId: { type: String, optional: true },
    businessId: { type: String, optional: true },
    title: { type: String, optional: true },
    isManager: { type: Boolean, optional: true },
    employeeType: { type: String, optional: true },
    department: { type: String, optional: true },
    team: { type: Object, optional: true },
    'team._id': { type: String, optional: true },
    'team.name': { type: String, optional: true },
    startDate: { type: Date, defaultValue: new Date(0) },
    probationEndDate: { type: Date, defaultValue: new Date(0) },
    lengthOfService: { type: String, optional: true },
    terminationDate: { type: Date, defaultValue: new Date(0) },
    annualLeaveEntitlement: { type: Number, defaultValue: 1, optional: true },
    workPermit: { type: Boolean, optional: true },
    dateOfExpiry: { type: Date, defaultValue: new Date(0) },
    workingPattern: { type: Object, optional: true },
    'workingPattern._id': String,
    'workingPattern.name': String,
    access: { type: String, optional: true },
    disability: { type: String, optional: true }
});

Job.attachSchema(JobSchema);

export default Job;