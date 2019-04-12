import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

const Tasks = new Mongo.Collection('userTasks');

TasksSchema = new SimpleSchema({
    absence: { type: String, optional: true, defaultValue: null },
    holiday: { type: String, optional: true, defaultValue: null },
    createdAt: { type: Date, optional: true, defaultValue: new Date() },
    expiryDate: { type: Date, optional: true, defaultValue: null },
    isComplete: { type: Boolean, optional: true, defaultValue: false },
    taskType: { type: String, allowedValues: ['default', 'self_certification', 'holiday_approval'], defaultValue: 'default' },
    text: String,
    users: [String], // array in case it will be possible to assign a task to multiple users
});

Tasks.attachSchema(TasksSchema);

export default Tasks;