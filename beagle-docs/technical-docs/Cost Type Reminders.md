# Reminders
Reminders is a feature which reminds Practice staff to contact [Clients](Clients) whose [Animals](Animals) have received particular treatments to remind them that they need some follow-up treatment, e.g. a booster vaccination.

The underlying mechanics are very simple. When a [Cost](Costs) is added, the User has the option to enter an integer value in a field labeled *Reminder In* x *days*. This value is saved to the *DaysToReminder* column of the *Cost* table.

When a [User](User) wants to see which Clients need a reminder to be sent out to them, they can visit the Reminders page (yet to be developed) which simply queries the *Cost* table for any Costs where the value in the *DaysToReminder* column (as a number of days) added to the date in the *ProvidedTimestamp* column returns a date less than or equal to the current date - i.e. a reminder is due.

Storing the reminder deadline against Costs in this way, as opposed to storing a date when a reminder is due, means that the reminder date remians correct even if the *ProvidedTimestamp* date is edited.

## Cost Type Reminder Groups
Cost Type Reminder Groups - or just Reminder Groups, for short - simply allow a default value for the *DaysToReminder* column to be specified for a group of [Cost Types](Cost%20Types).

Each record in the *CostTypeReminderGroup* table has an integer value stored in its *DaysToReminder* column. Cost Types may be added to a Reminder Group by entering a Reminder Group's ID in the *CostTypeReminderGroupID* column of the *CostType* table.

When the process of adding a Cost in the application which is associated with a Cost Type - as they always are unless they're [Custom Costs](Costs#custom-costs) - the application checks for a *CostTypeReminderGroup* record associated with the Cost Type and, if one exists, retrieves the value from the *DaysToReminder* column of that record and auto-populates the *Reminder In* field of the *[Add Cost Wizard](Costs#add-cost-wizard)*. The User may remove or edit that value before saving the Cost record, at which point the value is saved to the *DaysToReminder* column of the *Cost* table.