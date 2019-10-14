# Action Types
Action Types are referenced in the code by their ID, so when Action Type records are created in a new environment it's important to use the correct IDs.

## Editing an Action Type
The three checkboxes for configuring notifications (*Notify in Beagle*, *Notify by Email* , and *Notify by SMS*) are disabled if the *ActionType.AllowNotifications* column contains the value FALSE. This is used to prevent enabling of notification for certain Action Types where it is deemed to be inappropriate.