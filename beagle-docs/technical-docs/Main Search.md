# Main Search
The search process begins when the user types something in the search box which is included on every main Beagle screen.  The query can contain one or more words of at least one character.  The query will be processed automatically after each keystroke.

The search is passed into the Entity Search stored procedure (_EntitySearch_) with the search term as a parameter, along with parameters for what entity types (e.g. Clients, Animals) should be included in the results.

The database uses Full Text Indexes on the relevant tables to facilitate performant searching. Where the search is required to match to text from multiple fields in a table, for example the first name and last name of a Client, a view with a Full Text Index is used. The stored procedure matches the exact search term on some database columns (e.g. Animal ID) and matches the search term against the start of words in other database columns.