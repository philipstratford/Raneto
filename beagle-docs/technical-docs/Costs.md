# Costs

## Costs in the Animal History Timeline
The *Dispense Again* button is only visible if the Cost being viewed was added from a Cost Type (i.e. the record in the _Cost_ table has a value in the _CostTypeID_ column). The option to dispense again is not available for [Custom Costs](#custom-costs).

## Custom Costs
A Custom Cost is a type of ad hoc Cost which a User can add to a [Referral](Referrals.md) or [Client](Clients.md). Unlike all other types of Cost, Custom Costs are not derived from a [Cost Type](Cost%20Types.md) or [Cost Type Package](Cost%20Type%20Packages.md). Instead, the User has total flexibility when adding and editing the Cost to define the description, unit price and so forth. A Custom Cost can be identfied in the _Cost_ table of the database by the fact that both its _CostTypeID_ and _CostTypePackageID_ columns are NULL.

## Editing Costs
A number of factors determine who can edit a Cost, when they are able to do so and which fields they are able to edit. The applicable factors can be determined by following this flow chart.

![Editing Costs](assets/Editing%20Costs.png)