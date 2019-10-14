# Animal-Client Relationship Types

**Feature ID** 3700

## Launched From

- [System Configuration](System%20Configuration.md) > Animal

## Available Features

- [Export Animal-Client Relationship Types](Export%20Animal-Client%20Relationship%20Types.md)

- [Add Animal-Client Relationship Type](Add%20Animal-Client%20Relationship%20Type.md)

- [Edit Animal-Client Relationship Type](Edit%20Animal-Client%20Relationship%20Type.md)

## Technical Details
The configuration page in System Configuration only shows two columns for Animal-Client Relationship Types - Description and Sort Order. The corresponding database table (_AnimalClientRelationshipType_) contains two additional columnns of note: _SystemProtected_ and _UserSelectable_.

If a record's _SystemProtected_ value is TRUE, the record is not editable in System Configuration (and therefore cannot be deleted either). This column is intended for allowing develepors to preent Users from altering records which are required for the application to function correctly. For example, when an Animal's ownership is changed under certain circumstances, a Client-Animal relationship is automatically created so that the old owner is shown with the Client-Animal Relationship Type "Previous Owner". That Client-Animal Relationship Type is therefore protected.

If a record's _UserSelectable_ value is TRUE, it will be available for selection by Users when creating or editing a new Client-Animal relationship. New records created by Users in System Configuration will automatically have the _UserSelectable_ column set to TRUE.

It's probably obvious that there will be a strong correlation between the values in these two columns - most records which are _SystemProtected_ are also likely not to be _UserSelectable_ - but this isn't certain to always be the case.