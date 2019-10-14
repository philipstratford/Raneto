# Beagle.js Script
Beagle.js is a Javascript file in the BeagleUI project's code which includes utilities for easily adding functionality to Views within the application.

## Widget Panels
Widget Panels are the sliding panels which are used within Beagle to display forms, wizards and other user input interfaces. The Search Results pane which appears when a search term is entered is also a Widget Panel, but it has its own special properties and is treated a little differently.

### Search
Most functionality regarding the Search Results Panel is unavailable through APIs. However, one function is available - call the function `closeSearchResults` to cause the Search Results Panel to slide up and disappear.

### New Widget Panels
It is easy to create a new Widget Panel and populate it with content. Simply add `data-toggle="widgetpanel"` to an element so that clicking it will create and display a new Widget Panel. Additionally add the `data-url` attribute and specify the URL of the file containing the page to be displayed in the new Widget Panel. The `data-url` attribute is optional, but if it isn't specified the Widget Panel will obviously be empty, since no content has been provided for it.

#### Example
```html
<a href="#" class="btn btn-default" role="button" data-toggle="widgetpanel" data-url="@Url.Action("New","Address")">New address</a>
```

### Large Widget Panels
Instantiate double-width Widget Panels (only when absolutely necessary!) by replacing `data-toggle="widgetpanel"` with `data-toggle="widgetpanellarge"`.

### Informational Widget Panels
These are a special kind of Widget Panel intended purely for displaying additional information relevant to an existing open Widget Panel. Some special conditions apply to Informational Widget Panels:
* Only one Informational Widget Panel may be displayed at a time. If an Informational Widget Panel is instantiated when one is already on screen, the existing one will be closed.
* Closing any Widget Panel will also close any open Informational Widget Panels.
* When an Informational Widget Panel is displayed, the controls in the last 'normal' Widget Panel are not disabled.

To instantiate an Informational Widget Panel, use `data-toggle="widgetpanelinformational"`.

### Close Widget Panel
Add `data-dismiss="widgetpanel"` to any element within the content of a Widget Panel to cause clicking that element to close its parent Widget Panel. This attribute is automatically added to the Close button in the top-right corner of every new Widget Panel.

#### Example
```html
<a href="#" class="btn btn-default" role="button" data-dismiss="widgetpanel">Close this panel</a>
```

### Close Widget Panel and Open a New One
Sometimes you want to close an existing Widget Panel and then immediately generate a new one. This is easily achieved by combining the above two methods, i.e. add a `data-toggle="widgetpanel"`, `data-url` and a `data-dismiss="widgetpanel"` attribute to the element. This will cause the ancestor Widget Panel to close and then immediately generate a new Widget Panel containing the content specified in the `data-url` attribute.

### Close All Widget Panels
Add `data-dismiss="searchresults"` to an element to cause clicking that element to close all visible Widget Panels, including the Search Results panel.

#### Example
```html
<a href="#" class= btn btn-default" role="button" data-dismiss="searchresults">Close all panels</a>
```

## Tables
### Expandable Tables
Add `.table-expandable` to a table to make enable collapsible row functionality. Rows should be grouped in `<tbody>` elements, ideally with each group containing a single master and a single, expandable child row (multiple master or child rows are possible, but functionality may not be quite as expected). Add `.row-expandable` to the child rows which should be hidden by default but revealed as required, and add the attribute `data-toggle="tablerow"` to an element in the master row which will reveal the expandable child row when clicked.

#### Example
```html
<table class="table table-expandable table-expandable-striped table-expandable-hover" >
    <thead>
        <tr>
            <th>Animal</th>
            <th>Client</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><a href="#">Duke</a> <span class="caret" data-toggle="tablerow"></span></td>
            <td><a href="#">Jones</a></td>
        </tr>
        <tr class="row-expandable info">
            <td colspan="2">
                <div>
                    <button class="btn btn-primary btn-sm">Test</button>
                </div>
            </td>
        </tr>
    </tbody>
    <tbody>
        <tr>
            <td><a href="#">Lola</a> <span class="caret" data-toggle="tablerow"></span></td>
            <td><a href="#">Thompson</a></td>
        </tr>
        <tr class="row-expandable info">
            <td colspan="2">
                <div>
                    <button class="btn btn-primary btn-xs">Test</button>
                </div>
            </td>
        </tr>
    </tbody>
    <tbody>
        <tr>
            <td><a href="#">Lady</a></td>
            <td><a href="#">Chalmers</a></td>
        </tr>
    </tbody>
    <tbody>
        <tr>
            <td><a href="#">Paddy</a></td>
            <td><a href="#">Harris</a></td>
        </tr>
    </tbody>
</table>
```
Note that to add zebra striping and hover functionality to the expandable table, use the `.table-expandable-striped` and `.table-expandable-hover` classes respectively, rather than the `.table-striped` and `.table-hover` classes.

