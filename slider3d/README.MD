# Interactive Video

An interactive video allows the viewer to interact with the content. This is done through the use of hotspots and branching. Hotspots are clickable areas which lead to more information being revealed whilst branching allows the viewer to choose the direction of the narrative.

## Description

With this util you can create an Interactive Video with it's different options.

- **Jumps**:_ Hotspot on the video that can take you to a different part of the video
- **Links**: Hostpost ont he video that can take you to a differente page/link/url
- **Overalys**" Hotspots on the video that can open an overlay. Inside the overlay you can add regular html.
  
## Getting Started

### Dependencies

- The only dependency this needs is [GSAP3](https://greensock.com/3/) for animations
- The current project also has **SCSS** and **BrowserSync**.

### Installing

```
npm i
```

### Executing program

```
npm start
```

## Making it work

The Video animations are composed on two parts:

- An **html5 video tag** with divs for each of the hotspots or elements that will appear on the page.
- Both the whole section and the sepcific hotpots needs unique **data-id** to be used by the program.
- All the hotspots can be styled using classes.
- An **JSON** file with the following structure/element. One object for each video.
  
```json
[
   {
      "interactiveVideoId": "name", 
      "controls": {
         "controlsId": "control1",
         "autoplay": true or false,
         "control": true or false,
         "markers": true or false
      },
      "hotspots": [
            {
                "id": "leftChoice", 
                "start": 3, 
                "length": 10, 
                "type": "jump" or "overlay" or "link" or "none", 
                "overlayClass": "overlay", 
                "url": "http://google.com", 
                "blank": false or true
                "jumpTo": 80, 
                "initialX": 0, 
                "initialY": 0, 
                "gsapFrom": {
                    "width": 0
                },
                "gsapTo": { 
                    "width": "50%"
                }
            }
        ]
    }
]

```

### Description

- **interactiveVideoId**: Id of the video
- **controlsID**: Id of the contols
- **autoplay**: If the video will autostart
- **control**: If the video controls are presents. If they are not presents, _autoplay_ needs to be set on true or it will never start.
- **markers**: If you want to display the instants the hotspots will appear on the control's time line.
- **hotspots**: The object that describes the hotspot, one for each hotspot.
- **id**: Id of the hotspot (from the data-id);
- **start**: When the hotspot will appear (in seconds)
- **length**: How long the hotspot should be showin (in seconds)
- **type**: _jump_, _overlay_, _link_, _none_, The type of hotspot
- **overlayClass**: for _type:overlay_ the ID of the overlay
- **url**:, for _type:link_ The url where the button will take you
- **blank**: _false_, _true_, for _type:link_ If the link will load on a new page
- **jumpTo**: for _type:jump_ Where the video will jump, (in seconds)
- **initialX**:  X poisition of the element (in percentage of the video width)
- **initialY**: Y poisition of the element (in percentage of the video height)
- **gsapFrom**: Animation instructions for from.gsap     
- **gsapTo**Animation instructions for from.gsap

<br/><br/><br/>
### Keyframe Animations


Because of the dificulty of creating elements that track a specific section or point of the video, we created a keyframe animation helper. By adding the following code anywhere on the page, the _mousetracker_ option will be activated. With this you can track your movment on the video, and it will provide you **duration**, **startpoint** and **keyframes** of the mouse movements so it can be inputed in your json file.

```html
<div w3-include-html="./assets/includes/mousetracker.html"></div>

``` 

<br/><br/>

## Authors

Contributors names and contact info

ex. Miguel Esquirol miguel@digitalsilk.com

<br/><br/>

## Version History

- 0.1
  - Initial Release
- 0.2
  - Loop to be able to have multiple videos in the page/project
  - Loop to be able to have separated controls for different videos
  - Added the autoplay option, and the controls option to hide or show controls
  - Remove ID from the hotspot an replaced them with data-id
  - Fixed the Controls and added a scrubber option on the control
  - Wrote Documentation 
- 0.3
  - Added the option to show or hide the hotspots points on the controls timeline
  - Included a resize event for the animations so positions are recalculated if the screen changes.
  - Created a Mousetracker option to create keyframe animations
  
