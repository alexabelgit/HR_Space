import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

const EmploymentTypes = new Mongo.Collection('employmentTypes');

EmploymentTypeSchema = new SimpleSchema({
    name: String,
    businessId: String,
});

EmploymentTypes.attachSchema(EmploymentTypeSchema);

export default EmploymentTypes;