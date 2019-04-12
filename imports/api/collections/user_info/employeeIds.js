import { Mongo } from 'meteor/mongo';
import { LocalStore } from 'meteor/jalik:ufs-local';
import { UploadFS } from 'meteor/jalik:ufs';

const EmployeeIds = new Mongo.Collection('employeeIds');

export const EmployeeIdsStore = new LocalStore({
    collection: EmployeeIds,
    name: 'employeeIds',
    path: process.env.UPLOADFS_STORE_PATH + '/employeeIds',
    mode: '0755',
    writeMode: '0755',
    permissions: new UploadFS.StorePermissions({
        insert(userId, doc) {
            return true;
        },
        update(userId, doc) {
            return true;
        },
        remove(userId, doc) {
            return true;
        }
    })
});

export default EmployeeIds;