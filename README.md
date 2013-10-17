# zView

Yet another jQuery viewer for every kind of content: images, videos, iframes and 
html

## Installation

### Step 1: Include required files

First of all you need to include jQuery, the best choice is the Google CDN:

```html
<!-- jQuery library (as served by Google CDN) -->
<script src="//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
```

Then you can include the *zView* sources directly from the `dist` directory:

```html
<!-- zView Javascript file -->
<script src="/js/jquery.zView.min.js"></script>

<!-- zView CSS file -->
<link rel="stylesheet" href="/css/jquery.zView.min.css">
```

### Step 2: Create HTML markup

This step is really easy, simply put all the contents you want to display inside 
a container:

```html
<div id="zview">
  <img src="/img/pic1.jpg" alt="Image 1">
  <img src="/img/pic2.jpg" alt="Image 2">
  <img src="/img/pic3.jpg" alt="Image 3">
  <img src="/img/pic4.jpg" alt="Image 4">
</div>
```

### Step 3: Call the zView

Call `.zView()` on the container `$('#zview')`, eventually passing an object of options.

```javascript
$(function () {
  $('#zview').zView();
});
```

## Configuration

To configure the plugin you can pass an object to the initialization.
In the following table when an option has a dot it is intended to be part of an
object, so for example `buttons.labels.next` converts to this JSON: `{ buttons: { labels: { next: '' } } }`

Option | Description | Default
--- | --- | :---:
name | The name of that instance of the plugin, used for the style<br>This is usefull when you have more instances of the slider in the same page and want to differentiate them | `'zView'`
theme | The theme name to be used | `'default'`
zIndex | The base z-index of the slider<br>Be carefull, it is the *base* z-index, some elements will be higher than it | `1`
startSlide | The slide from which the slider starts | `0`
transition | The milliseconds that each transition will last | `400`
play | If the slider starts playing its slides | `true`
delay | The amount of milliseconds the slider will wait before play the next content | `5000`
playAfterMove | After a manual slide move, the slider will continue playing? | `false`

### Buttons Configuration

A particular piece of configuration is the one associated with the buttons.
Plase note that *all the options of this table are sub-objects of the `buttons` object*

Option | Description | Default
--- | --- | :---:
htmls.previous | The html entity for the 'previous' button | `'&laquo;'`
htmls.next | The html entity for the 'next' button | `'&raquo;'`
htmls.element | The html entity for the navigator content | `'&middot;'`
htmls.play | The html entity for the 'play' button | `'&#x25BA;'`
htmls.pause | The html entity for the 'pause' button | `'&#x2590;&#x2590;'`
labels.previous | The label for the 'previous' button | `Previous`
labels.next | The label fot the 'next' button | `Next`
labels.play | The label for the 'play' button | `Play`
labels.pause | The label for the 'pause' button | `Pause`
opacity.navigator | The object with the opacity animation for the 'navigator' | See after the table
opacity.playpause | The object with the opacity animation for the 'play/pause' button | See after the table
opacity.previous | The object with the opacity animation for the 'previous' button | See after the table
opacity.next | The object with the opacity animation for the 'next' button | See after the table

The object for the opacity is the following:

```javascript
{
  start: 0.6,           // The opacity value from which the animation starts
  durationStart: 400,   // The duration (in milliseconds) of the transition to the 'start' point
  easingStart: 'swing', // The easing of the transition to the 'start' point
  
  end: 1,               // The opacity value to which the animation ends
  durationEnd: 1,       // The duration (in milliseconds) of the transition to the 'end' point
  easingEnd: 'swing'    // The easing of the transition to the 'end' point
}
```

## API

You can access the API of a particular instance in two ways:

```javascript
// Retrieving the zView instance
var zViewInstance = $('#zview').data('zview');
zViewInstance.next();

// Calling methods as the argument of the jQuery method
$('#zview').zView('next');
```

### Public Methods

As always javascript doesn't give a proper way to differentiate between private and public methods. The convention adopted is that every methods that begins with `_` is private.

Method | Description | Return value
--- | --- | :---:
`next()` | Displays the next content | `this`
`prev()` | Displays the previous content | `this`
`first()` | Displays the first content | `this`
`last()` | Displays the last content | `this`
`stop()` | Stops the playback | `this`
`pause()` | Pauses the playback | `this`
`play()` | Resumes the playback | `this`
`toggle()` | Pauses / Plays the playback | `this`
