import { Mongo } from 'meteor/mongo';
import { LocalStore } from 'meteor/jalik:ufs-local';
import { UploadFS } from 'meteor/jalik:ufs';

const Images = new Mongo.Collection('images');

export const ImagesStore = new LocalStore({
    collection: Images,
    name: 'images',
    path: process.env.UPLOADFS_STORE_PATH + '/images',
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

export default Images;