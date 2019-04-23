import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

const Contact = new Mongo.Collection('userContact');

ContactSchema = new SimpleSchema({
    userId: { type: String, optional: true },
    businessId: { type: String, optional: true },
    name: { type: String, defaultValue: '' },
    relationship: { type: String, optional: true },
    telephone: { type: String, optional: true },
    email: { type: String, defaultValue: '' }
});

Contact.attachSchema(ContactSchema);

export default Contact;