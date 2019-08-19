"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
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
var ol = require("openlayers");
var turf = require("@turf/turf");
var basic_drawing_control_1 = require("./basic-drawing-control");
var BoundingBoxDrawingControl = /** @class */ (function (_super) {
    __extends(BoundingBoxDrawingControl, _super);
    function BoundingBoxDrawingControl(context, receiver) {
        var _this = _super.call(this, context, receiver) || this;
        _this.extentChanged = _this.extentChanged.bind(_this);
        return _this;
    }
    BoundingBoxDrawingControl.prototype.getGeoType = function () {
        return 'Polygon';
    };
    BoundingBoxDrawingControl.prototype.getShape = function () {
        return 'Bounding Box';
    };
    BoundingBoxDrawingControl.prototype.startDrawing = function (geoJSON) {
        var feature = this.geoFormat.readFeature(geoJSON);
        var extent = feature.getGeometry().getExtent();
        this.setProperties(geoJSON.properties || {});
        this.startDrawingExtent(extent);
    };
    BoundingBoxDrawingControl.prototype.startDrawingExtent = function (extent) {
        this.drawingActive = true;
        var geoJSON = this.extentToGeoJSON(extent);
        var feature = this.geoFormat.readFeature(geoJSON);
        // @ts-ignore ol.interaction.Extent is not in typescript for this version of Open Layers
        var draw = new ol.interaction.Extent({
            extent: feature.getGeometry().getExtent(),
        });
        this.applyPropertiesToFeature(feature);
        if (!this.isEmptyFeature(feature)) {
            this.context.updateFeature(feature);
            this.context.updateBufferFeature(feature);
        }
        this.context.setDrawInteraction(draw);
        this.context.setEvent('draw', 'extentchanged', this.extentChanged);
        this.context.addInteractionsWithoutModify();
    };
    BoundingBoxDrawingControl.prototype.extentChanged = function (e) {
        if (e.extent !== null) {
            this.receiver(this.extentToGeoJSON(e.extent));
            var feature = this.extentToFeature(e.extent);
            this.applyPropertiesToFeature(feature);
            this.context.updateFeature(feature);
            this.context.updateBufferFeature(feature);
        }
    };
    BoundingBoxDrawingControl.prototype.extentToFeature = function (extent) {
        return this.geoFormat.readFeature(this.extentToGeoJSON(extent));
    };
    BoundingBoxDrawingControl.prototype.extentToGeoJSON = function (bbox) {
        var bboxPolygon = turf.bboxPolygon(bbox);
        return {
            bbox: bbox,
            type: 'Feature',
            properties: __assign({}, this.properties, { shape: this.getShape() }),
            geometry: bboxPolygon.geometry,
        };
    };
    return BoundingBoxDrawingControl;
}(basic_drawing_control_1.default));
exports.default = BoundingBoxDrawingControl;
//# sourceMappingURL=bounding-box-drawing-control.js.map