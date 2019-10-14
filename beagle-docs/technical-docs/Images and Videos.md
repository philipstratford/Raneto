# Images and Videos
Beagle supports the uploading of images and videos to an [Animal Record](Animal%20Record.md).

## Videos
Beagle supports the uploading of videos in the following file formats:
 - .mp4
 - .webm
 - .ogg

 Vidoes which are uploaded to Beagle are not stored in the database, like images, but are instead saved to a directory. This is because adding videos to the database, with their average large file size, would have an even greater impact on the database size than images. The directory to which videos are saved when uploaded to Beagle must be specified in the _SystemConfiguration.VideoLocation_ column (with no trailing backslash). The specified directory must be configured to allow read/write access for any network user who might be uploading or viewing videos in Beagle.