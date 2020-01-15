# GeospatialDraw

## Geospatial map drawing library

GeospatialDraw is library of tools for drawing geometric shapes on a map. It provides a library of classes, methods, and React hooks for developing
a UI for editing geometric shapes, both through on screen forms and via mouse interactions on an interactive map. All of these interfaces standardize on *GeometryJSON* (see documentation below) as the format for geometric data.

For the map interface a suit of classes are provided which create custom interactions in OpenLayers producing a rich user experience for drawing and editing Polygons, Lines, Bounding Boxes, Circles, and Points. Additionally support code is provided to develop a menu for drawing these shapes on a map.

Editing the coordinates of the various geometric shapes is supported in the units of Latitude/Longitude in decimal format, degrees minutes seconds format, and coordinates in UTM, UPS, USNG and MGRS. A library of React hooks and functions make the process of developing a UI for editing these coordinates on *GeometryJSON* objects much easier.

# Folders

 * lib/drawing - Tools for creating drawing interactions for geometric shapes on a map.
 * lib/coordinates - Boilerplate code for generating UI components for manipulating GeometryJSON in all of the supported coordinate formats.
 * lib/menu - Boilerplate code for generating a drawing menu for 'lib/drawing'.
 * lib/renderer - An OpenLayers GeometryJSON renderer.
 * lib/shapes - Methods and type definitions for manipulating and identifying geometric shapes in GeometryJSON.
 * lib/geometry - Methods and type definitions for manipulating GeometryJSON.

## Documentation

Documentation: https://unpkg.com/geospatialdraw@0.5.5/docs/index.html

## UI Components

See `ui` folder and `geospatialdraw-ui` package for example UI Components.

## Installation

`npm install geospatialdraw`

## Development

`yarn build:all`

## Deploy

**Note:** Be certain to update version number in `package.json` and `README.md` documentation link.

`yarn publish`
