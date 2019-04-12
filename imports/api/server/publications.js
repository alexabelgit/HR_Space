import { Meteor } from 'meteor/meteor';
import moment from 'moment';

import Nationalities from '../collections/nationalities';
import Countries from '../collections/countries';
import AbsenceTypes from '../collections/absenceTypes';
import Teams from '../collections/teams';
import Currencies from '../collections/currencies';
import EmploymentTypes from '../collections/employmentTypes';
import BenefitTypes from '../collections/benefitTypes';
import BenefitsInKindTypes from '../collections/benefitsInKindTypes';
import Departments from '../collections/departments';
import Announcements from '../collections/announcements';
import Images from '../collections/images';
import ContentPages from '../collections/contentPages';
import HRPolicies from '../collections/hrPolicies';
import Businesses from '../collections/businesses';
import WorkingPatterns from '../collections/workingPatterns';
import CompanyDetails from '../collections/companyDetails';
import HRDocuments from '../collections/hrDocuments';
import PersonalSettings from '../collections/user_info/personalSettings';
import Summary from '../collections/user_info/summary';
import PersonalInformation from '../collections/user_info/personalInformation';
import EmployeeIds from '../collections/user_info/employeeIds';
import Education from '../collections/user_info/education';
import Job from '../collections/user_info/job';
import Salary from '../collections/user_info/compensation/salary';
import BonusDetails from '../collections/user_info/compensation/bonusDetails';
import BenefitDetails from '../collections/user_info/compensation/benefitDetails';
import BenefitsInKind from '../collections/user_info/compensation/benefitsInKind';
import BankInfo from '../collections/user_info/bankInfo';
import Contact from '../collections/user_info/contact';
import Absence from '../collections/absence';
import Tasks from '../collections/tasks';
import Holiday from '../collections/holiday';
import HolidayDates from '../collections/holidayDates';
import ManagerPermissions from '../collections/managementRoles';

Meteor.publish('countries.all', () => {
    return Countries.find();
});

Meteor.publish('nationalities.all', () => {
    return Nationalities.find();
});

Meteor.publish('absenceTypes.all', () => {
    const { businessId } = Meteor.user().profile

    return AbsenceTypes.find({ businessId });
});

Meteor.publish('teams.all', () => {
    const { businessId } = Meteor.user().profile

    return Teams.find({ businessId });
});

Meteor.publish('currencies.all', () => {
    const { businessId } = Meteor.user().profile

    return Currencies.find({ businessId });
});

Meteor.publish('employmentTypes.all', () => {
    const { businessId } = Meteor.user().profile

    return EmploymentTypes.find({ businessId });
});

Meteor.publish('benefitTypes.all', () => {
    const { businessId } = Meteor.user().profile

    return BenefitTypes.find({ businessId });
});

Meteor.publish('benefitsInKindTypes.all', () => {
    const { businessId } = Meteor.user().profile

    return BenefitsInKindTypes.find({ businessId });
})

Meteor.publish('departments.all', () => {
    const { businessId } = Meteor.user().profile

    return Departments.find({ businessId });
});

Meteor.publish('announcements.all', () => {
    const { businessId } = Meteor.user().profile

    return Announcements.find({ business: businessId }, { sort: { startDate: -1 } });
});

Meteor.publish('announcements.filterDeleted',  userId => {
    const { businessId } = Meteor.user().profile;
    return Announcements.find({ 
        deletedFor: { $ne: userId }, 
        business: businessId 
    }, { 
        sort: { startDate: -1 } 
    });
});

Meteor.publish('announcements.businessId', businessId => {
    return Announcements.find({ _id: { $in: ['all', businessId] } }, { sort: { startDate: -1 } });
});

Meteor.publish('images.all', () => {
    return Images.find();
});

Meteor.publish('contentPages.all', () => {
    return ContentPages.find();
});

Meteor.publish('contentPages.business', () => {
    const { businessId } = Meteor.user().profile;
    const visibleFor = Meteor.user().roles[0];

    return ContentPages.find({ business: businessId, visibleFor: { $in: ['all', visibleFor] }, isActive: true }, { sort: { order: 1 } });
});

Meteor.publish('contentPages.single', ({ business, visibleFor }) => {
    return ContentPages.find({ business, visibleFor: { $in: ['all', visibleFor] }, isActive: true });
});

Meteor.publish('hrPolicies.all', () => {
    return HRPolicies.find();
});

Meteor.publish('hrPolicies.business', () => {
    const { businessId } = Meteor.user().profile;

    return HRPolicies.find({ business: businessId , isActive: true }, { sort: { order: 1 } });
});

Meteor.publish('hrPolicies.single', ({ business, access }) => {
    return HRPolicies.find({ business, access: { $in: ['all', access] }, isActive: true });
});

Meteor.publish('businesses.all', () => {
    return Businesses.find();
});

Meteor.publish('businesses.dropdown', () => {
    return Businesses.find({}, { fields: { 'name': 1 } });
});

Meteor.publish('workingPatterns.all', () => {
    const { businessId } = Meteor.user().profile;

    return WorkingPatterns.find({ businessId });
});

