# Animal General Settings
**Feature ID** 3300

## Launched From
- [System Configuration](System%20Configuration.md) > Animal

##Technical Details
Only a User belonging to the [Developers Only Security Group](..\Security.md#developers-only-group) can change the _Animal Height Clinical Parameter Type_ setting. The reason for this is that Animal height measurements are recorded directly against the Animal in the _Animal_._Height_ column (as opposed to measurements of other Clinical Parameter Types, which are stored in the _ClinicalParameter_ table along with the Measurement Unit that was set for that Clincial Parameter Type at the time of the measurement) and therefore changing the Clinical Parameter Type being used for Animal height after height measurements have been recorded would result in spurious data. 

For example, if the Measurement Unit for the Clinical Parameter Type being used for Animal height was "hands" (hh), a User might record that a particular Animal's height was 18.5hh. If the Cinical Parameter Type was subsequently changed to one whose Measurement Unit was "centimetres", when that Animal's record is opened it will appear as if the Animal's height is 18.5cm. Therefore, it if should become necessary to change the Clinical Parameter being used for Animal height, a query would need to be run on the database to convert existing Animal height measurements to the new measurement unit (needless to say that this it is strongly recommended that this is never done!).