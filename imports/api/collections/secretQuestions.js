import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

const SecretQuestions = new Mongo.Collection('secretQuestions');

SecretQuestionsSchema = new SimpleSchema({
    text: String,
    active: { type: Boolean, defaultValue: true },
    inputType: { type: String, allowedValues: ['text', 'select', 'date'], defaultValue: 'text' },
});

SecretQuestions.attachSchema(SecretQuestionsSchema);

export default SecretQuestions;