# Security
Security in Beagle is managed by membership of Security Groups (or Roles, in the database). No permissions are granted directly to Users.

Each Security Group (record in the _Role_ table) is linked with any number of Permissions (records in the _Permission_ table). The links are stored in the *Role__Permission* table. Users are then added to a Security Group, thus granting each User the Permissions linked to the Security Group to which they belong. A User may only belong to a single Security Group, and this is recorded in the _RoleID_ column of the _User_ table.

Users' Security Group membership, the Permissions associated with each Security Group and the Security Group settings themselves can all be managed in System Configuration by Users with the appropriate Permissions.

## Security Groups
Most Security Groups can be managed by Users the appropriate Permissions on the System Configuration > Users and Security > Security Groups page, and those Users may also create new Security Groups as required. However, certain Security Groups are protected (the value of the _SystemProtected_ column in the _Role_ table is TRUE), and for these Groups even Users with administrative privileges may only add or remove member Users. They are not able to rename or delete these Groups or alter their Permissions. This is because these Groups are required and configured for the correct functioning of the application.

It is not possible for a User to change their own Security Group membership - when a User edits their own details in System Configuration the Security Group field is disabled.

### _Developers Only_ Group
Exactly one Security Group is designated as _Developers Only_ (the value in the _DevelopersOnly_ column of the _Role_ table is TRUE). This is a special Security Group intended only to contain Users who are Beagle developers. This Group automatically has access to the applcation's functionality equivalent to having every Permission, as well as access to some configuration settings which are exclusive to this Group. This is because making changes to these settings could potentially break the application and so changes should only be made by developers who understand the implications of the changes they are making.

The _Developers Only_ Group is only visible in System Configuration to Users who already belong to the Group. Only Users who belong to the Group may add other Users to the Group, since a User may not manage their own Security Group membership and only members of the Group can see it to be able to other Users.

The Beagle Permissions architecture can be illustrated as follows:

![Beagle Permissions Architecture](assets/Beagle%20Permissions%20Architecture.png)