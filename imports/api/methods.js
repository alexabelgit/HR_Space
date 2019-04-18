import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';
import moment from 'moment';
import { Accounts } from 'meteor/accounts-base';
import { Email } from 'meteor/email';

import 'isomorphic-fetch';

import AbsenceTypes from './collections/absenceTypes';
import Announcements from './collections/announcements';
import Teams from './collections/teams';
import Currencies from './collections/currencies';
import EmploymentTypes from './collections/employmentTypes';
import BenefitTypes from './collections/benefitTypes';
import BenefitsInKindTypes from './collections/benefitsInKindTypes';
import Departments from './collections/departments';
import ContentPages from './collections/contentPages';
import HRPolicies from './collections/hrPolicies';
import Businesses from './collections/businesses';
import WorkingPatterns from './collections/workingPatterns';
import CompanyDetails from './collections/companyDetails';
import HRDocuments from './collections/hrDocuments';
import Images from './collections/images';
import PersonalSettings from './collections/user_info/personalSettings';
import Summary from './collections/user_info/summary';
import EmployeeIds from './collections/user_info/employeeIds';
import PersonalInformation from './collections/user_info/personalInformation';
import Education from './collections/user_info/education';
import Job from './collections/user_info/job';
import Salary from './collections/user_info/compensation/salary';
import BonusDetails from './collections/user_info/compensation/bonusDetails';
import BenefitDetails from './collections/user_info/compensation/benefitDetails';
import BenefitsInKind from './collections/user_info/compensation/benefitsInKind';
import BankInfo from './collections/user_info/bankInfo';
import Contact from './collections/user_info/contact';
import Absence from './collections/absence';
import Tasks from './collections/tasks';
import Holiday from './collections/holiday';
import HolidayDates from './collections/holidayDates';
import SecretQuestions from './collections/secretQuestions';

import { getEmployeeId } from '../startup/server/accounts';
import ManagerPermissions from './collections/managementRoles';

const mailjet = Npm.require('node-mailjet').connect('8b5f5108fb9039d9da33570918f67da9', '7e37636c6b839c4855232d0689941858');

const mongoCallback = (error, result) => {
    if (error) {
        console.log(error);
        if (error.invalidKeys && error.invalidKeys.length) {
            throw new Meteor.Error(400, 'MISSING_FIELD', error.invalidKeys[0].name);
        }

        throw error;
    }
};

const sendEmail = ({ to, subject, text = '', html = '', }) => {
    // try {
    //     return Email.send({ to, from: 'testchatuser11@gmail.com', subject, text });
    // } catch (error) {
    //     console.log(error);

    //     return error;
    // }

    const request = mailjet.post('send', { 'version': 'v3.1' }).request({
        'Messages': [{
            'From': { 'Email': 'testchatuser11@gmail.com', 'Name': 'hr-space' },
            'To': [{ 'Email': to, 'Name': '' }],
            'Subject': subject,
            'TextPart': text,
            'HTMLPart': html,
        }],
    });

    request
    
        .then(response => response)
        
        .catch(error => { throw error; });
};

