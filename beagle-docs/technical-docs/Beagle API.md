# Beagle API
The Beagle API is a stand-alone web API which provides access to data stored in one more Beagle databases. This application has been primarily created to allow the publication of a web API to be consumed by Agresso containing financial data from multiple Beagle databases.

Beagle API itself has its own SQL database for storing configuration settings and containing Views and Stored Procedures which combine data from multiple linked databases.

For detailed documentation on how Beagle API actually retrieves and returns data, see the article which relates to the specific API you require. For example, for technical documentation relating to the Agresso interface, see [Beagle API Agresso Interface](Beagle%20API%20Agresso%20Interface.md).

## Configuring Beagle API
Beagle API will connect to Beagle databases on any SQL server. However, if Beagle API is configured to access databases in an SQL Server instance other than the one where Beagle API itself is hosted, it is essential that the target SQL Server be added as a Linked Server in the SQL Instance hosting Beagle API.

To include a database in the data returned by the Beagle API, add the database to the *BeagleDatabase* table in the Beagle API database and ensure that the value in the *Enabled* is TRUE. Note that the Beagle database must be compatible with any APIs making requests from its data. Details of compatibility requirements for each API can be found in the documentation for that API. The Beagle Databases page performs a check for each database to determine whether it is compatible with the Beagle API (this is performed by calling `sp_CheckDatabaseCompatibility` in the *BeagleAPI* database, which requires modifying whenever changes are made to the requirements of databases with which the Beagle API will interface, e.g. additional columns are added or additional permissions are required).

### SQL Security
Beagle API will attempt to connect to any Beagle Databases specified in the *BeagleDatabase* table using the same SQL Login as is specified in the connection string in the Beagle API *web.config* file - an SQL Login named **BeagleAPI**. Therefore, it is essential that the SQL Login **BeagleAPI** is mapped to a User in each database specified in the *BeagleDatabase* table. The User only needs permission to run SELECT queries on certain tables, described in the documentation for each API, and so it is more secure to user Table-level security rather than simply adding the User to the *db_datareader* database role, although this will obviously work too.

### IIS Configuration
The site hosted in IIS for the BeagleAPI must have both Windows Authentication (for the web application) and Anonymous access (for the APIs, which use token-based authentication) enabled.

 ## Accessing Beagle API
 The Beagle API has its own very small website which contains documentation for the various APIs. This documentation is automatically-generated when the application is built. The APIs themselves each have their own URL, parameter requirements and so on. The website also includes pages for managing the Beagle databases that the API will access. It can be found at `<beaglewebserver><environment>/beagleapi`, e.g. https://beagle.liv.ac.uk/beagleapi.

 ### Security
Beagle API does not include its own role provider. Access to the website is controlled using Windows Authentication. The names of the Active Diretory groups used to manage permissions to various parts of the website are abstracted in the application in the `ActiveDirectoryRoleMapping` class so that it's easy to change the Active Directory groups if necessary.

Roles which currently exist in the BeagleAPI application are:
  - **Administrators**: Users belonging to the Active Directory group mapped to the Administrators role have full access to the Beagle API web site, can manage which databases are included in the APIs and can manage Personal Access Tokens issued to other Users.
  - **AgressoAPIReaders**: Users belonging to the Active Directory group mapped to the AgressoAPIReaders role have access to the API Tokens page, from where they are permitted to create Personal Access Tokens which can be used to authenticate to the Agresso API.
 
The web services themselves may only be accessed using a Bearer token. Personal Access Tokens may be requested by users from the API Tokens page of the BeagleAPI web site.