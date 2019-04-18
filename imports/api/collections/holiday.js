import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import moment from 'moment';

const Holiday = new Mongo.Collection('holiday');

HolidaySchema = new SimpleSchema({
    approvedBy: { type: Object, optional: true, defaultValue: null },
    'approvedBy._id': String,
    'approvedBy.fullName': String,
    createdAt: { type: Date, defaultValue: new Date() },
    cancelledDate: { type: Date, optional: true, defaultValue: null },
    cancelReason: { type: String, optional: true },
    employee: Object,
    'employee._id': String,
    'employee.fullName': String,
    startDate: Date,
    endDate: {
        type: Date,
        autoValue: function () {
            let endDate = this.field('endDate').value;

            return this.isInsert ? moment(endDate).milliseconds(999).seconds(59).minutes(59).hours(23).toDate() : endDate;
        },
    },
    duration: Number,
    status: { type: String, allowedValues: ['pending', 'approved', 'cancelled'], defaultValue: 'pending' },
    notes: { type: String, optional: true },
});

Holiday.attachSchema(HolidaySchema);

export default Holiday;