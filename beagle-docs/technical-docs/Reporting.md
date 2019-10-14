# Reporting in Beagle

## Overview
For the purposes of this article, "reports" describes templated documents produced by Beagle such as Invoices, sheets of labels and some reports for clients (e.g. Microbiology Reports in Beagle Pathology).

The production of reports in Beagle is handled by SQL Server Reporting Services (SSRS). Each environment of each Beagle application has its own reports, divided into two sub-categories:
- System Reports.
- Analytitcs Reports.

The reason for the sub-categorisation is that the reports need to have different permissions set on the SSRS server and so are located in different folders. The only way to achieve this with reports created in Visual Studio is to have two separate Reporting Services projects. See the [Deployment](#Deployment) section for more details.

### System Reports
These are miscellaneous reports vital to the functionality of the application like Invoices and labels. They may or may not be what would be considered as 'reports' to an end user, but are nonetheless reports in SSRS like any other. On the SSRS server, permission to these reports is heavily restricted so that they can only be accessed by the account that the application uses for report generation (see [SystemReportsUsername](#SystemReportsUsername) section) and users who need to maintain the reports.

### Analytics Reports
These are generally reports in the more conventional sense, displaying data from the Beagle database for analytical purposes, e.g. number of referrals in a given period. These are located in a folder on the SSRS server to which all users have permission to run reports, since these reports are embedded in the Beagle application and are run using the User's own credentials. See the [Security](#Security) section for more details.

For information regarding how the Analytics Reports are loaded and displayed in the application, see the [Analytics Module](Analytics%20Module.md) page.

## Report Templates
The templates for Beagle's reports are part of the Beagle codebase. They are contained in their own Visual Studio Projects, named <Application>SystemReports and <Application>AnalyticsReports, e.g. *BeagleSystemReports*.

## Deployment
Reports in the two Reportings Services projects are published as artefacts by the same Build process in VSTS which builds the rest of the application, triggered whenever code is checked into the Dev branch.

The reports are then included in the Release which gets created in VSTS automatically when a Build completes successfully, using the *SQL Server Reports Deployment* Task. Two versions of this Task - one for System Reports and one for Analytics reports - exist for each different target environment, with the target folders on the SSRS server configured for that environment. As with the rest of the application, deployment to the [Dev environment](https://leahurst.visualstudio.com/Beagle/Beagle%20Team/_wiki?pagePath=%2FHosted-Environments) takes place automatically when the Release is successfully created.

> ### Important Note About Deployment
> Even though the Reports and their related Datasets and Data Sources are neatly organised into folders in the Visual Studio project, when they're deployed to the SSRS server they expect to all be in the same folder, and so relative references in these objects break. Therefore, post-deployment of new Reports it is necessary to open edit them in the Reporting Services portal and amend the references to any shared Datasets and Data Sources to point to their actual location on the server. The same must be done for references in Datasets to shared Data Sources. However, these changes are persisted even through subsequent deployments of the Reports, so it should only be necessary to do this when deploying a new Report or when a new reference to a shared resource has been added.

> Additionally, the credentials specified in the Data Sources in this Reporting Services Projects make it easy to develop with, but these are not correct for the deployed environments, and the Data Sources that appear in the Visual Studio projects are never actually deployed. At present there is only one Data Source on the SSRS server, used by all Reports and Datasets, and it is configured to use the *LIVAD\Beagle* account to connect to the database, with the password supplied. 

## Security
The SSRS web service is configured to use HTTPS, using the same SSL certificate as the Beagle web server. This ensures that data transferred to and from the SSRS server is encrypted. This is also a requirement for embedded reports to run in a web application using HTTPS.

> Note that in order to avoid a prompt for login credentials when accessing reports it is necessary for the server hosting the reports (currently BeagleDB) to belong to the client PC's Intranet Zone.

### System Reports
Security on System Reports is straightforward. These Reports are stored in the *System Reports* folder, any shared Datasets are stored in the Datasets folder and the Data Source is in the Data Sources folder. On each of these folders, permissions are inherited from the Reporting Servies' top-level, where permission is restricted to a very small number of users, for maintenance reasons. Additionally, the *LIVAD\Beagle* account is granted the SSRS *Browser* Role, allowing Reports to be run by this account, and this account is used for running System Reports (by virtue of being specified in the *SystemReportsUsername* column of the *SystemConfiguration* table). See the [SystemReportsUsername](#SystemReportsUsername) section.

### Analytics Reports
Analytics Reports are different. To begin with, these reports may only be viewed within the Beagle application by someone who belongs to a [Security Group](../EndUser/Security%20Groups.md) which has the *Can access Analytics* Permission. Without this Permission, a User will not see the *Analytics* option on the [Application Menu](../EndUser/Application%20Menu.md) and attempting to browse to the URL for the Analytics module will result in an error.

Analytics Reports are stored on the SSRS Server in the *Analytics Reports* folder. This folder has customized permissions so that, in addition to the permissions set at the Reporting Services top-level, the *LIVAD\Domain Users* Active Directory group has been granted the custom *Report Viewer* SSRS Role, which allows only for Reports to be viewed. In this way, anyone with a University login is able to run reports in the *Analytics Reports* folder, if they somehow obtain the URL to the report in SSRS (they do not have permission to browse the Reporting Services web portal to navigate to the Reports, they would need the URL for the actual report itself). Keep reading for details of how we prevent unauthorised people seeing the data in these reports!

It is essential that any Reports in the *Analytics Reports* folder use only embedded Datasets and not shared Datasets. This is because any University user who somehow obtained the direct URL to a shared Dataset in that folder (shared Datasets in other folders would be useless as they would not be accessible to almost all users, meaning that Analyticts Reports would fail to run in Beagle even for Users who should be allowed to see them) would be able to open the Dataset and preview its data.

Every Report in the *Analytics Reports* folder has been designed so that, at run time, if the user viewing the Report does not belong to a Beagle Security Group which has the *Can access Analytics* Permission the content of the Report will be hidden and they will instead see a message saying that they do not have permission to view the Report. This is achieved as follows:
- The Report contains a Dataset named *PermissionDataset* which returns the usernames (from the *User.Username* column) for any Beagle Users who belong to a Security Group that has the *Can access Analytics* Permission.
- At runtime, the *PermissionDataset* is filtered so that it only returns records where the value in the *Username* column matches the value of the Report's built-in *User!UserID* parameter. If the user running the Report does not belong to a Security Group with the *Can access Analytics* Permission, all records will thereby be filtered out. If they do, the Dataset will be filtered to only contain a single record.
- The visibility of all content elements of the Report is set so that if the count of records in the *PermissionDataset* is less than 1 the elements are hidden. A special element - a message advising that the user doesn't have permission to view the report - has its visibility set inversely.

Analytics Reports are embedded into pages in the Beagle application in iframes. The list of available reports and the embedded reports themselves are rendered dynamically by reading from the _AnalyticsReport_ table in the database. Reports in this table where the value in the _RequiresAuditing_ column make reference to tables in the database's _audit_ schema and therefore require Beagle's [Auditing](Auditing.md) function to be enabled and properly configured.  The _Analytics_ > _Management Reports_ page does not display reports that require auditing. The _Activity History_ page displays only reports that require auditing, only if auditing is enabled in System Configuration.

## System Configuration
Four columns in the *SystemConfiguration* table relate to reporting, and all must contain a valid value for reports to be produced successfully. These are detailed below.

### SSRSWebServiceURL
This column should contain the full URL of the SSRS web service serving the instance of Beagle. This value will be the same for all instances of Beagle sharing an instance of SSRS.

**Example:** *https://beagle.liv.ac.uk/beaglereports/reportexecution2005.asmx*

### SystemReportURLPrefix
This column should contain the prefix to the path to the individual system report templates. Because a single instance of SSRS may host Beagle report templates for multiple Beagle instances, stored in separate folders, this setting allows the application to locate the templates appropriate for the Beagle instance.

The setting should include a forward-slash at the beginning and no forward-slash at the end (the consequences of deviating from this are not tested at this time).

**Example:** */Beagle Pathology/Beagle Pathology Reports/System Reports*

### SystemReportsUsername
The username which should be used for generating the Beagle System Reports requested by the application code. The account is used to access the report templates on the SSRS server. Therefore, the specified account must have been granted at least the *Browser* Role for the *System Reports* folder in SSRS server as well as any folders containing Datasets referenced by Reports in that folder.

### SytemReportsPassword
The password for the account specified in *SystemReportsUsername*.