import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import moment from 'moment';

const HolidayDates = new Mongo.Collection('holidayDates');

HolidayDatesSchema = new SimpleSchema({
    name: String,
    date: { 
        type: Date, 
        autoValue: function () {
            let date = this.field('date').value;

            return moment(date).milliseconds(0).seconds(0).minutes(0).hours(0).toDate();
        },
    },
    endDate: { type: Date, optional: true },
    holidayType: { type: String, allowedValues: ['public', 'company', 'blocked'] },
    isActive: Boolean,
    businessId: String,
});

HolidayDates.attachSchema(HolidayDatesSchema);

export default HolidayDates;