Meteor.publish('holidayDates.all', holidayType => {
    const { businessId } = Meteor.user().profile;

    return HolidayDates.find({ businessId, holidayType });
});

Meteor.publish('companyDetails.businessId', businessId => {
    return CompanyDetails.find({ business: businessId });
});

Meteor.publish('hrDocuments.user', userId => {
    return HRDocuments.find({ userId }, { fields: { 'name': 1, 'documentType': 1, 'url': 1, 'userId': 1 } });
});

Meteor.publish('personalSettings.user', userId => {
    return PersonalSettings.find({ userId });
});

//TODO
Meteor.publish('summary.all', function (newUserId) {
    const { businessId } = Meteor.user().profile;

    var usersInBusiness = Meteor.users.find({ 
        // _id: { $ne: this.userId }, 
        'profile.businessId': businessId 
    }).map(user => user._id);

    return Summary.find({ userId: { $in: usersInBusiness.concat([newUserId]) } });
});

Meteor.publish('summary.managers', userId => {
    // const businessId = Meteor.users.findOne({ _id: this.userId }).profile.businessId;
    const { businessId } = Meteor.user().profile;

    var usersInBusiness = Meteor.users.find({
        _id: { $ne: userId },
        'profile.businessId': businessId
    }).map(user => user._id);

    var managersInBusiness = Job.find({ 
        userId: { $in: usersInBusiness }, 
        isManager: true 
    }).map(job => job.userId);

    console.log(Summary.find({ userId: { $in: managersInBusiness } }, { fields: { 'firstName': 1 } }).count());

    return Summary.find({ userId: { $in: managersInBusiness } }, { fields: { 'firstName': 1 } });
});

Meteor.publish('summary.user', userId => {
    return Summary.find({ userId });
});

Meteor.publish('personalInformation.user', userId => {
    return [
        PersonalInformation.find({ userId }),
        EmployeeIds.find({ userId })
    ];
});

Meteor.publish('education.user', userId => {
    return Education.find({ userId });
});

Meteor.publish('jobFormDropdowns.businessId', userId => {
    const { businessId } = Meteor.user().profile;
    var usersInBusiness = Meteor.users.find({ 'profile.businessId': businessId, _id: { $ne: userId } }).map(user => user._id);
    var managerIds = Job.find({ isManager: true, userId: { $in: usersInBusiness } }, { fields: { 'userId': 1 } }).map(jobDoc => jobDoc.userId);

    return [
        EmploymentTypes.find({ businessId }),
        Departments.find({ businessId }),
        Teams.find({ businessId }),
        WorkingPatterns.find({ businessId }),
        Summary.find({ userId: { $in: managerIds, $ne: userId } }, { fields: { 'firstName': 1, 'surname': 1 } })
    ];
});

Meteor.publish('job.user', userId => {
    return Job.find({ userId });
});

Meteor.publish('job.business.all', businessId => {
    return Job.find({}, { fields: { 'userId': 1, 'title': 1 } });
})

Meteor.publish('compensationFormDropdowns.businessId', businessId => {
    return [
        Currencies.find(),
        BenefitTypes.find(),
        BenefitsInKindTypes.find()
    ];
});

Meteor.publish('compensation.user', userId => {
    return [
        Salary.find({ userId }),
        BonusDetails.find({ userId }),
        BenefitDetails.find({ userId }),
        BenefitsInKind.find({ userId })
    ];
});

Meteor.publish('bankInfo.user', userId => {
    return BankInfo.find({ userId });
});

Meteor.publish('contact.user', userId => {
    return Contact.find({ userId });
});

Meteor.publish('summaries.business.all', businessId => {
    return Summary.find();
    // return Summary.find({ businessId });
});

Meteor.publish('absence.all', () => {
    const { businessId } = Meteor.user().profile;
    const usersInBusiness = Meteor.users.find({ 'profile.businessId': businessId }).map(user => user._id);

    return Absence.find({ 'employee._id': { $in: usersInBusiness } });
});

Meteor.publish('tasks.user', function () {
    return Tasks.find({ users: this.userId, isComplete: false });
});

Meteor.publish('holidays.user', userId => {
    var yearStart = moment().milliseconds(0).seconds(0).minutes(0).hours(0).date(1).month(0).toDate();
    var yearEnd = moment().milliseconds(0).seconds(0).minutes(0).hours(0).date(1).month(0).year(new Date().getFullYear() + 1).toDate();


    return Holiday.find({ 
        'employee._id': userId,
        $or: [
            { startDate: { $gte: yearStart, $lt: yearEnd } },
            { endDate: { $gte: yearStart, $lt: yearEnd } },
        ]
    });
});

Meteor.publish('managersTeam', function () {
    const isManager = Roles.userIsInRole(this.userId, 'manager');
    const managerId = isManager ? this.userId : Summary.findOne({ _id: this.userId }).manager;

    return Summary.find({ $or: [{ manager: managerId }, { userId: this.userId }] });
});

Meteor.publish('managerPermissions', function () {
    const { businessId } = Meteor.user().profile;

    return ManagerPermissions.find({ businessId });
});