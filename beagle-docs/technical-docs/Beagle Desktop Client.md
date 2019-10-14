# The Beagle Desktop Client
The Beagle Desktop Client is a standalone Windows Forms application created to facilitate communication between the Beagle web application and the Windows computers on which it is run to address the fact that applications hosted in a web browser do not have permission to access local Windows resources such as printers and scanners.

## How It Works
Once installed and correctly configured the Beagle Desktop Client hosts a web API at the _localhost_ URL specified in the application's settings. The Beagle web application calls various web services exposed by the Beagle Desktop Client's API to achieve interaction with the local computer's resources.

### Printing
When a silent print is requsted from the Beagle web application an HTTP POST request is sent to the Beagle Desktop Client (`http://<BDC_URL>/api/print` where <BDC_URL> is the URL in _SystemConfiguration.BeagleDesktopClientHostURL_) with a payload containing the contents of the document to be printed as a byte array and the type of document ("Document" or "Label") for specifying what kind of printer should handle the printing. The bytes are then reconstituted into a document, making use of the [Windows build](https://github.com/pvginkel/PdfiumBuild) of the [PDFium Viewer](https://github.com/pvginkel/PdfiumViewer/) (available under Apache License 2.0 licence) and sent to the printer specified in the Beagle Desktop Client's settings. 

The Beagle Desktop Client currently only officially supports printing of PDF documents.

### Scanning
The scanning API comprises two web services. The first, hosted at `http://<BDC_URL>/api/scan/getscannercount`, accepts an HTTP GET request (no parameters are required) and returns an integer which represents the number of scanners configured on the PC where the Beagle Desktop Client is running. This is useful for modifying the web application's UI according to whether any scanners are available.

The second service is hosted at `http://<BDC_URL>/api/scan` and again accepts HTTP GET requests with no parameters. When a call is made to this service the Beagle Desktop Client initiates the process of scanning documents using the desktop scanner configured by the User. This is facilitated with the [Dynamic .NET Twain](https://www.dynamsoft.com/Products/.Net-TWAIN-Scanner.aspx) created by [Dynasoft](https://www.dynamsoft.com/) for which a licence has been purchased. The scanned document is converted to a byte array and returned to caller of the web service.

## Configuration
The Beagle Desktop Client's main window is a settings page. Most of these settings are self-explanatory and allow the end User to configure printing and scanning as required. However, the _Local Host URL_ setting should not be changed by the User under normal circumstances. This value is required and specifies the base URL at which the Beagle Desktop Client will host its web services. The URL entered here must match the URL configured in [System Configuration](System%20Configuration.md) in the Beagle web application if the two systems are to communicate sucessfully.

## Distribution
The Beagle Desktop Client is distributed as an installable executable, created using [Inno Setup](http://www.jrsoftware.org/isinfo.php). The .iss script for creating the installer is contained with the Beagle Desktop Client's source code and can be compiled using Inno Setup.