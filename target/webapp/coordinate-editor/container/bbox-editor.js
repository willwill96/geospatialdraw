"use strict";
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
var Units = require("../units");
var lat_lon_dms_bbox_editor_1 = require("../presentation/lat-lon-dms-bbox-editor");
var lat_lon_bbox_editor_1 = require("../presentation/lat-lon-bbox-editor");
var usng_bbox_editor_1 = require("../presentation/usng-bbox-editor");
var utm_bbox_editor_1 = require("../presentation/utm-bbox-editor");
var bbox_editor_props_1 = require("../bbox-editor-props");
var editorMap = function (unit) {
    switch (unit) {
        case Units.LAT_LON:
            return lat_lon_bbox_editor_1.default;
        case Units.LAT_LON_DMS:
            return lat_lon_dms_bbox_editor_1.default;
        case Units.USNG:
            return usng_bbox_editor_1.default;
        case Units.UTM:
            return utm_bbox_editor_1.default;
        default:
            throw new Error("Unit \"" + unit + "\" not supported!");
    }
};
var BBoxEditor = function (_a) {
    var setExtent = _a.setExtent, extent = _a.extent, unit = _a.unit;
    var _b = bbox_editor_props_1.extentToBBox(extent), north = _b.north, south = _b.south, east = _b.east, west = _b.west;
    var EditorTag = editorMap(unit);
    return (React.createElement(EditorTag, { north: north, south: south, east: east, west: west, setBBox: function (bbox) {
            setExtent(bbox_editor_props_1.bboxToExtent(bbox));
        } }));
};
exports.default = BBoxEditor;
//# sourceMappingURL=bbox-editor.js.map