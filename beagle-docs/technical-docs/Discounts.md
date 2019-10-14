# Discounts
Discounts are applied when Costs are added.

Discounts may be applied to Costs by one (and only one) of two mechanisms:
* Client belongs to a Discount Group (the *DiscountGroupID* column of the *Client* record is populated) and the Cost being added is linked to a Cost Type which belongs to a Cost Type Category that is associated with that Discount Group (there is a record in the *DiscountGroup_CostTypeCategory* table).
* An ad hoc discount is applied to Cost by the User when it is added.

In either case, Discounts are calculated before VAT is applied, which is to say that they are deducted at the Cost level when Costs are added, not when the Cost is invoiced. This is because  we need to display a Client's balance at any given time including discounts.

The undiscounted Unit Price and Total price are stored in the *Cost* table regardless of whether a discount was applied. If a discount was applied, the rate and amount of the discount (*DiscountPercentage* and *DiscountAmount* are also stored in the *Cost* table, so the discounted total for the Cost can be determined by deducting the *DiscountAmount* from the *TotalPrice*.

The *Cost* table also records the Discount Group ID if the discount came from a Discount Group. A blank *DiscountGroupID* column means the discount was ad hoc. 

Discounts are only applied to the Unit Price of the Cost. Discounts do not apply to supplementary charges like injection and dispense fees.