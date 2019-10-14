# Emailing from Beagle
There are two kinds of email which are sent by the Beagle application - regular Emails, such as letters and Invoices to Clients, and System Emails, which are emails which the application sends automatically, such as notifications to Users.

## Sending Emails from Beagle
Beagle includes a feature known as Direct Emailing. This allows Users to send emails directly from Beagle (rather than having to interact with their default email client, e.g. Outlook, in any way). The feature can be enabled or disabled in [System Configuration](system%20configuration.md) in the _Outgoing Email_ > _Direct Emailing_ section, but it is recommended that it is enabled whenever possible because this feature provides the best user experience.

### Configuring Direct Emailing
When Direct Emailing is enabled it is necessary to specify an email server on the _Direct Emailing_ configuration page, either by host name or IP address, so that it can be resolved by the Beagle application server. The email server also needs to be 'open' for Beagle's functionality to work. I can't remember exactly what that means now, but I think it means that the mail server will allow emails to be sent on behalf of any specified account. The University's _Mail1_ server is so configured and, according to Ben Wagg of CSD, this is never likely to change because so many systems rely on it.

Once Direct Emailing is enabled and a mail server specified, it is then necessary to set up email addresses from which Users will send email from Beagle. This is achieved in the _Outgoing Email_ > _Email Addresses_ page of System Configuration. This page is divided vertically in two. On the left hand side is a list of email addresses from which emails may be sent from Beagle, and, when one of these addresses is selected by clicking on it, the right hand side displays a list of Users who are permitted to send emails from the selected address.

Adding a new email address for Beagle to use is as simple as clicking the _New Email Address_ button and entering an address. The specified address must be hosted on the mail server specified on the _Direct Emailing_ configuration page (i.e. within the University of Liverpool it's not possible to specify a _gmail.com_ email address and have it work!). 

When a new address is saved (or an existing address edited), an email is automatically sent to the address specified containing a link which the recipient must click to confirm that their email address may be used as an Outgoing Email Address in Beagle. Until this has been clicked the email address will display the status "Awaiting confirmation" next to it in System Configuration.

The email also contains a link which the recipient may click at any time to revoke permission for their address to be used as an Outgoing Email Address. If this link has been activated, the email address will display the status "Revoked" in System Configuration. There is no way to reinstate a revoked email address, although editing a revoked address and entering a new value will initiate the confirmation process again.

The confirmation is sent using the mail server specified in the _SystemConfiguration.SecurityAlertMailServer_ column to avoid the possibility of a user bypassing the confirmation process by specifying an invalid mail server or a server which they control. For this reason, if there is no value in the _SystemConfiguration.SecurityAlertMailServer_ the ability to create or edit Outgoing Email Address will be disabled. The confirmation email is sent from the same address as is entered for the new Outgoing Email Address. In this way we can ensure that the sending address always exists and is valid (or, if it's not, no harm is done).

To grant permission to a particular User to be able to email from a configured email address, select the email account in the list and then click the _Add User_ button to the right hand side.

Any Users listed on the right hand side when an email address is selected will be able to send emails from Beagle from that address. When they trigger Beagle's emailing functionality (e.g. by clicking the _Send_ button next to an Invoice in the Sales Ledger) they will be able to select the email address from which they want the email to be sent from a list of options which includes their own email address and any addresses to which they have been given permission on this System Configuration page (excluding unconfirmed and revoked addresses).

 > At the time of writing there are no Beagle Permissions which control access to this System Configuration page, but at least one will be addded.

 ### Disabling Direct Emailing
 If Direct Emailing is disabled, the emailing feature within Beagle falls back to less sophisticated functionality. In this situation, when a User triggers Beagle's emailing function they will be prompted to download and open a _.msg_ file which they can then open with their default mail client and send from any addresses they have configured in that application.

 Not only is this fall-back functionality less convenient for Users, it also means that Beagle has no way of knowing that an email has been sent. As a result, _Date Sent_ values within the application are less reliable because they are simply the date on which the _Send_ button was clicked. There's no way to be sure that the User actually sent the email. There is also no audit of sent emails with Direct Emailing disabled.

 ## Auditing of Sent Emails
 Any User can see a complete list of emails that they have sent from Beagle by navigating to the _Sent Emails_ tab of their [User Profile](User%20Profile.md) page. Additionally, Users with appropriate permissions can view all emails which have been sent from Beagle using Direct Emailing from within the [Auditing](auditing.md) module. Emails sent when Direct Emailing is disabled will not be listed.

 Emails sent using Direct Emailing in Beagle will not appear in a User's Sent Items folder within their mail client application.

 ## System Emails
System emails are emails sent automatically by Beagle, such as notifications to Users. These emails will be sent from the account specified in the _Outoing Email_ > _System Emails_ page of System Configuration. This page also requires the password for the account to specified so that emails can be sent successfully. System Emails are sent using the Exchange Web Service as specified in _SystemConfiguration.ExchangeWebServiceURL_.

## Overriding Recipient Email Addresses for Testing
It is possible for a developer to silently override the recipient email addresses of emails sent directly from Beagle to remove the possibility of a User sending test data to a genuine email address. For more information see [Overriding Email Addresses and Telephone Numbers for Testing](Overriding%20Email%20Addresses%20and%20Telephone%20Numbers%20for%20Testing.md).