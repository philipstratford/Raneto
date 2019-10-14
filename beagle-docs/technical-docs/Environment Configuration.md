# Environment Configuration
This article aims to describe all of the configuration that must be performed on an environment hosting an instance of Beagle.

## Web Server
For **Core** only, in the root folder of each environment's web application there must be a folder named *ICS* for storing Beagle's .ics files allowing Users to view Beagle appointments in their own calendars.

### IIS

### Firewall

### SQL Server
Beagle uses SQL Server Reporting Services (SSRS) for producing reports of many different kinds, including Sales Ledger Transaction documents and Analyticts reports. Therefore, if SSRS isn't configured correctly there will be a significant impact on the functioning of the application.

#### SSRS
A new Role must be created named *Report Viewer*. This Role will be used for running certain reports. See the [Reporting](Reporting.md) article for details of the configuration that must be performed in the SSRS Web Portal, including how this new Role is used.

### Firewall
The firewall must be configured to allow HTTPS requests on port 443 (assuming that HTTPS is being used rather than HTTP, as recommended). This is to allow SSRS reports to work correctly.

## Client Configuration
In order to prevent the web browser from prompting for credentials when accessing Beagle using HTTPS (really it's when using the FQDN to the SSRS server, not as a result of HTTPS - see [this article](https://blogs.msdn.microsoft.com/psssql/2011/04/18/why-am-i-getting-prompted-for-credentials/)), add the Beagle servers to the Intranet Zone in Internet Options (this is true even when using browsers other than Internet Explorer). Servers to be added are:

 - https://beagle.liv.ac.uk
 - https://beagledb.liv.ac.uk (for reports to work correctly)
 - https://beagledev.liv.ac.uk (for using the Dev or Test environments)

 These servers should be added to the Intranet Zone by central the IT department for everyone, but may be added manually if they are missing.