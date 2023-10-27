# Scaling Issue

## The Issue

The default scaling of some computers/browsers have a different  values making the whole page/site seem bigger.

## Challengue

Altough some of the issues can be solved using ViewPort units that's not always the case. Some times because we need more precise measuring, some other times because we have some existing legacy code that we can't modify.

<br/><br/>

## Solutions

### Constant Properties

With the use of this mixins we can decide that some properties will remain the same without being affected by the Scaling or Zoom of the page.

```scss

@keep(propertie,value);

@keep(width, 200px)

```

this will affect jus tthe specific property choosen, the rest of the elements will still react to the zoom/scaling of the page.

<br/><br/>

### Scaling components

With the use of this script/mixin convo is possible to scale the whole component to maintain the size without being affected by the Scaling or Zoom on the page.

```html 

<div data-scaleid="component"></div>

```
and

```scss
[data-scaleid="component"] {
    @include scale("component")
}

```


The "data-scaleid" will allow scale down the component and because the scale down leaves an empty space, add a negative margin to the component so it doesn't affect the flow of the page.

<br/><br/>
## Possible Issues

- This mixins and scripts are hijacking the deafult capability of the browser to zoom in and out of the page making them more difficult to use for people with disablities.

- Currently we are just taking control of for zoom breakpoints, if the browser/computer zoom less than 100% or more than 150% it will revert to the regular function.
- The percentage to scale down the numbers are "magic numbers", this will need extra testing.
- Because of Retina Displays, the DPI variables have to be repeated causing extra code.