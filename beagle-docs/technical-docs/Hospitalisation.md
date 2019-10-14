# Hospitalisation
Hospitalisation is term used to describe the admission of Animals as In Patients. Hospitalisation periods must be linked to a Referral.

## Collected on Discharge
The notion of marking Animals as collected as distinct from admitting and discharging them is important because, especially at the Equine Hospital, an Animal may be discharged from our care clinically but will still be in a stable until collected, and it may be important to know where the animal had been stabled, for example if it is later found to have had a contagious disease.

When the System Configuration setting *EnableCollectedOnDischarge* is TRUE, discharging an Animal will automatically populate the *CollectedTimestamp* and *MarkedCollectedByUserID* columns in the *Hospitalisation* table. Otherwise, these columns will be populated when a User manually clicks the *Mark as Collected* button or the *Arrived for Collection* button. *explain the difference between the buttons!*
