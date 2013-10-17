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
--- | --- | ---
name | The name of that instance of the plugin, used for the style<br>This is usefull when you have more instances of the slider in the same page and want to differentiate them | `'zView'`
theme | The theme name to be used | `'default'`
zIndex | The base z-index of the slider<br>Be carefull, it is the *base* z-index, some elements will be higher than it | `1`
startSlide | The slide from which the slider starts | `0`
transition | The milliseconds that each transition will last | `400`
play | If the slider starts playing its slides | `true`
delay | The amount of milliseconds the slider will wait before play the next content | `5000`
playAfterMove | After a manual slide move, the slider will continue playing? | `false`
