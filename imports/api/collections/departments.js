import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

const Departments = new Mongo.Collection('departments');

DepartmentSchema = new SimpleSchema({
    name: String,
    businessId: String,
});

Departments.attachSchema(DepartmentSchema);

export default Departments;