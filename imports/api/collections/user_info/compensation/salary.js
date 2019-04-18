import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

const Salary = new Mongo.Collection('userSalary');

SalarySchema = new SimpleSchema({
    userId: { type: String, optional: true },
    businessId: { type: String, optional: true },
    effectiveDate: Date,
    salary: Number,
    frequency: String,
    currency: String,
    notes: String
});

Salary.attachSchema(SalarySchema);

export default Salary;