# Version Numbers in Beagle
Version numbering in Beagle is managed in an external application known as Beagle Version. More information about this application can be found in the [Project Wiki page](https://leahurst.visualstudio.com/Beagle/_wiki?pagePath=%2FBeagle-Version).

The build number displayed in the *About* dialog in Beagle is added to the code automatically by a PowerShell script which runs as part of the build process in VSTS. For this reason, when the application is running in debug it will not have a build number and therefore will not succesfully obtain a version number either.

In Beagle, the *_About* shared View contains Javascript code which retreives the version number which corresponds to the build number displayed in the *About* dialog from the Beagle Version API and displays it alongside the *Beagle version* label.