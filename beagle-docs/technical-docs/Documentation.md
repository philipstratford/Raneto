# Documenting Beagle

## Introduction
There are two sets of Beagle documentation for two different audiences - Technical and End User. Each set has its own folder within the Documentation folder in the Beagle source code. The documentation files are written in Markdown to ensure portability.

## Beagle Pathology Documentation
Beagle Pathology has its own pair of documentation sets (again, Technical and End User), stored within the Pathology folder in the source code, along with the application's code. Any documentation for features which are common to both Beagle and Beagle Pathology is located in the Beagle documentation. In the Beagle Pathology documentation there may be a stub file for that feature which just contains a link to the relevant page in the Beagle documentation.

## Guidelines for Writing Beagle Documentation
* The names of the documentation files should be in title case and include spaces (e.g. "Beagle Desktop Client"). The file names are displayed as titles in the ReadTheDocs index, so this is important.
    * The important exception to this is the Index files for the various documentation sets, whose names must be index.md, all in lower case, in order for ReadTheDocs to correctly identify them as home pages.
* Include a page title. This should be the only 'level 1' heading on the page. Ideally, it should vary slightly from the file name (e.g. if the file is called "Emailing" the page title could be "Emailing from Beagle".  This isn't critical, but it looks better in ReadTheDocs.
* The tone of the End User documentation should be slightly less formal than that of the Technical documentation and should not include any excessively technical language.
* The End User documentation is written more conversationally, referring to the reader as "you".
* The Technical documentation should not use any personal pronouns (e.g. "you", "I").

## Publishing
At present, only the End User documentation is published anywhere. This is because this documentation is not deemed sensitive and so it's acceptable to host it publicly. The Technical Documentation will likely also be published once we have arranged to pay for private repositories.

Documentation is hosted in a user-friendly format at [ReadTheDocs](http://readthedocs.org). To get it there, it is first pushed to a repository hosted at [GitHub](http://github.com) (under Phil Stratford's account). Check-ins to that repository trigger updates in ReadTheDocs. I hope at some point to be able to cut GitHub out of the process, or at least to autmoate the pushing of the documentation to the GitHub repository when builds or releases succeed in VSTS.

The process for publishing the End User documentation is quite convoluted at the moment, although it can be improved in the future. The process is:
1. Write the documentation in the Beagle source code and check it in.
2. On a PC, perform a 'Get Latest' so that the local machine has the latest version of the documentation files.
2. On the same PC, copy the documentation files from the local Visual Studio Workspace folder to a local folder which is the location of the cloned GitHub repository.
3. In the GitHub client application, commit the changes and sync with the GitHub server.

The check-in to the GitHub server will automatically trigger a rebuilding of the documentation at ReadTheDocs.

## Future Development
As mentioned above, it should be possible to automate the pushing of the documentation to the GitHub repository as part of the Build or Release process. It may one day be possible to cut GitHub out of the process altogether, but that would require ReadTheDocs to support repositories in the TFVC format.

It is desirable to also publish the Technical documentation to ReadTheDocs. They offer different levels of privacy for the projects they host, and either the Protected or Private options would probably be sufficient to ensure that the Technical documentation was not publicly visible. However, it's only possible to create private GitHub repositories if the account is paid for, so whilst the intermediate GitHub account is free it is not possible for the Technical documentation repository to be hidden.