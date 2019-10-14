# Auditing
Activity in Beagle is audited in a number of ways depending on the type of activity.

## Auditing Accessing of Beagle Resources
Any time that a page in Beagle is accessed a record is written to the _AccessAudit_ database table. This is achieved by means of an [Action Filter](https://docs.microsoft.com/en-us/aspnet/mvc/overview/older-versions-1/controllers-and-routing/understanding-action-filters-cs) (_AccessAuditAttribute_). Only successful requests for resources are logged - if the User fails to reach a resource because they don't have the appropriate [Permission](Security.md#permissions) this will not be logged.

## Auditing Database Changes
Any changes to the database - the insertion, deletion or updating of records - is logged in a 'shadow copy' of the affected table. For each 'main' table in the _dbo_ schema there is a 'shadow copy' of the table in the _audit_ schema containing the same columns as the main table and a few additional columns for storing auditing information such as the type of change being audited, the User who made the change and the date and time of the change.

The 'shadow' tables in the _audit_ schema are created by means of a script (_CreateAuditTables_) which must be run manually whenever a change to the database schema is deployed. This script backs up the existing _audit_ tables, drops them and recreates them based on the modified schema before restoring the backed-up audit data. For this reason, if a column is removed from a table it will not be present in the 'shadow' copy of the table when it is recreated and therefore any backed-up data for that column will be lost when the table's data is restored.

This auditing only takes place if auditing is enabled in System Configuration (Users & Security > Auditing).

 > Auditing should not be enabled in the Dev environment since the Dev database does not have the 'shadow' audit tables created in the _audit_ schema.

## Auditing of Data Exports
Whenever a User exports data from Beagle using the _Export_ button appearing above most data grids they are prompted to accept responsibility for the correct handling of the exported data. The User's acceptance of this, along with details of the data which was exported is logged in the _DataExport_ table. A copy of the exported data file is stored in the _Attachment_ table and linked to the _DataExport_ record.

## Other Auditing
Email and SMS messages which are sent from Beagle are logged in the _EmailMessage_ and _SMSMessage_ tables respectively.

## Viewing Audit Logs in Beagle
The Activity History module within Beagle allows Users with the appropriate Permission to view logs of sent Emails and SMS messages, data exports and deleted [Costs](Costs.md). Note that the Deleted Costs option is only visible if Auditing is enabled in System Configuration.