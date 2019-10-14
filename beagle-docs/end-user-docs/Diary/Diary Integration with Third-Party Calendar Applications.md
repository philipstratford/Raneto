# Diary Integration with Third-Party Calendar Applications
Beagle supports integration with third-party calendar applications. The level of functionality available depends on the third-party software in question.

## Showing External Appointments in Beagle
Beagle can display your Outlook calendar appointments in the Main Diary. For this to work, someone with the appropriate permissions will first need to configure Beagle as follows:

1. Open the System Configuration module.
0. Navigate to Scheudling > Exchange Web Services.
0. In the Exchange Web Services URL field, enter the URL to an Exchange Web Services instance which can return diary data regarding the users whose calendar information you wish to see in Beagle. The Beagle Development Team or CSD will be able to advise what the value entered here should be.
0. In the Account and Password fields, enter the username and password for the account which will query the Exchange Web Service for diary data.

Once the correct settings have been added to System Configuration, whenever your diary is displayed in Beagle the application will attempt to retrieve diary data from your Outlook calendar and, if successful, will display any retrieved appointments in the User's Main Diary. 

In order for Beagle to be able to retrieve your Outlook appointments successfully you will need to grant permission to your Outlook calendar to the account specified in step 4 above. You can find instructions on how to do this on Microsoft's support website [here](https://support.office.com/en-us/article/share-an-outlook-calendar-with-other-people-353ed2c1-3ec5-449d-8c73-6931a0adab88). At the time of writing it seems that it's necessary for the account reading your calendar to have the "Full Details" level of permission under the "Read" section of the Outlook calendar permissions dialog.

Note that any appointments in your Outlook calendar will be visible to anyone viewing the diary in Beagle. 

## Showing Beagle Appointments in a Third-Party Calendar client
It is possible to configure a third-party calendar client such as Microsoft Outlook or Thunderbird to show your Beagle appointments. The instructions for achieving this are as follows:

1. In Beagle, open your User Profile page by clicking on your name in the top-right corner of any page and selecting _My Profile_ from the dropdown list.
0. On your User Profile page, open the _Other Settings_ tab.
0. You will see a field labelled _Link to ICS_. Copy the value from this field by clicking the blue button with a clipboard icon to the right of the field.
0. Follow the instructions for your chosen calendar client for subscribing to an Internet calendar. When propmted to enter the location of the Internet calendar, paste the value from the _Link to ICS_ field in step 3.