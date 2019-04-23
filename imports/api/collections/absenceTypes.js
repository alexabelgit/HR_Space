import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

const AbsenceTypes = new Mongo.Collection('absenceTypes');

AbsenceTypeSchema = new SimpleSchema({
    type: String,
    sicknessIdentifier: Boolean,
    selfCertification: Boolean,
    businessId: String,
});

AbsenceTypes.attachSchema(AbsenceTypeSchema);

export default AbsenceTypes;