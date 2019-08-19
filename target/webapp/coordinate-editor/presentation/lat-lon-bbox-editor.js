"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Copyright (c) Codice Foundation
 *
 * This is free software: you can redistribute it and/or modify it under the terms of the GNU Lesser
 * General Public License as published by the Free Software Foundation, either version 3 of the
 * License, or any later version.
 *
 * This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without
 * even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU
 * Lesser General Public License for more details. A copy of the GNU Lesser General Public License
 * is distributed along with this program and can be found at
 * <http://www.gnu.org/licenses/lgpl.html>.
 *
 **/
var React = require("react");
var styled_components_1 = require("styled-components");
var lat_lon_input_1 = require("./lat-lon-input");
var Common = require("./common-styles");
var Root = Common.BBoxRoot;
var TextGroup = styled_components_1.default.label(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  margin: 0;\n  padding: 0;\n  display: flex;\n"], ["\n  margin: 0;\n  padding: 0;\n  display: flex;\n"])));
var Label = Common.CompactLabel;
var LatLonBBoxEditor = function (_a) {
    var north = _a.north, south = _a.south, east = _a.east, west = _a.west, setBBox = _a.setBBox;
    return (React.createElement(Root, { flexDirection: "column" },
        React.createElement(TextGroup, null,
            React.createElement(Label, null, "North"),
            React.createElement(lat_lon_input_1.LatitudeInput, { value: north, onChange: function (value) {
                    setBBox({
                        north: value,
                        south: south,
                        east: east,
                        west: west,
                    });
                } })),
        React.createElement(TextGroup, null,
            React.createElement(Label, null, "South"),
            React.createElement(lat_lon_input_1.LatitudeInput, { value: south, onChange: function (value) {
                    setBBox({
                        north: north,
                        south: value,
                        east: east,
                        west: west,
                    });
                } })),
        React.createElement(TextGroup, null,
            React.createElement(Label, null, "East"),
            React.createElement(lat_lon_input_1.LongitudeInput, { value: east, onChange: function (value) {
                    setBBox({
                        north: north,
                        south: south,
                        east: value,
                        west: west,
                    });
                } })),
        React.createElement(TextGroup, null,
            React.createElement(Label, null, "West"),
            React.createElement(lat_lon_input_1.LongitudeInput, { value: west, onChange: function (value) {
                    setBBox({
                        north: north,
                        south: south,
                        east: east,
                        west: value,
                    });
                } }))));
};
exports.default = LatLonBBoxEditor;
var templateObject_1;
//# sourceMappingURL=lat-lon-bbox-editor.js.map