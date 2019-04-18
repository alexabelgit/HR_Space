import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

const Education = new Mongo.Collection('userEducation');

EducationSchema = new SimpleSchema({
    userId: { type: String, optional: true },
    businessId: { type: String, optional: true },
    institutionName: String,
    startDate: Date,
    endDate: Date,
    qualifications: String
});

Education.attachSchema(EducationSchema);

export default Education;