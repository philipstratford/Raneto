# Session Timeout
When a User is logged into Beagle over a [Shared Account](Shared%20Accounts.md), their session will expire after a period of time specified in System Configuration, at which point they will be automatically logged out and the browser will be redirected to the Beagle login page.

The number of seconds after which a session will expire is defined in the *SessionTimeoutSeconds* column of the *SystemConfiguration* table. Entering a value of 0 in this column means that a session will never expire.

 The timeout is reset every time a click or key press is detected in Beagle.

 A warning will be displayed to the User 30 seconds before their session expires (this time is currently hard-coded in the *SessionTimeout.cshtml* view) allowing them to indicate that they wish their session to continue.