# Beagle Desktop Scanner Client
_The content of this article relates to a feature which has been removed and has been retained for reference only._

The Beagle Desktop Scanner Client is a standalone Windows Forms application created to solve meet the requirement of being able to initiate the scanning of documents using a desktop document scanner by clicking a button in the Beagle web application. 

Beagle's scanning functionality has now been incorporated into the [Beagle Desktop Client](Beagle%20Desktop%20Client.md), making the Beagle Desktop Scanner Client redundant. Its code has been marked as deleted in the Beagle source code repository.

## Functional Description
When the User runs the Beagle Desktop Scanner Client on a Windows PC (Administrative privilegs are required for the way the Client works, meaning that if the application is being run in debug then Visual Studio must be launched using _Run As Administrator..._), a pseudo web server is created on the client machine at http://localhost:8999. The application also allows the user to set a small number of scanning preferences.

When a _Scan..._ button is clicked in the Beagle web application, a message is sent to http://localhost:8999/api/scan (see _beagle.attach.js_) , which causes the Beagle Desktop Scanner Client to initiate a scan. When the scan is complete, the locally-hosted 'web server' returns the bytes of the scanned document to Beagle, where the document is added to the database.