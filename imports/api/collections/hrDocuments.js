import { Mongo } from 'meteor/mongo';
import { LocalStore } from 'meteor/jalik:ufs-local';
import { UploadFS } from 'meteor/jalik:ufs';

const HRDocuments = new Mongo.Collection('hrDocuments');

export const HRDocumentsStore = new LocalStore({
    collection: HRDocuments,
    name: 'hrDocuments',
    path: process.env.UPLOADFS_STORE_PATH + '/hrDocuments',
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

export default HRDocuments;