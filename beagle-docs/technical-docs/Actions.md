# Actions
Actions in Beagle are prompts or reminders for Users to perform certain tasks. They are viewed in many different areas of the application. For information about Actions conceptually and how they feature in Beagle workflows, see the End User Documentation.

## Actions Lists
On Actions Lists (e.g. the one of the Clnician Home Page), the value shown in the Date column is from the database column _Action.DisplayFrom_.

## System-Generated Actions
Most Actions in Beagle are System-Generated, which simply means that they get created automatically in response to Action Triggers rather than manually by a User (as in the case of a Contact Request, for example). 

![System-Generated Actions Process](assets/System%20Generated%20Actions%20Process.jpg)

## "Completes Immediately" Actions
Actions which are of an Action Type where the *CompletesImmediately* value is TRUE are never displayed anywhere in the application. Action Types which 'complete immediately' are intended purely for triggering [Notifications](Notifications.md). Actions of these Action Types are not intended to ever be viewed in any Actions lists. For this reason, it wouldn't make sense to have an Action Type which 'completes immediately' but has *AllowNotifications* set to FALSE. 

Actions which 'complete immediately' do not have specialised detail panes written for them to be displayed when the Action is selected in an Actions list, since they're never intended to be viewed in Actions lists. However, if a User clicks on a Notification in Beagle they are taken to the Notifications tab of their [User Record](User%20Record.md) page and the Action is pre-selected. To handle this for Actions which 'complete immediately', there is a generic Action detail pane which is used. This can be found in the code's MVC project under _Views > Actions > Action_.

*editing required*