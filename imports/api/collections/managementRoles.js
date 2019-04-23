import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

const ManagerPermissions = new Mongo.Collection('managerPermissions');

ManagerPermissionsSchema = new SimpleSchema({
    jobEdit: Boolean,
    compensationEdit: Boolean,
    hrDocumentsEdit: Boolean,
    jobView: Boolean,
    compensationView: Boolean,
    hrDocumentsView: Boolean,
    businessId: String,
});

ManagerPermissions.attachSchema(ManagerPermissionsSchema);

export default ManagerPermissions;