Meteor.methods({
    'test': () => {
        // return Random.secret();
        // const url = Meteor.absoluteUrl();

        // const emailHTML = `
        //     <p>You've been registered in the hr-space</p>
        //     <p>Follow this link to complete the registration process:</p>
        //     <p><a href="${url}">${url}</a>
        // `;

        // sendEmail({ to: 'petro.tsaruk@gmail.com', subject: 'Welcome to hr-space', html: emailHTML });

        return Meteor.user();
    },
    'heartbeat': function () {
        if (!this.userId) return;

        Meteor.users.update(this.userId, { $set: { heartbeat: Date.now() } });
    },
    'absenceTypes.create': absenceType => {
        const { businessId } = Meteor.user().profile;

        if (AbsenceTypes.find({ type: absenceType.type, businessId: businessId }).count() > 0) {
            throw new Meteor.Error(400, 'DUPLICATE_DOCUMENT', 'Absence type with this name already exists');
        }

        absenceType.businessId = businessId;

        AbsenceTypes.insert(absenceType, mongoCallback);

        return 200;
    },
    'absenceTypes.update': absenceType => {
        var { _id, ...updatedAbsenceType } = absenceType;

        AbsenceTypes.update(_id, { $set: { ...updatedAbsenceType } }, mongoCallback);

        return 200;
    },
    'absenceTypes.remove': absenceType => {
        return AbsenceTypes.remove(absenceType);
    },
    'teams.create': team => {
        const { businessId } = Meteor.user().profile;

        if (Teams.find({ name: team.name, businessId: businessId }).count() > 0) {
            throw new Meteor.Error(400, 'DUPLICATE_DOCUMENT', 'A team with this name already exists');
        }

        team.businessId = businessId;

        Teams.insert(team, mongoCallback);

        return 200;
    },
    'teams.update': team => {
        var { _id, ...updatedTeam } = team;

        Teams.update(_id, { $set: { ...updatedTeam } }, mongoCallback);

        return 200;
    },
    'teams.remove': team => {
        return Teams.remove(team);
    },
    'currencies.create': currency => {
        const { businessId } = Meteor.user().profile;

        if (Currencies.find({ name: currency.name, businessId: businessId }).count() > 0) {
            throw new Meteor.Error(400, 'DUPLICATE_DOCUMENT', 'A currency with this name already exists');
        }

        currency.businessId = businessId;

        Currencies.insert(currency, mongoCallback);

        return 200;
    },
    'currencies.update': currency => {
        var { _id, ...updatedCurrency } = currency;

        Currencies.update(_id, { $set: { ...updatedCurrency } }, mongoCallback);

        return 200;
    },
    'currencies.remove': currency => {
        return Currencies.remove(currency);
    },
    'employmentTypes.create': employmentType => {
        const { businessId } = Meteor.user().profile;

        if (EmploymentTypes.find({ name: employmentType.name, businessId: businessId }).count() > 0) {
            throw new Meteor.Error(400, 'DUPLICATE_DOCUMENT', 'Employment type with this name already exists');
        }

        employmentType.businessId = businessId;

        EmploymentTypes.insert(employmentType, mongoCallback);

        return 200;
    },
    'employmentTypes.update': employmentType => {
        var { _id, ...updatedEmploymentType } = employmentType;

        EmploymentTypes.update(_id, { $set: { ...updatedEmploymentType } }, mongoCallback);

        return 200;
    },
    'employmentTypes.remove': employmentType => {
        return EmploymentTypes.remove(employmentType);
    },
    'benefitTypes.create': benefitType => {
        const { businessId } = Meteor.user().profile;

        if (BenefitTypes.find({ name: benefitType.name, businessId: businessId }).count() > 0) {
            throw new Meteor.Error(400, 'DUPLICATE_DOCUMENT', 'Benefit type with this name already exists');
        }

        benefitType.businessId = businessId;

        BenefitTypes.insert(benefitType, mongoCallback);

        return 200;
    },
    'benefitTypes.update': benefitType => {
        var { _id, ...updatedBenefitType } = benefitType;

        BenefitTypes.update(_id, { $set: { ...updatedBenefitType } }, mongoCallback);

        return 200;
    },
    'benefitTypes.remove': benefitType => {
        return BenefitTypes.remove(benefitType);
    },
    'benefitsInKindTypes.create': benefitInKindType => {
        const { businessId } = Meteor.user().profile;

        if (BenefitsInKindTypes.find({ name: benefitInKindType.name, businessId: businessId }).count() > 0) {
            throw new Meteor.Error(400, 'DUPLICATE_DOCUMENT', 'Benefit in kind with this name already exists');
        }

        benefitInKindType.businessId = businessId;

        BenefitsInKindTypes.insert(benefitInKindType, mongoCallback);

        return 200;
    },
    'benefitsInKindTypes.update': benefitInKindType => {
        var { _id, ...updatedBenefitInKindType } = benefitInKindType;

        BenefitsInKindTypes.update(_id, { $set: { ...updatedBenefitInKindType } }, mongoCallback);

        return 200;
    },
    'benefitsInKindTypes.remove': benefitInKindType => {
        return BenefitsInKindTypes.remove(benefitInKindType);
    },
    'departments.create': department => {
        const { businessId } = Meteor.user().profile;

        if (Departments.find({ name: department.name, businessId: businessId }).count() > 0) {
            throw new Meteor.Error(400, 'DUPLICATE_DOCUMENT', 'A department with this name already exists');
        }

        department.businessId = businessId;

        Departments.insert(department, mongoCallback);

        return 200;
    },
    'departments.update': department => {
        var { _id, ...updatedDepartment } = department;

        Departments.update(_id, { $set: { ...updatedDepartment } }, mongoCallback);

        return 200;
    },
    'departments.remove': department => {
        return Departments.remove(department);
    },
    'announcements.create': announcement => {
        var momentStartDate = moment(announcement.startDate),
            momentEndDate = moment(announcement.endDate);

        if (momentStartDate.isSameOrAfter(momentEndDate)) {
            throw new Meteor.Error(400, 'DATES_MISMATCH', 'Start date has to be lower than End date');
        }

        var business = Meteor.user().profile.businessId;

        Announcements.insert({ business, ...announcement }, mongoCallback);

        return 200;
    },
    'announcements.update': announcement => {
        var { _id, ...updatedAnnouncement } = announcement;

        Announcements.update(announcement._id, { $set: { ...updatedAnnouncement } }, mongoCallback);

        return 200;
    },
    'announcements.remove': announcement => {
        return Announcements.remove(announcement);
    },
    'announcements.markRead': function (_id) {
        const userId = this.userId;

        Announcements.update(_id, { $push: { readBy: userId } }, mongoCallback);

        return 200;
    },
    'announcements.deleteForUser': function ({ _id, ...announcement }) {
        const userId = this.userId;

        if (announcement.mandatory && !~announcement.readBy.indexOf(userId)) {
            throw new Meteor.Error(400, 'MANDATORY_ANNOUNCEMENT', 'This announcement is mandatory to read');
        } else {
            Announcements.update(_id, { $push: { deletedFor: userId } }, mongoCallback);
        }

        return 200;
    },
    'contentPages.create': contentPage => {
        var lastContentPage = ContentPages.findOne({ business: contentPage.business }, { sort: { order: -1 } });
        var order = lastContentPage ? lastContentPage.order : 0;

        contentPage.order = order + 1;
        
        ContentPages.insert(contentPage, mongoCallback);
        
        return 200;
    },
    'contentPages.update': contentPage => {
        var { _id, ...updatedContentPage } = contentPage;

        ContentPages.update(_id, { $set: { ...updatedContentPage } }, mongoCallback);

        return 200;
    },
    'contentPages.remove': contentPage => {
        return ContentPages.remove(contentPage);
    },
    'contentPages.incrementOrder': contentPage => {
        var lastContentPage = ContentPages.findOne({ business: contentPage.business }, { sort: { order: -1 } });

        if (lastContentPage._id !== contentPage._id) {
            ContentPages.update({ business: contentPage.business, order: contentPage.order + 1 }, { $inc: { order: -1 } });
            ContentPages.update({ _id: contentPage._id }, { $inc: { order: 1 } });
        }

        return 200;
    },
    'contentPages.decrementOrder': contentPage => {
        if (contentPage.order > 1) {
            ContentPages.update({ business: contentPage.business, order: contentPage.order - 1 }, { $inc: { order: 1 } });
            ContentPages.update({ _id: contentPage._id }, { $inc: { order: -1 } });
        }

        return 200;
    },
    'hrPolicies.create': policy => {
        var lastHrPolicy = HRPolicies.findOne({ business: policy.business }, { sort: { order: -1 } });
        var order = lastHrPolicy ? lastHrPolicy.order : 0;

        policy.order = order + 1;

        HRPolicies.insert(policy, mongoCallback);

        return 200;
    },
    'hrPolicies.update': policy => {
        var { _id, ...updatedPolicy } = policy;

        HRPolicies.update(_id, { $set: updatedPolicy }, mongoCallback);

        return 200;
    },
    'hrPolicies.remove': policy => {
        return HRPolicies.remove(policy);
    },
    'hrPolicies.incrementOrder': policy => {
        var lastHrPolicy = HRPolicies.findOne({ business: policy.business }, { sort: { order: -1 } });

        if (lastHrPolicy._id !== policy._id) {
            HRPolicies.update({ business: policy.business, order: policy.order + 1 }, { $inc: { order: -1 } });
            HRPolicies.update({ _id: policy._id }, { $inc: { order: 1 } });
        }

        return 200;
    },
    'hrPolicies.decrementOrder': policy => {
        if (policy.order > 1) {
            HRPolicies.update({ business: policy.business, order: policy.order - 1 }, { $inc: { order: 1 } });
            HRPolicies.update({ _id: policy._id }, { $inc: { order: -1 } });
        }

        return 200;
    },
    'businesses.create': business => {
        var momentStartDate = moment(business.startDate),
            momentEndDate = moment(business.endDate);
            
        var emailExists = Meteor.users.findOne({ 'emails.address': business.email });
        
        if (emailExists) {
            throw new Meteor.Error(400, 'EMAIL_ALREADY_EXISTS', 'This email is already taken');
        }
        
        if (momentStartDate.isSameOrAfter(momentEndDate)) {
            throw new Meteor.Error(400, 'DATES_MISMATCH', 'Start date has to be lower than End date');
        }

        Businesses.insert(business, (error, response) =>{
            if (error) {
                console.log(error);
                if (error.invalidKeys && error.invalidKeys.length) {
                    throw new Meteor.Error(400, 'MISSING_FIELD', error.invalidKeys[0].name);
                }
        
                throw error;
            } else {
                ['GBP', 'EUR'].forEach(currency => Currencies.insert({ name: currency, businessId: response }));
                ['Finance', 'IT', 'Admin', 'Marketing', 'Warehouse'].forEach(department => Departments.insert({ name: department, businessId: response }));
                ['Day shift', 'Night shift', 'Weekend'].forEach(team => Teams.insert({ name: team, businessId: response }));
                ['Full time', 'Part time', 'Contract'].forEach(type => EmploymentTypes.insert({ name: type, businessId: response }));
                ['Accommodation', 'Car'].forEach(type => BenefitTypes.insert({ name: type, businessId: response }));
                
                console.log('creating user');

                Accounts.createUser({
                    email: business.email, 
                    password: business.email, 
                    profile: {
                        businessId: response,
                        contactName: business.contactName,
                        role: 'admin'
                    },
                });
            }
        });

        console.log('before return');

        return 200;
    },
    'businesses.update': business => {
        var { _id, ...updatedBusiness } = business;

        Businesses.update(business._id, { $set: { ...updatedBusiness } }, mongoCallback);

        return 200;
    },
    'businesses.remove': business => {
        return Businesses.remove(business);
    },
    'workingPatterns.create': workingPattern => {
        const { businessId } = Meteor.user().profile;

        workingPattern.businessId = businessId;

        WorkingPatterns.insert(workingPattern, mongoCallback);
    },
    'workingPatterns.update': workingPattern => {
        var { _id, ...updatedWorkingPattern } = workingPattern;

        WorkingPatterns.update(_id, { $set: { ...updatedWorkingPattern } }, mongoCallback);

        return 200;
    },
    'workingPatterns.remove': workingPattern => {
        Job.update({ 'workingPattern._id': workingPattern._id }, { $unset: { workingPattern: 1 } }, (error, result) => {
            if (error) {
                throw error;
            }

            return WorkingPatterns.remove(workingPattern);
        });
    },
    'copyPolicy': ({ policies, business }) => {
        var lastPolicy = HRPolicies.findOne({ business: policies[0].business }, { sort: { order: -1 } });
        var order = lastPolicy ? lastPolicy.order : 0;

        policies.forEach(policy => {
            let { _id, ...tmp } = policy;

            tmp.business = business;
            tmp.order = ++order;

            HRPolicies.insert(tmp);
        });

        return 200;
    },
    'publicHolidays.create': holiday => {
        const { businessId } = Meteor.users.findOne({ _id: Meteor.userId() }).profile;

        HolidayDates.insert({ holidayType: 'public', businessId, ...holiday }, mongoCallback);

        return 200;
    },
    'publicHolidays.update': holiday => {
        var { _id, ...updatedHoliday } = holiday;

        HolidayDates.update(_id, { $set: { ...updatedHoliday } }, mongoCallback);

        return 200;
    },
    'publicHolidays.remove': holiday => {
        return HolidayDates.remove(holiday);
    },
    'blockedDates.create': date => {
        const { businessId } = Meteor.users.findOne({ _id: Meteor.userId() }).profile;

        HolidayDates.insert({ holidayType: 'blocked', businessId, ...date }, mongoCallback);

        return 200;
    },
    'blockedDates.update': date => {
        var { _id, ...updatedDate } = date;

        HolidayDates.update(_id, { $set: { ...updatedDate } }, mongoCallback);

        return 200;
    },
    'blockedDates.remove': date => {
        return HolidayDates.remove(date);
    },
    'companyHolidays.create': holiday => {
        const { businessId } = Meteor.users.findOne({ _id: Meteor.userId() }).profile;

        HolidayDates.insert({ holidayType: 'company', businessId, ...holiday }, mongoCallback);

        return 200;
    },
    'companyHolidays.update': holiday => {
        var { _id, ...updatedHoliday } = holiday;

        HolidayDates.update(_id, { $set: { ...updatedHoliday } }, mongoCallback);

        return 200;
    },
    'companyHolidays.remove': holiday => {
        return HolidayDates.remove(holiday);
    },
    'companyDetails.create': details => {
        CompanyDetails.insert(details, mongoCallback);

        return 200;
    },
    'companyDetails.update': details => {
        var { _id, ...updatedDetails } = details;

        CompanyDetails.update(_id, { $set: { ...updatedDetails } }, mongoCallback);

        return 200;
    },
    'companyDetails.remove': details => {
        return CompanyDetails.remove(details);
    },
    'hrDocuments.remove': _id => {
        return HRDocuments.remove({ _id });
    },
    'images.remove': ids => {
        return Images.remove({ _id: { $in: ids } });
    },
    'personalSettings.update': settings => {
        var { _id, ...updatedSettings } = settings;

        PersonalSettings.update(_id, { $set: { ...updatedSettings } }, { upsert: true }, mongoCallback);

        return 200;
    },
    'summary.update': summary => {
        var { _id, ...updatedSummary } = summary;

        console.log(updatedSummary);

        Summary.update(_id, { $set: { ...updatedSummary } }, { upsert: true }, mongoCallback);

        return 200;
    },
    'personalInformation.update': personalInformation => {
        console.log(personalInformation);

        var { _id, ...updatedPersonalInformation } = personalInformation;

        PersonalInformation.update(_id, { $set: { ...updatedPersonalInformation } }, { upsert: true }, mongoCallback);

        return 200;
    },
    'employeeIds.remove': _id => {
        return EmployeeIds.remove({ _id });
    },
    'employeeIds.removeMany': ids => {
        return EmployeeIds.remove({ _id: { $in: ids } });
    },
    'generateEmployeeId.business': () => {
        const businessId = Meteor.user().profile.businessId;
        
        return getEmployeeId(businessId);
    },
    'createEmployee': summary => {
        const { businessId } = Meteor.user().profile;
        const token = Random.secret();

        //this will throw a Meteor.Error if an error occures
        const userId = Accounts.createUser({ 
            email: summary.email,
            // password: summary.email, //hardcode, must send verification email instead
            profile: { 
                role: 'employee', 
                businessId: businessId,
                contactName: summary.firstName + ' ' + summary.surname,
                signupToken: token,
            },
        });

        const url = Meteor.absoluteUrl() + 'signup/' + token;

        console.log('signup link: ' + url);

        const emailHTML = `
            <p>You've been registered in the hr-space</p>
            <p>Follow this link to complete the registration process:</p>
            <p><a href="${url}">${url}</a>
        `;

        sendEmail({ to: summary.email, subject: 'Welcome to hr-space', html: emailHTML });

        Summary.update({ userId: userId }, { $set: { ...summary } }, mongoCallback);

        return userId;
    },
    'education.submit': educations => {
        educations.forEach(e => {
            let { _id, isNew, ...education } = e;

            if (isNew) {
                Education.insert(education, (error, response) => {
                    if (error) {
                        throw error;
                    }
                });
            } else {
                Education.update(_id, { $set: { ...education } }, (error, response) => {
                    if (error) {
                        throw error;
                    }
                });
            }
        });

        return 200;
    },
    'job.update': job => {
        var { _id, ...updatedJob } = job;

        if (updatedJob.workPermit && (+updatedJob.dateOfExpiry === 0)) {
            throw new Meteor.Error(400, 'Expiry date for visa or work permission is required');
        }

        if (updatedJob.startDate >= updatedJob.probationEndDate) {
            throw new Meteor.Error(400, 'End of probation date cannot be on the same day or before the start date')
        }

        Job.update(_id, { $set: { ...updatedJob } }, { upsert: true }, (error, response) => {
            if (error) {
                throw error;
            }

            Meteor.users.update(updatedJob.userId, { $set: { roles: [updatedJob.access] } }, (err, res) => {
                if (err) {
                    throw err;
                }
            });
        });

        return 200;
    },
    'salary.create': salary => {
        Salary.insert(salary, mongoCallback);

        return 200;
    },
    'salary.update': salary => {
        var { _id, ...updatedSalary } = salary;

        Salary.update(_id, { $set: { ...updatedSalary } }, mongoCallback);

        return 200;
    },
    'salary.remove': salary => {
        return Salary.remove(salary);
    },
    'bonusDetails.create': bonusDetails => {
        BonusDetails.insert(bonusDetails, mongoCallback);

        return 200;
    },
    'bonusDetails.update': bonusDetails => {
        var { _id, ...updatedBonusDetails } = bonusDetails;

        BonusDetails.update(_id, { $set: { ...updatedBonusDetails } }, mongoCallback);

        return 200;
    },
    'bonusDetails.remove': bonusDetails => {
        return BonusDetails.remove(bonusDetails);
    },
    'benefitDetails.create': benefitDetail => {
        var momentStartDate = moment(benefitDetail.startDate),
            momentEndDate = moment(benefitDetail.endDate);

        if (momentStartDate.isSameOrAfter(momentEndDate)) {
            throw new Meteor.Error(400, 'DATES_MISMATCH', 'Start date has to be lower than End date');
        }

        BenefitDetails.insert(benefitDetail, mongoCallback);

        return 200;
    },
    'benefitDetails.update': benefitDetail => {
        var { _id, ...updatedBenefitDetails } = benefitDetail;

        BenefitDetails.update(_id, { $set: { ...updatedBenefitDetails } }, mongoCallback);

        return 200;
    },
    'benefitDetails.remove': benefitDetail => {
        return BenefitDetails.remove(benefitDetail);
    },
    'benefitsInKind.create': benefitInKind => {
        var momentStartDate = moment(benefitInKind.startDate),
            momentEndDate = moment(benefitInKind.endDate);

        if (momentStartDate.isSameOrAfter(momentEndDate)) {
            throw new Meteor.Error(400, 'DATES_MISMATCH', 'Start date has to be lower than End date');
        }

        BenefitsInKind.insert(benefitInKind, mongoCallback);

        return 200;
    },
    'benefitsInKind.update': benefitInKind => {
        var { _id, ...updatedBenefitInKind } = benefitInKind;

        BenefitsInKind.update(_id, { $set: { ...updatedBenefitInKind } }, mongoCallback);

        return 200;
    },
    'benefitsInKind.remove': benefitInKind => {
        return BenefitsInKind.remove(benefitInKind);
    },
    'bankInfo.update': bankInfo => {
        var { _id, ...updatedBankInfo } = bankInfo;

        BankInfo.update(_id, { $set: { ...updatedBankInfo } }, { upsert: true }, mongoCallback);

        return 200;
    },
    'contact.submit': contacts => {
        contacts.forEach(c => {
            let { _id, isNew, ...contact } = c;

            if (isNew) {
                Contact.insert(contact, (error, response) => {
                    if (error) {
                        throw error;
                    }
                });
            } else {
                Contact.update(_id, { $set: { ...contact } }, (error, response) => {
                    if (error) {
                        throw error;
                    }
                });
            }
        });

        return 200;
    },
    'managers.get': userId => {
        const { businessId } = Meteor.user().profile;

        var usersInBusiness = Meteor.users.find({
            _id: { $ne: userId },
            'profile.businessId': businessId
        }).map(user => user._id);

        var managersInBusiness = Job.find({
            userId: { $in: usersInBusiness },
            isManager: true
        }).map(job => job.userId);

        var managers = Summary
            .find({ userId: { $in: managersInBusiness } }, { fields: { 'userId': 1, 'firstName': 1, 'surname': 1 } })
            .map(summary => ({ _id: summary.userId, name: summary.firstName + ' ' + summary.surname }));

        return managers;
    },
    'absence.create': function (absence) {
        const absences = Absence.find({
            'employee._id': absence.employee._id,
            $or: [
                { 
                    startDate: { 
                        $gte: moment(absence.startDate).hours(0).minutes(0).seconds(0).milliseconds(0).toDate(), 
                        $lte: moment(absence.endDate || absence.startDate).hours(23).minutes(59).seconds(59).milliseconds(999).toDate() 
                    } 
                },
                { 
                    endDate: { 
                        $gte: moment(absence.startDate).hours(0).minutes(0).seconds(0).milliseconds(0).toDate(), 
                        $lte: moment(absence.endDate || absence.startDate).hours(23).minutes(59).seconds(59).milliseconds(999).toDate() 
                    } 
                },
            ]
        }).fetch();

        if (absences.length) {
            throw new Meteor.Error(403, 'This employee already has an absence in this period');
        }

        Absence.insert(absence, (error, result) => {
            if (error) {
                if (error.invalidKeys && error.invalidKeys.length) {
                    throw new Meteor.Error(400, 'MISSING_FIELD', error.invalidKeys[0].name);
                }

                throw error;
            } else {
                var requiresSelfCertification = AbsenceTypes.findOne({ _id: absence.absenceType._id }).selfCertification;

                if (requiresSelfCertification) {
                    const selfCertificationTask = {
                        absence: result,
                        taskType: 'self_certification',
                        text: 'Complete self certification form',
                        users: [absence.employee._id]
                    };

                    Tasks.insert(selfCertificationTask);

                    var employeeEmail = Meteor.users.findOne({ _id: absence.employee._id }).emails[0].address;

                    sendEmail({
                        to: employeeEmail,
                        subject: 'New task',
                        text: 'HR has recorded your absence. Please complete the self cerification form. A reminder task was created on the dashboard'
                    });
                }

                if (!absence.endDate) {
                    const hrReminderTask = {
                        absence: result,
                        text: `Reminder to complete return to work date when ${absence.employee.fullName} returns to work`,
                        users: [this.userId]
                    };

                    Tasks.insert(hrReminderTask);

                    var hrEmail = Meteor.users.findOne({ _id: this.userId }).emails[0].address;

                    sendEmail({
                        to: hrEmail,
                        subject: 'New task',
                        text: `You have recorded an absence for ${absence.employee.fullName}. A reminder task was created on the dashboard`
                    });
                }
            }
        });

        return 200;
    },
    'absence.update': function (absence) {
        const { _id, ...updatedAbsence } = absence;

        var initialAbsence = Absence.findOne({ _id });

        Absence.update({ _id }, { $set: updatedAbsence }, (error, result) => {
            if (error) {
                if (error.invalidKeys && error.invalidKeys.length) {
                    throw new Meteor.Error(400, 'MISSING_FIELD', error.invalidKeys[0].name);
                }

                throw error;
            } else {
                if (!initialAbsence.endDate && updatedAbsence.endDate) {
                    Tasks.update({ absence: _id, users: this.userId }, { $set: { isComplete: true } }, (err, res) => {
                        if (err) throw err;
                    });
                }
            }
        });

        return 200;
    },
    'completeTask': taskId => {
        Tasks.update({ _id: taskId }, { $set: { isComplete: true } }, (error, result) => {
            if (error) {
                throw error;
            }
        });

        return 200;
    },
    'getTeamAbsence': managerId => {
        const usersInTeam = Summary.find({ manager: managerId }).map(summary => summary.userId);
        const sicknessAbsenceTypes = AbsenceTypes.find({ sicknessIdentifier: true }).map(absenceType => absenceType._id);
        const yearStart = moment().milliseconds(0).seconds(0).minutes(0).hours(0).date(1).month(0).toDate();
        const yearEnd = moment().milliseconds(0).seconds(0).minutes(0).hours(0).date(1).month(0).year(new Date().getFullYear() + 1).toDate();

        return Absence.find({
            'employee._id': { $in: usersInTeam },
            'absenceType._id': { $in: sicknessAbsenceTypes },
            $or: [
                { startDate: { $gte: yearStart, $lt: yearEnd } },
                { endDate: { $gte: yearStart, $lt: yearEnd } },
            ],
        }).map(absence => {
            let totalDays = absence.endDate ?
                moment(absence.endDate).diff(moment(absence.startDate), 'days') :
                moment(new Date()).diff(moment(absence.startDate), 'days');

            return {
                _id: absence._id,
                employee: absence.employee,
                startDate: absence.startDate,
                endDate: absence.endDate,
                absenceType: absence.absenceType.name,
                totalDays
            };
        });
    },
    'getBradfordFactor.userId': userId => {
        var totalDays = 0;
        const yearStart = moment().milliseconds(0).seconds(0).minutes(0).hours(0).date(1).month(0).toDate();
        const yearEnd = moment().milliseconds(0).seconds(0).minutes(0).hours(0).date(1).month(0).year(new Date().getFullYear() + 1).toDate();

        var absences = Absence.find({
            'employee._id': userId || Meteor.userId(),
            $or: [
                { startDate: { $gte: yearStart, $lt: yearEnd } },
                { endDate: { $gte: yearStart, $lt: yearEnd } },
            ],
            endDate: { $nin: [null, new Date(0)] },
        }).fetch();

        absences = absences.filter(absence => AbsenceTypes.findOne({ _id: absence.absenceType._id }).sicknessIdentifier);

        var absencesCount = absences.length;

        absences.forEach(absence => totalDays += moment(absence.endDate).diff(moment(absence.startDate), 'days'));

        return absencesCount * absencesCount * totalDays;
    },
    'getAbsences.filters': filters => {
        const { businessId } = Meteor.user().profile;
        const usersInBusiness = Meteor.users.find({ 'profile.businessId': businessId }).map(user => user._id);
        const holidayDates = HolidayDates.find({ isActive: true, businessId }).fetch();

        var query = {
            $and: [
                { 'employee._id': { $in: usersInBusiness } },
            ],
        };

        if (filters.team) {
            let teamUserIds = Job.find({ 'team._id': filters.team._id }).map(job => job.userId);

            query.$and.push({ 'employee._id': { $in: teamUserIds } });
        }

        if (filters.employee) {
            query.$and.push({ 'employee._id': filters.employee._id });
        }
        if (filters.absenceType) {
            var typeIds = [];

            if (filters.absenceType === 'Sickness') {
                typeIds = AbsenceTypes.find({ sicknessIdentifier: true }).map(type => type._id);

                query.$and.push({ 'absenceType._id': { $in: typeIds } });

                return {
                    // absences: Absence.find(query).fetch(),
                    absences: Absence.find(query).map(absence => {
                        const tmp = AbsenceTypes.findOne({ _id: absence.absenceType._id });
                        
                        return {
                            ...absence,
                            absenceType: {
                                sicknessIdentifier: tmp.sicknessIdentifier,
                                ...absence.absenceType,
                            },
                        };
                    }),
                };
            } else {
                return {
                    absences: Holiday.find({ status: 'approved', ...query }).fetch(),
                };
            }
        } else {
            return {
                absences: Absence.find(query).map(absence => {
                    const tmp = AbsenceTypes.findOne({ _id: absence.absenceType._id });
                    
                    return {
                        ...absence,
                        absenceType: {
                            sicknessIdentifier: tmp.sicknessIdentifier,
                            ...absence.absenceType,
                        },
                    };
                }).concat(Holiday.find({ status: 'approved', ...query }).fetch()),
                holidayDates: holidayDates,
            };
        }
    },
    'holiday.create': holiday => {
        const { businessId } = Meteor.users.findOne({ _id: holiday.employee }).profile;
        const employeeSummary = Summary.findOne({ userId: holiday.employee });
        const userJob = Job.findOne({ userId: holiday.employee }, { fields: { annualLeaveEntitlement: 1, workingPattern: 1 } });
        const workingPattern = WorkingPatterns.findOne({ _id: userJob.workingPattern._id, isActive: true });
        const holidayDates = HolidayDates.find({
            businessId,
            isActive: true,
            holidayType: { $ne: 'blocked' },
            date: { $gte: holiday.startDate, $lte: holiday.endDate },
        }).map(holidayDate => holidayDate.date);

        var duration = 0;

        const isDateWorkingDay = date => {
            try {
                holidayDates.forEach(holidayDate => {
                    if (moment(date).isSame(holidayDate, 'day')) {
                        throw false;
                    }
                });
            } catch (e) {
                return e;
            }

            let dayIndex = date.getDay();

            if (workingPattern && (workingPattern.weekHours[dayIndex] < 1)) {
                return false;
            }

            return true;
        };

        for (let date = new Date(+holiday.startDate); date <= +holiday.endDate; date.setDate(date.getDate() + 1)) {
            if (isDateWorkingDay(new Date(date))) {
                duration++;
            }
        }

        holiday.duration = duration;

        holiday.employee = {
            _id: employeeSummary.userId,
            fullName: employeeSummary.firstName + ' ' + employeeSummary.surname,
        };

        Holiday.insert(holiday, (error, result) => {
            if (error) {
                if (error.invalidKeys && error.invalidKeys.length) {
                    throw new Meteor.Error(400, 'MISSING_FIELD', error.invalidKeys[0].name);
                }

                throw error;
            } else {
                const managerTask = {
                    holiday: result,
                    text: `Holiday Request by ${holiday.employee.fullName} for the days from ${moment(holiday.startDate).format('DD/MM/YYYY')} to ${moment(holiday.endDate).format('DD/MM/YYYY')}`,
                    taskType: 'holiday_approval',
                    users: [employeeSummary.manager],
                };

                Tasks.insert(managerTask);

                var managerEmail = Meteor.users.findOne({ _id: employeeSummary.manager }).emails[0].address;

                sendEmail({
                    to: managerEmail,
                    subject: 'New task',
                    text: `${holiday.employee.fullName} has requested a holiday. You can approve or decline it via a task on the dashboard`,
                });
            }
        });

        return 200;
    },
    'holiday.approve': holidayId => {
        const manager = Summary.findOne({ userId: Meteor.userId() });

        Holiday.update({ _id: holidayId }, {
            $set: {
                status: 'approved',
                approvedBy: { _id: manager._id, fullName: manager.firstName + ' ' + manager.surname }
            }
        }, (error, result) => {
            if (error) throw error;

            Tasks.update({ holiday: holidayId }, { $set: { isComplete: true } }, (err, res) => {
                if (err) throw err;
            });
        });

        return 200;
    },
    'holiday.cancel': ({ holidayId, cancelReason }) => {
        Holiday.update({ _id: holidayId }, { $set: { status: 'cancelled', cancelledDate: new Date(), cancelReason } }, (error, result) => {
            if (error) throw error;

            Tasks.update({ holiday: holidayId }, { $set: { isComplete: true } }, (err, res) => {
                if (err) throw err;
            });
        });

        return 200;
    },
    'getHolidayAllowance.user': userId => {
        const { businessId } = Meteor.users.findOne({ _id: userId }).profile;
        const userJob = Job.findOne({ userId }, { fields: { annualLeaveEntitlement: 1, workingPattern: 1 } });
        const yearStart = moment().milliseconds(0).seconds(0).minutes(0).hours(0).date(1).month(0).toDate();
        const yearEnd = moment().milliseconds(0).seconds(0).minutes(0).hours(0).date(1).month(0).year(new Date().getFullYear() + 1).toDate();

        const totalHolidayRequested = Holiday.find({
            'employee._id': userId,
            status: 'approved',
            $or: [
                { startDate: { $gte: yearStart, $lt: yearEnd } },
                { endDate: { $gte: yearStart, $lt: yearEnd } },
            ],
        }).map(holiday => holiday.duration).reduce((a, b) => a + b, 0);

        const holidayDates = HolidayDates.find({
            businessId,
            isActive: true,
            date: { $gte: yearStart, $lt: yearEnd },
        }).map(holidayDate => ({ date: holidayDate.date, type: holidayDate.holidayType, endDate: holidayDate.endDate }));

        return {
            annualLeaveEntitlement: userJob.annualLeaveEntitlement,
            workingPattern: WorkingPatterns.findOne({ _id: userJob.workingPattern && userJob.workingPattern._id, isActive: true }, { fields: { weekHours: 1 } }),
            holidayDates,
            totalHolidayRequested,
        };
    },
    'getHolidayAllowanceDashboard.user': userId => {
        const userJob = Job.findOne({ userId }, { fields: { annualLeaveEntitlement: 1, workingPattern: 1 } });
        const holidayEntitlement = userJob.annualLeaveEntitlement;
        const yearStart = moment().milliseconds(0).seconds(0).minutes(0).hours(0).date(1).month(0).toDate();
        const yearEnd = moment().milliseconds(0).seconds(0).minutes(0).hours(0).date(1).month(0).year(new Date().getFullYear() + 1).toDate();

        const daysTaken = Holiday.find({
            'employee._id': userId,
            status: 'approved',
            $or: [
                { startDate: { $gte: yearStart, $lt: yearEnd } },
                { endDate: { $gte: yearStart, $lt: yearEnd } },
            ],
        }).map(holiday => holiday.duration).reduce((a, b) => a + b, 0);

        return {
            holidayEntitlement,
            daysTaken,
        };
    },
    'getEmployeeName.userId': userId => {
        const { firstName = '', surname = '' } = Summary.findOne({ userId }, { fields: { firstName: 1, surname: 1 } });
        const { department = '' } = Job.findOne({ userId }, { fields: { department: 1 } });

        return { firstName, surname, department };
    },
    'getEmployeeInfo': function () {
        const userId = this.userId;

        const userInfo = {
            position: '',
            fullName: '',
            profilePic: '/img/no-avatar.png',
        };

        const user = Meteor.user();

        if (user) {
            if (~user.roles.indexOf('super_admin')) {
                userInfo.position = 'Super admin';
                userInfo.fullName = user.emails[0].address;
            } else {
                const summary = Summary.findOne({ userId }, { fields: { firstName: 1, surname: 1, photo: 1 } });

                userInfo.position = Job.findOne({ userId }, { fields: { title: 1 } }).title || '';
                userInfo.fullName = summary.firstName + ' ' + summary.surname;
                userInfo.profilePic = summary.photo || '/img/no-avatar.png';
            }

            return userInfo;
        }
    },
    'searchEmployees.query': (query = {}) => {
        const { businessId } = Meteor.user().profile;
        const queryArr = query.split(' ');

        // convert to array of regular expressions
        expressions = queryArr
            .map(item => new RegExp(`\\s${item}.*`, 'i')) // if firstname or surname consists of multiple words
            .concat(queryArr.map(item => new RegExp(`.*${item}.*`, 'i')));

        // add each expression to the query
        mongoQuery = {
            businessId,
            $or: expressions
                .map(exp => ({ firstName: exp }))
                .concat(expressions.map(exp => ({ surname: exp }))),
        };

        return Summary.find(mongoQuery).map(summary => {
            const job = Job.findOne({ userId: summary.userId });

            return {
                _id: summary.userId,
                fullName: summary.firstName + ' ' + summary.surname,
                bio: summary.bio,
                photo: summary.photo,
                telephone: summary.telephone,
                email: summary.email,
                location: summary.location,
                jobTitle: job ? job.title : 'No job title provided',
            };
        });
    },
    'subordinates.get': userId => {
        return Summary.find({ manager: userId }).map(summary => {
            const job = Job.findOne({ userId: summary.userId });

            return {
                _id: summary.userId,
                fullName: summary.firstName + ' ' + summary.surname,
                bio: summary.bio,
                photo: summary.photo,
                telephone: summary.telephone,
                email: summary.email,
                location: summary.location,
                jobTitle: job ? job.title : 'No job title provided',
            };
        });
    },
    'getQuestions': () => {
        return SecretQuestions.find({}, { fields: { active: 0 } }).fetch();
    },
    'getRandomQuestions.token': ({ token }) => {
        if (!token) {
            throw new Meteor.Error(400, 'No token provided');
        }

        var userSecretQuestions = Meteor.users.findOne({ 'profile.resetPasswordToken': token }).profile.secretQuestions.map(question => question.questionId);
        var questions = SecretQuestions.find({ _id: { $in: userSecretQuestions } }, { fields: { active: 0 } }).fetch();
        var response = [];

        for (let i = 0; i < 3; i++) {
            let randomIndex = Math.floor(Math.random() * questions.length);

            response.push(questions[randomIndex]);

            questions.splice(randomIndex, 1);
        }

        return response;
    },
    'completeSignup': ({ token, password, secretQuestions }) => {
        if (!token) {
            throw new Meteor.Error(400, 'No token provided');
        }

        const user = Meteor.users.findOne({ 'profile.signupToken': token });

        Meteor.users.update({ _id: user._id }, { $set: { 'profile.secretQuestions': secretQuestions }, $unset: { 'profile.signupToken': '' } });

        Accounts.setPassword(user._id, password);

        return { email: user.emails[0].address };
    },
    'sendResetPasswordLink': email => {
        const user = Meteor.users.findOne({ 'emails.address': email });

        if (!user) throw new Meteor.Error(400, 'User not found', 'USER_NOT_FOUND');

        const token = Random.secret();
        const url = Meteor.absoluteUrl() + 'reset_password/' + token;

        Meteor.users.update({ _id: user._id }, { $set: { 'profile.resetPasswordToken': token } });

        const emailHtml = `
            <p>To reset your password follow this link:</p>
            <p><a href=${url}>${url}</a></p>
        `;

        console.log('reset password link: ' + url);

        sendEmail({ to: email, subject: 'Reset password email', html: emailHtml });

        return 200;
    },
    'resetEmployeePassword': ({ token, newPassword, questions }) => {
        const user = Meteor.users.findOne({ 'profile.resetPasswordToken': token });

        // at least 8 characters, at least 1 uppercase letter, 1 lowercase letter, and 1 number, can contain special characters
        const regex = new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/);

        if (!regex.test(newPassword)) {
            throw new Meteor.Error(400, 'Password must be at least 8 characters, contain at least 1 uppercase letter, 1 lowercase letter and 1 number');
        }

        const { secretQuestions = [] } = user.profile;

        for (let question of questions) {
            for (let userQuestion of secretQuestions) {
                if ((userQuestion.questionId === question.questionId) && (userQuestion.answer.toLowerCase().trim() !== question.answer.toLowerCase().trim())) {
                    throw new Meteor.Error(400, 'INVALID_ANSWER', question.questionId);
                }
            }
        }

        Accounts.setPassword(user._id, newPassword);

        Meteor.users.update({ _id: user._id }, { $unset: { 'profile.resetPasswordToken': '' } });

        return 200;
    },
    'getHolidayNotes': holidayId => {
        const { notes } = Holiday.findOne({ _id: holidayId });

        return notes;
    },
    'managerPermissions.create': function (managerPermissions) {
        const { businessId } = Meteor.users.findOne({ userId: this.userId }).profile;

        ManagerPermissions.insert({ businessId, ...managerPermissions });

        return 200;
    },
    'managerPermissions.update': function (managerPermissions) {
        const { businessId } = Meteor.user().profile;

        ManagerPermissions.update({ businessId }, { $set: { ...managerPermissions } });

        return 200;
    },
});