Also note that the expandable rows have the class `.info`, provided as part of Bootstrap.css, and that the code which expands these rows also adds the same class to the parent row, so that they appear grouped together. If a different class is desired, the code in Beagle.js will need to be changed.

### Multiselect
Add the data attribute `data-multiselect="true"` to the expandable table to allow multiple rows to be expanded at the same time.

#### Example
```html
<table class="table table-expandable" data-multiselect="true" >
...
</table>
```
### Selectable Tables
To allow a table's rows to become 'selected' (i.e. highlighted) when clicked on, add the `.table-selectable` class to the table.

#### Example
```html
<table class="table table-striped table-hover table-condensed table-selectable">
    <thead>
        <tr>
            <th>Animal</th>
            <th>Client</th>
         </tr>
     </thead>
     <tr>
         <td><a href="#">Poppy</a></td>
         <td><a href="#">Baxter</a></td>
     </tr>
     <tr>
         <td><a href="#">Lucky</a></td>
         <td><a href="#">Grantham</a></td>
     </tr>
</table>
```

## Filtering
### Filter Groups
Beagle uses filters to allow users to toggle visibility of different types of data within a rich data view. The elements which make up the filters can be placed within an element with the `data-toggle="filter"` attribute set to form a filter group. The filter group container must also have the `data-target` attribute set to specify the target data container (e.g. a table).

Each clickable filter within the filter group must have the `data-filtervalue` attribute set. When the filter is clicked, elements within the target data container with the same value specified in the `data-filtervalue` attribute will be hidden or shown. This allows the filters to be databound to a dataset of possible values that might appear in the data container, and the records in the data container to have their `data-filtervalue` attribute databound correspondingly.

