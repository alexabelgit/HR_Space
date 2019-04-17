import { Accounts } from 'meteor/accounts-base';
import PersonalSettings from '../../api/collections/user_info/personalSettings';
import Summary from '../../api/collections/user_info/summary';
import PersonalInformation from '../../api/collections/user_info/personalInformation';
import Job from '../../api/collections/user_info/job';
import BankInfo from '../../api/collections/user_info/bankInfo';
import Contact from '../../api/collections/user_info/contact';

Accounts.onCreateUser((options, user) => {
    const {  ...profile } = options.profile;
var role = 'employee', contactName = "";
    user.profile = profile;
    user.roles = [  'super_admin'];

    if (role !== 'super_admin') {
        user.profile.personalSettings = PersonalSettings.insert({ userId: user._id });

        user.profile.summary = Summary.insert({ 
            userId: user._id, 
            employeeId: getEmployeeId(profile.businessId),
            email: options.email,
            firstName: contactName && contactName.split(' ')[0],
            surname: contactName && contactName.split(' ')[1],
            businessId: profile.businessId,
        });
        // }, (err, res) => console.log('summary.insert err res:', err, res));

        user.profile.personalInformation = PersonalInformation.insert({ userId: user._id, businessId: profile.businessId });

        user.profile.job = Job.insert({ userId: user._id, access: role, businessId: profile.businessId });

        user.profile.bankInfo = BankInfo.insert({ userId: user._id, businessId: profile.businessId });

        user.profile.contact = Contact.insert({ userId: user._id, businessId: profile.businessId });
    }

    return user;
});

export function getEmployeeId(businessId) {
    var employeesCount = Meteor.users.find({ 'profile.businessId': businessId }).count();

    if (!employeesCount) return '000001';

    // var lastEmployeeId = employeesCount.employeeId;
    // var increment = (+lastEmployeeId) + 1;
    var increment = employeesCount + 1;
    var employeeId = ('000000' + increment).slice(-6);

    return employeeId;
};