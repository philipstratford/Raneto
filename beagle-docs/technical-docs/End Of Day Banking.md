# End Of Day Banking
End of Day Banking is a process which is performed in Beagle to effectively group Payments together to facilitate reconciliation with the University's bank account, ideally allowing Agresso to do so automatically. From a technical perspective the process for this is as follows:

1. Payments (*SalesLedgerTransaction* records) get entered in Beagle throughout the day. Each one has no value in the *EndOfDayBankingID* column, which remains NULL. Payments taken on a PDQ machine have their *PDQMachineID* column populated according to the User's input, thus associating them with the Merchant Number linked to that PDQ Machine in the *PDQMachine* table.

2. When the End Of Day Panel is opened from the Payment Management page, it displays totals of Payments (with Payment Types which are Counter Sales) which have no value in their *EndOfDayBankingID* column, grouped by Payment Type, with PDQ payments separated out.

3. When the User 'signs off' the End Of Day Panel by checking the box to say so and then clicking the Save button, a new record is created in the *EndOfDayBanking* table with the User' ID, a timestamp and the Credit Slip reference entered by the User. The ID of this new record is then written to the *EndOfDayBankingID* column of every Payment where this column is NULL.

4. In the Bank Reconcilation page, when presenting the User with potential matches for bank deposits, for standard bank deposits totals of Counter Payments grouped by *EndOfDayBankingID* are displayed, and for PDQ deposits totals of PDQ Payments grouped by *EndOfDayBankingID* and Merchant Number are shown, in both cases further filtered so as only to present Payments which have not been marked as 'bank reconciled' (this bit is still to be worked out!).

> Note that the Bank Reconciliation page described in step 4 is on the roadmap and prototyped but not currently planned for development.