Filter groups align well with [Bootstrap's toggle buttons](http://getbootstrap.com/javascript/#buttons).

A limitation of this filtering is that it only allows filtering on one data field, that is to say that the filters in a filter group must be mutually exclusive. If you need to filter on more than one data field (e.g. Breed and Gender) you need to write more specific filters.

#### Example
```html
<div data-toggle="filter" data-target="#timeline">
    <div class="btn-group-vertical" data-toggle="buttons">
        <label class="btn btn-default btn-filter active" data-filtervalue="1">
            <input type="checkbox" autocomplete="off" />Notes
        </label>
        <label class="btn btn-default active" data-filtervalue="2">
            <input type="checkbox" autocomplete="off" />Treatments
        </label>
        <label class="btn btn-default active" data-filtervalue="3">
            <input type="checkbox" autocomplete="off" />Attachments
        </label>
        <label class="btn btn-default active" data-filtervalue="4">
            <input type="checkbox" autocomplete="off" />Other
        </label>
    </div>
</div>

<div id="timeline" class="timeline col-sm-6" style="border-right:2px solid #ccc;">
    <ul>
        <li>
            <div>Referral: Vomiting</div>
            <ul>
                <li>
                    <div>10th December 2014</div>
                    <ul>
                        <li data-filtervalue="3">Discharge Instruction</li>
                        <li data-filtervalue="4">Animal discharged</li>
                    </ul>
                </li>
                <li>
                    <div>9th December 2014</div>
                    <ul>
                        <li data-filtervalue="2">Morphine 10%</li>
                        <li data-filtervalue="1">Duke is doing well, can go home tomorrow...</li>
                    </ul>
                </li>
            </ul>
        </li>
    </ul>
</div>
```

### Select All or None
Adding an element to the filter group with the `data-filtervalue` value set to "all" will allow all filters to be de-activated (i.e. show ALL data) when clicked on the rendered page. Similarly, clicking an element with the `data-filtervalue` attribute set to "none" will activate all filter (i.e. show NO data).

#### Example
```html
<div data-toggle="filter" data-target="#timeline">
    <div class="btn-group-vertical" data-toggle="buttons">
        <div class="btn-group">
            <button class="btn btn-default" data-filtervalue="all">All</button>
            <button class="btn btn-default" data-filtervalue="none">None</button>
        </div>
        <label class="btn btn-default btn-filter active" data-filtervalue="1">
            <input type="checkbox" autocomplete="off" />Notes
        </label>
        <label class="btn btn-default active" data-filtervalue="2">
            <input type="checkbox" autocomplete="off" />Treatments
        </label>
        <label class="btn btn-default active" data-filtervalue="3">
            <input type="checkbox" autocomplete="off" />Attachments
        </label>
        <label class="btn btn-default active" data-filtervalue="4">
            <input type="checkbox" autocomplete="off" />Other
        </label>
    </div>
</div>

<div id="timeline" class="timeline col-sm-6" style="border-right:2px solid #ccc;">
    <ul>
        <li>
            <div>Referral: Vomiting</div>
            <ul>
                <li>
                    <div>10th December 2014</div>
                    <ul>
                        <li data-filtervalue="3">Discharge Instruction</li>
                        <li data-filtervalue="4">Animal discharged</li>
                    </ul>
                </li>
                <li>
                    <div>9th December 2014</div>
                    <ul>
                        <li data-filtervalue="2">Morphine 10%</li>
                        <li data-filtervalue="1">Duke is doing well, can go home tomorrow...</li>
                    </ul>
                </li>
            </ul>
        </li>
    </ul>
</div>
```
## Miscellaneous

### Load Pane Content
Beagle's UI features 'panes', in the same vein as Outlook's Preview Pane, which displays content relating to a selected item elsewhere on the screen. This is easily achieved by adding the `data-target="pane"` attribute to an element. When an element with this attribute is clicked, the URL specified in the `data-url` attribute of the same element is loaded using AJAX into the element specified in the same element's `data-target` attribute. If either the `data-target` or `data-url` attributes aren't provided, the function does nothing when the element is clicked.

To load content using tabs, use the [[Development:Beagle.js#Tab_Pane|Tab Pane]] plugin instead.

#### Example
```html
<table class="table table-striped table-hover table-condensed table-selectable">
    <thead>
        <tr>
            <th>Animal</th>
            <th>Client</th>
         </tr>
     </thead>
     <tr data-toggle="pane" data-target="#actionDetailsPane" data-url="@Url.Action("ActionPaneLabResult", "Home")">
         <td><a href="#">Poppy</a></td>
         <td><a href="#">Baxter</a></td>
     </tr>
     <tr data-toggle="pane" data-target="#actionDetailsPane" data-url="@Url.Action("Event", "Widget")">
         <td><a href="#">Lucky</a></td>
         <td><a href="#">Grantham</a></td>
     </tr>
</table>

<div id="actionDetailsPane"></div>
```

### Auto-Hide Panel
Use the Auto-Hide Panel functionality to create a panel hidden off the right-hand edge of the screen which is shown when the mouse cursor hovers over the visible tab. The Auto-Hide Panel relies on the `.autohide` CSS classes being used in the construction of the tab and panel, as shown in the example below, although these classes leave quite a lot of scope for customisation.

#### Example
```html
<div class="autohide">
    <div class="autohidetab">
        <h4><span class="glyphicon glyphicon-menu-hamburger"></span></h4>
    </div>
    <div class="autohidecontent">
        <button class="btn btn-primary btn-block">Option 1</button>
        <button class="btn btn-primary btn-block">Option 2</button>
        <button class="btn btn-primary btn-block">Option 3</button>
        <button class="btn btn-primary btn-block">Option 4</button>
    </div>
</div>
```

### Wizard
Wizard is a small jQuery plugin which improves the appearance of UI wizards created using [Bootstrap's Carousel](http://getbootstrap.com/javascript/#carousel) functionality. It determines the height of the tallest slide within the wizard and then sets the height of all of the slides to match, so that the wizard 'footer', containing the Previous and Next controls, is always in the same position on each slide.

This plugin makes use of the [jQuery.Actual](http://dreamerslab.com/blog/en/get-hidden-elements-width-and-height-with-jquery/) plugin in order to determine the heights of all the wizard's slides whilst they're hidden.

**Opt-in functionality**
For performance reasons, the Wizard plugin is opt-in, meaning you must initialize it yourself.  One way to initialize a wizard would be to select it using its id:
```js
$(function() {
    $("#myWizard").wizard();
});
```

### Splitscreen
Splitscreen is a small jQuery plugin which allows content on a page to be split horizontally so that the sections can be resized vertically. At the moment, no functionality for splitting a screen vertically for horizontal resizing is included.

The plugin makes use of jQuery-UI (including jQuery-UI CSS, for the resizing) and [jquery.proximity](https://github.com/padolsey/jquery.fn/tree/master/proximity-event) for fading in visibility as the cursor is in the proximity of the diving line.

**Opt-in functionality**
For performance reasons, the Splitscreen plugin is opt-in, meaning you must initialize it yourself. One way to initialize would be to add it to a `div` using its id:
```js
$(function() {
    $("#resizable").splitscreen();
});
```

#### Example  
**HTML**
```html
<div id="resizable" class="row">
    <div class="col-sm-12">
        <p>This section is resizable. Better put a lot more content here for it to be worthwhile, though!</p>
    </div>
</div>
<div class="row">
    <div class="col-sm-12">
        <p>Resizing the top section of this page will hide or reveal more or less of this section.</p>
    </div>
</div>
```
**jQuery**
```js
$(function() {
    $("#resizable").splitscreen();
})
```

### Tab Link
Bootstrap allows the simple creation of tab navigation. This extension allows tabs to be triggered from anywhere on a page, not just within the `tabpanel` element. Simply add `data-tablink='true'` to a hyperlink which has the target tab name specied in its `href` attribute, and add a `data-target` attribute which specifies the id of the unordered list which is the tab navigation (i.e. the unordered list with the `.nav-tabs` class).

#### Example
```html
<a href="#tab1" data-tablink="true" data-target="#testTabs">Go to Tab 1</a>

<div role="tabpanel">
    <ul class="nav nav-tabs" role="tablist" id="testTabs">
        <li role="presentation"><a href="#tab1" aria-controls="tab1" role="tab" data-toggle="tab">Tab 1</a></li>          
        <li role="presentation"><a href="#tab2" aria-controls="tab2" role="tab" data-toggle="tab">Tab 2</a></li>
    </ul>
        
    <div class="tab-content">
        <div role="tabpanel" class="tab-pane active" id="tab1">
            Tab Panel 1 content
        </div>
        <div role="tabpanel" class="tab-pane active" id="tab2">
            Tab Panel 2 content
        </div>
    </div>
</div>
```

### Tab Pane
This plugin extends the functionality of [Bootstrap tabs](http://getbootstrap.com/javascript/#tabs) so that when a tab is clicked, content is loaded using AJAX into the related tab content panel. The plugin also ensures that the content relating to the tab which is active when the tabs are first loaded (i.e. the tab with the .active class) is loaded and displayed initially.

**Opt-in functionality**
For performance reasons, the Tab Pane plugin is opt-in, meaning you must initialize it yourself. One way to initialize a wizard would be to select it using its id:
```js
$(function() {
    $("#myTabs").tabpane();
});
```

For the functionality to work correctly, each tab must also include a `data-url` attribute specifying the URL of the content to be loaded into the tab content panel.

#### Example
```html
<div role="tabpanel">
    <ul class="nav nav-pills" role="tablist">
        <li role="presentation" class="active"><a href="#tab1" role="tab" data-toggle="tab" 
            data-url="@Url.Action("ReadOnly","ContactRecord")">Contact Record</a></li>
        <li role="presentation" ><a href="#tab2" role="tab" data-toggle="tab" 
            data-url="@Url.Action("ReadOnly","ClinicalNote")">Clinical Note</a></li>
    </ul>
</div>
                    
<div class="tab-content">
    <div role="tabpanel" class="tab-pane active" id="tab1">
        Loading content, please wait.
    </div>
    <div role="tabpanel" class="tab-pane" id="tab2">
        Loading content, please wait.
    </div>
</div>

<script>
    $(".nav-pills").tabpane();
</script>
```

### Confirm Delete
Automates the process of getting user confirmation for an action, e.g. deleting something, when a button is clicked. When an element with `data-confirm='showconfirm'` is clicked, it and all of its siblings are hidden, and a sibling `div` with the class `confirm-div` is displayed. Child elements within the `confirm-div` container with the attribute `data-confirm='hideconfirm'` will revert the displayed elements to their original state.

#### Example
```html
<div class="text-right" >
    <button class="btn btn-default btn-sm" data-dismiss="widgetpanel">Cancel</button>
    <button class="btn btn-sm btn-danger" data-confirm="showconfirm">Delete</button>
    <button class="btn btn-sm btn-primary">Save</button>
    <div class="confirm-div">
        <button class="btn btn-sm btn-default" data-confirm="hideconfirm">Cancel</button>
        <button class="btn btn-sm btn-danger" data-confirm="hideconfirm">Really Delete?</button>
    </div>
</div>
```
