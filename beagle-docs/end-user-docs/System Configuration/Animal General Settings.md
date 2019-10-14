# Animal General Settings
This is a section of the [System Configuration](System%20Configuration.md) module, located under the _Animal_ menu, which allows settings related to Animals in Beagle to be managed.

### Enable Animal Height
When this box is checked, Beagle will allow the height of Animals to be recorded and displayed. When this box is unchecked, no references to Animal height will be visible in the application. If this box is unchecked after Animal height entries have been made those entries will not be lost but will no longer be visible unless the _Enable Animal Height_ setting is enabled again.

### Animal Height Clinical Parameter Type
This allows for setting the [Clinical Parameter Type](Clinical%20Parameter%20Types.md) that will be used for storing Animal height measurements. This setting is only visible if Animal Height recording has been enabled (see above paragraph).

Changing this setting is restricted to Beagle developers only. This is because changing the Animal Height Clinical Parameter Type when Animal height measurement have already been entered will cause those heights to appear incorrect. For example, if Animal heights have been recorded whilst the Animal Height Clinical Parameter was set to a Clinical Parameter Type measured in Hands and this setting is then changed to a Clincial Parameter Type measured in Centimetres, all previously recorded heights would appear to be Centimetres too, leading to some very confusing readings!

### Animal Weight Cinical Parameter Type
This allows for setting the Clinical Parameter Type that will be used for storing Animal weight measurements throughout the application. It is safe to change this setting after Animal weight measurements have been taken because the original measurement unit is stored with weight measurement records.

### Animal Blood Pressure Cinical Parameter Type
This allows for setting the Clinical Parameter Type that will be used for storing Animal blood pressure measurements throughout the application. It is safe to change this setting after Animal blooed pressure measurements have been taken because the original measurement unit is stored with blooed pressure measurement records.

### Enable Animal Registered Name
If this setting is enabled, it will be possible to enter and view an Animal's registered name in the [Animal Record](Animal%20Record.md).

### Enable Animal Food Production
If this setting is enabled, it will be possible to enter and view an Animal's food production status in the Animal Record.

### Enable Animal Passport Number
If this setting is enabled, it will be possible to enter and view an Animal's passport number in the Animal Record.
