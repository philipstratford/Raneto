# Beagle API - Agresso Interface
## API URL: /api/agresso/{dateString}

## Introduction
This article describes how the Beagle API retrieves and returns Sales Ledger information from Beagle for importing into Agresso.

## Security
The Agresso API requires that the **BeagleAPI** login be granted SELECT permissions on the following tables in each database being included in the interface:
 - Client
 - ClinicInformation
 - BankingReconciliation
 - PaymentType
 - Person
 - SalesLedgerTransaction
 - SalesLedgerTransactionDetail
 - SalesLedgerTransactionType
 - SalesLedgerTransactionVATDetail
 - SystemConfiguration

 ### Beagle Pathology
 The Beagle Pathology database has a slightly different schema and does not include a _Client_ or an _BankingReconciliation_ table. However, it is necessary to additionally grant SELECT permission to the **BeagleAPI** login to the _ReferringPractice_ table in Beagle Pathology databases.

 ## Agresso Tax Codes
 Agresso Tax Codes (_ExternalTaxCode_ in the relevant tables) are configured in System Configuration along with VAT Codes. When a Sales Ledger Transaction is created the configured Agresso Tax Code for each VAT rate is stored in the _SalesLedgerTransactionVATDetail_ table, and this is the code that is exposed in the API as *Tax_Code*. If, for whatever reason, no value is present in the _ExternalTaxCode_ column for a _SalesLedgerTransactionVATDetail_ record where one should exist (bearing in mind that this column is correctly NULL for Sales Ledger Transaction Types which do not have a tax element, like Payments), the dummy value of 'xxx' will be returned in this field. This will likely cause the interface process with Agresso to fail, but at least somebody would be alerted to the issue with the missing Agresso Tax Code.

 ## Description of Functionality
The assembly of the Agresso Interface output is handled by the _AgressoController_. It assembles the data as follows:
1. The _sp_GetSalesLedgerData_ Stored procedure in the _BeagleAPI_ database is called, with the date passed in the URL to the Agresso Interface API sent as a parameter.
2. The Stored Procedure creates and executes a UNION query which returns sales ledger transactions from each database in the _BeagleDatabase_ table where the value in the _Enabled_ is TRUE.
3. A second Stored Procedure, _sp_GetAgressoAccountCodes_, is called from the _BeagleAPI_ database which returns a list of Agresso Account Codes from each enabled Beagle database.
4. The XML feed is constructed, with each 'voucher' comprising a General Ledger transaction, an Accounts Receivable transaction and zero or more Tax transactions.

**Note** that if the Stored Procedure which retrieves the Sales Ledger data from the various Beagle databases fails to get data from any single database, e.g. because the **BeagleAPI* login does not have the required permissions to a table in that database, the API will respond with a `code 500: Internal Server Error` rather than return data from any other databases which it may be able to access. This is by design, so that automated processes don't continue to run for any length of time without anybody noticing that data from a certain database is missing.

 ![Agresso Interface Data Flow](assets/BeagleAPI%20Agresso%20Interface%20Data%20Flow%20v3.png)