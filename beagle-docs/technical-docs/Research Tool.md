# Research Tool
Beagle's Research Tool is an SSRS report which allows Users to search for cases based on a number of important fields. It can be accessed from the [Application Menu](Application%20Menu.md) under the _Analytics_ option by Users belonging to [Security Groups](Security.md#security-groups) with the "Can access Research" [Permission](permissions.md).

## Attachment Filtering
The Attachment search is powered by SQL Server's full-text indexing feature. There is a full-text index on the _AttachmentData_ field of the _Attachment_ table and the Research Tool's main query uses the `CONTAINSTABLE` function to search this index. Because the `CONTAINSTABLE` function cannot contain a null or empty value for the search predicate but we want to allow searches with no value entered in the _Attachments Contain Text_ field (i.e. searches where the User isn't concerned with the text from attachments), the query parameter _@AttachmentText_ is configured in the _ReportData_ dataset's properties uses an expression which passes the "*" wildcard for the `CONTAINSTABLE` predicate when the report's _@AttachmentText_ parameter is NULL.

Because many of attachments in Beagle are PDF documents it's important that the full-text index is able to include text from PDF documents. To achieve this it's necessary for the PDF iFilter to be installed and configured on the SQL Server instance hosting Beagle's database. This can be carried out as follows:
1. Download the Adobe PDF iFilter. The latest version at the time of writing is v11.0.01, but this is not compatible with SQL Server 2016 or 2017 so I've used version 9 which can be downloaded from [here](ftp://ftp.adobe.com/pub/adobe/acrobat/win/9.x/) (it's the file called _PDFiFilter64installer.zip_). This file has also been saved in the Beagle shared folder.
2. On the Windows server hosting SQL Server for Beagle, install the iFilter.
3. On the same server, ensure that the path to the bin folder of the newly-installed iFilter (by default _C:\Program Files\Adobe\Adobe PDF iFilter 9 for 64-bit platforms\bin_) is added to the System's PATH environment variable.
4. In the instance of SQL Server hosting Beagle's database run the following commands:
````
EXEC sp_fulltext_service 'load_os_resources', 1  
GO
EXEC sp_fulltext_service 'verify_signature', 0
GO
````
5. Restart the SQL Server services.
6. Verify that the iFilter for PDF documents has been installed by running the command:
````
SELECT *
FROM sys.fulltext_document_types
WHERE document_type LIKE '%pdf%'
````

If a result is returned, the iFilter is installed.