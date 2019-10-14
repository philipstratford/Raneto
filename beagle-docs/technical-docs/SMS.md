# SMS
Beagle includes a feature which allows sending of SMS messages directly from the application. This feature can be enabled or disabled in [System Configuration](System%20Configuration.md) under *SMS* > *SMS Settings*. On the same page, when SMS is enabled, the account details can be entered for the account to be used for sending SMS messages with the supported 3rd-party communications provider, [Twilio](https://www.twilio.com/).

The account details which are used for testing (and, it is anticipated, in the live environments) can be found in the Beagle project Wiki on Azure DevOps. They are dynamic and user-configurable and therefore outside the scope of this documentation.

## Overriding Recipient Telephone Numbers for Testing
It is possible for a developer to silently override the recipient telephone numbers for SMS messages sent directly from Beagle to remove the possibility of a User sending test data to a genuine number. For more information see [Overriding Email Addresses and Telephone Numbers for Testing](Overriding%20Email%20Addresses%20and%20Telephone%20Numbers%20for%20Testing.md).