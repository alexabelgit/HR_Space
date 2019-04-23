import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import moment from 'moment';

const Absence = new Mongo.Collection('absence');

AbsenceSchema = new SimpleSchema({
    employee: Object,
    'employee._id': String,
    'employee.fullName': String,
    startDate: Date,
    endDate: { 
        type: Date, 
        optional: true, 
        autoValue: function () {
            let endDate = this.field('endDate').value;

            return endDate && moment(endDate).milliseconds(999).seconds(59).minutes(59).hours(23).toDate();
        },
    },
    absenceType: Object,
    'absenceType._id': String,
    'absenceType.name': String,
    notes: { type: String, optional: true },
});

Absence.attachSchema(AbsenceSchema);

export default Absence;