# Diary Integration with Third-Party Calendar Applications
Beagle supports integration with third-party calendar applications. The level of functionality available depends on the third-party software in question.

## Showing External Appointments in Beagle
Beagle can display appointments from a user's Microsoft Exchange calendar in the Main Diary. The steps to configure this are as follows.

1. Open the System Configuration module.
0. Navigate to _Scheudling_ > _Exchange Web Services_.
0. In the _Exchange Web Services URL_ field, enter the URL to an [Exchange Web Services](https://docs.microsoft.com/en-us/exchange/client-developer/exchange-web-services/explore-the-ews-managed-api-ews-and-web-services-in-exchange) instance which can return diary data regarding the users whose calendar information you wish to see in Beagle.
 > For the University of Liverpool's Exchange Server the valid URL is currently https://autodiscover.liverpool.ac.uk/ews/exchange.asmx

4. In the _Account_ and _Password_ fields, enter the username and password for the account which will query the Exchange Web Service for diary data.

Once the correct settings have been added to System Configuration, whenever a User's diary is displayed in Beagle the application will attempt to retrieve diary data for that User from the Exchange Server and, if successful, will display any retrieved appointments in the User's Main Diary. In order for Beagle to be able to retrieve a User's appointments from Exchange successfully the User will need to grant at least read permissions to their Outlook calendar to the account specified in step 4 above.

## Showing Beagle Appointments in a Third-Party Calendar client
It is possible to configure a third-party calendar client such as Microsoft Outlook or Thunderbird to show Beagle appointments. This is simply achieved by subscribing to the Beagle diary for a particular User. A User can see the URL to their Beagle diary by looking under the _Other Settings_ tab of their User Profile page, and use that URL to set up a subscription in their calendar client in the same way as for any Internet calendar.

There are no permissions involved in subscribing to a user's Beagle diary, so any person with the correct URL can view the diary of any Beagle user. This is not currently deemed to be a signficant security issue since appointments in Beagle are visible to any user already.
