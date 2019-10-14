# Code Base Overview
This article gives an overview of the Projects and Solutions which make up the Beagle code base.

At the highest level the Beagle code repository is organised into folders to logically separate the various products and applications relating to Beagle. These folders are as follows.

## Beagle Core
This folder contains all of the code relating to the core Beagle product itself, including the web application code, the data access layer components, the database and so on.

## Beagle Desktop Client
Contains code relating to the [Beagle Desktop Client](Beagle%20Desktop%20Client.md) Windows application which is installed on desktop computers where silent printing from Beagle is required.

## Beagle Desktop Scanner Client
Contains code relating to the [Beagle Desktop Scanner Client](Beagle%20Desktop%20Scanner%20Client.md), another Windows application which enables documents to be scanned directly into Beagle from a desktop scanner. It is the intention that eventually this functionality is added to the Beagle Desktop Client, at which point this product can be retired.

## Beagle Documentation
Contains the Technical and End User documentation for the Beagle code (including this article!). For more information about Beagle Documentation see [this article](Documentation.md).

## Beagle Downloads
Contains the code for the very small and simple [Beagle Downloads](https://beagle.liv.ac.uk/downloads) web application, from where the latest version of applications which work with Beagle, such as the Beagle Desktop Client, can be downloaded.

## Beagle Laboratory Management Server
Contains the code for the [Beagle Laboratory Management Server](Beagle%20Laboratory%20Management%20Server.md), a simple server-side application designed to support the centralised management of [Laboratory Requests](../EndUser/Laboratory%20Requests.md) in one instance of Beagle.

## Beagle Listener
This is another server-side application which handles all functionality requiring Beagle to "listen" for incoming data from external sources. At present the product is only written to listen for HL7 messages from a PACS and is still in development and not yet deployed anywhere.

## Beagle Version
This is a simple, standalone web application with its own database which is used to manage the version numbers for the various Beagle products and to produce release notes for these.