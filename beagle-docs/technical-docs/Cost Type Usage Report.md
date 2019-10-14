## Cost Type Usage Report
This report lists of all the instances when a specified Cost Type was provided as a Cost. It is the equivalent of Beagle's "Show Treatment Users" option.

## Links to Animal and Client
The report has a hidden parameter named _HostEnvironmentURL_. If no value is passed for this parameter, clicking on the values in the Animal and Client columns will have no effect. However, if a valid Beagle URL prefix is supplied, it is possible to click on an Animal or Client's name and open that entity's record in Beagle.

The valid format for this parameter is the part of the URL for the relevant Beagle environment which appears before the _/animal/_ when viewing an Animal's record page. For example, if the URL for an Animal record in beagle is _https://beagle.liv.ac.uk/equine/animal/12345_ the valid value for the _HostEnvironmentURL_ parameter would be _https://beagle.liv.ac.uk/equine_.