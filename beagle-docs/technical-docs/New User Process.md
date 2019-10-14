# New User Process
If a new user requires access to Beagle, the process of creating their account is initiated by the user themself. There is no function in Beagle allowing a new user account to be created.

When a user browses to the URL of a Beagle instance for the first time a record is created for that user in the *User* table of the Beagle database, taking certain key information about the user from their Windows account. For this reason, in order to create a new Beagle account a user must access Beagle for the first time whilst logged into a PC joined to the University of Liverpool Active Directory Domain using their Domain account.

The new user is initally assigned to the system-protected *New Users* Security Group (see [Security](security.md)), and is immediately directed to the *My Details* page, which displays a form allowing the user to review and edit the information relating to their account which was picked up from the Windows account, and to add to it if desired. When the user submits this form their Beagle account is updated (the value in the *RoleID* column of the *User* table is updated) so that they are moved into the *Pending Approval* Security Group.

Neither the *New Users* or the *Pending Approval* Security Groups have permission to login to Beagle, so for as long as the user is a member of one of the Security Groups they will be unable to access the main application. When the user's account is moved into the *Pending Approval* Security Group, an [Action](Actions.md) is created for each user who belongs to a Security Group which has the "Can Approve New Users" permission, prompting them to approve the new user. They can do so by simply editing the user's account in *System Configuration* > *Users & Security* > *Users* to move them into a Security Group with permissions appropriate for their job role. As long as the Security Group to which they are added has the "Can Login to Beagle" permission, the user will then be able to access the application.

## Overriding Approval
This feature was added to facilitiate the early preview of Beagle, for which we didn't want users to have to go through the process of accessing Beagle, having their account created then having to wait to be approved before attempting to access Beagle again. **It is not intended for use in a production environment**.

When this feature is enabled, a new user submitting the *My Details* form after attempting to access Beagle for the first time will be taken directly to the Beagle home page rather than having to wait for their account to be approved.

To enable the bypassing of user approval, a line must be added to the `<appSettings>` section of the *Web.config* file for the appropriate Beagle website as follows:
 ````
 <add key="OverrideNewRole" value="BeagleUsers" />
 ````

 The value can be substituted for the name of any valid Beagle Security Group as long as it appears in the *Beagle.Common* > *Enumerations* > *SecurityGroupEnum* file within the Beagle solution, and the value must exactly match the value of the enumeration record. This is the Security Group to which new users will be added instead of the *Pending Approval* group when they submit the *My Details* form.