import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

const ContentPages = new Mongo.Collection('contentPages');

ContentPagesSchema = new SimpleSchema({
    name: String,
    summary: String,
    article: String,
    isActive: Boolean,
    visibleFor: String,
    business: String,
    order: Number,
});

ContentPages.attachSchema(ContentPagesSchema);

export default ContentPages;