# Overriding Email Addresses and Telephone Numbers for Testing
In any environment other than Live there is a danger that a User could enter a genuine, valid email address or telephone number for a Client, Referring Vet, Referring Practice or User and then use Beagle's built in [Emailing](emailing.md) or [SMS](SMS.md) functions to inadvertently send messages to those addresses or numbers which would contain test data. This could be very embarassing.

To mitigate for this, it is possible to configure a Beagle environment to override any email address or telephone number to which a message is sent from Beagle at the point of sending. This is done by adding keys to the *web.config* file.

These overrides will apply to any emails and SMS messages sent from Beagle, whether triggered manually by a User or automatically, e.g. Notifications.

Although the overriding of the email addresses and telephone numbers will be invisible to the User sending the messages, the *Sent Emails* and *Sent SMS* pages on the [Activity History](Auditing.md) page will show the addresses and numbers to which the messages were actually sent.

## Overriding Email Addresses

To override the email addresses to which emails are sent using Beagle's Direct Emailing feature, a line must be added to the `<appSettings>` section of the *Web.config* file for the appropriate Beagle website as follows:
 ````
 <add key="SafeEmailAddress" value="safeaddress@liverpool.ac.uk" />
 ````
The Value should contain the address to which emails should actually be sent from Beagle.

## Overriding Telephone Numbers

To override the telephone numbers to which SMS messages are sent from Beagle, a line must be added to the `<appSettings>` section of the *Web.config* file for the appropriate Beagle website as follows:
 ````
 <add key="SafeTelephoneNumber" value="07000000000" />
 ````
The Value should contain the mobile number to which SMS messages should actually be sent from Beagle.

## Removing the Overrides
To remove the overriding at any point, just remove the relevant lines from the *web.config* file.