# Beagle Tristan Viewer
Beagle Tristan Viewer is a standalone web application designed for integration in Beagle to allow historical data from the legacy Hospital Management System, Tristan, to be viewed in Beagle. This was deemed to be the simplest and most reliable to make historical data available in Beagle, particularly when compared with the option of migrating data directly into Beagle's database. This solution has been designed to leave as small a footprint as possible in the Beagle application so that the functionality can easily and safely be removed when a point is reached at which legacy data is no longer required or legally justifiable.

The BeagleTristanViewer application consists of an MVC5 ASP.NET web application and an extremely small database. The web application's pages are designed to be viewed solely within `iframes` inside Beagle pages and are laid out accordingly.

The process by which data is retrieved from Tristan and viewed in Beagle is described below and illustrated in the diagram that follows.

1. The client requests a page from Beagle which contains an `iframe` for displaying Tristan data. The `src` attribute of the `iframe` is constructed in the MVC Controller for the page and is formed from the value in the _TristanViewerURLPrefix_ column of the _SystemConfiguration_ table and the legacy ID of the entity for which data is being retrieved, e.g. the _Animal.LegacyID_ column for Animals.
2. The page specified in the `iframe` `src` attribute is loaded from the _BeagleTristanViewer_ web application. The URL specifies the Tristan clinic for which data is being requested (e.g. "Equine Hospital", "SATH") and the legacy ID which should be used for looking up records in the Tristan database.
3. The Controller for the _BeagleTristanViewer_ page uses the parameters supplied in the URL to lookup the details of the Tristan database from the _TristanDatabase_ table in the _BeagleTristanViewer_ database. The returned record contains details of the database server and database name for the requested Tristan clinic.
> Note that the `tristanClinic` parameter value passed in the URL will be used to lookup the record from the _TristanDatabase_ table by matching on the _FriendlyName_ column's value, so the value passed in that paramter must exactly match the value in that column for the required database.

> Note that the Beagle Tristan Viewer application will use the passed Animal Legacy ID to lookup on the _PetId_ column of Tristan's _Pet_ table, NOT the _PetCaseNo_ column. It is therefore essential that value being passed for the LegacyID parameter is the Tristan Animal's ID and not Case Number. The process was written this way because Case Numbers are not entirely reliable - Tristan contains duplicate Case Numbers!

4. The application calls a Stored Procedure in the _BeagleTristanViewer_ database appropriate for the data required, using the server name and database name returned from the _TristanDatabase_ table as values for the relevant parameters.
5. The Stored Procedure in the _BeagleTristanViewer_ database queries the specified Tristan database on the specified server and returns the data to the _BeagleTristanViewer_ web application, which displays these on the page which is displayed within Beagle's `iframe`.

![Data flow from Tristan to Beagle](assets/BeagleTristanViewer%20Data%20Flow.png)

## Server Configuration and Security
In order for the Tristan Viewer application to work, the SQL Server instance hosting the _BeagleTristanViewer_ must have the server hosting the Tristan databases set up as a Linked Server. At the time of writing, connection to the linked Tristan server is always made using the specially-created _BeagleTristanReader_ SQL Login. This account must thus also be setup as a Login on the server hosting the Tristan databases and as a User in each Tristan database being accessed, belonging to the *db_datareader* Database Role.

In the _BeagleTristanViewer_ database itself, the _BeagleTristanReader_ User needs to have permission to read data from all data tables and to execute stored procedures.

In addition, some of the queries in some of the _BeagleTristanViewer_ Stored Procedures include a lot of table joins and can take quite a long time to execute from a remote server (~20s). To improve performance, some Stored Procedures execute the query on the server where the Tristan database is hosted. In order for this to work, the _RPC Out_ option in the Linked Server configuration must be set to True on the SQL Server hosting the _BeagleTristanReader_ database.

## Web Application Security
The Beagle Tristan Viewer web application is secured so that it is not possible to just enter the URL of one of the application's pages and view historical Tristan data. Reasonable measures have also been included to make it difficult for a malicious actor to gain access to the web application by spoofing the protections that are in place.

Security for the web application is handled by the *BeagleTristanViewerAuthorizeAttribute* class. This handles incoming requests. 

The verification of requests differs depending on whether the incoming request is internal (i.e. from links within the Beagle Tristan Viewer application) or external.

### Internal Requests
Whenever a request is made to a resource within the application from elsewhere in the application, the controller method which is called creates a new GUID which is then stored in a session variable and appended to the request's query string. The method then redirects the request to a method decorated with the `[BeagleTristanViewerAuthorize]` attribute, forcing *BeagleTristanViewerAuthorizeAttribute* to verify the request.

*BeagleTristanViewerAuthorizeAttribute* will parse out the GUID from both the session variable and the query string and compare the two. If they match, the request is considered to be authentic and the session variable is immediately deleted. 

Whilst it is extremely trivial for a user to change the GUID passed in the query string, there is no way for a user to modify the session variable stored on the server, making spoofing very difficult. The URL displayed in the browser's address bar cannot be reused even once because after verification the session variable is deleted, so the comparison during authorization will fail on future attempts to use the same URL. For these reasons, it is very difficult for anyone to access the Beagle Tristan Viewer pages by tampering with the internal authorization mechanism.

### External Requests
When a request is made to a resource in Beagle Tristan Veiwer from outside the application (i.e. the main Beagle application), the calling application creates a cookie containg a GUID, the cookie's expiry date and time (current time + 1 minute) and an encrypted hash containing the first two values. The cookie is set to expire after 1 minute, meaning that it is not useful for long!

The key used to encrypt the GUID and timestamp is known to both the Beagle application's code and that of the Beagle Tristan Viewer application, so when the request hits *BeagleTristanViewerAuthorizeAttribute* it parses out the GUID and timestamp. If the timestamp is in the past, the request is considered invalid. Otherwise, the code hashes the GUID and timestamp using the shared key and compares the result to the hash that is contained in the cookie. If the two match, the request is considered to be authentic. At that point the cookie is deleted (its expiry set to a time in the past).

The verification cookie is only valid for 1 minute after creation. Even though a malicious actor could edit the expiry, and also the timestamp in the cookie, the encrypted GUID + timestamp hash cannot (easily) be modified, so the edited cookie would fail the comparison in *BeagleTristanViewerAuthorizeAttribute*. The cookie also cannot be reused because the timestamp it contains must not be in the past.*

 > *Strictly speaking the cookie could be resued for up to one minute after its creation, if a malicous actor edited its expiry date so that it was no longer expired, because upon creation the *Timestamp* value in the cookie is set to the cookie's expiry date, which is the current time plus one minute. However, after 1 minute following the cookie's creation it is useless because, even if it is modified so as not to be expired the *Timestamp* will be in the past, and modifying that value won't work because then it won't match the timestamp in the encrypted hash.

Creation of the verification cookie in Beagle is handled by the *TristanViewerVerificationController* in the api, which is called by Javascript when requests are made to the Beagle Tristan Viewer.