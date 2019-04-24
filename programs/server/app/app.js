var require = meteorInstall({"imports":{"api":{"collections":{"user_info":{"compensation":{"benefitDetails.js":function(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// imports/api/collections/user_info/compensation/benefitDetails.js                                                  //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
var Mongo = void 0;                                                                                                  // 1
module.watch(require("meteor/mongo"), {                                                                              // 1
    Mongo: function (v) {                                                                                            // 1
        Mongo = v;                                                                                                   // 1
    }                                                                                                                // 1
}, 0);                                                                                                               // 1
var SimpleSchema = void 0;                                                                                           // 1
module.watch(require("simpl-schema"), {                                                                              // 1
    "default": function (v) {                                                                                        // 1
        SimpleSchema = v;                                                                                            // 1
    }                                                                                                                // 1
}, 1);                                                                                                               // 1
var BenefitDetails = new Mongo.Collection('userBenefitDetails');                                                     // 4
BenefitDetailsSchema = new SimpleSchema({                                                                            // 6
    userId: String,                                                                                                  // 7
    benefitType: String,                                                                                             // 8
    startDate: Date,                                                                                                 // 9
    endDate: Date,                                                                                                   // 10
    value: Number,                                                                                                   // 11
    frequency: String                                                                                                // 12
});                                                                                                                  // 6
BenefitDetails.attachSchema(BenefitDetailsSchema);                                                                   // 15
module.exportDefault(BenefitDetails);                                                                                // 1
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"benefitsInKind.js":function(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// imports/api/collections/user_info/compensation/benefitsInKind.js                                                  //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
var Mongo = void 0;                                                                                                  // 1
module.watch(require("meteor/mongo"), {                                                                              // 1
    Mongo: function (v) {                                                                                            // 1
        Mongo = v;                                                                                                   // 1
    }                                                                                                                // 1
}, 0);                                                                                                               // 1
var SimpleSchema = void 0;                                                                                           // 1
module.watch(require("simpl-schema"), {                                                                              // 1
    "default": function (v) {                                                                                        // 1
        SimpleSchema = v;                                                                                            // 1
    }                                                                                                                // 1
}, 1);                                                                                                               // 1
var BenefitsInKind = new Mongo.Collection('userBenefitsInKind');                                                     // 4
BenefitInKindSchema = new SimpleSchema({                                                                             // 6
    userId: String,                                                                                                  // 7
    benefitType: String,                                                                                             // 8
    startDate: Date,                                                                                                 // 9
    endDate: Date,                                                                                                   // 10
    value: Number,                                                                                                   // 11
    frequency: String                                                                                                // 12
});                                                                                                                  // 6
BenefitsInKind.attachSchema(BenefitInKindSchema);                                                                    // 15
module.exportDefault(BenefitsInKind);                                                                                // 1
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"bonusDetails.js":function(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// imports/api/collections/user_info/compensation/bonusDetails.js                                                    //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
var Mongo = void 0;                                                                                                  // 1
module.watch(require("meteor/mongo"), {                                                                              // 1
    Mongo: function (v) {                                                                                            // 1
        Mongo = v;                                                                                                   // 1
    }                                                                                                                // 1
}, 0);                                                                                                               // 1
var SimpleSchema = void 0;                                                                                           // 1
module.watch(require("simpl-schema"), {                                                                              // 1
    "default": function (v) {                                                                                        // 1
        SimpleSchema = v;                                                                                            // 1
    }                                                                                                                // 1
}, 1);                                                                                                               // 1
var BonusDetails = new Mongo.Collection('userBonusDetails');                                                         // 4
BonusDetailsSchema = new SimpleSchema({                                                                              // 6
    userId: String,                                                                                                  // 7
    date: Date,                                                                                                      // 8
    amount: Number,                                                                                                  // 9
    currency: String                                                                                                 // 10
});                                                                                                                  // 6
BonusDetails.attachSchema(BonusDetailsSchema);                                                                       // 13
module.exportDefault(BonusDetails);                                                                                  // 1
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"salary.js":function(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// imports/api/collections/user_info/compensation/salary.js                                                          //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
var Mongo = void 0;                                                                                                  // 1
module.watch(require("meteor/mongo"), {                                                                              // 1
    Mongo: function (v) {                                                                                            // 1
        Mongo = v;                                                                                                   // 1
    }                                                                                                                // 1
}, 0);                                                                                                               // 1
var SimpleSchema = void 0;                                                                                           // 1
module.watch(require("simpl-schema"), {                                                                              // 1
    "default": function (v) {                                                                                        // 1
        SimpleSchema = v;                                                                                            // 1
    }                                                                                                                // 1
}, 1);                                                                                                               // 1
var Salary = new Mongo.Collection('userSalary');                                                                     // 4
SalarySchema = new SimpleSchema({                                                                                    // 6
    userId: {                                                                                                        // 7
        type: String,                                                                                                // 7
        optional: true                                                                                               // 7
    },                                                                                                               // 7
    businessId: {                                                                                                    // 8
        type: String,                                                                                                // 8
        optional: true                                                                                               // 8
    },                                                                                                               // 8
    effectiveDate: Date,                                                                                             // 9
    salary: Number,                                                                                                  // 10
    frequency: String,                                                                                               // 11
    currency: String,                                                                                                // 12
    notes: String                                                                                                    // 13
});                                                                                                                  // 6
Salary.attachSchema(SalarySchema);                                                                                   // 16
module.exportDefault(Salary);                                                                                        // 1
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"bankInfo.js":function(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// imports/api/collections/user_info/bankInfo.js                                                                     //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
var Mongo = void 0;                                                                                                  // 1
module.watch(require("meteor/mongo"), {                                                                              // 1
    Mongo: function (v) {                                                                                            // 1
        Mongo = v;                                                                                                   // 1
    }                                                                                                                // 1
}, 0);                                                                                                               // 1
var SimpleSchema = void 0;                                                                                           // 1
module.watch(require("simpl-schema"), {                                                                              // 1
    "default": function (v) {                                                                                        // 1
        SimpleSchema = v;                                                                                            // 1
    }                                                                                                                // 1
}, 1);                                                                                                               // 1
var BankInfo = new Mongo.Collection('userBankInfo');                                                                 // 4
BankInfoSchema = new SimpleSchema({                                                                                  // 6
    userId: {                                                                                                        // 7
        type: String,                                                                                                // 7
        optional: true                                                                                               // 7
    },                                                                                                               // 7
    businessId: {                                                                                                    // 8
        type: String,                                                                                                // 8
        optional: true                                                                                               // 8
    },                                                                                                               // 8
    accountNumber: {                                                                                                 // 9
        type: String,                                                                                                // 9
        optional: true                                                                                               // 9
    },                                                                                                               // 9
    sortCode: {                                                                                                      // 10
        type: String,                                                                                                // 10
        optional: true                                                                                               // 10
    },                                                                                                               // 10
    accountName: {                                                                                                   // 11
        type: String,                                                                                                // 11
        optional: true                                                                                               // 11
    },                                                                                                               // 11
    bankName: {                                                                                                      // 12
        type: String,                                                                                                // 12
        optional: true                                                                                               // 12
    },                                                                                                               // 12
    IBAN: {                                                                                                          // 13
        type: String,                                                                                                // 13
        optional: true                                                                                               // 13
    },                                                                                                               // 13
    Swift: {                                                                                                         // 14
        type: String,                                                                                                // 14
        optional: true                                                                                               // 14
    },                                                                                                               // 14
    BIC: {                                                                                                           // 15
        type: String,                                                                                                // 15
        optional: true                                                                                               // 15
    },                                                                                                               // 15
    bankAddress: {                                                                                                   // 16
        type: Object,                                                                                                // 16
        optional: true                                                                                               // 16
    },                                                                                                               // 16
    'bankAddress.line1': {                                                                                           // 17
        type: String,                                                                                                // 17
        optional: true                                                                                               // 17
    },                                                                                                               // 17
    'bankAddress.line2': {                                                                                           // 18
        type: String,                                                                                                // 18
        optional: true                                                                                               // 18
    },                                                                                                               // 18
    'bankAddress.city': {                                                                                            // 19
        type: String,                                                                                                // 19
        optional: true                                                                                               // 19
    },                                                                                                               // 19
    'bankAddress.country': {                                                                                         // 20
        type: String,                                                                                                // 20
        optional: true                                                                                               // 20
    },                                                                                                               // 20
    'bankAddress.postcode': {                                                                                        // 21
        type: String,                                                                                                // 21
        optional: true                                                                                               // 21
    },                                                                                                               // 21
    'bankAddress.taxCode': {                                                                                         // 22
        type: String,                                                                                                // 22
        optional: true                                                                                               // 22
    }                                                                                                                // 22
});                                                                                                                  // 6
BankInfo.attachSchema(BankInfoSchema);                                                                               // 25
module.exportDefault(BankInfo);                                                                                      // 1
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"contact.js":function(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// imports/api/collections/user_info/contact.js                                                                      //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
var Mongo = void 0;                                                                                                  // 1
module.watch(require("meteor/mongo"), {                                                                              // 1
    Mongo: function (v) {                                                                                            // 1
        Mongo = v;                                                                                                   // 1
    }                                                                                                                // 1
}, 0);                                                                                                               // 1
var SimpleSchema = void 0;                                                                                           // 1
module.watch(require("simpl-schema"), {                                                                              // 1
    "default": function (v) {                                                                                        // 1
        SimpleSchema = v;                                                                                            // 1
    }                                                                                                                // 1
}, 1);                                                                                                               // 1
var Contact = new Mongo.Collection('userContact');                                                                   // 4
ContactSchema = new SimpleSchema({                                                                                   // 6
    userId: {                                                                                                        // 7
        type: String,                                                                                                // 7
        optional: true                                                                                               // 7
    },                                                                                                               // 7
    businessId: {                                                                                                    // 8
        type: String,                                                                                                // 8
        optional: true                                                                                               // 8
    },                                                                                                               // 8
    name: {                                                                                                          // 9
        type: String,                                                                                                // 9
        defaultValue: ''                                                                                             // 9
    },                                                                                                               // 9
    relationship: {                                                                                                  // 10
        type: String,                                                                                                // 10
        optional: true                                                                                               // 10
    },                                                                                                               // 10
    telephone: {                                                                                                     // 11
        type: String,                                                                                                // 11
        optional: true                                                                                               // 11
    },                                                                                                               // 11
    email: {                                                                                                         // 12
        type: String,                                                                                                // 12
        defaultValue: ''                                                                                             // 12
    }                                                                                                                // 12
});                                                                                                                  // 6
Contact.attachSchema(ContactSchema);                                                                                 // 15
module.exportDefault(Contact);                                                                                       // 1
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"education.js":function(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// imports/api/collections/user_info/education.js                                                                    //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
var Mongo = void 0;                                                                                                  // 1
module.watch(require("meteor/mongo"), {                                                                              // 1
    Mongo: function (v) {                                                                                            // 1
        Mongo = v;                                                                                                   // 1
    }                                                                                                                // 1
}, 0);                                                                                                               // 1
var SimpleSchema = void 0;                                                                                           // 1
module.watch(require("simpl-schema"), {                                                                              // 1
    "default": function (v) {                                                                                        // 1
        SimpleSchema = v;                                                                                            // 1
    }                                                                                                                // 1
}, 1);                                                                                                               // 1
var Education = new Mongo.Collection('userEducation');                                                               // 4
EducationSchema = new SimpleSchema({                                                                                 // 6
    userId: {                                                                                                        // 7
        type: String,                                                                                                // 7
        optional: true                                                                                               // 7
    },                                                                                                               // 7
    businessId: {                                                                                                    // 8
        type: String,                                                                                                // 8
        optional: true                                                                                               // 8
    },                                                                                                               // 8
    institutionName: String,                                                                                         // 9
    startDate: Date,                                                                                                 // 10
    endDate: Date,                                                                                                   // 11
    qualifications: String                                                                                           // 12
});                                                                                                                  // 6
Education.attachSchema(EducationSchema);                                                                             // 15
module.exportDefault(Education);                                                                                     // 1
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"employeeIds.js":function(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// imports/api/collections/user_info/employeeIds.js                                                                  //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
module.export({                                                                                                      // 1
    EmployeeIdsStore: function () {                                                                                  // 1
        return EmployeeIdsStore;                                                                                     // 1
    }                                                                                                                // 1
});                                                                                                                  // 1
var Mongo = void 0;                                                                                                  // 1
module.watch(require("meteor/mongo"), {                                                                              // 1
    Mongo: function (v) {                                                                                            // 1
        Mongo = v;                                                                                                   // 1
    }                                                                                                                // 1
}, 0);                                                                                                               // 1
var LocalStore = void 0;                                                                                             // 1
module.watch(require("meteor/jalik:ufs-local"), {                                                                    // 1
    LocalStore: function (v) {                                                                                       // 1
        LocalStore = v;                                                                                              // 1
    }                                                                                                                // 1
}, 1);                                                                                                               // 1
var UploadFS = void 0;                                                                                               // 1
module.watch(require("meteor/jalik:ufs"), {                                                                          // 1
    UploadFS: function (v) {                                                                                         // 1
        UploadFS = v;                                                                                                // 1
    }                                                                                                                // 1
}, 2);                                                                                                               // 1
var EmployeeIds = new Mongo.Collection('employeeIds');                                                               // 5
var EmployeeIdsStore = new LocalStore({                                                                              // 7
    collection: EmployeeIds,                                                                                         // 8
    name: 'employeeIds',                                                                                             // 9
    path: process.env.UPLOADFS_STORE_PATH + '/employeeIds',                                                          // 10
    mode: '0755',                                                                                                    // 11
    writeMode: '0755',                                                                                               // 12
    permissions: new UploadFS.StorePermissions({                                                                     // 13
        insert: function (userId, doc) {                                                                             // 14
            return true;                                                                                             // 15
        },                                                                                                           // 16
        update: function (userId, doc) {                                                                             // 17
            return true;                                                                                             // 18
        },                                                                                                           // 19
        remove: function (userId, doc) {                                                                             // 20
            return true;                                                                                             // 21
        }                                                                                                            // 22
    })                                                                                                               // 13
});                                                                                                                  // 7
module.exportDefault(EmployeeIds);                                                                                   // 1
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"job.js":function(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// imports/api/collections/user_info/job.js                                                                          //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
var Mongo = void 0;                                                                                                  // 1
module.watch(require("meteor/mongo"), {                                                                              // 1
    Mongo: function (v) {                                                                                            // 1
        Mongo = v;                                                                                                   // 1
    }                                                                                                                // 1
}, 0);                                                                                                               // 1
var SimpleSchema = void 0;                                                                                           // 1
module.watch(require("simpl-schema"), {                                                                              // 1
    "default": function (v) {                                                                                        // 1
        SimpleSchema = v;                                                                                            // 1
    }                                                                                                                // 1
}, 1);                                                                                                               // 1
var Job = new Mongo.Collection('userJob');                                                                           // 4
JobSchema = new SimpleSchema({                                                                                       // 6
    userId: {                                                                                                        // 7
        type: String,                                                                                                // 7
        optional: true                                                                                               // 7
    },                                                                                                               // 7
    businessId: {                                                                                                    // 8
        type: String,                                                                                                // 8
        optional: true                                                                                               // 8
    },                                                                                                               // 8
    title: {                                                                                                         // 9
        type: String,                                                                                                // 9
        optional: true                                                                                               // 9
    },                                                                                                               // 9
    isManager: {                                                                                                     // 10
        type: Boolean,                                                                                               // 10
        optional: true                                                                                               // 10
    },                                                                                                               // 10
    employeeType: {                                                                                                  // 11
        type: String,                                                                                                // 11
        optional: true                                                                                               // 11
    },                                                                                                               // 11
    department: {                                                                                                    // 12
        type: String,                                                                                                // 12
        optional: true                                                                                               // 12
    },                                                                                                               // 12
    team: {                                                                                                          // 13
        type: Object,                                                                                                // 13
        optional: true                                                                                               // 13
    },                                                                                                               // 13
    'team._id': {                                                                                                    // 14
        type: String,                                                                                                // 14
        optional: true                                                                                               // 14
    },                                                                                                               // 14
    'team.name': {                                                                                                   // 15
        type: String,                                                                                                // 15
        optional: true                                                                                               // 15
    },                                                                                                               // 15
    startDate: {                                                                                                     // 16
        type: Date,                                                                                                  // 16
        defaultValue: new Date(0)                                                                                    // 16
    },                                                                                                               // 16
    probationEndDate: {                                                                                              // 17
        type: Date,                                                                                                  // 17
        defaultValue: new Date(0)                                                                                    // 17
    },                                                                                                               // 17
    lengthOfService: {                                                                                               // 18
        type: String,                                                                                                // 18
        optional: true                                                                                               // 18
    },                                                                                                               // 18
    terminationDate: {                                                                                               // 19
        type: Date,                                                                                                  // 19
        defaultValue: new Date(0)                                                                                    // 19
    },                                                                                                               // 19
    annualLeaveEntitlement: {                                                                                        // 20
        type: Number,                                                                                                // 20
        defaultValue: 1,                                                                                             // 20
        optional: true                                                                                               // 20
    },                                                                                                               // 20
    workPermit: {                                                                                                    // 21
        type: Boolean,                                                                                               // 21
        optional: true                                                                                               // 21
    },                                                                                                               // 21
    dateOfExpiry: {                                                                                                  // 22
        type: Date,                                                                                                  // 22
        defaultValue: new Date(0)                                                                                    // 22
    },                                                                                                               // 22
    workingPattern: {                                                                                                // 23
        type: Object,                                                                                                // 23
        optional: true                                                                                               // 23
    },                                                                                                               // 23
    'workingPattern._id': String,                                                                                    // 24
    'workingPattern.name': String,                                                                                   // 25
    access: {                                                                                                        // 26
        type: String,                                                                                                // 26
        optional: true                                                                                               // 26
    },                                                                                                               // 26
    disability: {                                                                                                    // 27
        type: String,                                                                                                // 27
        optional: true                                                                                               // 27
    }                                                                                                                // 27
});                                                                                                                  // 6
Job.attachSchema(JobSchema);                                                                                         // 30
module.exportDefault(Job);                                                                                           // 1
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"personalInformation.js":function(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// imports/api/collections/user_info/personalInformation.js                                                          //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
var Mongo = void 0;                                                                                                  // 1
module.watch(require("meteor/mongo"), {                                                                              // 1
    Mongo: function (v) {                                                                                            // 1
        Mongo = v;                                                                                                   // 1
    }                                                                                                                // 1
}, 0);                                                                                                               // 1
var SimpleSchema = void 0;                                                                                           // 1
module.watch(require("simpl-schema"), {                                                                              // 1
    "default": function (v) {                                                                                        // 1
        SimpleSchema = v;                                                                                            // 1
    }                                                                                                                // 1
}, 1);                                                                                                               // 1
var PersonalInformation = new Mongo.Collection('personalInformation');                                               // 4
PersonalInformationSchema = new SimpleSchema({                                                                       // 6
    userId: {                                                                                                        // 7
        type: String                                                                                                 // 7
    },                                                                                                               // 7
    middleName: {                                                                                                    // 8
        type: String,                                                                                                // 8
        optional: true                                                                                               // 8
    },                                                                                                               // 8
    address: {                                                                                                       // 9
        type: String,                                                                                                // 9
        optional: true                                                                                               // 9
    },                                                                                                               // 9
    city: {                                                                                                          // 10
        type: String,                                                                                                // 10
        optional: true                                                                                               // 10
    },                                                                                                               // 10
    country: {                                                                                                       // 11
        type: String,                                                                                                // 11
        optional: true                                                                                               // 11
    },                                                                                                               // 11
    postcode: {                                                                                                      // 12
        type: String,                                                                                                // 12
        optional: true                                                                                               // 12
    },                                                                                                               // 12
    email: {                                                                                                         // 13
        type: String,                                                                                                // 13
        optional: true                                                                                               // 13
    },                                                                                                               // 13
    mobile: {                                                                                                        // 14
        type: String,                                                                                                // 14
        optional: true                                                                                               // 14
    },                                                                                                               // 14
    maritalStatus: {                                                                                                 // 15
        type: String,                                                                                                // 15
        optional: true                                                                                               // 15
    },                                                                                                               // 15
    nationality: {                                                                                                   // 16
        type: String,                                                                                                // 16
        optional: true                                                                                               // 16
    },                                                                                                               // 16
    dateOfBirth: {                                                                                                   // 17
        type: Date,                                                                                                  // 17
        defaultValue: new Date(0)                                                                                    // 17
    }                                                                                                                // 17
});                                                                                                                  // 6
PersonalInformation.attachSchema(PersonalInformationSchema);                                                         // 20
module.exportDefault(PersonalInformation);                                                                           // 1
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"personalSettings.js":function(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// imports/api/collections/user_info/personalSettings.js                                                             //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
var Mongo = void 0;                                                                                                  // 1
module.watch(require("meteor/mongo"), {                                                                              // 1
    Mongo: function (v) {                                                                                            // 1
        Mongo = v;                                                                                                   // 1
    }                                                                                                                // 1
}, 0);                                                                                                               // 1
var SimpleSchema = void 0;                                                                                           // 1
module.watch(require("simpl-schema"), {                                                                              // 1
    "default": function (v) {                                                                                        // 1
        SimpleSchema = v;                                                                                            // 1
    }                                                                                                                // 1
}, 1);                                                                                                               // 1
var PersonalSettings = new Mongo.Collection('personalSettings');                                                     // 4
PersonalSettingsSchema = new SimpleSchema({                                                                          // 6
    userId: {                                                                                                        // 7
        type: String,                                                                                                // 7
        optional: true                                                                                               // 7
    },                                                                                                               // 7
    businessId: {                                                                                                    // 8
        type: String,                                                                                                // 8
        optional: true                                                                                               // 8
    },                                                                                                               // 8
    holidayEmails: {                                                                                                 // 9
        type: Boolean,                                                                                               // 9
        defaultValue: true                                                                                           // 9
    },                                                                                                               // 9
    companyUpdatesEmails: {                                                                                          // 10
        type: Boolean,                                                                                               // 10
        defaultValue: true                                                                                           // 10
    },                                                                                                               // 10
    newTasksEmails: {                                                                                                // 11
        type: Boolean,                                                                                               // 11
        defaultValue: true                                                                                           // 11
    }                                                                                                                // 11
});                                                                                                                  // 6
PersonalSettings.attachSchema(PersonalSettingsSchema);                                                               // 14
module.exportDefault(PersonalSettings);                                                                              // 1
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"summary.js":function(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// imports/api/collections/user_info/summary.js                                                                      //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
var Mongo = void 0;                                                                                                  // 1
module.watch(require("meteor/mongo"), {                                                                              // 1
    Mongo: function (v) {                                                                                            // 1
        Mongo = v;                                                                                                   // 1
    }                                                                                                                // 1
}, 0);                                                                                                               // 1
var SimpleSchema = void 0;                                                                                           // 1
module.watch(require("simpl-schema"), {                                                                              // 1
    "default": function (v) {                                                                                        // 1
        SimpleSchema = v;                                                                                            // 1
    }                                                                                                                // 1
}, 1);                                                                                                               // 1
var Summary = new Mongo.Collection('userSummary');                                                                   // 4
SummarySchema = new SimpleSchema({                                                                                   // 6
    userId: {                                                                                                        // 7
        type: String,                                                                                                // 7
        optional: true                                                                                               // 7
    },                                                                                                               // 7
    businessId: {                                                                                                    // 8
        type: String,                                                                                                // 8
        optional: true                                                                                               // 8
    },                                                                                                               // 8
    firstName: {                                                                                                     // 9
        type: String,                                                                                                // 9
        defaultValue: ''                                                                                             // 9
    },                                                                                                               // 9
    surname: {                                                                                                       // 10
        type: String,                                                                                                // 10
        defaultValue: ''                                                                                             // 10
    },                                                                                                               // 10
    employeeId: {                                                                                                    // 11
        type: String,                                                                                                // 11
        defaultValue: ''                                                                                             // 11
    },                                                                                                               // 11
    manager: {                                                                                                       // 12
        type: String,                                                                                                // 12
        defaultValue: ''                                                                                             // 12
    },                                                                                                               // 12
    email: {                                                                                                         // 13
        type: String,                                                                                                // 13
        defaultValue: ''                                                                                             // 13
    },                                                                                                               // 13
    location: {                                                                                                      // 14
        type: String,                                                                                                // 14
        defaultValue: '',                                                                                            // 14
        optional: true                                                                                               // 14
    },                                                                                                               // 14
    telephone: {                                                                                                     // 15
        type: String,                                                                                                // 15
        defaultValue: '',                                                                                            // 15
        optional: true                                                                                               // 15
    },                                                                                                               // 15
    mobile: {                                                                                                        // 16
        type: String,                                                                                                // 16
        defaultValue: '',                                                                                            // 16
        optional: true                                                                                               // 16
    },                                                                                                               // 16
    linkedin: {                                                                                                      // 17
        type: String,                                                                                                // 17
        defaultValue: '',                                                                                            // 17
        optional: true                                                                                               // 17
    },                                                                                                               // 17
    twitter: {                                                                                                       // 18
        type: String,                                                                                                // 18
        defaultValue: '',                                                                                            // 18
        optional: true                                                                                               // 18
    },                                                                                                               // 18
    facebook: {                                                                                                      // 19
        type: String,                                                                                                // 19
        defaultValue: '',                                                                                            // 19
        optional: true                                                                                               // 19
    },                                                                                                               // 19
    photo: {                                                                                                         // 20
        type: String,                                                                                                // 20
        optional: true                                                                                               // 20
    },                                                                                                               // 20
    bio: {                                                                                                           // 21
        type: String,                                                                                                // 21
        defaultValue: '',                                                                                            // 21
        optional: true                                                                                               // 21
    }                                                                                                                // 21
});                                                                                                                  // 6
Summary.attachSchema(SummarySchema);                                                                                 // 24
module.exportDefault(Summary);                                                                                       // 1
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"absence.js":function(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// imports/api/collections/absence.js                                                                                //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
var Mongo = void 0;                                                                                                  // 1
module.watch(require("meteor/mongo"), {                                                                              // 1
    Mongo: function (v) {                                                                                            // 1
        Mongo = v;                                                                                                   // 1
    }                                                                                                                // 1
}, 0);                                                                                                               // 1
var SimpleSchema = void 0;                                                                                           // 1
module.watch(require("simpl-schema"), {                                                                              // 1
    "default": function (v) {                                                                                        // 1
        SimpleSchema = v;                                                                                            // 1
    }                                                                                                                // 1
}, 1);                                                                                                               // 1
var moment = void 0;                                                                                                 // 1
module.watch(require("moment"), {                                                                                    // 1
    "default": function (v) {                                                                                        // 1
        moment = v;                                                                                                  // 1
    }                                                                                                                // 1
}, 2);                                                                                                               // 1
var Absence = new Mongo.Collection('absence');                                                                       // 5
AbsenceSchema = new SimpleSchema({                                                                                   // 7
    employee: Object,                                                                                                // 8
    'employee._id': String,                                                                                          // 9
    'employee.fullName': String,                                                                                     // 10
    startDate: Date,                                                                                                 // 11
    endDate: {                                                                                                       // 12
        type: Date,                                                                                                  // 13
        optional: true,                                                                                              // 14
        autoValue: function () {                                                                                     // 15
            var endDate = this.field('endDate').value;                                                               // 16
            return endDate && moment(endDate).milliseconds(999).seconds(59).minutes(59).hours(23).toDate();          // 18
        }                                                                                                            // 19
    },                                                                                                               // 12
    absenceType: Object,                                                                                             // 21
    'absenceType._id': String,                                                                                       // 22
    'absenceType.name': String,                                                                                      // 23
    notes: {                                                                                                         // 24
        type: String,                                                                                                // 24
        optional: true                                                                                               // 24
    }                                                                                                                // 24
});                                                                                                                  // 7
Absence.attachSchema(AbsenceSchema);                                                                                 // 27
module.exportDefault(Absence);                                                                                       // 1
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"absenceTypes.js":function(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// imports/api/collections/absenceTypes.js                                                                           //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
var Mongo = void 0;                                                                                                  // 1
module.watch(require("meteor/mongo"), {                                                                              // 1
    Mongo: function (v) {                                                                                            // 1
        Mongo = v;                                                                                                   // 1
    }                                                                                                                // 1
}, 0);                                                                                                               // 1
var SimpleSchema = void 0;                                                                                           // 1
module.watch(require("simpl-schema"), {                                                                              // 1
    "default": function (v) {                                                                                        // 1
        SimpleSchema = v;                                                                                            // 1
    }                                                                                                                // 1
}, 1);                                                                                                               // 1
var AbsenceTypes = new Mongo.Collection('absenceTypes');                                                             // 4
AbsenceTypeSchema = new SimpleSchema({                                                                               // 6
    type: String,                                                                                                    // 7
    sicknessIdentifier: Boolean,                                                                                     // 8
    selfCertification: Boolean,                                                                                      // 9
    businessId: String                                                                                               // 10
});                                                                                                                  // 6
AbsenceTypes.attachSchema(AbsenceTypeSchema);                                                                        // 13
module.exportDefault(AbsenceTypes);                                                                                  // 1
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"announcements.js":function(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// imports/api/collections/announcements.js                                                                          //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
var Mongo = void 0;                                                                                                  // 1
module.watch(require("meteor/mongo"), {                                                                              // 1
    Mongo: function (v) {                                                                                            // 1
        Mongo = v;                                                                                                   // 1
    }                                                                                                                // 1
}, 0);                                                                                                               // 1
var SimpleSchema = void 0;                                                                                           // 1
module.watch(require("simpl-schema"), {                                                                              // 1
    "default": function (v) {                                                                                        // 1
        SimpleSchema = v;                                                                                            // 1
    }                                                                                                                // 1
}, 1);                                                                                                               // 1
var Announcements = new Mongo.Collection('announcements');                                                           // 4
AnnouncementsSchema = new SimpleSchema({                                                                             // 6
    title: String,                                                                                                   // 7
    detail: String,                                                                                                  // 8
    startDate: Date,                                                                                                 // 9
    endDate: Date,                                                                                                   // 10
    type: String,                                                                                                    // 11
    mandatory: {                                                                                                     // 12
        type: Boolean,                                                                                               // 12
        defaultValue: false                                                                                          // 12
    },                                                                                                               // 12
    business: String,                                                                                                // 13
    readBy: {                                                                                                        // 14
        type: Array,                                                                                                 // 14
        defaultValue: []                                                                                             // 14
    },                                                                                                               // 14
    'readBy.$': String,                                                                                              // 15
    deletedFor: {                                                                                                    // 16
        type: Array,                                                                                                 // 16
        defaultValue: []                                                                                             // 16
    },                                                                                                               // 16
    'deletedFor.$': String                                                                                           // 17
});                                                                                                                  // 6
Announcements.attachSchema(AnnouncementsSchema);                                                                     // 20
module.exportDefault(Announcements);                                                                                 // 1
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"benefitTypes.js":function(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// imports/api/collections/benefitTypes.js                                                                           //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
var Mongo = void 0;                                                                                                  // 1
module.watch(require("meteor/mongo"), {                                                                              // 1
    Mongo: function (v) {                                                                                            // 1
        Mongo = v;                                                                                                   // 1
    }                                                                                                                // 1
}, 0);                                                                                                               // 1
var SimpleSchema = void 0;                                                                                           // 1
module.watch(require("simpl-schema"), {                                                                              // 1
    "default": function (v) {                                                                                        // 1
        SimpleSchema = v;                                                                                            // 1
    }                                                                                                                // 1
}, 1);                                                                                                               // 1
var BenefitTypes = new Mongo.Collection('benefitTypes');                                                             // 4
BenefitTypeSchema = new SimpleSchema({                                                                               // 6
    name: String,                                                                                                    // 7
    businessId: String                                                                                               // 8
});                                                                                                                  // 6
BenefitTypes.attachSchema(BenefitTypeSchema);                                                                        // 11
module.exportDefault(BenefitTypes);                                                                                  // 1
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"benefitsInKindTypes.js":function(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// imports/api/collections/benefitsInKindTypes.js                                                                    //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
var Mongo = void 0;                                                                                                  // 1
module.watch(require("meteor/mongo"), {                                                                              // 1
    Mongo: function (v) {                                                                                            // 1
        Mongo = v;                                                                                                   // 1
    }                                                                                                                // 1
}, 0);                                                                                                               // 1
var SimpleSchema = void 0;                                                                                           // 1
module.watch(require("simpl-schema"), {                                                                              // 1
    "default": function (v) {                                                                                        // 1
        SimpleSchema = v;                                                                                            // 1
    }                                                                                                                // 1
}, 1);                                                                                                               // 1
var BenefitsInKindTypes = new Mongo.Collection('benefitsInKindTypes');                                               // 4
BenefitInKindSchema = new SimpleSchema({                                                                             // 6
    name: String,                                                                                                    // 7
    businessId: String                                                                                               // 8
});                                                                                                                  // 6
BenefitsInKindTypes.attachSchema(BenefitInKindSchema);                                                               // 11
module.exportDefault(BenefitsInKindTypes);                                                                           // 1
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"businesses.js":function(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// imports/api/collections/businesses.js                                                                             //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
var Mongo = void 0;                                                                                                  // 1
module.watch(require("meteor/mongo"), {                                                                              // 1
    Mongo: function (v) {                                                                                            // 1
        Mongo = v;                                                                                                   // 1
    }                                                                                                                // 1
}, 0);                                                                                                               // 1
var SimpleSchema = void 0;                                                                                           // 1
module.watch(require("simpl-schema"), {                                                                              // 1
    "default": function (v) {                                                                                        // 1
        SimpleSchema = v;                                                                                            // 1
    }                                                                                                                // 1
}, 1);                                                                                                               // 1
var Businesses = new Mongo.Collection('businesses');                                                                 // 4
BusinessSchema = new SimpleSchema({                                                                                  // 6
    name: String,                                                                                                    // 7
    address: {                                                                                                       // 8
        type: String,                                                                                                // 8
        optional: true                                                                                               // 8
    },                                                                                                               // 8
    city: {                                                                                                          // 9
        type: String,                                                                                                // 9
        optional: true                                                                                               // 9
    },                                                                                                               // 9
    country: {                                                                                                       // 10
        type: String,                                                                                                // 10
        optional: true                                                                                               // 10
    },                                                                                                               // 10
    postcode: {                                                                                                      // 11
        type: String,                                                                                                // 11
        optional: true                                                                                               // 11
    },                                                                                                               // 11
    employeesCount: {                                                                                                // 12
        type: String,                                                                                                // 12
        allowedValues: ['1-5', '6-10', '11-15', '16-20', '21-25']                                                    // 12
    },                                                                                                               // 12
    webAddress: {                                                                                                    // 13
        type: String,                                                                                                // 13
        optional: true                                                                                               // 13
    },                                                                                                               // 13
    contactName: {                                                                                                   // 14
        type: String,                                                                                                // 14
        optional: true                                                                                               // 14
    },                                                                                                               // 14
    email: String,                                                                                                   // 15
    startDate: {                                                                                                     // 16
        type: Date,                                                                                                  // 16
        defaultValue: new Date(0)                                                                                    // 16
    },                                                                                                               // 16
    endDate: {                                                                                                       // 17
        type: Date,                                                                                                  // 17
        defaultValue: new Date(0)                                                                                    // 17
    },                                                                                                               // 17
    price: {                                                                                                         // 18
        type: Number,                                                                                                // 18
        optional: true                                                                                               // 18
    },                                                                                                               // 18
    paymentFrequency: {                                                                                              // 19
        type: String,                                                                                                // 19
        allowedValues: ['per month', 'per year'],                                                                    // 19
        optional: true                                                                                               // 19
    },                                                                                                               // 19
    status: {                                                                                                        // 20
        type: String,                                                                                                // 20
        allowedValues: ['live', 'expired', 'trial', 'trial_ended']                                                   // 20
    },                                                                                                               // 20
    bank: {                                                                                                          // 21
        type: Object,                                                                                                // 21
        optional: true                                                                                               // 21
    },                                                                                                               // 21
    'bank.name': {                                                                                                   // 22
        type: String,                                                                                                // 22
        optional: true                                                                                               // 22
    },                                                                                                               // 22
    'bank.accountNumber': {                                                                                          // 23
        type: Number,                                                                                                // 23
        optional: true                                                                                               // 23
    },                                                                                                               // 23
    'bank.sortCode': {                                                                                               // 24
        type: String,                                                                                                // 24
        optional: true                                                                                               // 24
    },                                                                                                               // 24
    'bank.accountName': {                                                                                            // 25
        type: String,                                                                                                // 25
        optional: true                                                                                               // 25
    },                                                                                                               // 25
    'bank.IBAN': {                                                                                                   // 26
        type: String,                                                                                                // 26
        optional: true                                                                                               // 26
    },                                                                                                               // 26
    'bank.swift': {                                                                                                  // 27
        type: String,                                                                                                // 27
        optional: true                                                                                               // 27
    },                                                                                                               // 27
    'bank.BIC': {                                                                                                    // 28
        type: String,                                                                                                // 28
        optional: true                                                                                               // 28
    },                                                                                                               // 28
    'bank.address': {                                                                                                // 29
        type: String,                                                                                                // 29
        optional: true                                                                                               // 29
    },                                                                                                               // 29
    'bank.city': {                                                                                                   // 30
        type: String,                                                                                                // 30
        optional: true                                                                                               // 30
    },                                                                                                               // 30
    'bank.country': {                                                                                                // 31
        type: String,                                                                                                // 31
        optional: true                                                                                               // 31
    },                                                                                                               // 31
    'bank.postcode': {                                                                                               // 32
        type: String,                                                                                                // 32
        optional: true                                                                                               // 32
    }                                                                                                                // 32
});                                                                                                                  // 6
Businesses.attachSchema(BusinessSchema);                                                                             // 35
module.exportDefault(Businesses);                                                                                    // 1
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"companyDetails.js":function(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// imports/api/collections/companyDetails.js                                                                         //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
var Mongo = void 0;                                                                                                  // 1
module.watch(require("meteor/mongo"), {                                                                              // 1
    Mongo: function (v) {                                                                                            // 1
        Mongo = v;                                                                                                   // 1
    }                                                                                                                // 1
}, 0);                                                                                                               // 1
var SimpleSchema = void 0;                                                                                           // 1
module.watch(require("simpl-schema"), {                                                                              // 1
    "default": function (v) {                                                                                        // 1
        SimpleSchema = v;                                                                                            // 1
    }                                                                                                                // 1
}, 1);                                                                                                               // 1
var CompanyDetails = new Mongo.Collection('companyDetails');                                                         // 4
CompanyDetaislSchema = new SimpleSchema({                                                                            // 6
    business: String,                                                                                                // 7
    holidaysToCarry: Number,                                                                                         // 8
    monthsBeforeAlerts: Number,                                                                                      // 9
    defaultCurrency: String,                                                                                         // 10
    country: String,                                                                                                 // 11
    defaultProbationWeeks: Number,                                                                                   // 12
    taskAlerts1: Number,                                                                                             // 13
    taskAlerts2: Number,                                                                                             // 14
    taskAlerts3: Number                                                                                              // 15
});                                                                                                                  // 6
CompanyDetails.attachSchema(CompanyDetaislSchema);                                                                   // 18
module.exportDefault(CompanyDetails);                                                                                // 1
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"contentPages.js":function(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// imports/api/collections/contentPages.js                                                                           //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
var Mongo = void 0;                                                                                                  // 1
module.watch(require("meteor/mongo"), {                                                                              // 1
    Mongo: function (v) {                                                                                            // 1
        Mongo = v;                                                                                                   // 1
    }                                                                                                                // 1
}, 0);                                                                                                               // 1
var SimpleSchema = void 0;                                                                                           // 1
module.watch(require("simpl-schema"), {                                                                              // 1
    "default": function (v) {                                                                                        // 1
        SimpleSchema = v;                                                                                            // 1
    }                                                                                                                // 1
}, 1);                                                                                                               // 1
var ContentPages = new Mongo.Collection('contentPages');                                                             // 4
ContentPagesSchema = new SimpleSchema({                                                                              // 6
    name: String,                                                                                                    // 7
    summary: String,                                                                                                 // 8
    article: String,                                                                                                 // 9
    isActive: Boolean,                                                                                               // 10
    visibleFor: String,                                                                                              // 11
    business: String,                                                                                                // 12
    order: Number                                                                                                    // 13
});                                                                                                                  // 6
ContentPages.attachSchema(ContentPagesSchema);                                                                       // 16
module.exportDefault(ContentPages);                                                                                  // 1
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"countries.js":function(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// imports/api/collections/countries.js                                                                              //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
var Mongo = void 0;                                                                                                  // 1
module.watch(require("meteor/mongo"), {                                                                              // 1
  Mongo: function (v) {                                                                                              // 1
    Mongo = v;                                                                                                       // 1
  }                                                                                                                  // 1
}, 0);                                                                                                               // 1
var Countries = new Mongo.Collection('countries');                                                                   // 3
module.exportDefault(Countries);                                                                                     // 1
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"currencies.js":function(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// imports/api/collections/currencies.js                                                                             //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
var Mongo = void 0;                                                                                                  // 1
module.watch(require("meteor/mongo"), {                                                                              // 1
    Mongo: function (v) {                                                                                            // 1
        Mongo = v;                                                                                                   // 1
    }                                                                                                                // 1
}, 0);                                                                                                               // 1
var SimpleSchema = void 0;                                                                                           // 1
module.watch(require("simpl-schema"), {                                                                              // 1
    "default": function (v) {                                                                                        // 1
        SimpleSchema = v;                                                                                            // 1
    }                                                                                                                // 1
}, 1);                                                                                                               // 1
var Currencies = new Mongo.Collection('currencies');                                                                 // 4
CurrencySchema = new SimpleSchema({                                                                                  // 6
    name: String,                                                                                                    // 7
    businessId: String                                                                                               // 8
});                                                                                                                  // 6
Currencies.attachSchema(CurrencySchema);                                                                             // 11
module.exportDefault(Currencies);                                                                                    // 1
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"departments.js":function(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// imports/api/collections/departments.js                                                                            //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
var Mongo = void 0;                                                                                                  // 1
module.watch(require("meteor/mongo"), {                                                                              // 1
    Mongo: function (v) {                                                                                            // 1
        Mongo = v;                                                                                                   // 1
    }                                                                                                                // 1
}, 0);                                                                                                               // 1
var SimpleSchema = void 0;                                                                                           // 1
module.watch(require("simpl-schema"), {                                                                              // 1
    "default": function (v) {                                                                                        // 1
        SimpleSchema = v;                                                                                            // 1
    }                                                                                                                // 1
}, 1);                                                                                                               // 1
var Departments = new Mongo.Collection('departments');                                                               // 4
DepartmentSchema = new SimpleSchema({                                                                                // 6
    name: String,                                                                                                    // 7
    businessId: String                                                                                               // 8
});                                                                                                                  // 6
Departments.attachSchema(DepartmentSchema);                                                                          // 11
module.exportDefault(Departments);                                                                                   // 1
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"employmentTypes.js":function(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// imports/api/collections/employmentTypes.js                                                                        //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
var Mongo = void 0;                                                                                                  // 1
module.watch(require("meteor/mongo"), {                                                                              // 1
    Mongo: function (v) {                                                                                            // 1
        Mongo = v;                                                                                                   // 1
    }                                                                                                                // 1
}, 0);                                                                                                               // 1
var SimpleSchema = void 0;                                                                                           // 1
module.watch(require("simpl-schema"), {                                                                              // 1
    "default": function (v) {                                                                                        // 1
        SimpleSchema = v;                                                                                            // 1
    }                                                                                                                // 1
}, 1);                                                                                                               // 1
var EmploymentTypes = new Mongo.Collection('employmentTypes');                                                       // 4
EmploymentTypeSchema = new SimpleSchema({                                                                            // 6
    name: String,                                                                                                    // 7
    businessId: String                                                                                               // 8
});                                                                                                                  // 6
EmploymentTypes.attachSchema(EmploymentTypeSchema);                                                                  // 11
module.exportDefault(EmploymentTypes);                                                                               // 1
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"holiday.js":function(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// imports/api/collections/holiday.js                                                                                //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
var Mongo = void 0;                                                                                                  // 1
module.watch(require("meteor/mongo"), {                                                                              // 1
    Mongo: function (v) {                                                                                            // 1
        Mongo = v;                                                                                                   // 1
    }                                                                                                                // 1
}, 0);                                                                                                               // 1
var SimpleSchema = void 0;                                                                                           // 1
module.watch(require("simpl-schema"), {                                                                              // 1
    "default": function (v) {                                                                                        // 1
        SimpleSchema = v;                                                                                            // 1
    }                                                                                                                // 1
}, 1);                                                                                                               // 1
var moment = void 0;                                                                                                 // 1
module.watch(require("moment"), {                                                                                    // 1
    "default": function (v) {                                                                                        // 1
        moment = v;                                                                                                  // 1
    }                                                                                                                // 1
}, 2);                                                                                                               // 1
var Holiday = new Mongo.Collection('holiday');                                                                       // 5
HolidaySchema = new SimpleSchema({                                                                                   // 7
    approvedBy: {                                                                                                    // 8
        type: Object,                                                                                                // 8
        optional: true,                                                                                              // 8
        defaultValue: null                                                                                           // 8
    },                                                                                                               // 8
    'approvedBy._id': String,                                                                                        // 9
    'approvedBy.fullName': String,                                                                                   // 10
    createdAt: {                                                                                                     // 11
        type: Date,                                                                                                  // 11
        defaultValue: new Date()                                                                                     // 11
    },                                                                                                               // 11
    cancelledDate: {                                                                                                 // 12
        type: Date,                                                                                                  // 12
        optional: true,                                                                                              // 12
        defaultValue: null                                                                                           // 12
    },                                                                                                               // 12
    cancelReason: {                                                                                                  // 13
        type: String,                                                                                                // 13
        optional: true                                                                                               // 13
    },                                                                                                               // 13
    employee: Object,                                                                                                // 14
    'employee._id': String,                                                                                          // 15
    'employee.fullName': String,                                                                                     // 16
    startDate: Date,                                                                                                 // 17
    endDate: {                                                                                                       // 18
        type: Date,                                                                                                  // 19
        autoValue: function () {                                                                                     // 20
            var endDate = this.field('endDate').value;                                                               // 21
            return this.isInsert ? moment(endDate).milliseconds(999).seconds(59).minutes(59).hours(23).toDate() : endDate;
        }                                                                                                            // 24
    },                                                                                                               // 18
    duration: Number,                                                                                                // 26
    status: {                                                                                                        // 27
        type: String,                                                                                                // 27
        allowedValues: ['pending', 'approved', 'cancelled'],                                                         // 27
        defaultValue: 'pending'                                                                                      // 27
    },                                                                                                               // 27
    notes: {                                                                                                         // 28
        type: String,                                                                                                // 28
        optional: true                                                                                               // 28
    }                                                                                                                // 28
});                                                                                                                  // 7
Holiday.attachSchema(HolidaySchema);                                                                                 // 31
module.exportDefault(Holiday);                                                                                       // 1
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"holidayDates.js":function(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// imports/api/collections/holidayDates.js                                                                           //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
var Mongo = void 0;                                                                                                  // 1
module.watch(require("meteor/mongo"), {                                                                              // 1
    Mongo: function (v) {                                                                                            // 1
        Mongo = v;                                                                                                   // 1
    }                                                                                                                // 1
}, 0);                                                                                                               // 1
var SimpleSchema = void 0;                                                                                           // 1
module.watch(require("simpl-schema"), {                                                                              // 1
    "default": function (v) {                                                                                        // 1
        SimpleSchema = v;                                                                                            // 1
    }                                                                                                                // 1
}, 1);                                                                                                               // 1
var moment = void 0;                                                                                                 // 1
module.watch(require("moment"), {                                                                                    // 1
    "default": function (v) {                                                                                        // 1
        moment = v;                                                                                                  // 1
    }                                                                                                                // 1
}, 2);                                                                                                               // 1
var HolidayDates = new Mongo.Collection('holidayDates');                                                             // 5
HolidayDatesSchema = new SimpleSchema({                                                                              // 7
    name: String,                                                                                                    // 8
    date: {                                                                                                          // 9
        type: Date,                                                                                                  // 10
        autoValue: function () {                                                                                     // 11
            var date = this.field('date').value;                                                                     // 12
            return moment(date).milliseconds(0).seconds(0).minutes(0).hours(0).toDate();                             // 14
        }                                                                                                            // 15
    },                                                                                                               // 9
    endDate: {                                                                                                       // 17
        type: Date,                                                                                                  // 17
        optional: true                                                                                               // 17
    },                                                                                                               // 17
    holidayType: {                                                                                                   // 18
        type: String,                                                                                                // 18
        allowedValues: ['public', 'company', 'blocked']                                                              // 18
    },                                                                                                               // 18
    isActive: Boolean,                                                                                               // 19
    businessId: String                                                                                               // 20
});                                                                                                                  // 7
HolidayDates.attachSchema(HolidayDatesSchema);                                                                       // 23
module.exportDefault(HolidayDates);                                                                                  // 1
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"hrDocuments.js":function(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// imports/api/collections/hrDocuments.js                                                                            //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
module.export({                                                                                                      // 1
    HRDocumentsStore: function () {                                                                                  // 1
        return HRDocumentsStore;                                                                                     // 1
    }                                                                                                                // 1
});                                                                                                                  // 1
var Mongo = void 0;                                                                                                  // 1
module.watch(require("meteor/mongo"), {                                                                              // 1
    Mongo: function (v) {                                                                                            // 1
        Mongo = v;                                                                                                   // 1
    }                                                                                                                // 1
}, 0);                                                                                                               // 1
var LocalStore = void 0;                                                                                             // 1
module.watch(require("meteor/jalik:ufs-local"), {                                                                    // 1
    LocalStore: function (v) {                                                                                       // 1
        LocalStore = v;                                                                                              // 1
    }                                                                                                                // 1
}, 1);                                                                                                               // 1
var UploadFS = void 0;                                                                                               // 1
module.watch(require("meteor/jalik:ufs"), {                                                                          // 1
    UploadFS: function (v) {                                                                                         // 1
        UploadFS = v;                                                                                                // 1
    }                                                                                                                // 1
}, 2);                                                                                                               // 1
var HRDocuments = new Mongo.Collection('hrDocuments');                                                               // 5
var HRDocumentsStore = new LocalStore({                                                                              // 7
    collection: HRDocuments,                                                                                         // 8
    name: 'hrDocuments',                                                                                             // 9
    path: process.env.UPLOADFS_STORE_PATH + '/hrDocuments',                                                          // 10
    mode: '0755',                                                                                                    // 11
    writeMode: '0755',                                                                                               // 12
    permissions: new UploadFS.StorePermissions({                                                                     // 13
        insert: function (userId, doc) {                                                                             // 14
            return true;                                                                                             // 15
        },                                                                                                           // 16
        update: function (userId, doc) {                                                                             // 17
            return true;                                                                                             // 18
        },                                                                                                           // 19
        remove: function (userId, doc) {                                                                             // 20
            return true;                                                                                             // 21
        }                                                                                                            // 22
    })                                                                                                               // 13
});                                                                                                                  // 7
module.exportDefault(HRDocuments);                                                                                   // 1
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"hrPolicies.js":function(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// imports/api/collections/hrPolicies.js                                                                             //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
var Mongo = void 0;                                                                                                  // 1
module.watch(require("meteor/mongo"), {                                                                              // 1
    Mongo: function (v) {                                                                                            // 1
        Mongo = v;                                                                                                   // 1
    }                                                                                                                // 1
}, 0);                                                                                                               // 1
var SimpleSchema = void 0;                                                                                           // 1
module.watch(require("simpl-schema"), {                                                                              // 1
    "default": function (v) {                                                                                        // 1
        SimpleSchema = v;                                                                                            // 1
    }                                                                                                                // 1
}, 1);                                                                                                               // 1
var HRPolicies = new Mongo.Collection('hrPolicies');                                                                 // 4
HRPoliciesSchema = new SimpleSchema({                                                                                // 6
    name: String,                                                                                                    // 7
    summary: String,                                                                                                 // 8
    details: String,                                                                                                 // 9
    isActive: Boolean,                                                                                               // 10
    access: String,                                                                                                  // 11
    business: String,                                                                                                // 12
    order: Number                                                                                                    // 13
});                                                                                                                  // 6
HRPolicies.attachSchema(HRPoliciesSchema);                                                                           // 16
module.exportDefault(HRPolicies);                                                                                    // 1
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"images.js":function(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// imports/api/collections/images.js                                                                                 //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
module.export({                                                                                                      // 1
    ImagesStore: function () {                                                                                       // 1
        return ImagesStore;                                                                                          // 1
    }                                                                                                                // 1
});                                                                                                                  // 1
var Mongo = void 0;                                                                                                  // 1
module.watch(require("meteor/mongo"), {                                                                              // 1
    Mongo: function (v) {                                                                                            // 1
        Mongo = v;                                                                                                   // 1
    }                                                                                                                // 1
}, 0);                                                                                                               // 1
var LocalStore = void 0;                                                                                             // 1
module.watch(require("meteor/jalik:ufs-local"), {                                                                    // 1
    LocalStore: function (v) {                                                                                       // 1
        LocalStore = v;                                                                                              // 1
    }                                                                                                                // 1
}, 1);                                                                                                               // 1
var UploadFS = void 0;                                                                                               // 1
module.watch(require("meteor/jalik:ufs"), {                                                                          // 1
    UploadFS: function (v) {                                                                                         // 1
        UploadFS = v;                                                                                                // 1
    }                                                                                                                // 1
}, 2);                                                                                                               // 1
var Images = new Mongo.Collection('images');                                                                         // 5
var ImagesStore = new LocalStore({                                                                                   // 7
    collection: Images,                                                                                              // 8
    name: 'images',                                                                                                  // 9
    path: process.env.UPLOADFS_STORE_PATH + '/images',                                                               // 10
    mode: '0755',                                                                                                    // 11
    writeMode: '0755',                                                                                               // 12
    permissions: new UploadFS.StorePermissions({                                                                     // 13
        insert: function (userId, doc) {                                                                             // 14
            return true;                                                                                             // 15
        },                                                                                                           // 16
        update: function (userId, doc) {                                                                             // 17
            return true;                                                                                             // 18
        },                                                                                                           // 19
        remove: function (userId, doc) {                                                                             // 20
            return true;                                                                                             // 21
        }                                                                                                            // 22
    })                                                                                                               // 13
});                                                                                                                  // 7
module.exportDefault(Images);                                                                                        // 1
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"managementRoles.js":function(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// imports/api/collections/managementRoles.js                                                                        //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
var Mongo = void 0;                                                                                                  // 1
module.watch(require("meteor/mongo"), {                                                                              // 1
    Mongo: function (v) {                                                                                            // 1
        Mongo = v;                                                                                                   // 1
    }                                                                                                                // 1
}, 0);                                                                                                               // 1
var SimpleSchema = void 0;                                                                                           // 1
module.watch(require("simpl-schema"), {                                                                              // 1
    "default": function (v) {                                                                                        // 1
        SimpleSchema = v;                                                                                            // 1
    }                                                                                                                // 1
}, 1);                                                                                                               // 1
var ManagerPermissions = new Mongo.Collection('managerPermissions');                                                 // 4
ManagerPermissionsSchema = new SimpleSchema({                                                                        // 6
    jobEdit: Boolean,                                                                                                // 7
    compensationEdit: Boolean,                                                                                       // 8
    hrDocumentsEdit: Boolean,                                                                                        // 9
    jobView: Boolean,                                                                                                // 10
    compensationView: Boolean,                                                                                       // 11
    hrDocumentsView: Boolean,                                                                                        // 12
    businessId: String                                                                                               // 13
});                                                                                                                  // 6
ManagerPermissions.attachSchema(ManagerPermissionsSchema);                                                           // 16
module.exportDefault(ManagerPermissions);                                                                            // 1
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"nationalities.js":function(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// imports/api/collections/nationalities.js                                                                          //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
var Mongo = void 0;                                                                                                  // 1
module.watch(require("meteor/mongo"), {                                                                              // 1
  Mongo: function (v) {                                                                                              // 1
    Mongo = v;                                                                                                       // 1
  }                                                                                                                  // 1
}, 0);                                                                                                               // 1
var Nationalities = new Mongo.Collection('nationalities');                                                           // 3
module.exportDefault(Nationalities);                                                                                 // 1
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"secretQuestions.js":function(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// imports/api/collections/secretQuestions.js                                                                        //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
var Mongo = void 0;                                                                                                  // 1
module.watch(require("meteor/mongo"), {                                                                              // 1
    Mongo: function (v) {                                                                                            // 1
        Mongo = v;                                                                                                   // 1
    }                                                                                                                // 1
}, 0);                                                                                                               // 1
var SimpleSchema = void 0;                                                                                           // 1
module.watch(require("simpl-schema"), {                                                                              // 1
    "default": function (v) {                                                                                        // 1
        SimpleSchema = v;                                                                                            // 1
    }                                                                                                                // 1
}, 1);                                                                                                               // 1
var SecretQuestions = new Mongo.Collection('secretQuestions');                                                       // 4
SecretQuestionsSchema = new SimpleSchema({                                                                           // 6
    text: String,                                                                                                    // 7
    active: {                                                                                                        // 8
        type: Boolean,                                                                                               // 8
        defaultValue: true                                                                                           // 8
    },                                                                                                               // 8
    inputType: {                                                                                                     // 9
        type: String,                                                                                                // 9
        allowedValues: ['text', 'select', 'date'],                                                                   // 9
        defaultValue: 'text'                                                                                         // 9
    }                                                                                                                // 9
});                                                                                                                  // 6
SecretQuestions.attachSchema(SecretQuestionsSchema);                                                                 // 12
module.exportDefault(SecretQuestions);                                                                               // 1
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"tasks.js":function(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// imports/api/collections/tasks.js                                                                                  //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
var Mongo = void 0;                                                                                                  // 1
module.watch(require("meteor/mongo"), {                                                                              // 1
    Mongo: function (v) {                                                                                            // 1
        Mongo = v;                                                                                                   // 1
    }                                                                                                                // 1
}, 0);                                                                                                               // 1
var SimpleSchema = void 0;                                                                                           // 1
module.watch(require("simpl-schema"), {                                                                              // 1
    "default": function (v) {                                                                                        // 1
        SimpleSchema = v;                                                                                            // 1
    }                                                                                                                // 1
}, 1);                                                                                                               // 1
var Tasks = new Mongo.Collection('userTasks');                                                                       // 4
TasksSchema = new SimpleSchema({                                                                                     // 6
    absence: {                                                                                                       // 7
        type: String,                                                                                                // 7
        optional: true,                                                                                              // 7
        defaultValue: null                                                                                           // 7
    },                                                                                                               // 7
    holiday: {                                                                                                       // 8
        type: String,                                                                                                // 8
        optional: true,                                                                                              // 8
        defaultValue: null                                                                                           // 8
    },                                                                                                               // 8
    createdAt: {                                                                                                     // 9
        type: Date,                                                                                                  // 9
        optional: true,                                                                                              // 9
        defaultValue: new Date()                                                                                     // 9
    },                                                                                                               // 9
    expiryDate: {                                                                                                    // 10
        type: Date,                                                                                                  // 10
        optional: true,                                                                                              // 10
        defaultValue: null                                                                                           // 10
    },                                                                                                               // 10
    isComplete: {                                                                                                    // 11
        type: Boolean,                                                                                               // 11
        optional: true,                                                                                              // 11
        defaultValue: false                                                                                          // 11
    },                                                                                                               // 11
    taskType: {                                                                                                      // 12
        type: String,                                                                                                // 12
        allowedValues: ['default', 'self_certification', 'holiday_approval'],                                        // 12
        defaultValue: 'default'                                                                                      // 12
    },                                                                                                               // 12
    text: String,                                                                                                    // 13
    users: [String] // array in case it will be possible to assign a task to multiple users                          // 14
                                                                                                                     //
});                                                                                                                  // 6
Tasks.attachSchema(TasksSchema);                                                                                     // 17
module.exportDefault(Tasks);                                                                                         // 1
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"teams.js":function(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// imports/api/collections/teams.js                                                                                  //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
var Mongo = void 0;                                                                                                  // 1
module.watch(require("meteor/mongo"), {                                                                              // 1
    Mongo: function (v) {                                                                                            // 1
        Mongo = v;                                                                                                   // 1
    }                                                                                                                // 1
}, 0);                                                                                                               // 1
var SimpleSchema = void 0;                                                                                           // 1
module.watch(require("simpl-schema"), {                                                                              // 1
    "default": function (v) {                                                                                        // 1
        SimpleSchema = v;                                                                                            // 1
    }                                                                                                                // 1
}, 1);                                                                                                               // 1
var Teams = new Mongo.Collection('teams');                                                                           // 4
TeamSchema = new SimpleSchema({                                                                                      // 6
    name: String,                                                                                                    // 7
    businessId: String                                                                                               // 8
});                                                                                                                  // 6
Teams.attachSchema(TeamSchema);                                                                                      // 11
module.exportDefault(Teams);                                                                                         // 1
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"workingPatterns.js":function(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// imports/api/collections/workingPatterns.js                                                                        //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
var Mongo = void 0;                                                                                                  // 1
module.watch(require("meteor/mongo"), {                                                                              // 1
    Mongo: function (v) {                                                                                            // 1
        Mongo = v;                                                                                                   // 1
    }                                                                                                                // 1
}, 0);                                                                                                               // 1
var SimpleSchema = void 0;                                                                                           // 1
module.watch(require("simpl-schema"), {                                                                              // 1
    "default": function (v) {                                                                                        // 1
        SimpleSchema = v;                                                                                            // 1
    }                                                                                                                // 1
}, 1);                                                                                                               // 1
var WorkingPatterns = new Mongo.Collection('workingPatterns');                                                       // 4
WorkingPatternsSchema = new SimpleSchema({                                                                           // 6
    name: String,                                                                                                    // 7
    isActive: Boolean,                                                                                               // 8
    weekHours: {                                                                                                     // 9
        type: Array,                                                                                                 // 9
        defaultValue: [0, 0, 0, 0, 0, 0, 0]                                                                          // 9
    },                                                                                                               // 9
    // count of working hours for each day of week starting from sunday                                              // 9
    'weekHours.$': Number,                                                                                           // 10
    businessId: String                                                                                               // 11
});                                                                                                                  // 6
WorkingPatterns.attachSchema(WorkingPatternsSchema);                                                                 // 14
module.exportDefault(WorkingPatterns);                                                                               // 1
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"server":{"publications.js":function(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// imports/api/server/publications.js                                                                                //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
var Meteor = void 0;                                                                                                 // 1
module.watch(require("meteor/meteor"), {                                                                             // 1
    Meteor: function (v) {                                                                                           // 1
        Meteor = v;                                                                                                  // 1
    }                                                                                                                // 1
}, 0);                                                                                                               // 1
var moment = void 0;                                                                                                 // 1
module.watch(require("moment"), {                                                                                    // 1
    "default": function (v) {                                                                                        // 1
        moment = v;                                                                                                  // 1
    }                                                                                                                // 1
}, 1);                                                                                                               // 1
var Nationalities = void 0;                                                                                          // 1
module.watch(require("../collections/nationalities"), {                                                              // 1
    "default": function (v) {                                                                                        // 1
        Nationalities = v;                                                                                           // 1
    }                                                                                                                // 1
}, 2);                                                                                                               // 1
var Countries = void 0;                                                                                              // 1
module.watch(require("../collections/countries"), {                                                                  // 1
    "default": function (v) {                                                                                        // 1
        Countries = v;                                                                                               // 1
    }                                                                                                                // 1
}, 3);                                                                                                               // 1
var AbsenceTypes = void 0;                                                                                           // 1
module.watch(require("../collections/absenceTypes"), {                                                               // 1
    "default": function (v) {                                                                                        // 1
        AbsenceTypes = v;                                                                                            // 1
    }                                                                                                                // 1
}, 4);                                                                                                               // 1
var Teams = void 0;                                                                                                  // 1
module.watch(require("../collections/teams"), {                                                                      // 1
    "default": function (v) {                                                                                        // 1
        Teams = v;                                                                                                   // 1
    }                                                                                                                // 1
}, 5);                                                                                                               // 1
var Currencies = void 0;                                                                                             // 1
module.watch(require("../collections/currencies"), {                                                                 // 1
    "default": function (v) {                                                                                        // 1
        Currencies = v;                                                                                              // 1
    }                                                                                                                // 1
}, 6);                                                                                                               // 1
var EmploymentTypes = void 0;                                                                                        // 1
module.watch(require("../collections/employmentTypes"), {                                                            // 1
    "default": function (v) {                                                                                        // 1
        EmploymentTypes = v;                                                                                         // 1
    }                                                                                                                // 1
}, 7);                                                                                                               // 1
var BenefitTypes = void 0;                                                                                           // 1
module.watch(require("../collections/benefitTypes"), {                                                               // 1
    "default": function (v) {                                                                                        // 1
        BenefitTypes = v;                                                                                            // 1
    }                                                                                                                // 1
}, 8);                                                                                                               // 1
var BenefitsInKindTypes = void 0;                                                                                    // 1
module.watch(require("../collections/benefitsInKindTypes"), {                                                        // 1
    "default": function (v) {                                                                                        // 1
        BenefitsInKindTypes = v;                                                                                     // 1
    }                                                                                                                // 1
}, 9);                                                                                                               // 1
var Departments = void 0;                                                                                            // 1
module.watch(require("../collections/departments"), {                                                                // 1
    "default": function (v) {                                                                                        // 1
        Departments = v;                                                                                             // 1
    }                                                                                                                // 1
}, 10);                                                                                                              // 1
var Announcements = void 0;                                                                                          // 1
module.watch(require("../collections/announcements"), {                                                              // 1
    "default": function (v) {                                                                                        // 1
        Announcements = v;                                                                                           // 1
    }                                                                                                                // 1
}, 11);                                                                                                              // 1
var Images = void 0;                                                                                                 // 1
module.watch(require("../collections/images"), {                                                                     // 1
    "default": function (v) {                                                                                        // 1
        Images = v;                                                                                                  // 1
    }                                                                                                                // 1
}, 12);                                                                                                              // 1
var ContentPages = void 0;                                                                                           // 1
module.watch(require("../collections/contentPages"), {                                                               // 1
    "default": function (v) {                                                                                        // 1
        ContentPages = v;                                                                                            // 1
    }                                                                                                                // 1
}, 13);                                                                                                              // 1
var HRPolicies = void 0;                                                                                             // 1
module.watch(require("../collections/hrPolicies"), {                                                                 // 1
    "default": function (v) {                                                                                        // 1
        HRPolicies = v;                                                                                              // 1
    }                                                                                                                // 1
}, 14);                                                                                                              // 1
var Businesses = void 0;                                                                                             // 1
module.watch(require("../collections/businesses"), {                                                                 // 1
    "default": function (v) {                                                                                        // 1
        Businesses = v;                                                                                              // 1
    }                                                                                                                // 1
}, 15);                                                                                                              // 1
var WorkingPatterns = void 0;                                                                                        // 1
module.watch(require("../collections/workingPatterns"), {                                                            // 1
    "default": function (v) {                                                                                        // 1
        WorkingPatterns = v;                                                                                         // 1
    }                                                                                                                // 1
}, 16);                                                                                                              // 1
var CompanyDetails = void 0;                                                                                         // 1
module.watch(require("../collections/companyDetails"), {                                                             // 1
    "default": function (v) {                                                                                        // 1
        CompanyDetails = v;                                                                                          // 1
    }                                                                                                                // 1
}, 17);                                                                                                              // 1
var HRDocuments = void 0;                                                                                            // 1
module.watch(require("../collections/hrDocuments"), {                                                                // 1
    "default": function (v) {                                                                                        // 1
        HRDocuments = v;                                                                                             // 1
    }                                                                                                                // 1
}, 18);                                                                                                              // 1
var PersonalSettings = void 0;                                                                                       // 1
module.watch(require("../collections/user_info/personalSettings"), {                                                 // 1
    "default": function (v) {                                                                                        // 1
        PersonalSettings = v;                                                                                        // 1
    }                                                                                                                // 1
}, 19);                                                                                                              // 1
var Summary = void 0;                                                                                                // 1
module.watch(require("../collections/user_info/summary"), {                                                          // 1
    "default": function (v) {                                                                                        // 1
        Summary = v;                                                                                                 // 1
    }                                                                                                                // 1
}, 20);                                                                                                              // 1
var PersonalInformation = void 0;                                                                                    // 1
module.watch(require("../collections/user_info/personalInformation"), {                                              // 1
    "default": function (v) {                                                                                        // 1
        PersonalInformation = v;                                                                                     // 1
    }                                                                                                                // 1
}, 21);                                                                                                              // 1
var EmployeeIds = void 0;                                                                                            // 1
module.watch(require("../collections/user_info/employeeIds"), {                                                      // 1
    "default": function (v) {                                                                                        // 1
        EmployeeIds = v;                                                                                             // 1
    }                                                                                                                // 1
}, 22);                                                                                                              // 1
var Education = void 0;                                                                                              // 1
module.watch(require("../collections/user_info/education"), {                                                        // 1
    "default": function (v) {                                                                                        // 1
        Education = v;                                                                                               // 1
    }                                                                                                                // 1
}, 23);                                                                                                              // 1
var Job = void 0;                                                                                                    // 1
module.watch(require("../collections/user_info/job"), {                                                              // 1
    "default": function (v) {                                                                                        // 1
        Job = v;                                                                                                     // 1
    }                                                                                                                // 1
}, 24);                                                                                                              // 1
var Salary = void 0;                                                                                                 // 1
module.watch(require("../collections/user_info/compensation/salary"), {                                              // 1
    "default": function (v) {                                                                                        // 1
        Salary = v;                                                                                                  // 1
    }                                                                                                                // 1
}, 25);                                                                                                              // 1
var BonusDetails = void 0;                                                                                           // 1
module.watch(require("../collections/user_info/compensation/bonusDetails"), {                                        // 1
    "default": function (v) {                                                                                        // 1
        BonusDetails = v;                                                                                            // 1
    }                                                                                                                // 1
}, 26);                                                                                                              // 1
var BenefitDetails = void 0;                                                                                         // 1
module.watch(require("../collections/user_info/compensation/benefitDetails"), {                                      // 1
    "default": function (v) {                                                                                        // 1
        BenefitDetails = v;                                                                                          // 1
    }                                                                                                                // 1
}, 27);                                                                                                              // 1
var BenefitsInKind = void 0;                                                                                         // 1
module.watch(require("../collections/user_info/compensation/benefitsInKind"), {                                      // 1
    "default": function (v) {                                                                                        // 1
        BenefitsInKind = v;                                                                                          // 1
    }                                                                                                                // 1
}, 28);                                                                                                              // 1
var BankInfo = void 0;                                                                                               // 1
module.watch(require("../collections/user_info/bankInfo"), {                                                         // 1
    "default": function (v) {                                                                                        // 1
        BankInfo = v;                                                                                                // 1
    }                                                                                                                // 1
}, 29);                                                                                                              // 1
var Contact = void 0;                                                                                                // 1
module.watch(require("../collections/user_info/contact"), {                                                          // 1
    "default": function (v) {                                                                                        // 1
        Contact = v;                                                                                                 // 1
    }                                                                                                                // 1
}, 30);                                                                                                              // 1
var Absence = void 0;                                                                                                // 1
module.watch(require("../collections/absence"), {                                                                    // 1
    "default": function (v) {                                                                                        // 1
        Absence = v;                                                                                                 // 1
    }                                                                                                                // 1
}, 31);                                                                                                              // 1
var Tasks = void 0;                                                                                                  // 1
module.watch(require("../collections/tasks"), {                                                                      // 1
    "default": function (v) {                                                                                        // 1
        Tasks = v;                                                                                                   // 1
    }                                                                                                                // 1
}, 32);                                                                                                              // 1
var Holiday = void 0;                                                                                                // 1
module.watch(require("../collections/holiday"), {                                                                    // 1
    "default": function (v) {                                                                                        // 1
        Holiday = v;                                                                                                 // 1
    }                                                                                                                // 1
}, 33);                                                                                                              // 1
var HolidayDates = void 0;                                                                                           // 1
module.watch(require("../collections/holidayDates"), {                                                               // 1
    "default": function (v) {                                                                                        // 1
        HolidayDates = v;                                                                                            // 1
    }                                                                                                                // 1
}, 34);                                                                                                              // 1
var ManagerPermissions = void 0;                                                                                     // 1
module.watch(require("../collections/managementRoles"), {                                                            // 1
    "default": function (v) {                                                                                        // 1
        ManagerPermissions = v;                                                                                      // 1
    }                                                                                                                // 1
}, 35);                                                                                                              // 1
Meteor.publish('countries.all', function () {                                                                        // 39
    return Countries.find();                                                                                         // 40
});                                                                                                                  // 41
Meteor.publish('nationalities.all', function () {                                                                    // 43
    return Nationalities.find();                                                                                     // 44
});                                                                                                                  // 45
Meteor.publish('absenceTypes.all', function () {                                                                     // 47
    var businessId = Meteor.user().profile.businessId;                                                               // 47
    return AbsenceTypes.find({                                                                                       // 50
        businessId: businessId                                                                                       // 50
    });                                                                                                              // 50
});                                                                                                                  // 51
Meteor.publish('teams.all', function () {                                                                            // 53
    var businessId = Meteor.user().profile.businessId;                                                               // 53
    return Teams.find({                                                                                              // 56
        businessId: businessId                                                                                       // 56
    });                                                                                                              // 56
});                                                                                                                  // 57
Meteor.publish('currencies.all', function () {                                                                       // 59
    var businessId = Meteor.user().profile.businessId;                                                               // 59
    return Currencies.find({                                                                                         // 62
        businessId: businessId                                                                                       // 62
    });                                                                                                              // 62
});                                                                                                                  // 63
Meteor.publish('employmentTypes.all', function () {                                                                  // 65
    var businessId = Meteor.user().profile.businessId;                                                               // 65
    return EmploymentTypes.find({                                                                                    // 68
        businessId: businessId                                                                                       // 68
    });                                                                                                              // 68
});                                                                                                                  // 69
Meteor.publish('benefitTypes.all', function () {                                                                     // 71
    var businessId = Meteor.user().profile.businessId;                                                               // 71
    return BenefitTypes.find({                                                                                       // 74
        businessId: businessId                                                                                       // 74
    });                                                                                                              // 74
});                                                                                                                  // 75
Meteor.publish('benefitsInKindTypes.all', function () {                                                              // 77
    var businessId = Meteor.user().profile.businessId;                                                               // 77
    return BenefitsInKindTypes.find({                                                                                // 80
        businessId: businessId                                                                                       // 80
    });                                                                                                              // 80
});                                                                                                                  // 81
Meteor.publish('departments.all', function () {                                                                      // 83
    var businessId = Meteor.user().profile.businessId;                                                               // 83
    return Departments.find({                                                                                        // 86
        businessId: businessId                                                                                       // 86
    });                                                                                                              // 86
});                                                                                                                  // 87
Meteor.publish('announcements.all', function () {                                                                    // 89
    var businessId = Meteor.user().profile.businessId;                                                               // 89
    return Announcements.find({                                                                                      // 92
        business: businessId                                                                                         // 92
    }, {                                                                                                             // 92
        sort: {                                                                                                      // 92
            startDate: -1                                                                                            // 92
        }                                                                                                            // 92
    });                                                                                                              // 92
});                                                                                                                  // 93
Meteor.publish('announcements.filterDeleted', function (userId) {                                                    // 95
    var businessId = Meteor.user().profile.businessId;                                                               // 95
    return Announcements.find({                                                                                      // 97
        deletedFor: {                                                                                                // 98
            $ne: userId                                                                                              // 98
        },                                                                                                           // 98
        business: businessId                                                                                         // 99
    }, {                                                                                                             // 97
        sort: {                                                                                                      // 101
            startDate: -1                                                                                            // 101
        }                                                                                                            // 101
    });                                                                                                              // 100
});                                                                                                                  // 103
Meteor.publish('announcements.businessId', function (businessId) {                                                   // 105
    return Announcements.find({                                                                                      // 106
        _id: {                                                                                                       // 106
            $in: ['all', businessId]                                                                                 // 106
        }                                                                                                            // 106
    }, {                                                                                                             // 106
        sort: {                                                                                                      // 106
            startDate: -1                                                                                            // 106
        }                                                                                                            // 106
    });                                                                                                              // 106
});                                                                                                                  // 107
Meteor.publish('images.all', function () {                                                                           // 109
    return Images.find();                                                                                            // 110
});                                                                                                                  // 111
Meteor.publish('contentPages.all', function () {                                                                     // 113
    return ContentPages.find();                                                                                      // 114
});                                                                                                                  // 115
Meteor.publish('contentPages.business', function () {                                                                // 117
    var businessId = Meteor.user().profile.businessId;                                                               // 117
    var visibleFor = Meteor.user().roles[0];                                                                         // 119
    return ContentPages.find({                                                                                       // 121
        business: businessId,                                                                                        // 121
        visibleFor: {                                                                                                // 121
            $in: ['all', visibleFor]                                                                                 // 121
        },                                                                                                           // 121
        isActive: true                                                                                               // 121
    }, {                                                                                                             // 121
        sort: {                                                                                                      // 121
            order: 1                                                                                                 // 121
        }                                                                                                            // 121
    });                                                                                                              // 121
});                                                                                                                  // 122
Meteor.publish('contentPages.single', function (_ref) {                                                              // 124
    var business = _ref.business,                                                                                    // 124
        visibleFor = _ref.visibleFor;                                                                                // 124
    return ContentPages.find({                                                                                       // 125
        business: business,                                                                                          // 125
        visibleFor: {                                                                                                // 125
            $in: ['all', visibleFor]                                                                                 // 125
        },                                                                                                           // 125
        isActive: true                                                                                               // 125
    });                                                                                                              // 125
});                                                                                                                  // 126
Meteor.publish('hrPolicies.all', function () {                                                                       // 128
    return HRPolicies.find();                                                                                        // 129
});                                                                                                                  // 130
Meteor.publish('hrPolicies.business', function () {                                                                  // 132
    var businessId = Meteor.user().profile.businessId;                                                               // 132
    return HRPolicies.find({                                                                                         // 135
        business: businessId,                                                                                        // 135
        isActive: true                                                                                               // 135
    }, {                                                                                                             // 135
        sort: {                                                                                                      // 135
            order: 1                                                                                                 // 135
        }                                                                                                            // 135
    });                                                                                                              // 135
});                                                                                                                  // 136
Meteor.publish('hrPolicies.single', function (_ref2) {                                                               // 138
    var business = _ref2.business,                                                                                   // 138
        access = _ref2.access;                                                                                       // 138
    return HRPolicies.find({                                                                                         // 139
        business: business,                                                                                          // 139
        access: {                                                                                                    // 139
            $in: ['all', access]                                                                                     // 139
        },                                                                                                           // 139
        isActive: true                                                                                               // 139
    });                                                                                                              // 139
});                                                                                                                  // 140
Meteor.publish('businesses.all', function () {                                                                       // 142
    return Businesses.find();                                                                                        // 143
});                                                                                                                  // 144
Meteor.publish('businesses.dropdown', function () {                                                                  // 146
    return Businesses.find({}, {                                                                                     // 147
        fields: {                                                                                                    // 147
            'name': 1                                                                                                // 147
        }                                                                                                            // 147
    });                                                                                                              // 147
});                                                                                                                  // 148
Meteor.publish('workingPatterns.all', function () {                                                                  // 150
    var businessId = Meteor.user().profile.businessId;                                                               // 150
    return WorkingPatterns.find({                                                                                    // 153
        businessId: businessId                                                                                       // 153
    });                                                                                                              // 153
});                                                                                                                  // 154
Meteor.publish('holidayDates.all', function (holidayType) {                                                          // 156
    var businessId = Meteor.user().profile.businessId;                                                               // 156
    return HolidayDates.find({                                                                                       // 159
        businessId: businessId,                                                                                      // 159
        holidayType: holidayType                                                                                     // 159
    });                                                                                                              // 159
});                                                                                                                  // 160
Meteor.publish('companyDetails.businessId', function (businessId) {                                                  // 162
    return CompanyDetails.find({                                                                                     // 163
        business: businessId                                                                                         // 163
    });                                                                                                              // 163
});                                                                                                                  // 164
Meteor.publish('hrDocuments.user', function (userId) {                                                               // 166
    return HRDocuments.find({                                                                                        // 167
        userId: userId                                                                                               // 167
    }, {                                                                                                             // 167
        fields: {                                                                                                    // 167
            'name': 1,                                                                                               // 167
            'documentType': 1,                                                                                       // 167
            'url': 1,                                                                                                // 167
            'userId': 1                                                                                              // 167
        }                                                                                                            // 167
    });                                                                                                              // 167
});                                                                                                                  // 168
Meteor.publish('personalSettings.user', function (userId) {                                                          // 170
    return PersonalSettings.find({                                                                                   // 171
        userId: userId                                                                                               // 171
    });                                                                                                              // 171
}); //TODO                                                                                                           // 172
                                                                                                                     //
Meteor.publish('summary.all', function (newUserId) {                                                                 // 175
    var businessId = Meteor.user().profile.businessId;                                                               // 175
    var usersInBusiness = Meteor.users.find({                                                                        // 178
        // _id: { $ne: this.userId },                                                                                // 179
        'profile.businessId': businessId                                                                             // 180
    }).map(function (user) {                                                                                         // 178
        return user._id;                                                                                             // 181
    });                                                                                                              // 181
    return Summary.find({                                                                                            // 183
        userId: {                                                                                                    // 183
            $in: usersInBusiness.concat([newUserId])                                                                 // 183
        }                                                                                                            // 183
    });                                                                                                              // 183
});                                                                                                                  // 184
Meteor.publish('summary.managers', function (userId) {                                                               // 186
    // const businessId = Meteor.users.findOne({ _id: this.userId }).profile.businessId;                             // 187
    var businessId = Meteor.user().profile.businessId;                                                               // 186
    var usersInBusiness = Meteor.users.find({                                                                        // 190
        _id: {                                                                                                       // 191
            $ne: userId                                                                                              // 191
        },                                                                                                           // 191
        'profile.businessId': businessId                                                                             // 192
    }).map(function (user) {                                                                                         // 190
        return user._id;                                                                                             // 193
    });                                                                                                              // 193
    var managersInBusiness = Job.find({                                                                              // 195
        userId: {                                                                                                    // 196
            $in: usersInBusiness                                                                                     // 196
        },                                                                                                           // 196
        isManager: true                                                                                              // 197
    }).map(function (job) {                                                                                          // 195
        return job.userId;                                                                                           // 198
    });                                                                                                              // 198
    console.log(Summary.find({                                                                                       // 200
        userId: {                                                                                                    // 200
            $in: managersInBusiness                                                                                  // 200
        }                                                                                                            // 200
    }, {                                                                                                             // 200
        fields: {                                                                                                    // 200
            'firstName': 1                                                                                           // 200
        }                                                                                                            // 200
    }).count());                                                                                                     // 200
    return Summary.find({                                                                                            // 202
        userId: {                                                                                                    // 202
            $in: managersInBusiness                                                                                  // 202
        }                                                                                                            // 202
    }, {                                                                                                             // 202
        fields: {                                                                                                    // 202
            'firstName': 1                                                                                           // 202
        }                                                                                                            // 202
    });                                                                                                              // 202
});                                                                                                                  // 203
Meteor.publish('summary.user', function (userId) {                                                                   // 205
    return Summary.find({                                                                                            // 206
        userId: userId                                                                                               // 206
    });                                                                                                              // 206
});                                                                                                                  // 207
Meteor.publish('personalInformation.user', function (userId) {                                                       // 209
    return [PersonalInformation.find({                                                                               // 210
        userId: userId                                                                                               // 211
    }), EmployeeIds.find({                                                                                           // 211
        userId: userId                                                                                               // 212
    })];                                                                                                             // 212
});                                                                                                                  // 214
Meteor.publish('education.user', function (userId) {                                                                 // 216
    return Education.find({                                                                                          // 217
        userId: userId                                                                                               // 217
    });                                                                                                              // 217
});                                                                                                                  // 218
Meteor.publish('jobFormDropdowns.businessId', function (userId) {                                                    // 220
    var businessId = Meteor.user().profile.businessId;                                                               // 220
    var usersInBusiness = Meteor.users.find({                                                                        // 222
        'profile.businessId': businessId,                                                                            // 222
        _id: {                                                                                                       // 222
            $ne: userId                                                                                              // 222
        }                                                                                                            // 222
    }).map(function (user) {                                                                                         // 222
        return user._id;                                                                                             // 222
    });                                                                                                              // 222
    var managerIds = Job.find({                                                                                      // 223
        isManager: true,                                                                                             // 223
        userId: {                                                                                                    // 223
            $in: usersInBusiness                                                                                     // 223
        }                                                                                                            // 223
    }, {                                                                                                             // 223
        fields: {                                                                                                    // 223
            'userId': 1                                                                                              // 223
        }                                                                                                            // 223
    }).map(function (jobDoc) {                                                                                       // 223
        return jobDoc.userId;                                                                                        // 223
    });                                                                                                              // 223
    return [EmploymentTypes.find({                                                                                   // 225
        businessId: businessId                                                                                       // 226
    }), Departments.find({                                                                                           // 226
        businessId: businessId                                                                                       // 227
    }), Teams.find({                                                                                                 // 227
        businessId: businessId                                                                                       // 228
    }), WorkingPatterns.find({                                                                                       // 228
        businessId: businessId                                                                                       // 229
    }), Summary.find({                                                                                               // 229
        userId: {                                                                                                    // 230
            $in: managerIds,                                                                                         // 230
            $ne: userId                                                                                              // 230
        }                                                                                                            // 230
    }, {                                                                                                             // 230
        fields: {                                                                                                    // 230
            'firstName': 1,                                                                                          // 230
            'surname': 1                                                                                             // 230
        }                                                                                                            // 230
    })];                                                                                                             // 230
});                                                                                                                  // 232
Meteor.publish('job.user', function (userId) {                                                                       // 234
    return Job.find({                                                                                                // 235
        userId: userId                                                                                               // 235
    });                                                                                                              // 235
});                                                                                                                  // 236
Meteor.publish('job.business.all', function (businessId) {                                                           // 238
    return Job.find({}, {                                                                                            // 239
        fields: {                                                                                                    // 239
            'userId': 1,                                                                                             // 239
            'title': 1                                                                                               // 239
        }                                                                                                            // 239
    });                                                                                                              // 239
});                                                                                                                  // 240
Meteor.publish('compensationFormDropdowns.businessId', function (businessId) {                                       // 242
    return [Currencies.find(), BenefitTypes.find(), BenefitsInKindTypes.find()];                                     // 243
});                                                                                                                  // 248
Meteor.publish('compensation.user', function (userId) {                                                              // 250
    return [Salary.find({                                                                                            // 251
        userId: userId                                                                                               // 252
    }), BonusDetails.find({                                                                                          // 252
        userId: userId                                                                                               // 253
    }), BenefitDetails.find({                                                                                        // 253
        userId: userId                                                                                               // 254
    }), BenefitsInKind.find({                                                                                        // 254
        userId: userId                                                                                               // 255
    })];                                                                                                             // 255
});                                                                                                                  // 257
Meteor.publish('bankInfo.user', function (userId) {                                                                  // 259
    return BankInfo.find({                                                                                           // 260
        userId: userId                                                                                               // 260
    });                                                                                                              // 260
});                                                                                                                  // 261
Meteor.publish('contact.user', function (userId) {                                                                   // 263
    return Contact.find({                                                                                            // 264
        userId: userId                                                                                               // 264
    });                                                                                                              // 264
});                                                                                                                  // 265
Meteor.publish('summaries.business.all', function (businessId) {                                                     // 267
    return Summary.find(); // return Summary.find({ businessId });                                                   // 268
});                                                                                                                  // 270
Meteor.publish('absence.all', function () {                                                                          // 272
    var businessId = Meteor.user().profile.businessId;                                                               // 272
    var usersInBusiness = Meteor.users.find({                                                                        // 274
        'profile.businessId': businessId                                                                             // 274
    }).map(function (user) {                                                                                         // 274
        return user._id;                                                                                             // 274
    });                                                                                                              // 274
    return Absence.find({                                                                                            // 276
        'employee._id': {                                                                                            // 276
            $in: usersInBusiness                                                                                     // 276
        }                                                                                                            // 276
    });                                                                                                              // 276
});                                                                                                                  // 277
Meteor.publish('tasks.user', function () {                                                                           // 279
    return Tasks.find({                                                                                              // 280
        users: this.userId,                                                                                          // 280
        isComplete: false                                                                                            // 280
    });                                                                                                              // 280
});                                                                                                                  // 281
Meteor.publish('holidays.user', function (userId) {                                                                  // 283
    var yearStart = moment().milliseconds(0).seconds(0).minutes(0).hours(0).date(1).month(0).toDate();               // 284
    var yearEnd = moment().milliseconds(0).seconds(0).minutes(0).hours(0).date(1).month(0).year(new Date().getFullYear() + 1).toDate();
    return Holiday.find({                                                                                            // 288
        'employee._id': userId,                                                                                      // 289
        $or: [{                                                                                                      // 290
            startDate: {                                                                                             // 291
                $gte: yearStart,                                                                                     // 291
                $lt: yearEnd                                                                                         // 291
            }                                                                                                        // 291
        }, {                                                                                                         // 291
            endDate: {                                                                                               // 292
                $gte: yearStart,                                                                                     // 292
                $lt: yearEnd                                                                                         // 292
            }                                                                                                        // 292
        }]                                                                                                           // 292
    });                                                                                                              // 288
});                                                                                                                  // 295
Meteor.publish('managersTeam', function () {                                                                         // 297
    var isManager = Roles.userIsInRole(this.userId, 'manager');                                                      // 298
    var managerId = isManager ? this.userId : Summary.findOne({                                                      // 299
        _id: this.userId                                                                                             // 299
    }).manager;                                                                                                      // 299
    return Summary.find({                                                                                            // 301
        $or: [{                                                                                                      // 301
            manager: managerId                                                                                       // 301
        }, {                                                                                                         // 301
            userId: this.userId                                                                                      // 301
        }]                                                                                                           // 301
    });                                                                                                              // 301
});                                                                                                                  // 302
Meteor.publish('managerPermissions', function () {                                                                   // 304
    var businessId = Meteor.user().profile.businessId;                                                               // 304
    return ManagerPermissions.find({                                                                                 // 307
        businessId: businessId                                                                                       // 307
    });                                                                                                              // 307
});                                                                                                                  // 308
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"methods.js":function(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// imports/api/methods.js                                                                                            //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
var _extends2 = require("babel-runtime/helpers/extends");                                                            //
                                                                                                                     //
var _extends3 = _interopRequireDefault(_extends2);                                                                   //
                                                                                                                     //
var _objectWithoutProperties2 = require("babel-runtime/helpers/objectWithoutProperties");                            //
                                                                                                                     //
var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);                                   //
                                                                                                                     //
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }                    //
                                                                                                                     //
var Meteor = void 0;                                                                                                 // 1
module.watch(require("meteor/meteor"), {                                                                             // 1
    Meteor: function (v) {                                                                                           // 1
        Meteor = v;                                                                                                  // 1
    }                                                                                                                // 1
}, 0);                                                                                                               // 1
var Random = void 0;                                                                                                 // 1
module.watch(require("meteor/random"), {                                                                             // 1
    Random: function (v) {                                                                                           // 1
        Random = v;                                                                                                  // 1
    }                                                                                                                // 1
}, 1);                                                                                                               // 1
var moment = void 0;                                                                                                 // 1
module.watch(require("moment"), {                                                                                    // 1
    "default": function (v) {                                                                                        // 1
        moment = v;                                                                                                  // 1
    }                                                                                                                // 1
}, 2);                                                                                                               // 1
var Accounts = void 0;                                                                                               // 1
module.watch(require("meteor/accounts-base"), {                                                                      // 1
    Accounts: function (v) {                                                                                         // 1
        Accounts = v;                                                                                                // 1
    }                                                                                                                // 1
}, 3);                                                                                                               // 1
var Email = void 0;                                                                                                  // 1
module.watch(require("meteor/email"), {                                                                              // 1
    Email: function (v) {                                                                                            // 1
        Email = v;                                                                                                   // 1
    }                                                                                                                // 1
}, 4);                                                                                                               // 1
module.watch(require("isomorphic-fetch"));                                                                           // 1
var AbsenceTypes = void 0;                                                                                           // 1
module.watch(require("./collections/absenceTypes"), {                                                                // 1
    "default": function (v) {                                                                                        // 1
        AbsenceTypes = v;                                                                                            // 1
    }                                                                                                                // 1
}, 5);                                                                                                               // 1
var Announcements = void 0;                                                                                          // 1
module.watch(require("./collections/announcements"), {                                                               // 1
    "default": function (v) {                                                                                        // 1
        Announcements = v;                                                                                           // 1
    }                                                                                                                // 1
}, 6);                                                                                                               // 1
var Teams = void 0;                                                                                                  // 1
module.watch(require("./collections/teams"), {                                                                       // 1
    "default": function (v) {                                                                                        // 1
        Teams = v;                                                                                                   // 1
    }                                                                                                                // 1
}, 7);                                                                                                               // 1
var Currencies = void 0;                                                                                             // 1
module.watch(require("./collections/currencies"), {                                                                  // 1
    "default": function (v) {                                                                                        // 1
        Currencies = v;                                                                                              // 1
    }                                                                                                                // 1
}, 8);                                                                                                               // 1
var EmploymentTypes = void 0;                                                                                        // 1
module.watch(require("./collections/employmentTypes"), {                                                             // 1
    "default": function (v) {                                                                                        // 1
        EmploymentTypes = v;                                                                                         // 1
    }                                                                                                                // 1
}, 9);                                                                                                               // 1
var BenefitTypes = void 0;                                                                                           // 1
module.watch(require("./collections/benefitTypes"), {                                                                // 1
    "default": function (v) {                                                                                        // 1
        BenefitTypes = v;                                                                                            // 1
    }                                                                                                                // 1
}, 10);                                                                                                              // 1
var BenefitsInKindTypes = void 0;                                                                                    // 1
module.watch(require("./collections/benefitsInKindTypes"), {                                                         // 1
    "default": function (v) {                                                                                        // 1
        BenefitsInKindTypes = v;                                                                                     // 1
    }                                                                                                                // 1
}, 11);                                                                                                              // 1
var Departments = void 0;                                                                                            // 1
module.watch(require("./collections/departments"), {                                                                 // 1
    "default": function (v) {                                                                                        // 1
        Departments = v;                                                                                             // 1
    }                                                                                                                // 1
}, 12);                                                                                                              // 1
var ContentPages = void 0;                                                                                           // 1
module.watch(require("./collections/contentPages"), {                                                                // 1
    "default": function (v) {                                                                                        // 1
        ContentPages = v;                                                                                            // 1
    }                                                                                                                // 1
}, 13);                                                                                                              // 1
var HRPolicies = void 0;                                                                                             // 1
module.watch(require("./collections/hrPolicies"), {                                                                  // 1
    "default": function (v) {                                                                                        // 1
        HRPolicies = v;                                                                                              // 1
    }                                                                                                                // 1
}, 14);                                                                                                              // 1
var Businesses = void 0;                                                                                             // 1
module.watch(require("./collections/businesses"), {                                                                  // 1
    "default": function (v) {                                                                                        // 1
        Businesses = v;                                                                                              // 1
    }                                                                                                                // 1
}, 15);                                                                                                              // 1
var WorkingPatterns = void 0;                                                                                        // 1
module.watch(require("./collections/workingPatterns"), {                                                             // 1
    "default": function (v) {                                                                                        // 1
        WorkingPatterns = v;                                                                                         // 1
    }                                                                                                                // 1
}, 16);                                                                                                              // 1
var CompanyDetails = void 0;                                                                                         // 1
module.watch(require("./collections/companyDetails"), {                                                              // 1
    "default": function (v) {                                                                                        // 1
        CompanyDetails = v;                                                                                          // 1
    }                                                                                                                // 1
}, 17);                                                                                                              // 1
var HRDocuments = void 0;                                                                                            // 1
module.watch(require("./collections/hrDocuments"), {                                                                 // 1
    "default": function (v) {                                                                                        // 1
        HRDocuments = v;                                                                                             // 1
    }                                                                                                                // 1
}, 18);                                                                                                              // 1
var Images = void 0;                                                                                                 // 1
module.watch(require("./collections/images"), {                                                                      // 1
    "default": function (v) {                                                                                        // 1
        Images = v;                                                                                                  // 1
    }                                                                                                                // 1
}, 19);                                                                                                              // 1
var PersonalSettings = void 0;                                                                                       // 1
module.watch(require("./collections/user_info/personalSettings"), {                                                  // 1
    "default": function (v) {                                                                                        // 1
        PersonalSettings = v;                                                                                        // 1
    }                                                                                                                // 1
}, 20);                                                                                                              // 1
var Summary = void 0;                                                                                                // 1
module.watch(require("./collections/user_info/summary"), {                                                           // 1
    "default": function (v) {                                                                                        // 1
        Summary = v;                                                                                                 // 1
    }                                                                                                                // 1
}, 21);                                                                                                              // 1
var EmployeeIds = void 0;                                                                                            // 1
module.watch(require("./collections/user_info/employeeIds"), {                                                       // 1
    "default": function (v) {                                                                                        // 1
        EmployeeIds = v;                                                                                             // 1
    }                                                                                                                // 1
}, 22);                                                                                                              // 1
var PersonalInformation = void 0;                                                                                    // 1
module.watch(require("./collections/user_info/personalInformation"), {                                               // 1
    "default": function (v) {                                                                                        // 1
        PersonalInformation = v;                                                                                     // 1
    }                                                                                                                // 1
}, 23);                                                                                                              // 1
var Education = void 0;                                                                                              // 1
module.watch(require("./collections/user_info/education"), {                                                         // 1
    "default": function (v) {                                                                                        // 1
        Education = v;                                                                                               // 1
    }                                                                                                                // 1
}, 24);                                                                                                              // 1
var Job = void 0;                                                                                                    // 1
module.watch(require("./collections/user_info/job"), {                                                               // 1
    "default": function (v) {                                                                                        // 1
        Job = v;                                                                                                     // 1
    }                                                                                                                // 1
}, 25);                                                                                                              // 1
var Salary = void 0;                                                                                                 // 1
module.watch(require("./collections/user_info/compensation/salary"), {                                               // 1
    "default": function (v) {                                                                                        // 1
        Salary = v;                                                                                                  // 1
    }                                                                                                                // 1
}, 26);                                                                                                              // 1
var BonusDetails = void 0;                                                                                           // 1
module.watch(require("./collections/user_info/compensation/bonusDetails"), {                                         // 1
    "default": function (v) {                                                                                        // 1
        BonusDetails = v;                                                                                            // 1
    }                                                                                                                // 1
}, 27);                                                                                                              // 1
var BenefitDetails = void 0;                                                                                         // 1
module.watch(require("./collections/user_info/compensation/benefitDetails"), {                                       // 1
    "default": function (v) {                                                                                        // 1
        BenefitDetails = v;                                                                                          // 1
    }                                                                                                                // 1
}, 28);                                                                                                              // 1
var BenefitsInKind = void 0;                                                                                         // 1
module.watch(require("./collections/user_info/compensation/benefitsInKind"), {                                       // 1
    "default": function (v) {                                                                                        // 1
        BenefitsInKind = v;                                                                                          // 1
    }                                                                                                                // 1
}, 29);                                                                                                              // 1
var BankInfo = void 0;                                                                                               // 1
module.watch(require("./collections/user_info/bankInfo"), {                                                          // 1
    "default": function (v) {                                                                                        // 1
        BankInfo = v;                                                                                                // 1
    }                                                                                                                // 1
}, 30);                                                                                                              // 1
var Contact = void 0;                                                                                                // 1
module.watch(require("./collections/user_info/contact"), {                                                           // 1
    "default": function (v) {                                                                                        // 1
        Contact = v;                                                                                                 // 1
    }                                                                                                                // 1
}, 31);                                                                                                              // 1
var Absence = void 0;                                                                                                // 1
module.watch(require("./collections/absence"), {                                                                     // 1
    "default": function (v) {                                                                                        // 1
        Absence = v;                                                                                                 // 1
    }                                                                                                                // 1
}, 32);                                                                                                              // 1
var Tasks = void 0;                                                                                                  // 1
module.watch(require("./collections/tasks"), {                                                                       // 1
    "default": function (v) {                                                                                        // 1
        Tasks = v;                                                                                                   // 1
    }                                                                                                                // 1
}, 33);                                                                                                              // 1
var Holiday = void 0;                                                                                                // 1
module.watch(require("./collections/holiday"), {                                                                     // 1
    "default": function (v) {                                                                                        // 1
        Holiday = v;                                                                                                 // 1
    }                                                                                                                // 1
}, 34);                                                                                                              // 1
var HolidayDates = void 0;                                                                                           // 1
module.watch(require("./collections/holidayDates"), {                                                                // 1
    "default": function (v) {                                                                                        // 1
        HolidayDates = v;                                                                                            // 1
    }                                                                                                                // 1
}, 35);                                                                                                              // 1
var SecretQuestions = void 0;                                                                                        // 1
module.watch(require("./collections/secretQuestions"), {                                                             // 1
    "default": function (v) {                                                                                        // 1
        SecretQuestions = v;                                                                                         // 1
    }                                                                                                                // 1
}, 36);                                                                                                              // 1
var getEmployeeId = void 0;                                                                                          // 1
module.watch(require("../startup/server/accounts"), {                                                                // 1
    getEmployeeId: function (v) {                                                                                    // 1
        getEmployeeId = v;                                                                                           // 1
    }                                                                                                                // 1
}, 37);                                                                                                              // 1
var ManagerPermissions = void 0;                                                                                     // 1
module.watch(require("./collections/managementRoles"), {                                                             // 1
    "default": function (v) {                                                                                        // 1
        ManagerPermissions = v;                                                                                      // 1
    }                                                                                                                // 1
}, 38);                                                                                                              // 1
                                                                                                                     //
var mailjet = Npm.require('node-mailjet').connect('8b5f5108fb9039d9da33570918f67da9', '7e37636c6b839c4855232d0689941858');
                                                                                                                     //
var mongoCallback = function (error, result) {                                                                       // 47
    if (error) {                                                                                                     // 48
        console.log(error);                                                                                          // 49
                                                                                                                     //
        if (error.invalidKeys && error.invalidKeys.length) {                                                         // 50
            throw new Meteor.Error(400, 'MISSING_FIELD', error.invalidKeys[0].name);                                 // 51
        }                                                                                                            // 52
                                                                                                                     //
        throw error;                                                                                                 // 54
    }                                                                                                                // 55
};                                                                                                                   // 56
                                                                                                                     //
var sendEmail = function (_ref) {                                                                                    // 58
    var to = _ref.to,                                                                                                // 58
        subject = _ref.subject,                                                                                      // 58
        _ref$text = _ref.text,                                                                                       // 58
        text = _ref$text === undefined ? '' : _ref$text,                                                             // 58
        _ref$html = _ref.html,                                                                                       // 58
        html = _ref$html === undefined ? '' : _ref$html;                                                             // 58
    // try {                                                                                                         // 59
    //     return Email.send({ to, from: 'testchatuser11@gmail.com', subject, text });                               // 60
    // } catch (error) {                                                                                             // 61
    //     console.log(error);                                                                                       // 62
    //     return error;                                                                                             // 64
    // }                                                                                                             // 65
    var request = mailjet.post('send', {                                                                             // 67
        'version': 'v3.1'                                                                                            // 67
    }).request({                                                                                                     // 67
        'Messages': [{                                                                                               // 68
            'From': {                                                                                                // 69
                'Email': 'testchatuser11@gmail.com',                                                                 // 69
                'Name': 'hr-space'                                                                                   // 69
            },                                                                                                       // 69
            'To': [{                                                                                                 // 70
                'Email': to,                                                                                         // 70
                'Name': ''                                                                                           // 70
            }],                                                                                                      // 70
            'Subject': subject,                                                                                      // 71
            'TextPart': text,                                                                                        // 72
            'HTMLPart': html                                                                                         // 73
        }]                                                                                                           // 68
    });                                                                                                              // 67
    request.then(function (response) {                                                                               // 77
        return response;                                                                                             // 79
    }).catch(function (error) {                                                                                      // 79
        throw error;                                                                                                 // 81
    });                                                                                                              // 81
};                                                                                                                   // 82
                                                                                                                     //
Meteor.methods({                                                                                                     // 84
    'test': function () {                                                                                            // 85
        // return Random.secret();                                                                                   // 86
        // const url = Meteor.absoluteUrl();                                                                         // 87
        // const emailHTML = `                                                                                       // 89
        //     <p>You've been registered in the hr-space</p>                                                         // 90
        //     <p>Follow this link to complete the registration process:</p>                                         // 91
        //     <p><a href="${url}">${url}</a>                                                                        // 92
        // `;                                                                                                        // 93
        // sendEmail({ to: 'petro.tsaruk@gmail.com', subject: 'Welcome to hr-space', html: emailHTML });             // 95
        return Meteor.user();                                                                                        // 97
    },                                                                                                               // 98
    'heartbeat': function () {                                                                                       // 99
        if (!this.userId) return;                                                                                    // 100
        Meteor.users.update(this.userId, {                                                                           // 102
            $set: {                                                                                                  // 102
                heartbeat: Date.now()                                                                                // 102
            }                                                                                                        // 102
        });                                                                                                          // 102
    },                                                                                                               // 103
    'absenceTypes.create': function (absenceType) {                                                                  // 104
        var businessId = Meteor.user().profile.businessId;                                                           // 104
                                                                                                                     //
        if (AbsenceTypes.find({                                                                                      // 107
            type: absenceType.type,                                                                                  // 107
            businessId: businessId                                                                                   // 107
        }).count() > 0) {                                                                                            // 107
            throw new Meteor.Error(400, 'DUPLICATE_DOCUMENT', 'Absence type with this name already exists');         // 108
        }                                                                                                            // 109
                                                                                                                     //
        absenceType.businessId = businessId;                                                                         // 111
        AbsenceTypes.insert(absenceType, mongoCallback);                                                             // 113
        return 200;                                                                                                  // 115
    },                                                                                                               // 116
    'absenceTypes.update': function (absenceType) {                                                                  // 117
        var _id = absenceType._id,                                                                                   // 117
            updatedAbsenceType = (0, _objectWithoutProperties3.default)(absenceType, ["_id"]);                       // 117
        AbsenceTypes.update(_id, {                                                                                   // 120
            $set: (0, _extends3.default)({}, updatedAbsenceType)                                                     // 120
        }, mongoCallback);                                                                                           // 120
        return 200;                                                                                                  // 122
    },                                                                                                               // 123
    'absenceTypes.remove': function (absenceType) {                                                                  // 124
        return AbsenceTypes.remove(absenceType);                                                                     // 125
    },                                                                                                               // 126
    'teams.create': function (team) {                                                                                // 127
        var businessId = Meteor.user().profile.businessId;                                                           // 127
                                                                                                                     //
        if (Teams.find({                                                                                             // 130
            name: team.name,                                                                                         // 130
            businessId: businessId                                                                                   // 130
        }).count() > 0) {                                                                                            // 130
            throw new Meteor.Error(400, 'DUPLICATE_DOCUMENT', 'A team with this name already exists');               // 131
        }                                                                                                            // 132
                                                                                                                     //
        team.businessId = businessId;                                                                                // 134
        Teams.insert(team, mongoCallback);                                                                           // 136
        return 200;                                                                                                  // 138
    },                                                                                                               // 139
    'teams.update': function (team) {                                                                                // 140
        var _id = team._id,                                                                                          // 140
            updatedTeam = (0, _objectWithoutProperties3.default)(team, ["_id"]);                                     // 140
        Teams.update(_id, {                                                                                          // 143
            $set: (0, _extends3.default)({}, updatedTeam)                                                            // 143
        }, mongoCallback);                                                                                           // 143
        return 200;                                                                                                  // 145
    },                                                                                                               // 146
    'teams.remove': function (team) {                                                                                // 147
        return Teams.remove(team);                                                                                   // 148
    },                                                                                                               // 149
    'currencies.create': function (currency) {                                                                       // 150
        var businessId = Meteor.user().profile.businessId;                                                           // 150
                                                                                                                     //
        if (Currencies.find({                                                                                        // 153
            name: currency.name,                                                                                     // 153
            businessId: businessId                                                                                   // 153
        }).count() > 0) {                                                                                            // 153
            throw new Meteor.Error(400, 'DUPLICATE_DOCUMENT', 'A currency with this name already exists');           // 154
        }                                                                                                            // 155
                                                                                                                     //
        currency.businessId = businessId;                                                                            // 157
        Currencies.insert(currency, mongoCallback);                                                                  // 159
        return 200;                                                                                                  // 161
    },                                                                                                               // 162
    'currencies.update': function (currency) {                                                                       // 163
        var _id = currency._id,                                                                                      // 163
            updatedCurrency = (0, _objectWithoutProperties3.default)(currency, ["_id"]);                             // 163
        Currencies.update(_id, {                                                                                     // 166
            $set: (0, _extends3.default)({}, updatedCurrency)                                                        // 166
        }, mongoCallback);                                                                                           // 166
        return 200;                                                                                                  // 168
    },                                                                                                               // 169
    'currencies.remove': function (currency) {                                                                       // 170
        return Currencies.remove(currency);                                                                          // 171
    },                                                                                                               // 172
    'employmentTypes.create': function (employmentType) {                                                            // 173
        var businessId = Meteor.user().profile.businessId;                                                           // 173
                                                                                                                     //
        if (EmploymentTypes.find({                                                                                   // 176
            name: employmentType.name,                                                                               // 176
            businessId: businessId                                                                                   // 176
        }).count() > 0) {                                                                                            // 176
            throw new Meteor.Error(400, 'DUPLICATE_DOCUMENT', 'Employment type with this name already exists');      // 177
        }                                                                                                            // 178
                                                                                                                     //
        employmentType.businessId = businessId;                                                                      // 180
        EmploymentTypes.insert(employmentType, mongoCallback);                                                       // 182
        return 200;                                                                                                  // 184
    },                                                                                                               // 185
    'employmentTypes.update': function (employmentType) {                                                            // 186
        var _id = employmentType._id,                                                                                // 186
            updatedEmploymentType = (0, _objectWithoutProperties3.default)(employmentType, ["_id"]);                 // 186
        EmploymentTypes.update(_id, {                                                                                // 189
            $set: (0, _extends3.default)({}, updatedEmploymentType)                                                  // 189
        }, mongoCallback);                                                                                           // 189
        return 200;                                                                                                  // 191
    },                                                                                                               // 192
    'employmentTypes.remove': function (employmentType) {                                                            // 193
        return EmploymentTypes.remove(employmentType);                                                               // 194
    },                                                                                                               // 195
    'benefitTypes.create': function (benefitType) {                                                                  // 196
        var businessId = Meteor.user().profile.businessId;                                                           // 196
                                                                                                                     //
        if (BenefitTypes.find({                                                                                      // 199
            name: benefitType.name,                                                                                  // 199
            businessId: businessId                                                                                   // 199
        }).count() > 0) {                                                                                            // 199
            throw new Meteor.Error(400, 'DUPLICATE_DOCUMENT', 'Benefit type with this name already exists');         // 200
        }                                                                                                            // 201
                                                                                                                     //
        benefitType.businessId = businessId;                                                                         // 203
        BenefitTypes.insert(benefitType, mongoCallback);                                                             // 205
        return 200;                                                                                                  // 207
    },                                                                                                               // 208
    'benefitTypes.update': function (benefitType) {                                                                  // 209
        var _id = benefitType._id,                                                                                   // 209
            updatedBenefitType = (0, _objectWithoutProperties3.default)(benefitType, ["_id"]);                       // 209
        BenefitTypes.update(_id, {                                                                                   // 212
            $set: (0, _extends3.default)({}, updatedBenefitType)                                                     // 212
        }, mongoCallback);                                                                                           // 212
        return 200;                                                                                                  // 214
    },                                                                                                               // 215
    'benefitTypes.remove': function (benefitType) {                                                                  // 216
        return BenefitTypes.remove(benefitType);                                                                     // 217
    },                                                                                                               // 218
    'benefitsInKindTypes.create': function (benefitInKindType) {                                                     // 219
        var businessId = Meteor.user().profile.businessId;                                                           // 219
                                                                                                                     //
        if (BenefitsInKindTypes.find({                                                                               // 222
            name: benefitInKindType.name,                                                                            // 222
            businessId: businessId                                                                                   // 222
        }).count() > 0) {                                                                                            // 222
            throw new Meteor.Error(400, 'DUPLICATE_DOCUMENT', 'Benefit in kind with this name already exists');      // 223
        }                                                                                                            // 224
                                                                                                                     //
        benefitInKindType.businessId = businessId;                                                                   // 226
        BenefitsInKindTypes.insert(benefitInKindType, mongoCallback);                                                // 228
        return 200;                                                                                                  // 230
    },                                                                                                               // 231
    'benefitsInKindTypes.update': function (benefitInKindType) {                                                     // 232
        var _id = benefitInKindType._id,                                                                             // 232
            updatedBenefitInKindType = (0, _objectWithoutProperties3.default)(benefitInKindType, ["_id"]);           // 232
        BenefitsInKindTypes.update(_id, {                                                                            // 235
            $set: (0, _extends3.default)({}, updatedBenefitInKindType)                                               // 235
        }, mongoCallback);                                                                                           // 235
        return 200;                                                                                                  // 237
    },                                                                                                               // 238
    'benefitsInKindTypes.remove': function (benefitInKindType) {                                                     // 239
        return BenefitsInKindTypes.remove(benefitInKindType);                                                        // 240
    },                                                                                                               // 241
    'departments.create': function (department) {                                                                    // 242
        var businessId = Meteor.user().profile.businessId;                                                           // 242
                                                                                                                     //
        if (Departments.find({                                                                                       // 245
            name: department.name,                                                                                   // 245
            businessId: businessId                                                                                   // 245
        }).count() > 0) {                                                                                            // 245
            throw new Meteor.Error(400, 'DUPLICATE_DOCUMENT', 'A department with this name already exists');         // 246
        }                                                                                                            // 247
                                                                                                                     //
        department.businessId = businessId;                                                                          // 249
        Departments.insert(department, mongoCallback);                                                               // 251
        return 200;                                                                                                  // 253
    },                                                                                                               // 254
    'departments.update': function (department) {                                                                    // 255
        var _id = department._id,                                                                                    // 255
            updatedDepartment = (0, _objectWithoutProperties3.default)(department, ["_id"]);                         // 255
        Departments.update(_id, {                                                                                    // 258
            $set: (0, _extends3.default)({}, updatedDepartment)                                                      // 258
        }, mongoCallback);                                                                                           // 258
        return 200;                                                                                                  // 260
    },                                                                                                               // 261
    'departments.remove': function (department) {                                                                    // 262
        return Departments.remove(department);                                                                       // 263
    },                                                                                                               // 264
    'announcements.create': function (announcement) {                                                                // 265
        var momentStartDate = moment(announcement.startDate),                                                        // 266
            momentEndDate = moment(announcement.endDate);                                                            // 266
                                                                                                                     //
        if (momentStartDate.isSameOrAfter(momentEndDate)) {                                                          // 269
            throw new Meteor.Error(400, 'DATES_MISMATCH', 'Start date has to be lower than End date');               // 270
        }                                                                                                            // 271
                                                                                                                     //
        var business = Meteor.user().profile.businessId;                                                             // 273
        Announcements.insert((0, _extends3.default)({                                                                // 275
            business: business                                                                                       // 275
        }, announcement), mongoCallback);                                                                            // 275
        return 200;                                                                                                  // 277
    },                                                                                                               // 278
    'announcements.update': function (announcement) {                                                                // 279
        var _id = announcement._id,                                                                                  // 279
            updatedAnnouncement = (0, _objectWithoutProperties3.default)(announcement, ["_id"]);                     // 279
        Announcements.update(announcement._id, {                                                                     // 282
            $set: (0, _extends3.default)({}, updatedAnnouncement)                                                    // 282
        }, mongoCallback);                                                                                           // 282
        return 200;                                                                                                  // 284
    },                                                                                                               // 285
    'announcements.remove': function (announcement) {                                                                // 286
        return Announcements.remove(announcement);                                                                   // 287
    },                                                                                                               // 288
    'announcements.markRead': function (_id) {                                                                       // 289
        var userId = this.userId;                                                                                    // 290
        Announcements.update(_id, {                                                                                  // 292
            $push: {                                                                                                 // 292
                readBy: userId                                                                                       // 292
            }                                                                                                        // 292
        }, mongoCallback);                                                                                           // 292
        return 200;                                                                                                  // 294
    },                                                                                                               // 295
    'announcements.deleteForUser': function (_ref2) {                                                                // 296
        var _id = _ref2._id,                                                                                         // 296
            announcement = (0, _objectWithoutProperties3.default)(_ref2, ["_id"]);                                   // 296
        var userId = this.userId;                                                                                    // 297
                                                                                                                     //
        if (announcement.mandatory && !~announcement.readBy.indexOf(userId)) {                                       // 299
            throw new Meteor.Error(400, 'MANDATORY_ANNOUNCEMENT', 'This announcement is mandatory to read');         // 300
        } else {                                                                                                     // 301
            Announcements.update(_id, {                                                                              // 302
                $push: {                                                                                             // 302
                    deletedFor: userId                                                                               // 302
                }                                                                                                    // 302
            }, mongoCallback);                                                                                       // 302
        }                                                                                                            // 303
                                                                                                                     //
        return 200;                                                                                                  // 305
    },                                                                                                               // 306
    'contentPages.create': function (contentPage) {                                                                  // 307
        var lastContentPage = ContentPages.findOne({                                                                 // 308
            business: contentPage.business                                                                           // 308
        }, {                                                                                                         // 308
            sort: {                                                                                                  // 308
                order: -1                                                                                            // 308
            }                                                                                                        // 308
        });                                                                                                          // 308
        var order = lastContentPage ? lastContentPage.order : 0;                                                     // 309
        contentPage.order = order + 1;                                                                               // 311
        ContentPages.insert(contentPage, mongoCallback);                                                             // 313
        return 200;                                                                                                  // 315
    },                                                                                                               // 316
    'contentPages.update': function (contentPage) {                                                                  // 317
        var _id = contentPage._id,                                                                                   // 317
            updatedContentPage = (0, _objectWithoutProperties3.default)(contentPage, ["_id"]);                       // 317
        ContentPages.update(_id, {                                                                                   // 320
            $set: (0, _extends3.default)({}, updatedContentPage)                                                     // 320
        }, mongoCallback);                                                                                           // 320
        return 200;                                                                                                  // 322
    },                                                                                                               // 323
    'contentPages.remove': function (contentPage) {                                                                  // 324
        return ContentPages.remove(contentPage);                                                                     // 325
    },                                                                                                               // 326
    'contentPages.incrementOrder': function (contentPage) {                                                          // 327
        var lastContentPage = ContentPages.findOne({                                                                 // 328
            business: contentPage.business                                                                           // 328
        }, {                                                                                                         // 328
            sort: {                                                                                                  // 328
                order: -1                                                                                            // 328
            }                                                                                                        // 328
        });                                                                                                          // 328
                                                                                                                     //
        if (lastContentPage._id !== contentPage._id) {                                                               // 330
            ContentPages.update({                                                                                    // 331
                business: contentPage.business,                                                                      // 331
                order: contentPage.order + 1                                                                         // 331
            }, {                                                                                                     // 331
                $inc: {                                                                                              // 331
                    order: -1                                                                                        // 331
                }                                                                                                    // 331
            });                                                                                                      // 331
            ContentPages.update({                                                                                    // 332
                _id: contentPage._id                                                                                 // 332
            }, {                                                                                                     // 332
                $inc: {                                                                                              // 332
                    order: 1                                                                                         // 332
                }                                                                                                    // 332
            });                                                                                                      // 332
        }                                                                                                            // 333
                                                                                                                     //
        return 200;                                                                                                  // 335
    },                                                                                                               // 336
    'contentPages.decrementOrder': function (contentPage) {                                                          // 337
        if (contentPage.order > 1) {                                                                                 // 338
            ContentPages.update({                                                                                    // 339
                business: contentPage.business,                                                                      // 339
                order: contentPage.order - 1                                                                         // 339
            }, {                                                                                                     // 339
                $inc: {                                                                                              // 339
                    order: 1                                                                                         // 339
                }                                                                                                    // 339
            });                                                                                                      // 339
            ContentPages.update({                                                                                    // 340
                _id: contentPage._id                                                                                 // 340
            }, {                                                                                                     // 340
                $inc: {                                                                                              // 340
                    order: -1                                                                                        // 340
                }                                                                                                    // 340
            });                                                                                                      // 340
        }                                                                                                            // 341
                                                                                                                     //
        return 200;                                                                                                  // 343
    },                                                                                                               // 344
    'hrPolicies.create': function (policy) {                                                                         // 345
        var lastHrPolicy = HRPolicies.findOne({                                                                      // 346
            business: policy.business                                                                                // 346
        }, {                                                                                                         // 346
            sort: {                                                                                                  // 346
                order: -1                                                                                            // 346
            }                                                                                                        // 346
        });                                                                                                          // 346
        var order = lastHrPolicy ? lastHrPolicy.order : 0;                                                           // 347
        policy.order = order + 1;                                                                                    // 349
        HRPolicies.insert(policy, mongoCallback);                                                                    // 351
        return 200;                                                                                                  // 353
    },                                                                                                               // 354
    'hrPolicies.update': function (policy) {                                                                         // 355
        var _id = policy._id,                                                                                        // 355
            updatedPolicy = (0, _objectWithoutProperties3.default)(policy, ["_id"]);                                 // 355
        HRPolicies.update(_id, {                                                                                     // 358
            $set: updatedPolicy                                                                                      // 358
        }, mongoCallback);                                                                                           // 358
        return 200;                                                                                                  // 360
    },                                                                                                               // 361
    'hrPolicies.remove': function (policy) {                                                                         // 362
        return HRPolicies.remove(policy);                                                                            // 363
    },                                                                                                               // 364
    'hrPolicies.incrementOrder': function (policy) {                                                                 // 365
        var lastHrPolicy = HRPolicies.findOne({                                                                      // 366
            business: policy.business                                                                                // 366
        }, {                                                                                                         // 366
            sort: {                                                                                                  // 366
                order: -1                                                                                            // 366
            }                                                                                                        // 366
        });                                                                                                          // 366
                                                                                                                     //
        if (lastHrPolicy._id !== policy._id) {                                                                       // 368
            HRPolicies.update({                                                                                      // 369
                business: policy.business,                                                                           // 369
                order: policy.order + 1                                                                              // 369
            }, {                                                                                                     // 369
                $inc: {                                                                                              // 369
                    order: -1                                                                                        // 369
                }                                                                                                    // 369
            });                                                                                                      // 369
            HRPolicies.update({                                                                                      // 370
                _id: policy._id                                                                                      // 370
            }, {                                                                                                     // 370
                $inc: {                                                                                              // 370
                    order: 1                                                                                         // 370
                }                                                                                                    // 370
            });                                                                                                      // 370
        }                                                                                                            // 371
                                                                                                                     //
        return 200;                                                                                                  // 373
    },                                                                                                               // 374
    'hrPolicies.decrementOrder': function (policy) {                                                                 // 375
        if (policy.order > 1) {                                                                                      // 376
            HRPolicies.update({                                                                                      // 377
                business: policy.business,                                                                           // 377
                order: policy.order - 1                                                                              // 377
            }, {                                                                                                     // 377
                $inc: {                                                                                              // 377
                    order: 1                                                                                         // 377
                }                                                                                                    // 377
            });                                                                                                      // 377
            HRPolicies.update({                                                                                      // 378
                _id: policy._id                                                                                      // 378
            }, {                                                                                                     // 378
                $inc: {                                                                                              // 378
                    order: -1                                                                                        // 378
                }                                                                                                    // 378
            });                                                                                                      // 378
        }                                                                                                            // 379
                                                                                                                     //
        return 200;                                                                                                  // 381
    },                                                                                                               // 382
    'businesses.create': function (business) {                                                                       // 383
        var momentStartDate = moment(business.startDate),                                                            // 384
            momentEndDate = moment(business.endDate);                                                                // 384
        var emailExists = Meteor.users.findOne({                                                                     // 387
            'emails.address': business.email                                                                         // 387
        });                                                                                                          // 387
                                                                                                                     //
        if (emailExists) {                                                                                           // 389
            throw new Meteor.Error(400, 'EMAIL_ALREADY_EXISTS', 'This email is already taken');                      // 390
        }                                                                                                            // 391
                                                                                                                     //
        if (momentStartDate.isSameOrAfter(momentEndDate)) {                                                          // 393
            throw new Meteor.Error(400, 'DATES_MISMATCH', 'Start date has to be lower than End date');               // 394
        }                                                                                                            // 395
                                                                                                                     //
        Businesses.insert(business, function (error, response) {                                                     // 397
            if (error) {                                                                                             // 398
                console.log(error);                                                                                  // 399
                                                                                                                     //
                if (error.invalidKeys && error.invalidKeys.length) {                                                 // 400
                    throw new Meteor.Error(400, 'MISSING_FIELD', error.invalidKeys[0].name);                         // 401
                }                                                                                                    // 402
                                                                                                                     //
                throw error;                                                                                         // 404
            } else {                                                                                                 // 405
                ['GBP', 'EUR'].forEach(function (currency) {                                                         // 406
                    return Currencies.insert({                                                                       // 406
                        name: currency,                                                                              // 406
                        businessId: response                                                                         // 406
                    });                                                                                              // 406
                });                                                                                                  // 406
                ['Finance', 'IT', 'Admin', 'Marketing', 'Warehouse'].forEach(function (department) {                 // 407
                    return Departments.insert({                                                                      // 407
                        name: department,                                                                            // 407
                        businessId: response                                                                         // 407
                    });                                                                                              // 407
                });                                                                                                  // 407
                ['Day shift', 'Night shift', 'Weekend'].forEach(function (team) {                                    // 408
                    return Teams.insert({                                                                            // 408
                        name: team,                                                                                  // 408
                        businessId: response                                                                         // 408
                    });                                                                                              // 408
                });                                                                                                  // 408
                ['Full time', 'Part time', 'Contract'].forEach(function (type) {                                     // 409
                    return EmploymentTypes.insert({                                                                  // 409
                        name: type,                                                                                  // 409
                        businessId: response                                                                         // 409
                    });                                                                                              // 409
                });                                                                                                  // 409
                ['Accommodation', 'Car'].forEach(function (type) {                                                   // 410
                    return BenefitTypes.insert({                                                                     // 410
                        name: type,                                                                                  // 410
                        businessId: response                                                                         // 410
                    });                                                                                              // 410
                });                                                                                                  // 410
                console.log('creating user');                                                                        // 412
                Accounts.createUser({                                                                                // 414
                    email: business.email,                                                                           // 415
                    password: business.email,                                                                        // 416
                    profile: {                                                                                       // 417
                        businessId: response,                                                                        // 418
                        contactName: business.contactName,                                                           // 419
                        role: 'admin'                                                                                // 420
                    }                                                                                                // 417
                });                                                                                                  // 414
            }                                                                                                        // 423
        });                                                                                                          // 424
        console.log('before return');                                                                                // 426
        return 200;                                                                                                  // 428
    },                                                                                                               // 429
    'businesses.update': function (business) {                                                                       // 430
        var _id = business._id,                                                                                      // 430
            updatedBusiness = (0, _objectWithoutProperties3.default)(business, ["_id"]);                             // 430
        Businesses.update(business._id, {                                                                            // 433
            $set: (0, _extends3.default)({}, updatedBusiness)                                                        // 433
        }, mongoCallback);                                                                                           // 433
        return 200;                                                                                                  // 435
    },                                                                                                               // 436
    'businesses.remove': function (business) {                                                                       // 437
        return Businesses.remove(business);                                                                          // 438
    },                                                                                                               // 439
    'workingPatterns.create': function (workingPattern) {                                                            // 440
        var businessId = Meteor.user().profile.businessId;                                                           // 440
        workingPattern.businessId = businessId;                                                                      // 443
        WorkingPatterns.insert(workingPattern, mongoCallback);                                                       // 445
    },                                                                                                               // 446
    'workingPatterns.update': function (workingPattern) {                                                            // 447
        var _id = workingPattern._id,                                                                                // 447
            updatedWorkingPattern = (0, _objectWithoutProperties3.default)(workingPattern, ["_id"]);                 // 447
        WorkingPatterns.update(_id, {                                                                                // 450
            $set: (0, _extends3.default)({}, updatedWorkingPattern)                                                  // 450
        }, mongoCallback);                                                                                           // 450
        return 200;                                                                                                  // 452
    },                                                                                                               // 453
    'workingPatterns.remove': function (workingPattern) {                                                            // 454
        Job.update({                                                                                                 // 455
            'workingPattern._id': workingPattern._id                                                                 // 455
        }, {                                                                                                         // 455
            $unset: {                                                                                                // 455
                workingPattern: 1                                                                                    // 455
            }                                                                                                        // 455
        }, function (error, result) {                                                                                // 455
            if (error) {                                                                                             // 456
                throw error;                                                                                         // 457
            }                                                                                                        // 458
                                                                                                                     //
            return WorkingPatterns.remove(workingPattern);                                                           // 460
        });                                                                                                          // 461
    },                                                                                                               // 462
    'copyPolicy': function (_ref3) {                                                                                 // 463
        var policies = _ref3.policies,                                                                               // 463
            business = _ref3.business;                                                                               // 463
        var lastPolicy = HRPolicies.findOne({                                                                        // 464
            business: policies[0].business                                                                           // 464
        }, {                                                                                                         // 464
            sort: {                                                                                                  // 464
                order: -1                                                                                            // 464
            }                                                                                                        // 464
        });                                                                                                          // 464
        var order = lastPolicy ? lastPolicy.order : 0;                                                               // 465
        policies.forEach(function (policy) {                                                                         // 467
            var _id = policy._id,                                                                                    // 467
                tmp = (0, _objectWithoutProperties3.default)(policy, ["_id"]);                                       // 467
            tmp.business = business;                                                                                 // 470
            tmp.order = ++order;                                                                                     // 471
            HRPolicies.insert(tmp);                                                                                  // 473
        });                                                                                                          // 474
        return 200;                                                                                                  // 476
    },                                                                                                               // 477
    'publicHolidays.create': function (holiday) {                                                                    // 478
        var businessId = Meteor.users.findOne({                                                                      // 478
            _id: Meteor.userId()                                                                                     // 479
        }).profile.businessId;                                                                                       // 479
        HolidayDates.insert((0, _extends3.default)({                                                                 // 481
            holidayType: 'public',                                                                                   // 481
            businessId: businessId                                                                                   // 481
        }, holiday), mongoCallback);                                                                                 // 481
        return 200;                                                                                                  // 483
    },                                                                                                               // 484
    'publicHolidays.update': function (holiday) {                                                                    // 485
        var _id = holiday._id,                                                                                       // 485
            updatedHoliday = (0, _objectWithoutProperties3.default)(holiday, ["_id"]);                               // 485
        HolidayDates.update(_id, {                                                                                   // 488
            $set: (0, _extends3.default)({}, updatedHoliday)                                                         // 488
        }, mongoCallback);                                                                                           // 488
        return 200;                                                                                                  // 490
    },                                                                                                               // 491
    'publicHolidays.remove': function (holiday) {                                                                    // 492
        return HolidayDates.remove(holiday);                                                                         // 493
    },                                                                                                               // 494
    'blockedDates.create': function (date) {                                                                         // 495
        var businessId = Meteor.users.findOne({                                                                      // 495
            _id: Meteor.userId()                                                                                     // 496
        }).profile.businessId;                                                                                       // 496
        HolidayDates.insert((0, _extends3.default)({                                                                 // 498
            holidayType: 'blocked',                                                                                  // 498
            businessId: businessId                                                                                   // 498
        }, date), mongoCallback);                                                                                    // 498
        return 200;                                                                                                  // 500
    },                                                                                                               // 501
    'blockedDates.update': function (date) {                                                                         // 502
        var _id = date._id,                                                                                          // 502
            updatedDate = (0, _objectWithoutProperties3.default)(date, ["_id"]);                                     // 502
        HolidayDates.update(_id, {                                                                                   // 505
            $set: (0, _extends3.default)({}, updatedDate)                                                            // 505
        }, mongoCallback);                                                                                           // 505
        return 200;                                                                                                  // 507
    },                                                                                                               // 508
    'blockedDates.remove': function (date) {                                                                         // 509
        return HolidayDates.remove(date);                                                                            // 510
    },                                                                                                               // 511
    'companyHolidays.create': function (holiday) {                                                                   // 512
        var businessId = Meteor.users.findOne({                                                                      // 512
            _id: Meteor.userId()                                                                                     // 513
        }).profile.businessId;                                                                                       // 513
        HolidayDates.insert((0, _extends3.default)({                                                                 // 515
            holidayType: 'company',                                                                                  // 515
            businessId: businessId                                                                                   // 515
        }, holiday), mongoCallback);                                                                                 // 515
        return 200;                                                                                                  // 517
    },                                                                                                               // 518
    'companyHolidays.update': function (holiday) {                                                                   // 519
        var _id = holiday._id,                                                                                       // 519
            updatedHoliday = (0, _objectWithoutProperties3.default)(holiday, ["_id"]);                               // 519
        HolidayDates.update(_id, {                                                                                   // 522
            $set: (0, _extends3.default)({}, updatedHoliday)                                                         // 522
        }, mongoCallback);                                                                                           // 522
        return 200;                                                                                                  // 524
    },                                                                                                               // 525
    'companyHolidays.remove': function (holiday) {                                                                   // 526
        return HolidayDates.remove(holiday);                                                                         // 527
    },                                                                                                               // 528
    'companyDetails.create': function (details) {                                                                    // 529
        CompanyDetails.insert(details, mongoCallback);                                                               // 530
        return 200;                                                                                                  // 532
    },                                                                                                               // 533
    'companyDetails.update': function (details) {                                                                    // 534
        var _id = details._id,                                                                                       // 534
            updatedDetails = (0, _objectWithoutProperties3.default)(details, ["_id"]);                               // 534
        CompanyDetails.update(_id, {                                                                                 // 537
            $set: (0, _extends3.default)({}, updatedDetails)                                                         // 537
        }, mongoCallback);                                                                                           // 537
        return 200;                                                                                                  // 539
    },                                                                                                               // 540
    'companyDetails.remove': function (details) {                                                                    // 541
        return CompanyDetails.remove(details);                                                                       // 542
    },                                                                                                               // 543
    'hrDocuments.remove': function (_id) {                                                                           // 544
        return HRDocuments.remove({                                                                                  // 545
            _id: _id                                                                                                 // 545
        });                                                                                                          // 545
    },                                                                                                               // 546
    'images.remove': function (ids) {                                                                                // 547
        return Images.remove({                                                                                       // 548
            _id: {                                                                                                   // 548
                $in: ids                                                                                             // 548
            }                                                                                                        // 548
        });                                                                                                          // 548
    },                                                                                                               // 549
    'personalSettings.update': function (settings) {                                                                 // 550
        var _id = settings._id,                                                                                      // 550
            updatedSettings = (0, _objectWithoutProperties3.default)(settings, ["_id"]);                             // 550
        PersonalSettings.update(_id, {                                                                               // 553
            $set: (0, _extends3.default)({}, updatedSettings)                                                        // 553
        }, {                                                                                                         // 553
            upsert: true                                                                                             // 553
        }, mongoCallback);                                                                                           // 553
        return 200;                                                                                                  // 555
    },                                                                                                               // 556
    'summary.update': function (summary) {                                                                           // 557
        var _id = summary._id,                                                                                       // 557
            updatedSummary = (0, _objectWithoutProperties3.default)(summary, ["_id"]);                               // 557
        console.log(updatedSummary);                                                                                 // 560
        Summary.update(_id, {                                                                                        // 562
            $set: (0, _extends3.default)({}, updatedSummary)                                                         // 562
        }, {                                                                                                         // 562
            upsert: true                                                                                             // 562
        }, mongoCallback);                                                                                           // 562
        return 200;                                                                                                  // 564
    },                                                                                                               // 565
    'personalInformation.update': function (personalInformation) {                                                   // 566
        console.log(personalInformation);                                                                            // 567
        var _id = personalInformation._id,                                                                           // 566
            updatedPersonalInformation = (0, _objectWithoutProperties3.default)(personalInformation, ["_id"]);       // 566
        PersonalInformation.update(_id, {                                                                            // 571
            $set: (0, _extends3.default)({}, updatedPersonalInformation)                                             // 571
        }, {                                                                                                         // 571
            upsert: true                                                                                             // 571
        }, mongoCallback);                                                                                           // 571
        return 200;                                                                                                  // 573
    },                                                                                                               // 574
    'employeeIds.remove': function (_id) {                                                                           // 575
        return EmployeeIds.remove({                                                                                  // 576
            _id: _id                                                                                                 // 576
        });                                                                                                          // 576
    },                                                                                                               // 577
    'employeeIds.removeMany': function (ids) {                                                                       // 578
        return EmployeeIds.remove({                                                                                  // 579
            _id: {                                                                                                   // 579
                $in: ids                                                                                             // 579
            }                                                                                                        // 579
        });                                                                                                          // 579
    },                                                                                                               // 580
    'generateEmployeeId.business': function () {                                                                     // 581
        var businessId = Meteor.user().profile.businessId;                                                           // 582
        return getEmployeeId(businessId);                                                                            // 584
    },                                                                                                               // 585
    'createEmployee': function (summary) {                                                                           // 586
        var businessId = Meteor.user().profile.businessId;                                                           // 586
        var token = Random.secret(); //this will throw a Meteor.Error if an error occures                            // 588
                                                                                                                     //
        var userId = Accounts.createUser({                                                                           // 591
            email: summary.email,                                                                                    // 592
            // password: summary.email, //hardcode, must send verification email instead                             // 593
            profile: {                                                                                               // 594
                role: 'employee',                                                                                    // 595
                businessId: businessId,                                                                              // 596
                contactName: summary.firstName + ' ' + summary.surname,                                              // 597
                signupToken: token                                                                                   // 598
            }                                                                                                        // 594
        });                                                                                                          // 591
        var url = Meteor.absoluteUrl() + 'signup/' + token;                                                          // 602
        console.log('signup link: ' + url);                                                                          // 604
        var emailHTML = "\n            <p>You've been registered in the hr-space</p>\n            <p>Follow this link to complete the registration process:</p>\n            <p><a href=\"" + url + "\">" + url + "</a>\n        ";
        sendEmail({                                                                                                  // 612
            to: summary.email,                                                                                       // 612
            subject: 'Welcome to hr-space',                                                                          // 612
            html: emailHTML                                                                                          // 612
        });                                                                                                          // 612
        Summary.update({                                                                                             // 614
            userId: userId                                                                                           // 614
        }, {                                                                                                         // 614
            $set: (0, _extends3.default)({}, summary)                                                                // 614
        }, mongoCallback);                                                                                           // 614
        return userId;                                                                                               // 616
    },                                                                                                               // 617
    'education.submit': function (educations) {                                                                      // 618
        educations.forEach(function (e) {                                                                            // 619
            var _id = e._id,                                                                                         // 619
                isNew = e.isNew,                                                                                     // 619
                education = (0, _objectWithoutProperties3.default)(e, ["_id", "isNew"]);                             // 619
                                                                                                                     //
            if (isNew) {                                                                                             // 622
                Education.insert(education, function (error, response) {                                             // 623
                    if (error) {                                                                                     // 624
                        throw error;                                                                                 // 625
                    }                                                                                                // 626
                });                                                                                                  // 627
            } else {                                                                                                 // 628
                Education.update(_id, {                                                                              // 629
                    $set: (0, _extends3.default)({}, education)                                                      // 629
                }, function (error, response) {                                                                      // 629
                    if (error) {                                                                                     // 630
                        throw error;                                                                                 // 631
                    }                                                                                                // 632
                });                                                                                                  // 633
            }                                                                                                        // 634
        });                                                                                                          // 635
        return 200;                                                                                                  // 637
    },                                                                                                               // 638
    'job.update': function (job) {                                                                                   // 639
        var _id = job._id,                                                                                           // 639
            updatedJob = (0, _objectWithoutProperties3.default)(job, ["_id"]);                                       // 639
                                                                                                                     //
        if (updatedJob.workPermit && +updatedJob.dateOfExpiry === 0) {                                               // 642
            throw new Meteor.Error(400, 'Expiry date for visa or work permission is required');                      // 643
        }                                                                                                            // 644
                                                                                                                     //
        if (updatedJob.startDate >= updatedJob.probationEndDate) {                                                   // 646
            throw new Meteor.Error(400, 'End of probation date cannot be on the same day or before the start date');
        }                                                                                                            // 648
                                                                                                                     //
        Job.update(_id, {                                                                                            // 650
            $set: (0, _extends3.default)({}, updatedJob)                                                             // 650
        }, {                                                                                                         // 650
            upsert: true                                                                                             // 650
        }, function (error, response) {                                                                              // 650
            if (error) {                                                                                             // 651
                throw error;                                                                                         // 652
            }                                                                                                        // 653
                                                                                                                     //
            Meteor.users.update(updatedJob.userId, {                                                                 // 655
                $set: {                                                                                              // 655
                    roles: [updatedJob.access]                                                                       // 655
                }                                                                                                    // 655
            }, function (err, res) {                                                                                 // 655
                if (err) {                                                                                           // 656
                    throw err;                                                                                       // 657
                }                                                                                                    // 658
            });                                                                                                      // 659
        });                                                                                                          // 660
        return 200;                                                                                                  // 662
    },                                                                                                               // 663
    'salary.create': function (salary) {                                                                             // 664
        Salary.insert(salary, mongoCallback);                                                                        // 665
        return 200;                                                                                                  // 667
    },                                                                                                               // 668
    'salary.update': function (salary) {                                                                             // 669
        var _id = salary._id,                                                                                        // 669
            updatedSalary = (0, _objectWithoutProperties3.default)(salary, ["_id"]);                                 // 669
        Salary.update(_id, {                                                                                         // 672
            $set: (0, _extends3.default)({}, updatedSalary)                                                          // 672
        }, mongoCallback);                                                                                           // 672
        return 200;                                                                                                  // 674
    },                                                                                                               // 675
    'salary.remove': function (salary) {                                                                             // 676
        return Salary.remove(salary);                                                                                // 677
    },                                                                                                               // 678
    'bonusDetails.create': function (bonusDetails) {                                                                 // 679
        BonusDetails.insert(bonusDetails, mongoCallback);                                                            // 680
        return 200;                                                                                                  // 682
    },                                                                                                               // 683
    'bonusDetails.update': function (bonusDetails) {                                                                 // 684
        var _id = bonusDetails._id,                                                                                  // 684
            updatedBonusDetails = (0, _objectWithoutProperties3.default)(bonusDetails, ["_id"]);                     // 684
        BonusDetails.update(_id, {                                                                                   // 687
            $set: (0, _extends3.default)({}, updatedBonusDetails)                                                    // 687
        }, mongoCallback);                                                                                           // 687
        return 200;                                                                                                  // 689
    },                                                                                                               // 690
    'bonusDetails.remove': function (bonusDetails) {                                                                 // 691
        return BonusDetails.remove(bonusDetails);                                                                    // 692
    },                                                                                                               // 693
    'benefitDetails.create': function (benefitDetail) {                                                              // 694
        var momentStartDate = moment(benefitDetail.startDate),                                                       // 695
            momentEndDate = moment(benefitDetail.endDate);                                                           // 695
                                                                                                                     //
        if (momentStartDate.isSameOrAfter(momentEndDate)) {                                                          // 698
            throw new Meteor.Error(400, 'DATES_MISMATCH', 'Start date has to be lower than End date');               // 699
        }                                                                                                            // 700
                                                                                                                     //
        BenefitDetails.insert(benefitDetail, mongoCallback);                                                         // 702
        return 200;                                                                                                  // 704
    },                                                                                                               // 705
    'benefitDetails.update': function (benefitDetail) {                                                              // 706
        var _id = benefitDetail._id,                                                                                 // 706
            updatedBenefitDetails = (0, _objectWithoutProperties3.default)(benefitDetail, ["_id"]);                  // 706
        BenefitDetails.update(_id, {                                                                                 // 709
            $set: (0, _extends3.default)({}, updatedBenefitDetails)                                                  // 709
        }, mongoCallback);                                                                                           // 709
        return 200;                                                                                                  // 711
    },                                                                                                               // 712
    'benefitDetails.remove': function (benefitDetail) {                                                              // 713
        return BenefitDetails.remove(benefitDetail);                                                                 // 714
    },                                                                                                               // 715
    'benefitsInKind.create': function (benefitInKind) {                                                              // 716
        var momentStartDate = moment(benefitInKind.startDate),                                                       // 717
            momentEndDate = moment(benefitInKind.endDate);                                                           // 717
                                                                                                                     //
        if (momentStartDate.isSameOrAfter(momentEndDate)) {                                                          // 720
            throw new Meteor.Error(400, 'DATES_MISMATCH', 'Start date has to be lower than End date');               // 721
        }                                                                                                            // 722
                                                                                                                     //
        BenefitsInKind.insert(benefitInKind, mongoCallback);                                                         // 724
        return 200;                                                                                                  // 726
    },                                                                                                               // 727
    'benefitsInKind.update': function (benefitInKind) {                                                              // 728
        var _id = benefitInKind._id,                                                                                 // 728
            updatedBenefitInKind = (0, _objectWithoutProperties3.default)(benefitInKind, ["_id"]);                   // 728
        BenefitsInKind.update(_id, {                                                                                 // 731
            $set: (0, _extends3.default)({}, updatedBenefitInKind)                                                   // 731
        }, mongoCallback);                                                                                           // 731
        return 200;                                                                                                  // 733
    },                                                                                                               // 734
    'benefitsInKind.remove': function (benefitInKind) {                                                              // 735
        return BenefitsInKind.remove(benefitInKind);                                                                 // 736
    },                                                                                                               // 737
    'bankInfo.update': function (bankInfo) {                                                                         // 738
        var _id = bankInfo._id,                                                                                      // 738
            updatedBankInfo = (0, _objectWithoutProperties3.default)(bankInfo, ["_id"]);                             // 738
        BankInfo.update(_id, {                                                                                       // 741
            $set: (0, _extends3.default)({}, updatedBankInfo)                                                        // 741
        }, {                                                                                                         // 741
            upsert: true                                                                                             // 741
        }, mongoCallback);                                                                                           // 741
        return 200;                                                                                                  // 743
    },                                                                                                               // 744
    'contact.submit': function (contacts) {                                                                          // 745
        contacts.forEach(function (c) {                                                                              // 746
            var _id = c._id,                                                                                         // 746
                isNew = c.isNew,                                                                                     // 746
                contact = (0, _objectWithoutProperties3.default)(c, ["_id", "isNew"]);                               // 746
                                                                                                                     //
            if (isNew) {                                                                                             // 749
                Contact.insert(contact, function (error, response) {                                                 // 750
                    if (error) {                                                                                     // 751
                        throw error;                                                                                 // 752
                    }                                                                                                // 753
                });                                                                                                  // 754
            } else {                                                                                                 // 755
                Contact.update(_id, {                                                                                // 756
                    $set: (0, _extends3.default)({}, contact)                                                        // 756
                }, function (error, response) {                                                                      // 756
                    if (error) {                                                                                     // 757
                        throw error;                                                                                 // 758
                    }                                                                                                // 759
                });                                                                                                  // 760
            }                                                                                                        // 761
        });                                                                                                          // 762
        return 200;                                                                                                  // 764
    },                                                                                                               // 765
    'managers.get': function (userId) {                                                                              // 766
        var businessId = Meteor.user().profile.businessId;                                                           // 766
        var usersInBusiness = Meteor.users.find({                                                                    // 769
            _id: {                                                                                                   // 770
                $ne: userId                                                                                          // 770
            },                                                                                                       // 770
            'profile.businessId': businessId                                                                         // 771
        }).map(function (user) {                                                                                     // 769
            return user._id;                                                                                         // 772
        });                                                                                                          // 772
        var managersInBusiness = Job.find({                                                                          // 774
            userId: {                                                                                                // 775
                $in: usersInBusiness                                                                                 // 775
            },                                                                                                       // 775
            isManager: true                                                                                          // 776
        }).map(function (job) {                                                                                      // 774
            return job.userId;                                                                                       // 777
        });                                                                                                          // 777
        var managers = Summary.find({                                                                                // 779
            userId: {                                                                                                // 780
                $in: managersInBusiness                                                                              // 780
            }                                                                                                        // 780
        }, {                                                                                                         // 780
            fields: {                                                                                                // 780
                'userId': 1,                                                                                         // 780
                'firstName': 1,                                                                                      // 780
                'surname': 1                                                                                         // 780
            }                                                                                                        // 780
        }).map(function (summary) {                                                                                  // 780
            return {                                                                                                 // 781
                _id: summary.userId,                                                                                 // 781
                name: summary.firstName + ' ' + summary.surname                                                      // 781
            };                                                                                                       // 781
        });                                                                                                          // 781
        return managers;                                                                                             // 783
    },                                                                                                               // 784
    'absence.create': function (absence) {                                                                           // 785
        var _this = this;                                                                                            // 785
                                                                                                                     //
        var absences = Absence.find({                                                                                // 786
            'employee._id': absence.employee._id,                                                                    // 787
            $or: [{                                                                                                  // 788
                startDate: {                                                                                         // 790
                    $gte: moment(absence.startDate).hours(0).minutes(0).seconds(0).milliseconds(0).toDate(),         // 791
                    $lte: moment(absence.endDate || absence.startDate).hours(23).minutes(59).seconds(59).milliseconds(999).toDate()
                }                                                                                                    // 790
            }, {                                                                                                     // 789
                endDate: {                                                                                           // 796
                    $gte: moment(absence.startDate).hours(0).minutes(0).seconds(0).milliseconds(0).toDate(),         // 797
                    $lte: moment(absence.endDate || absence.startDate).hours(23).minutes(59).seconds(59).milliseconds(999).toDate()
                }                                                                                                    // 796
            }]                                                                                                       // 795
        }).fetch();                                                                                                  // 786
                                                                                                                     //
        if (absences.length) {                                                                                       // 804
            throw new Meteor.Error(403, 'This employee already has an absence in this period');                      // 805
        }                                                                                                            // 806
                                                                                                                     //
        Absence.insert(absence, function (error, result) {                                                           // 808
            if (error) {                                                                                             // 809
                if (error.invalidKeys && error.invalidKeys.length) {                                                 // 810
                    throw new Meteor.Error(400, 'MISSING_FIELD', error.invalidKeys[0].name);                         // 811
                }                                                                                                    // 812
                                                                                                                     //
                throw error;                                                                                         // 814
            } else {                                                                                                 // 815
                var requiresSelfCertification = AbsenceTypes.findOne({                                               // 816
                    _id: absence.absenceType._id                                                                     // 816
                }).selfCertification;                                                                                // 816
                                                                                                                     //
                if (requiresSelfCertification) {                                                                     // 818
                    var selfCertificationTask = {                                                                    // 819
                        absence: result,                                                                             // 820
                        taskType: 'self_certification',                                                              // 821
                        text: 'Complete self certification form',                                                    // 822
                        users: [absence.employee._id]                                                                // 823
                    };                                                                                               // 819
                    Tasks.insert(selfCertificationTask);                                                             // 826
                    var employeeEmail = Meteor.users.findOne({                                                       // 828
                        _id: absence.employee._id                                                                    // 828
                    }).emails[0].address;                                                                            // 828
                    sendEmail({                                                                                      // 830
                        to: employeeEmail,                                                                           // 831
                        subject: 'New task',                                                                         // 832
                        text: 'HR has recorded your absence. Please complete the self cerification form. A reminder task was created on the dashboard'
                    });                                                                                              // 830
                }                                                                                                    // 835
                                                                                                                     //
                if (!absence.endDate) {                                                                              // 837
                    var hrReminderTask = {                                                                           // 838
                        absence: result,                                                                             // 839
                        text: "Reminder to complete return to work date when " + absence.employee.fullName + " returns to work",
                        users: [_this.userId]                                                                        // 841
                    };                                                                                               // 838
                    Tasks.insert(hrReminderTask);                                                                    // 844
                    var hrEmail = Meteor.users.findOne({                                                             // 846
                        _id: _this.userId                                                                            // 846
                    }).emails[0].address;                                                                            // 846
                    sendEmail({                                                                                      // 848
                        to: hrEmail,                                                                                 // 849
                        subject: 'New task',                                                                         // 850
                        text: "You have recorded an absence for " + absence.employee.fullName + ". A reminder task was created on the dashboard"
                    });                                                                                              // 848
                }                                                                                                    // 853
            }                                                                                                        // 854
        });                                                                                                          // 855
        return 200;                                                                                                  // 857
    },                                                                                                               // 858
    'absence.update': function (absence) {                                                                           // 859
        var _this2 = this;                                                                                           // 859
                                                                                                                     //
        var _id = absence._id,                                                                                       // 859
            updatedAbsence = (0, _objectWithoutProperties3.default)(absence, ["_id"]);                               // 859
        var initialAbsence = Absence.findOne({                                                                       // 862
            _id: _id                                                                                                 // 862
        });                                                                                                          // 862
        Absence.update({                                                                                             // 864
            _id: _id                                                                                                 // 864
        }, {                                                                                                         // 864
            $set: updatedAbsence                                                                                     // 864
        }, function (error, result) {                                                                                // 864
            if (error) {                                                                                             // 865
                if (error.invalidKeys && error.invalidKeys.length) {                                                 // 866
                    throw new Meteor.Error(400, 'MISSING_FIELD', error.invalidKeys[0].name);                         // 867
                }                                                                                                    // 868
                                                                                                                     //
                throw error;                                                                                         // 870
            } else {                                                                                                 // 871
                if (!initialAbsence.endDate && updatedAbsence.endDate) {                                             // 872
                    Tasks.update({                                                                                   // 873
                        absence: _id,                                                                                // 873
                        users: _this2.userId                                                                         // 873
                    }, {                                                                                             // 873
                        $set: {                                                                                      // 873
                            isComplete: true                                                                         // 873
                        }                                                                                            // 873
                    }, function (err, res) {                                                                         // 873
                        if (err) throw err;                                                                          // 874
                    });                                                                                              // 875
                }                                                                                                    // 876
            }                                                                                                        // 877
        });                                                                                                          // 878
        return 200;                                                                                                  // 880
    },                                                                                                               // 881
    'completeTask': function (taskId) {                                                                              // 882
        Tasks.update({                                                                                               // 883
            _id: taskId                                                                                              // 883
        }, {                                                                                                         // 883
            $set: {                                                                                                  // 883
                isComplete: true                                                                                     // 883
            }                                                                                                        // 883
        }, function (error, result) {                                                                                // 883
            if (error) {                                                                                             // 884
                throw error;                                                                                         // 885
            }                                                                                                        // 886
        });                                                                                                          // 887
        return 200;                                                                                                  // 889
    },                                                                                                               // 890
    'getTeamAbsence': function (managerId) {                                                                         // 891
        var usersInTeam = Summary.find({                                                                             // 892
            manager: managerId                                                                                       // 892
        }).map(function (summary) {                                                                                  // 892
            return summary.userId;                                                                                   // 892
        });                                                                                                          // 892
        var sicknessAbsenceTypes = AbsenceTypes.find({                                                               // 893
            sicknessIdentifier: true                                                                                 // 893
        }).map(function (absenceType) {                                                                              // 893
            return absenceType._id;                                                                                  // 893
        });                                                                                                          // 893
        var yearStart = moment().milliseconds(0).seconds(0).minutes(0).hours(0).date(1).month(0).toDate();           // 894
        var yearEnd = moment().milliseconds(0).seconds(0).minutes(0).hours(0).date(1).month(0).year(new Date().getFullYear() + 1).toDate();
        return Absence.find({                                                                                        // 897
            'employee._id': {                                                                                        // 898
                $in: usersInTeam                                                                                     // 898
            },                                                                                                       // 898
            'absenceType._id': {                                                                                     // 899
                $in: sicknessAbsenceTypes                                                                            // 899
            },                                                                                                       // 899
            $or: [{                                                                                                  // 900
                startDate: {                                                                                         // 901
                    $gte: yearStart,                                                                                 // 901
                    $lt: yearEnd                                                                                     // 901
                }                                                                                                    // 901
            }, {                                                                                                     // 901
                endDate: {                                                                                           // 902
                    $gte: yearStart,                                                                                 // 902
                    $lt: yearEnd                                                                                     // 902
                }                                                                                                    // 902
            }]                                                                                                       // 902
        }).map(function (absence) {                                                                                  // 897
            var totalDays = absence.endDate ? moment(absence.endDate).diff(moment(absence.startDate), 'days') : moment(new Date()).diff(moment(absence.startDate), 'days');
            return {                                                                                                 // 909
                _id: absence._id,                                                                                    // 910
                employee: absence.employee,                                                                          // 911
                startDate: absence.startDate,                                                                        // 912
                endDate: absence.endDate,                                                                            // 913
                absenceType: absence.absenceType.name,                                                               // 914
                totalDays: totalDays                                                                                 // 915
            };                                                                                                       // 909
        });                                                                                                          // 917
    },                                                                                                               // 918
    'getBradfordFactor.userId': function (userId) {                                                                  // 919
        var totalDays = 0;                                                                                           // 920
        var yearStart = moment().milliseconds(0).seconds(0).minutes(0).hours(0).date(1).month(0).toDate();           // 921
        var yearEnd = moment().milliseconds(0).seconds(0).minutes(0).hours(0).date(1).month(0).year(new Date().getFullYear() + 1).toDate();
        var absences = Absence.find({                                                                                // 924
            'employee._id': userId || Meteor.userId(),                                                               // 925
            $or: [{                                                                                                  // 926
                startDate: {                                                                                         // 927
                    $gte: yearStart,                                                                                 // 927
                    $lt: yearEnd                                                                                     // 927
                }                                                                                                    // 927
            }, {                                                                                                     // 927
                endDate: {                                                                                           // 928
                    $gte: yearStart,                                                                                 // 928
                    $lt: yearEnd                                                                                     // 928
                }                                                                                                    // 928
            }],                                                                                                      // 928
            endDate: {                                                                                               // 930
                $nin: [null, new Date(0)]                                                                            // 930
            }                                                                                                        // 930
        }).fetch();                                                                                                  // 924
        absences = absences.filter(function (absence) {                                                              // 933
            return AbsenceTypes.findOne({                                                                            // 933
                _id: absence.absenceType._id                                                                         // 933
            }).sicknessIdentifier;                                                                                   // 933
        });                                                                                                          // 933
        var absencesCount = absences.length;                                                                         // 935
        absences.forEach(function (absence) {                                                                        // 937
            return totalDays += moment(absence.endDate).diff(moment(absence.startDate), 'days');                     // 937
        });                                                                                                          // 937
        return absencesCount * absencesCount * totalDays;                                                            // 939
    },                                                                                                               // 940
    'getAbsences.filters': function (filters) {                                                                      // 941
        var businessId = Meteor.user().profile.businessId;                                                           // 941
        var usersInBusiness = Meteor.users.find({                                                                    // 943
            'profile.businessId': businessId                                                                         // 943
        }).map(function (user) {                                                                                     // 943
            return user._id;                                                                                         // 943
        });                                                                                                          // 943
        var holidayDates = HolidayDates.find({                                                                       // 944
            isActive: true,                                                                                          // 944
            businessId: businessId                                                                                   // 944
        }).fetch();                                                                                                  // 944
        var query = {                                                                                                // 946
            $and: [{                                                                                                 // 947
                'employee._id': {                                                                                    // 948
                    $in: usersInBusiness                                                                             // 948
                }                                                                                                    // 948
            }]                                                                                                       // 948
        };                                                                                                           // 946
                                                                                                                     //
        if (filters.team) {                                                                                          // 952
            var teamUserIds = Job.find({                                                                             // 953
                'team._id': filters.team._id                                                                         // 953
            }).map(function (job) {                                                                                  // 953
                return job.userId;                                                                                   // 953
            });                                                                                                      // 953
            query.$and.push({                                                                                        // 955
                'employee._id': {                                                                                    // 955
                    $in: teamUserIds                                                                                 // 955
                }                                                                                                    // 955
            });                                                                                                      // 955
        }                                                                                                            // 956
                                                                                                                     //
        if (filters.employee) {                                                                                      // 958
            query.$and.push({                                                                                        // 959
                'employee._id': filters.employee._id                                                                 // 959
            });                                                                                                      // 959
        }                                                                                                            // 960
                                                                                                                     //
        if (filters.absenceType) {                                                                                   // 961
            var typeIds = [];                                                                                        // 962
                                                                                                                     //
            if (filters.absenceType === 'Sickness') {                                                                // 964
                typeIds = AbsenceTypes.find({                                                                        // 965
                    sicknessIdentifier: true                                                                         // 965
                }).map(function (type) {                                                                             // 965
                    return type._id;                                                                                 // 965
                });                                                                                                  // 965
                query.$and.push({                                                                                    // 967
                    'absenceType._id': {                                                                             // 967
                        $in: typeIds                                                                                 // 967
                    }                                                                                                // 967
                });                                                                                                  // 967
                return {                                                                                             // 969
                    // absences: Absence.find(query).fetch(),                                                        // 970
                    absences: Absence.find(query).map(function (absence) {                                           // 971
                        var tmp = AbsenceTypes.findOne({                                                             // 972
                            _id: absence.absenceType._id                                                             // 972
                        });                                                                                          // 972
                        return (0, _extends3.default)({}, absence, {                                                 // 974
                            absenceType: (0, _extends3.default)({                                                    // 976
                                sicknessIdentifier: tmp.sicknessIdentifier                                           // 977
                            }, absence.absenceType)                                                                  // 976
                        });                                                                                          // 974
                    })                                                                                               // 981
                };                                                                                                   // 969
            } else {                                                                                                 // 983
                return {                                                                                             // 984
                    absences: Holiday.find((0, _extends3.default)({                                                  // 985
                        status: 'approved'                                                                           // 985
                    }, query)).fetch()                                                                               // 985
                };                                                                                                   // 984
            }                                                                                                        // 987
        } else {                                                                                                     // 988
            return {                                                                                                 // 989
                absences: Absence.find(query).map(function (absence) {                                               // 990
                    var tmp = AbsenceTypes.findOne({                                                                 // 991
                        _id: absence.absenceType._id                                                                 // 991
                    });                                                                                              // 991
                    return (0, _extends3.default)({}, absence, {                                                     // 993
                        absenceType: (0, _extends3.default)({                                                        // 995
                            sicknessIdentifier: tmp.sicknessIdentifier                                               // 996
                        }, absence.absenceType)                                                                      // 995
                    });                                                                                              // 993
                }).concat(Holiday.find((0, _extends3.default)({                                                      // 1000
                    status: 'approved'                                                                               // 1000
                }, query)).fetch()),                                                                                 // 1000
                holidayDates: holidayDates                                                                           // 1001
            };                                                                                                       // 989
        }                                                                                                            // 1003
    },                                                                                                               // 1004
    'holiday.create': function (holiday) {                                                                           // 1005
        var businessId = Meteor.users.findOne({                                                                      // 1005
            _id: holiday.employee                                                                                    // 1006
        }).profile.businessId;                                                                                       // 1006
        var employeeSummary = Summary.findOne({                                                                      // 1007
            userId: holiday.employee                                                                                 // 1007
        });                                                                                                          // 1007
        var userJob = Job.findOne({                                                                                  // 1008
            userId: holiday.employee                                                                                 // 1008
        }, {                                                                                                         // 1008
            fields: {                                                                                                // 1008
                annualLeaveEntitlement: 1,                                                                           // 1008
                workingPattern: 1                                                                                    // 1008
            }                                                                                                        // 1008
        });                                                                                                          // 1008
        var workingPattern = WorkingPatterns.findOne({                                                               // 1009
            _id: userJob.workingPattern._id,                                                                         // 1009
            isActive: true                                                                                           // 1009
        });                                                                                                          // 1009
        var holidayDates = HolidayDates.find({                                                                       // 1010
            businessId: businessId,                                                                                  // 1011
            isActive: true,                                                                                          // 1012
            holidayType: {                                                                                           // 1013
                $ne: 'blocked'                                                                                       // 1013
            },                                                                                                       // 1013
            date: {                                                                                                  // 1014
                $gte: holiday.startDate,                                                                             // 1014
                $lte: holiday.endDate                                                                                // 1014
            }                                                                                                        // 1014
        }).map(function (holidayDate) {                                                                              // 1010
            return holidayDate.date;                                                                                 // 1015
        });                                                                                                          // 1015
        var duration = 0;                                                                                            // 1017
                                                                                                                     //
        var isDateWorkingDay = function (date) {                                                                     // 1019
            try {                                                                                                    // 1020
                holidayDates.forEach(function (holidayDate) {                                                        // 1021
                    if (moment(date).isSame(holidayDate, 'day')) {                                                   // 1022
                        throw false;                                                                                 // 1023
                    }                                                                                                // 1024
                });                                                                                                  // 1025
            } catch (e) {                                                                                            // 1026
                return e;                                                                                            // 1027
            }                                                                                                        // 1028
                                                                                                                     //
            var dayIndex = date.getDay();                                                                            // 1030
                                                                                                                     //
            if (workingPattern && workingPattern.weekHours[dayIndex] < 1) {                                          // 1032
                return false;                                                                                        // 1033
            }                                                                                                        // 1034
                                                                                                                     //
            return true;                                                                                             // 1036
        };                                                                                                           // 1037
                                                                                                                     //
        for (var date = new Date(+holiday.startDate); date <= +holiday.endDate; date.setDate(date.getDate() + 1)) {  // 1039
            if (isDateWorkingDay(new Date(date))) {                                                                  // 1040
                duration++;                                                                                          // 1041
            }                                                                                                        // 1042
        }                                                                                                            // 1043
                                                                                                                     //
        holiday.duration = duration;                                                                                 // 1045
        holiday.employee = {                                                                                         // 1047
            _id: employeeSummary.userId,                                                                             // 1048
            fullName: employeeSummary.firstName + ' ' + employeeSummary.surname                                      // 1049
        };                                                                                                           // 1047
        Holiday.insert(holiday, function (error, result) {                                                           // 1052
            if (error) {                                                                                             // 1053
                if (error.invalidKeys && error.invalidKeys.length) {                                                 // 1054
                    throw new Meteor.Error(400, 'MISSING_FIELD', error.invalidKeys[0].name);                         // 1055
                }                                                                                                    // 1056
                                                                                                                     //
                throw error;                                                                                         // 1058
            } else {                                                                                                 // 1059
                var managerTask = {                                                                                  // 1060
                    holiday: result,                                                                                 // 1061
                    text: "Holiday Request by " + holiday.employee.fullName + " for the days from " + moment(holiday.startDate).format('DD/MM/YYYY') + " to " + moment(holiday.endDate).format('DD/MM/YYYY'),
                    taskType: 'holiday_approval',                                                                    // 1063
                    users: [employeeSummary.manager]                                                                 // 1064
                };                                                                                                   // 1060
                Tasks.insert(managerTask);                                                                           // 1067
                var managerEmail = Meteor.users.findOne({                                                            // 1069
                    _id: employeeSummary.manager                                                                     // 1069
                }).emails[0].address;                                                                                // 1069
                sendEmail({                                                                                          // 1071
                    to: managerEmail,                                                                                // 1072
                    subject: 'New task',                                                                             // 1073
                    text: holiday.employee.fullName + " has requested a holiday. You can approve or decline it via a task on the dashboard"
                });                                                                                                  // 1071
            }                                                                                                        // 1076
        });                                                                                                          // 1077
        return 200;                                                                                                  // 1079
    },                                                                                                               // 1080
    'holiday.approve': function (holidayId) {                                                                        // 1081
        var manager = Summary.findOne({                                                                              // 1082
            userId: Meteor.userId()                                                                                  // 1082
        });                                                                                                          // 1082
        Holiday.update({                                                                                             // 1084
            _id: holidayId                                                                                           // 1084
        }, {                                                                                                         // 1084
            $set: {                                                                                                  // 1085
                status: 'approved',                                                                                  // 1086
                approvedBy: {                                                                                        // 1087
                    _id: manager._id,                                                                                // 1087
                    fullName: manager.firstName + ' ' + manager.surname                                              // 1087
                }                                                                                                    // 1087
            }                                                                                                        // 1085
        }, function (error, result) {                                                                                // 1084
            if (error) throw error;                                                                                  // 1090
            Tasks.update({                                                                                           // 1092
                holiday: holidayId                                                                                   // 1092
            }, {                                                                                                     // 1092
                $set: {                                                                                              // 1092
                    isComplete: true                                                                                 // 1092
                }                                                                                                    // 1092
            }, function (err, res) {                                                                                 // 1092
                if (err) throw err;                                                                                  // 1093
            });                                                                                                      // 1094
        });                                                                                                          // 1095
        return 200;                                                                                                  // 1097
    },                                                                                                               // 1098
    'holiday.cancel': function (_ref4) {                                                                             // 1099
        var holidayId = _ref4.holidayId,                                                                             // 1099
            cancelReason = _ref4.cancelReason;                                                                       // 1099
        Holiday.update({                                                                                             // 1100
            _id: holidayId                                                                                           // 1100
        }, {                                                                                                         // 1100
            $set: {                                                                                                  // 1100
                status: 'cancelled',                                                                                 // 1100
                cancelledDate: new Date(),                                                                           // 1100
                cancelReason: cancelReason                                                                           // 1100
            }                                                                                                        // 1100
        }, function (error, result) {                                                                                // 1100
            if (error) throw error;                                                                                  // 1101
            Tasks.update({                                                                                           // 1103
                holiday: holidayId                                                                                   // 1103
            }, {                                                                                                     // 1103
                $set: {                                                                                              // 1103
                    isComplete: true                                                                                 // 1103
                }                                                                                                    // 1103
            }, function (err, res) {                                                                                 // 1103
                if (err) throw err;                                                                                  // 1104
            });                                                                                                      // 1105
        });                                                                                                          // 1106
        return 200;                                                                                                  // 1108
    },                                                                                                               // 1109
    'getHolidayAllowance.user': function (userId) {                                                                  // 1110
        var businessId = Meteor.users.findOne({                                                                      // 1110
            _id: userId                                                                                              // 1111
        }).profile.businessId;                                                                                       // 1111
        var userJob = Job.findOne({                                                                                  // 1112
            userId: userId                                                                                           // 1112
        }, {                                                                                                         // 1112
            fields: {                                                                                                // 1112
                annualLeaveEntitlement: 1,                                                                           // 1112
                workingPattern: 1                                                                                    // 1112
            }                                                                                                        // 1112
        });                                                                                                          // 1112
        var yearStart = moment().milliseconds(0).seconds(0).minutes(0).hours(0).date(1).month(0).toDate();           // 1113
        var yearEnd = moment().milliseconds(0).seconds(0).minutes(0).hours(0).date(1).month(0).year(new Date().getFullYear() + 1).toDate();
        var totalHolidayRequested = Holiday.find({                                                                   // 1116
            'employee._id': userId,                                                                                  // 1117
            status: 'approved',                                                                                      // 1118
            $or: [{                                                                                                  // 1119
                startDate: {                                                                                         // 1120
                    $gte: yearStart,                                                                                 // 1120
                    $lt: yearEnd                                                                                     // 1120
                }                                                                                                    // 1120
            }, {                                                                                                     // 1120
                endDate: {                                                                                           // 1121
                    $gte: yearStart,                                                                                 // 1121
                    $lt: yearEnd                                                                                     // 1121
                }                                                                                                    // 1121
            }]                                                                                                       // 1121
        }).map(function (holiday) {                                                                                  // 1116
            return holiday.duration;                                                                                 // 1123
        }).reduce(function (a, b) {                                                                                  // 1123
            return a + b;                                                                                            // 1123
        }, 0);                                                                                                       // 1123
        var holidayDates = HolidayDates.find({                                                                       // 1125
            businessId: businessId,                                                                                  // 1126
            isActive: true,                                                                                          // 1127
            date: {                                                                                                  // 1128
                $gte: yearStart,                                                                                     // 1128
                $lt: yearEnd                                                                                         // 1128
            }                                                                                                        // 1128
        }).map(function (holidayDate) {                                                                              // 1125
            return {                                                                                                 // 1129
                date: holidayDate.date,                                                                              // 1129
                type: holidayDate.holidayType,                                                                       // 1129
                endDate: holidayDate.endDate                                                                         // 1129
            };                                                                                                       // 1129
        });                                                                                                          // 1129
        return {                                                                                                     // 1131
            annualLeaveEntitlement: userJob.annualLeaveEntitlement,                                                  // 1132
            workingPattern: WorkingPatterns.findOne({                                                                // 1133
                _id: userJob.workingPattern && userJob.workingPattern._id,                                           // 1133
                isActive: true                                                                                       // 1133
            }, {                                                                                                     // 1133
                fields: {                                                                                            // 1133
                    weekHours: 1                                                                                     // 1133
                }                                                                                                    // 1133
            }),                                                                                                      // 1133
            holidayDates: holidayDates,                                                                              // 1134
            totalHolidayRequested: totalHolidayRequested                                                             // 1135
        };                                                                                                           // 1131
    },                                                                                                               // 1137
    'getHolidayAllowanceDashboard.user': function (userId) {                                                         // 1138
        var userJob = Job.findOne({                                                                                  // 1139
            userId: userId                                                                                           // 1139
        }, {                                                                                                         // 1139
            fields: {                                                                                                // 1139
                annualLeaveEntitlement: 1,                                                                           // 1139
                workingPattern: 1                                                                                    // 1139
            }                                                                                                        // 1139
        });                                                                                                          // 1139
        var holidayEntitlement = userJob.annualLeaveEntitlement;                                                     // 1140
        var yearStart = moment().milliseconds(0).seconds(0).minutes(0).hours(0).date(1).month(0).toDate();           // 1141
        var yearEnd = moment().milliseconds(0).seconds(0).minutes(0).hours(0).date(1).month(0).year(new Date().getFullYear() + 1).toDate();
        var daysTaken = Holiday.find({                                                                               // 1144
            'employee._id': userId,                                                                                  // 1145
            status: 'approved',                                                                                      // 1146
            $or: [{                                                                                                  // 1147
                startDate: {                                                                                         // 1148
                    $gte: yearStart,                                                                                 // 1148
                    $lt: yearEnd                                                                                     // 1148
                }                                                                                                    // 1148
            }, {                                                                                                     // 1148
                endDate: {                                                                                           // 1149
                    $gte: yearStart,                                                                                 // 1149
                    $lt: yearEnd                                                                                     // 1149
                }                                                                                                    // 1149
            }]                                                                                                       // 1149
        }).map(function (holiday) {                                                                                  // 1144
            return holiday.duration;                                                                                 // 1151
        }).reduce(function (a, b) {                                                                                  // 1151
            return a + b;                                                                                            // 1151
        }, 0);                                                                                                       // 1151
        return {                                                                                                     // 1153
            holidayEntitlement: holidayEntitlement,                                                                  // 1154
            daysTaken: daysTaken                                                                                     // 1155
        };                                                                                                           // 1153
    },                                                                                                               // 1157
    'getEmployeeName.userId': function (userId) {                                                                    // 1158
        var _Summary$findOne = Summary.findOne({                                                                     // 1158
            userId: userId                                                                                           // 1159
        }, {                                                                                                         // 1159
            fields: {                                                                                                // 1159
                firstName: 1,                                                                                        // 1159
                surname: 1                                                                                           // 1159
            }                                                                                                        // 1159
        }),                                                                                                          // 1159
            _Summary$findOne$firs = _Summary$findOne.firstName,                                                      // 1158
            firstName = _Summary$findOne$firs === undefined ? '' : _Summary$findOne$firs,                            // 1158
            _Summary$findOne$surn = _Summary$findOne.surname,                                                        // 1158
            surname = _Summary$findOne$surn === undefined ? '' : _Summary$findOne$surn;                              // 1158
                                                                                                                     //
        var _Job$findOne = Job.findOne({                                                                             // 1158
            userId: userId                                                                                           // 1160
        }, {                                                                                                         // 1160
            fields: {                                                                                                // 1160
                department: 1                                                                                        // 1160
            }                                                                                                        // 1160
        }),                                                                                                          // 1160
            _Job$findOne$departme = _Job$findOne.department,                                                         // 1158
            department = _Job$findOne$departme === undefined ? '' : _Job$findOne$departme;                           // 1158
                                                                                                                     //
        return {                                                                                                     // 1162
            firstName: firstName,                                                                                    // 1162
            surname: surname,                                                                                        // 1162
            department: department                                                                                   // 1162
        };                                                                                                           // 1162
    },                                                                                                               // 1163
    'getEmployeeInfo': function () {                                                                                 // 1164
        var userId = this.userId;                                                                                    // 1165
        var userInfo = {                                                                                             // 1167
            position: '',                                                                                            // 1168
            fullName: '',                                                                                            // 1169
            profilePic: '/img/no-avatar.png'                                                                         // 1170
        };                                                                                                           // 1167
        var user = Meteor.user();                                                                                    // 1173
                                                                                                                     //
        if (user) {                                                                                                  // 1175
            if (~user.roles.indexOf('super_admin')) {                                                                // 1176
                userInfo.position = 'Super admin';                                                                   // 1177
                userInfo.fullName = user.emails[0].address;                                                          // 1178
            } else {                                                                                                 // 1179
                var summary = Summary.findOne({                                                                      // 1180
                    userId: userId                                                                                   // 1180
                }, {                                                                                                 // 1180
                    fields: {                                                                                        // 1180
                        firstName: 1,                                                                                // 1180
                        surname: 1,                                                                                  // 1180
                        photo: 1                                                                                     // 1180
                    }                                                                                                // 1180
                });                                                                                                  // 1180
                userInfo.position = Job.findOne({                                                                    // 1182
                    userId: userId                                                                                   // 1182
                }, {                                                                                                 // 1182
                    fields: {                                                                                        // 1182
                        title: 1                                                                                     // 1182
                    }                                                                                                // 1182
                }).title || '';                                                                                      // 1182
                userInfo.fullName = summary.firstName + ' ' + summary.surname;                                       // 1183
                userInfo.profilePic = summary.photo || '/img/no-avatar.png';                                         // 1184
            }                                                                                                        // 1185
                                                                                                                     //
            return userInfo;                                                                                         // 1187
        }                                                                                                            // 1188
    },                                                                                                               // 1189
    'searchEmployees.query': function () {                                                                           // 1190
        var query = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};                          // 1190
        var businessId = Meteor.user().profile.businessId;                                                           // 1190
        var queryArr = query.split(' '); // convert to array of regular expressions                                  // 1192
                                                                                                                     //
        expressions = queryArr.map(function (item) {                                                                 // 1195
            return new RegExp("\\s" + item + ".*", 'i');                                                             // 1196
        }) // if firstname or surname consists of multiple words                                                     // 1196
        .concat(queryArr.map(function (item) {                                                                       // 1195
            return new RegExp(".*" + item + ".*", 'i');                                                              // 1197
        })); // add each expression to the query                                                                     // 1197
                                                                                                                     //
        mongoQuery = {                                                                                               // 1200
            businessId: businessId,                                                                                  // 1201
            $or: expressions.map(function (exp) {                                                                    // 1202
                return {                                                                                             // 1203
                    firstName: exp                                                                                   // 1203
                };                                                                                                   // 1203
            }).concat(expressions.map(function (exp) {                                                               // 1203
                return {                                                                                             // 1204
                    surname: exp                                                                                     // 1204
                };                                                                                                   // 1204
            }))                                                                                                      // 1204
        };                                                                                                           // 1200
        return Summary.find(mongoQuery).map(function (summary) {                                                     // 1207
            var job = Job.findOne({                                                                                  // 1208
                userId: summary.userId                                                                               // 1208
            });                                                                                                      // 1208
            return {                                                                                                 // 1210
                _id: summary.userId,                                                                                 // 1211
                fullName: summary.firstName + ' ' + summary.surname,                                                 // 1212
                bio: summary.bio,                                                                                    // 1213
                photo: summary.photo,                                                                                // 1214
                telephone: summary.telephone,                                                                        // 1215
                email: summary.email,                                                                                // 1216
                location: summary.location,                                                                          // 1217
                jobTitle: job ? job.title : 'No job title provided'                                                  // 1218
            };                                                                                                       // 1210
        });                                                                                                          // 1220
    },                                                                                                               // 1221
    'subordinates.get': function (userId) {                                                                          // 1222
        return Summary.find({                                                                                        // 1223
            manager: userId                                                                                          // 1223
        }).map(function (summary) {                                                                                  // 1223
            var job = Job.findOne({                                                                                  // 1224
                userId: summary.userId                                                                               // 1224
            });                                                                                                      // 1224
            return {                                                                                                 // 1226
                _id: summary.userId,                                                                                 // 1227
                fullName: summary.firstName + ' ' + summary.surname,                                                 // 1228
                bio: summary.bio,                                                                                    // 1229
                photo: summary.photo,                                                                                // 1230
                telephone: summary.telephone,                                                                        // 1231
                email: summary.email,                                                                                // 1232
                location: summary.location,                                                                          // 1233
                jobTitle: job ? job.title : 'No job title provided'                                                  // 1234
            };                                                                                                       // 1226
        });                                                                                                          // 1236
    },                                                                                                               // 1237
    'getQuestions': function () {                                                                                    // 1238
        return SecretQuestions.find({}, {                                                                            // 1239
            fields: {                                                                                                // 1239
                active: 0                                                                                            // 1239
            }                                                                                                        // 1239
        }).fetch();                                                                                                  // 1239
    },                                                                                                               // 1240
    'getRandomQuestions.token': function (_ref5) {                                                                   // 1241
        var token = _ref5.token;                                                                                     // 1241
                                                                                                                     //
        if (!token) {                                                                                                // 1242
            throw new Meteor.Error(400, 'No token provided');                                                        // 1243
        }                                                                                                            // 1244
                                                                                                                     //
        var userSecretQuestions = Meteor.users.findOne({                                                             // 1246
            'profile.resetPasswordToken': token                                                                      // 1246
        }).profile.secretQuestions.map(function (question) {                                                         // 1246
            return question.questionId;                                                                              // 1246
        });                                                                                                          // 1246
        var questions = SecretQuestions.find({                                                                       // 1247
            _id: {                                                                                                   // 1247
                $in: userSecretQuestions                                                                             // 1247
            }                                                                                                        // 1247
        }, {                                                                                                         // 1247
            fields: {                                                                                                // 1247
                active: 0                                                                                            // 1247
            }                                                                                                        // 1247
        }).fetch();                                                                                                  // 1247
        var response = [];                                                                                           // 1248
                                                                                                                     //
        for (var i = 0; i < 3; i++) {                                                                                // 1250
            var randomIndex = Math.floor(Math.random() * questions.length);                                          // 1251
            response.push(questions[randomIndex]);                                                                   // 1253
            questions.splice(randomIndex, 1);                                                                        // 1255
        }                                                                                                            // 1256
                                                                                                                     //
        return response;                                                                                             // 1258
    },                                                                                                               // 1259
    'completeSignup': function (_ref6) {                                                                             // 1260
        var token = _ref6.token,                                                                                     // 1260
            password = _ref6.password,                                                                               // 1260
            secretQuestions = _ref6.secretQuestions;                                                                 // 1260
                                                                                                                     //
        if (!token) {                                                                                                // 1261
            throw new Meteor.Error(400, 'No token provided');                                                        // 1262
        }                                                                                                            // 1263
                                                                                                                     //
        var user = Meteor.users.findOne({                                                                            // 1265
            'profile.signupToken': token                                                                             // 1265
        });                                                                                                          // 1265
        Meteor.users.update({                                                                                        // 1267
            _id: user._id                                                                                            // 1267
        }, {                                                                                                         // 1267
            $set: {                                                                                                  // 1267
                'profile.secretQuestions': secretQuestions                                                           // 1267
            },                                                                                                       // 1267
            $unset: {                                                                                                // 1267
                'profile.signupToken': ''                                                                            // 1267
            }                                                                                                        // 1267
        });                                                                                                          // 1267
        Accounts.setPassword(user._id, password);                                                                    // 1269
        return {                                                                                                     // 1271
            email: user.emails[0].address                                                                            // 1271
        };                                                                                                           // 1271
    },                                                                                                               // 1272
    'sendResetPasswordLink': function (email) {                                                                      // 1273
        var user = Meteor.users.findOne({                                                                            // 1274
            'emails.address': email                                                                                  // 1274
        });                                                                                                          // 1274
        if (!user) throw new Meteor.Error(400, 'User not found', 'USER_NOT_FOUND');                                  // 1276
        var token = Random.secret();                                                                                 // 1278
        var url = Meteor.absoluteUrl() + 'reset_password/' + token;                                                  // 1279
        Meteor.users.update({                                                                                        // 1281
            _id: user._id                                                                                            // 1281
        }, {                                                                                                         // 1281
            $set: {                                                                                                  // 1281
                'profile.resetPasswordToken': token                                                                  // 1281
            }                                                                                                        // 1281
        });                                                                                                          // 1281
        var emailHtml = "\n            <p>To reset your password follow this link:</p>\n            <p><a href=" + url + ">" + url + "</a></p>\n        ";
        console.log('reset password link: ' + url);                                                                  // 1288
        sendEmail({                                                                                                  // 1290
            to: email,                                                                                               // 1290
            subject: 'Reset password email',                                                                         // 1290
            html: emailHtml                                                                                          // 1290
        });                                                                                                          // 1290
        return 200;                                                                                                  // 1292
    },                                                                                                               // 1293
    'resetEmployeePassword': function (_ref7) {                                                                      // 1294
        var token = _ref7.token,                                                                                     // 1294
            newPassword = _ref7.newPassword,                                                                         // 1294
            questions = _ref7.questions;                                                                             // 1294
        var user = Meteor.users.findOne({                                                                            // 1295
            'profile.resetPasswordToken': token                                                                      // 1295
        }); // at least 8 characters, at least 1 uppercase letter, 1 lowercase letter, and 1 number, can contain special characters
                                                                                                                     //
        var regex = new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/);                               // 1298
                                                                                                                     //
        if (!regex.test(newPassword)) {                                                                              // 1300
            throw new Meteor.Error(400, 'Password must be at least 8 characters, contain at least 1 uppercase letter, 1 lowercase letter and 1 number');
        }                                                                                                            // 1302
                                                                                                                     //
        var _user$profile$secretQ = user.profile.secretQuestions,                                                    // 1294
            secretQuestions = _user$profile$secretQ === undefined ? [] : _user$profile$secretQ;                      // 1294
                                                                                                                     //
        for (var _iterator = questions, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
            var _ref8;                                                                                               // 1306
                                                                                                                     //
            if (_isArray) {                                                                                          // 1306
                if (_i >= _iterator.length) break;                                                                   // 1306
                _ref8 = _iterator[_i++];                                                                             // 1306
            } else {                                                                                                 // 1306
                _i = _iterator.next();                                                                               // 1306
                if (_i.done) break;                                                                                  // 1306
                _ref8 = _i.value;                                                                                    // 1306
            }                                                                                                        // 1306
                                                                                                                     //
            var question = _ref8;                                                                                    // 1306
                                                                                                                     //
            for (var _iterator2 = secretQuestions, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
                var _ref9;                                                                                           // 1307
                                                                                                                     //
                if (_isArray2) {                                                                                     // 1307
                    if (_i2 >= _iterator2.length) break;                                                             // 1307
                    _ref9 = _iterator2[_i2++];                                                                       // 1307
                } else {                                                                                             // 1307
                    _i2 = _iterator2.next();                                                                         // 1307
                    if (_i2.done) break;                                                                             // 1307
                    _ref9 = _i2.value;                                                                               // 1307
                }                                                                                                    // 1307
                                                                                                                     //
                var userQuestion = _ref9;                                                                            // 1307
                                                                                                                     //
                if (userQuestion.questionId === question.questionId && userQuestion.answer.toLowerCase().trim() !== question.answer.toLowerCase().trim()) {
                    throw new Meteor.Error(400, 'INVALID_ANSWER', question.questionId);                              // 1309
                }                                                                                                    // 1310
            }                                                                                                        // 1311
        }                                                                                                            // 1312
                                                                                                                     //
        Accounts.setPassword(user._id, newPassword);                                                                 // 1314
        Meteor.users.update({                                                                                        // 1316
            _id: user._id                                                                                            // 1316
        }, {                                                                                                         // 1316
            $unset: {                                                                                                // 1316
                'profile.resetPasswordToken': ''                                                                     // 1316
            }                                                                                                        // 1316
        });                                                                                                          // 1316
        return 200;                                                                                                  // 1318
    },                                                                                                               // 1319
    'getHolidayNotes': function (holidayId) {                                                                        // 1320
        var _Holiday$findOne = Holiday.findOne({                                                                     // 1320
            _id: holidayId                                                                                           // 1321
        }),                                                                                                          // 1321
            notes = _Holiday$findOne.notes;                                                                          // 1320
                                                                                                                     //
        return notes;                                                                                                // 1323
    },                                                                                                               // 1324
    'managerPermissions.create': function (managerPermissions) {                                                     // 1325
        var businessId = Meteor.users.findOne({                                                                      // 1325
            userId: this.userId                                                                                      // 1326
        }).profile.businessId;                                                                                       // 1326
        ManagerPermissions.insert((0, _extends3.default)({                                                           // 1328
            businessId: businessId                                                                                   // 1328
        }, managerPermissions));                                                                                     // 1328
        return 200;                                                                                                  // 1330
    },                                                                                                               // 1331
    'managerPermissions.update': function (managerPermissions) {                                                     // 1332
        var businessId = Meteor.user().profile.businessId;                                                           // 1332
        ManagerPermissions.update({                                                                                  // 1335
            businessId: businessId                                                                                   // 1335
        }, {                                                                                                         // 1335
            $set: (0, _extends3.default)({}, managerPermissions)                                                     // 1335
        });                                                                                                          // 1335
        return 200;                                                                                                  // 1337
    }                                                                                                                // 1338
});                                                                                                                  // 84
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"startup":{"both":{"index.js":function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// imports/startup/both/index.js                                                                                     //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
// Import modules used by both client and server through a single index entry point                                  // 1
// e.g. useraccounts configuration file.                                                                             // 2
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"server":{"accounts.js":function(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// imports/startup/server/accounts.js                                                                                //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
var _objectWithoutProperties2 = require("babel-runtime/helpers/objectWithoutProperties");                            //
                                                                                                                     //
var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);                                   //
                                                                                                                     //
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }                    //
                                                                                                                     //
module.export({                                                                                                      // 1
    getEmployeeId: function () {                                                                                     // 1
        return getEmployeeId;                                                                                        // 1
    }                                                                                                                // 1
});                                                                                                                  // 1
var Accounts = void 0;                                                                                               // 1
module.watch(require("meteor/accounts-base"), {                                                                      // 1
    Accounts: function (v) {                                                                                         // 1
        Accounts = v;                                                                                                // 1
    }                                                                                                                // 1
}, 0);                                                                                                               // 1
var PersonalSettings = void 0;                                                                                       // 1
module.watch(require("../../api/collections/user_info/personalSettings"), {                                          // 1
    "default": function (v) {                                                                                        // 1
        PersonalSettings = v;                                                                                        // 1
    }                                                                                                                // 1
}, 1);                                                                                                               // 1
var Summary = void 0;                                                                                                // 1
module.watch(require("../../api/collections/user_info/summary"), {                                                   // 1
    "default": function (v) {                                                                                        // 1
        Summary = v;                                                                                                 // 1
    }                                                                                                                // 1
}, 2);                                                                                                               // 1
var PersonalInformation = void 0;                                                                                    // 1
module.watch(require("../../api/collections/user_info/personalInformation"), {                                       // 1
    "default": function (v) {                                                                                        // 1
        PersonalInformation = v;                                                                                     // 1
    }                                                                                                                // 1
}, 3);                                                                                                               // 1
var Job = void 0;                                                                                                    // 1
module.watch(require("../../api/collections/user_info/job"), {                                                       // 1
    "default": function (v) {                                                                                        // 1
        Job = v;                                                                                                     // 1
    }                                                                                                                // 1
}, 4);                                                                                                               // 1
var BankInfo = void 0;                                                                                               // 1
module.watch(require("../../api/collections/user_info/bankInfo"), {                                                  // 1
    "default": function (v) {                                                                                        // 1
        BankInfo = v;                                                                                                // 1
    }                                                                                                                // 1
}, 5);                                                                                                               // 1
var Contact = void 0;                                                                                                // 1
module.watch(require("../../api/collections/user_info/contact"), {                                                   // 1
    "default": function (v) {                                                                                        // 1
        Contact = v;                                                                                                 // 1
    }                                                                                                                // 1
}, 6);                                                                                                               // 1
Accounts.onCreateUser(function (options, user) {                                                                     // 9
    var _options$profile = options.profile,                                                                          // 9
        _options$profile$role = _options$profile.role,                                                               // 9
        role = _options$profile$role === undefined ? 'employee' : _options$profile$role,                             // 9
        contactName = _options$profile.contactName,                                                                  // 9
        profile = (0, _objectWithoutProperties3.default)(_options$profile, ["role", "contactName"]);                 // 9
    user.profile = profile;                                                                                          // 12
    user.roles = [role];                                                                                             // 13
                                                                                                                     //
    if (role !== 'super_admin') {                                                                                    // 15
        user.profile.personalSettings = PersonalSettings.insert({                                                    // 16
            userId: user._id                                                                                         // 16
        });                                                                                                          // 16
        user.profile.summary = Summary.insert({                                                                      // 18
            userId: user._id,                                                                                        // 19
            employeeId: getEmployeeId(profile.businessId),                                                           // 20
            email: options.email,                                                                                    // 21
            firstName: contactName && contactName.split(' ')[0],                                                     // 22
            surname: contactName && contactName.split(' ')[1],                                                       // 23
            businessId: profile.businessId                                                                           // 24
        }); // }, (err, res) => console.log('summary.insert err res:', err, res));                                   // 18
                                                                                                                     //
        user.profile.personalInformation = PersonalInformation.insert({                                              // 28
            userId: user._id,                                                                                        // 28
            businessId: profile.businessId                                                                           // 28
        });                                                                                                          // 28
        user.profile.job = Job.insert({                                                                              // 30
            userId: user._id,                                                                                        // 30
            access: role,                                                                                            // 30
            businessId: profile.businessId                                                                           // 30
        });                                                                                                          // 30
        user.profile.bankInfo = BankInfo.insert({                                                                    // 32
            userId: user._id,                                                                                        // 32
            businessId: profile.businessId                                                                           // 32
        });                                                                                                          // 32
        user.profile.contact = Contact.insert({                                                                      // 34
            userId: user._id,                                                                                        // 34
            businessId: profile.businessId                                                                           // 34
        });                                                                                                          // 34
    }                                                                                                                // 35
                                                                                                                     //
    return user;                                                                                                     // 37
});                                                                                                                  // 38
                                                                                                                     //
function getEmployeeId(businessId) {                                                                                 // 40
    var employeesCount = Meteor.users.find({                                                                         // 41
        'profile.businessId': businessId                                                                             // 41
    }).count();                                                                                                      // 41
    if (!employeesCount) return '000001'; // var lastEmployeeId = employeesCount.employeeId;                         // 43
    // var increment = (+lastEmployeeId) + 1;                                                                        // 46
                                                                                                                     //
    var increment = employeesCount + 1;                                                                              // 47
    var employeeId = ('000000' + increment).slice(-6);                                                               // 48
    return employeeId;                                                                                               // 50
}                                                                                                                    // 51
                                                                                                                     //
;                                                                                                                    // 51
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"fixtures.js":function(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// imports/startup/server/fixtures.js                                                                                //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
var Nationalities = void 0;                                                                                          // 1
module.watch(require("../../api/collections/nationalities"), {                                                       // 1
    "default": function (v) {                                                                                        // 1
        Nationalities = v;                                                                                           // 1
    }                                                                                                                // 1
}, 0);                                                                                                               // 1
var Countries = void 0;                                                                                              // 1
module.watch(require("../../api/collections/countries"), {                                                           // 1
    "default": function (v) {                                                                                        // 1
        Countries = v;                                                                                               // 1
    }                                                                                                                // 1
}, 1);                                                                                                               // 1
var Currencies = void 0;                                                                                             // 1
module.watch(require("../../api/collections/currencies"), {                                                          // 1
    "default": function (v) {                                                                                        // 1
        Currencies = v;                                                                                              // 1
    }                                                                                                                // 1
}, 2);                                                                                                               // 1
var Departments = void 0;                                                                                            // 1
module.watch(require("../../api/collections/departments"), {                                                         // 1
    "default": function (v) {                                                                                        // 1
        Departments = v;                                                                                             // 1
    }                                                                                                                // 1
}, 3);                                                                                                               // 1
var Teams = void 0;                                                                                                  // 1
module.watch(require("../../api/collections/teams"), {                                                               // 1
    "default": function (v) {                                                                                        // 1
        Teams = v;                                                                                                   // 1
    }                                                                                                                // 1
}, 4);                                                                                                               // 1
var EmploymentTypes = void 0;                                                                                        // 1
module.watch(require("../../api/collections/employmentTypes"), {                                                     // 1
    "default": function (v) {                                                                                        // 1
        EmploymentTypes = v;                                                                                         // 1
    }                                                                                                                // 1
}, 5);                                                                                                               // 1
var BenefitTypes = void 0;                                                                                           // 1
module.watch(require("../../api/collections/benefitTypes"), {                                                        // 1
    "default": function (v) {                                                                                        // 1
        BenefitTypes = v;                                                                                            // 1
    }                                                                                                                // 1
}, 6);                                                                                                               // 1
var SecretQuestions = void 0;                                                                                        // 1
module.watch(require("../../api/collections/secretQuestions"), {                                                     // 1
    "default": function (v) {                                                                                        // 1
        SecretQuestions = v;                                                                                         // 1
    }                                                                                                                // 1
}, 7);                                                                                                               // 1
                                                                                                                     //
if (Countries.find().count() === 0) {                                                                                // 10
    var countries = ['Gibraltar', 'United Kingdom', 'Afghanistan', 'Albania', 'Algeria', 'Andorra', 'Angola', 'Anguilla', 'Antigua & Barbuda', 'Argentina', 'Armenia', 'Aruba', 'Australia', 'Austria', 'Azerbaijan', 'Bahamas', 'Bahrain', 'Bangladesh', 'Barbados', 'Belarus', 'Belgium', 'Belize', 'Benin', 'Bermuda', 'Bhutan', 'Bolivia', 'Bosnia & Herzegovina', 'Botswana', 'Brazil', 'British Virgin Islands', 'Brunei', 'Bulgaria', 'Burkina Faso', 'Burundi', 'Cambodia', 'Cameroon', 'Cape Verde', 'Cayman Islands', 'Chad', 'Chile', 'China', 'Colombia', 'Congo', 'Cook Islands', 'Costa Rica', 'Cote D Ivoire', 'Croatia', 'Cruise Ship', 'Cuba', 'Cyprus', 'Czech Republic', 'Denmark', 'Djibouti', 'Dominica', 'Dominican Republic', 'Ecuador', 'Egypt', 'El Salvador', 'Equatorial Guinea', 'Estonia', 'Ethiopia', 'Falkland Islands', 'Faroe Islands', 'Fiji', 'Finland', 'France', 'French Polynesia', 'French West Indies', 'Gabon', 'Gambia', 'Georgia', 'Germany', 'Ghana', 'Greece', 'Greenland', 'Grenada', 'Guam', 'Guatemala', 'Guernsey', 'Guinea', 'Guinea Bissau', 'Guyana', 'Haiti', 'Honduras', 'Hong Kong', 'Hungary', 'Iceland', 'India', 'Indonesia', 'Iran', 'Iraq', 'Ireland', 'Isle of Man', 'Israel', 'Italy', 'Jamaica', 'Japan', 'Jersey', 'Jordan', 'Kazakhstan', 'Kenya', 'Kuwait', 'Kyrgyz Republic', 'Laos', 'Latvia', 'Lebanon', 'Lesotho', 'Liberia', 'Libya', 'Liechtenstein', 'Lithuania', 'Luxembourg', 'Macau', 'Macedonia', 'Madagascar', 'Malawi', 'Malaysia', 'Maldives', 'Mali', 'Malta', 'Mauritania', 'Mauritius', 'Mexico', 'Moldova', 'Monaco', 'Mongolia', 'Montenegro', 'Montserrat', 'Morocco', 'Mozambique', 'Namibia', 'Nepal', 'Netherlands', 'Netherlands Antilles', 'New Caledonia', 'New Zealand', 'Nicaragua', 'Niger', 'Nigeria', 'Norway', 'Oman', 'Pakistan', 'Palestine', 'Panama', 'Papua New Guinea', 'Paraguay', 'Peru', 'Philippines', 'Poland', 'Portugal', 'Puerto Rico', 'Qatar', 'Reunion', 'Romania', 'Russia', 'Rwanda', 'Saint Pierre & Miquelon', 'Samoa', 'San Marino', 'Satellite', 'Saudi Arabia', 'Senegal', 'Serbia', 'Seychelles', 'Sierra Leone', 'Singapore', 'Slovakia', 'Slovenia', 'South Africa', 'South Korea', 'Spain', 'Sri Lanka', 'St Kitts & Nevis', 'St Lucia', 'St Vincent', 'St. Lucia', 'Sudan', 'Suriname', 'Swaziland', 'Sweden', 'Switzerland', 'Syria', 'Taiwan', 'Tajikistan', 'Tanzania', 'Thailand', 'Timor L\'Este', 'Togo', 'Tonga', 'Trinidad & Tobago', 'Tunisia', 'Turkey', 'Turkmenistan', 'Turks & Caicos', 'Uganda', 'Ukraine', 'United Arab Emirates', 'Uruguay', 'Uzbekistan', 'Venezuela', 'Vietnam', 'Virgin Islands(US)', 'Yemen', 'Zambia', 'Zimbabwe'];
    countries.forEach(function (country) {                                                                           // 13
        return Countries.insert({                                                                                    // 13
            name: country                                                                                            // 13
        });                                                                                                          // 13
    });                                                                                                              // 13
}                                                                                                                    // 14
                                                                                                                     //
if (Nationalities.find().count() === 0) {                                                                            // 16
    var nationalities = ['Gibraltarian', 'British', 'Afghan', 'Albanian', 'Algerian', 'American', 'Andorran', 'Angolan', 'Antiguans', 'Argentinean', 'Armenian', 'Australian', 'Austrian', 'Azerbaijani', 'Bahamian', 'Bahraini', 'Bangladeshi', 'Barbadian', 'Barbudans', 'Batswana', 'Belarusian', 'Belgian', 'Belizean', 'Beninese', 'Bhutanese', 'Bolivian', 'Bosnian', 'Brazilian', 'Bruneian', 'Bulgarian', 'Burkinabe', 'Burmese', 'Burundian', 'Cambodian', 'Cameroonian', 'Canadian', 'Cape Verdean', 'Central African', 'Chadian', 'Chilean', 'Chinese', 'Colombian', 'Comoran', 'Congolese', 'Costa Rican', 'Croatian', 'Cuban', 'Cypriot', 'Czech', 'Danish', 'Djibouti', 'Dominican', 'Dutch', 'East Timorese', 'Ecuadorean', 'Egyptian', 'Emirian', 'Equatorial Guinean', 'Eritrean', 'Estonian', 'Ethiopian', 'Fijian', 'Filipino', 'Finnish', 'French', 'Gabonese', 'Gambian', 'Georgian', 'German', 'Ghanaian', 'Greek', 'Grenadian', 'Guatemalan', 'Guinea-Bissauan', 'Guinean', 'Guyanese', 'Haitian', 'Herzegovinian', 'Honduran', 'Hungarian', 'I-Kiribati', 'Icelander', 'Indian', 'Indonesian', 'Iranian', 'Iraqi', 'Irish', 'Israeli', 'Italian', 'Ivorian', 'Jamaican', 'Japanese', 'Jordanian', 'Kazakhstani', 'Kenyan', 'Kittian and Nevisian', 'Kuwaiti', 'Kyrgyz', 'Laotian', 'Latvian', 'Lebanese', 'Liberian', 'Libyan', 'Liechtensteiner', 'Lithuanian', 'Luxembourger', 'Macedonian', 'Malagasy', 'Malawian', 'Malaysian', 'Maldivan', 'Malian', 'Maltese', 'Marshallese', 'Mauritanian', 'Mauritian', 'Mexican', 'Micronesian', 'Moldovan', 'Monacan', 'Mongolian', 'Moroccan', 'Mosotho', 'Motswana', 'Mozambican', 'Namibian', 'Nauruan', 'Nepalese', 'New Zealander', 'Nicaraguan', 'Nigerian', 'Nigerien', 'North Korean', 'Northern Irish', 'Norwegian', 'Omani', 'Pakistani', 'Palauan', 'Panamanian', 'Papua New Guinean', 'Paraguayan', 'Peruvian', 'Polish', 'Portuguese', 'Qatari', 'Romanian', 'Russian', 'Rwandan', 'Saint Lucian', 'Salvadoran', 'Samoan', 'San Marinese', 'Sao Tomean', 'Saudi', 'Scottish', 'Senegalese', 'Serbian', 'Seychellois', 'Sierra Leonean', 'Singaporean', 'Slovakian', 'Slovenian', 'Solomon Islander', 'Somali', 'South African', 'South Korean', 'Spanish', 'Sri Lankan', 'Sudanese', 'Surinamer', 'Swazi', 'Swedish', 'Swiss', 'Syrian', 'Taiwanese', 'Tajik', 'Tanzanian', 'Thai', 'Togolese', 'Tongan', 'Trinidadian/Tobagonian', 'Tunisian', 'Turkish', 'Tuvaluan', 'Ugandan', 'Ukrainian', 'Uruguayan', 'Uzbekistani', 'Venezuelan', 'Vietnamese', 'Welsh', 'Yemenite', 'Zambian', 'Zimbabwean'];
    nationalities.forEach(function (nationality) {                                                                   // 19
        return Nationalities.insert({                                                                                // 19
            name: nationality                                                                                        // 19
        });                                                                                                          // 19
    });                                                                                                              // 19
}                                                                                                                    // 20
                                                                                                                     //
if (SecretQuestions.find().count() === 0) {                                                                          // 22
    var questions = [{                                                                                               // 23
        text: 'What was the first school you attended?'                                                              // 24
    }, {                                                                                                             // 24
        text: 'What was the colour and mark of your first car?'                                                      // 25
    }, {                                                                                                             // 25
        text: 'What month was your mother born?',                                                                    // 26
        inputType: 'select'                                                                                          // 26
    }, {                                                                                                             // 26
        text: 'What month was your father born?',                                                                    // 27
        inputType: 'select'                                                                                          // 27
    }, {                                                                                                             // 27
        text: 'What was the name of your first pet?'                                                                 // 28
    }];                                                                                                              // 28
    questions.forEach(function (question) {                                                                          // 31
        return SecretQuestions.insert(question);                                                                     // 31
    });                                                                                                              // 31
}                                                                                                                    // 32
                                                                                                                     //
var roles = Roles.getAllRoles().fetch().map(function (role) {                                                        // 34
    return role.name;                                                                                                // 34
});                                                                                                                  // 34
['employee', 'manager', 'hr', 'admin', 'super_admin'].forEach(function (role) {                                      // 36
    if (!~roles.indexOf(role)) {                                                                                     // 37
        Roles.createRole(role);                                                                                      // 38
    }                                                                                                                // 39
});                                                                                                                  // 40
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"index.js":function(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// imports/startup/server/index.js                                                                                   //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
var Meteor = void 0;                                                                                                 // 1
module.watch(require("meteor/meteor"), {                                                                             // 1
    Meteor: function (v) {                                                                                           // 1
        Meteor = v;                                                                                                  // 1
    }                                                                                                                // 1
}, 0);                                                                                                               // 1
var UploadFS = void 0;                                                                                               // 1
module.watch(require("meteor/jalik:ufs"), {                                                                          // 1
    UploadFS: function (v) {                                                                                         // 1
        UploadFS = v;                                                                                                // 1
    }                                                                                                                // 1
}, 1);                                                                                                               // 1
Meteor.startup(function () {                                                                                         // 5
    module.watch(require("./accounts.js"));                                                                          // 1
    module.watch(require("./fixtures.js"));                                                                          // 1
    module.watch(require("./register-api.js"));                                                                      // 1
    var sessionPurgeInterval = 1 * 60 * 1000; // 1 min                                                               // 10
                                                                                                                     //
    var inactivityTimeout = 15 * 60 * 1000; // 15 mins                                                               // 11
                                                                                                                     //
    Meteor.setInterval(function () {                                                                                 // 13
        var now = Date.now();                                                                                        // 14
        var overdueTimestamp = now - inactivityTimeout;                                                              // 15
        Meteor.users.update({                                                                                        // 17
            heartbeat: {                                                                                             // 18
                $lt: overdueTimestamp                                                                                // 18
            }                                                                                                        // 18
        }, {                                                                                                         // 17
            $set: {                                                                                                  // 20
                'services.resume.loginTokens': []                                                                    // 20
            },                                                                                                       // 20
            $unset: {                                                                                                // 21
                heartbeat: 1                                                                                         // 21
            }                                                                                                        // 21
        }, {                                                                                                         // 19
            multi: true                                                                                              // 22
        });                                                                                                          // 22
    }, sessionPurgeInterval);                                                                                        // 23
    UploadFS.config.storesPath = 'uploads';                                                                          // 25
});                                                                                                                  // 26
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"register-api.js":function(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// imports/startup/server/register-api.js                                                                            //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
module.watch(require("../../api/methods.js"));                                                                       // 1
module.watch(require("../../api/server/publications.js"));                                                           // 1
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}}},"server":{"main.js":function(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// server/main.js                                                                                                    //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
module.watch(require("/imports/startup/server"));                                                                    // 1
module.watch(require("/imports/startup/both"));                                                                      // 1
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}},{
  "extensions": [
    ".js",
    ".json",
    ".jsx"
  ]
});
require("./server/main.js");
//# sourceMappingURL=app.js.map
