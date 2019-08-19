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
var styled_components_1 = require("styled-components");
var toggle_button_1 = require("./toggle-button");
var BBoxRoot = styled_components_1.default.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  margin: 0;\n  padding: 0;\n  display: flex;\n  flex-direction: ", ";\n  min-width: 25rem;\n  min-height: 9.5rem;\n"], ["\n  margin: 0;\n  padding: 0;\n  display: flex;\n  flex-direction: ", ";\n  min-width: 25rem;\n  min-height: 9.5rem;\n"])), function (props) { return props.flexDirection; });
exports.BBoxRoot = BBoxRoot;
var Column = styled_components_1.default.div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  margin: 0;\n  padding: 0;\n  display: flex;\n  flex-direction: column;\n"], ["\n  margin: 0;\n  padding: 0;\n  display: flex;\n  flex-direction: column;\n"])));
exports.Column = Column;
var Row = styled_components_1.default.div(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  margin: 0;\n  padding: 0;\n  display: flex;\n"], ["\n  margin: 0;\n  padding: 0;\n  display: flex;\n"])));
exports.Row = Row;
var Label = styled_components_1.default.div(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n  display: flex;\n  margin: 0;\n  padding: 0;\n  justify-content: flex-end;\n  align-items: center;\n  width: 6em;\n  margin-right: ", ";\n  font-size: ", ";\n"], ["\n  display: flex;\n  margin: 0;\n  padding: 0;\n  justify-content: flex-end;\n  align-items: center;\n  width: 6em;\n  margin-right: ", ";\n  font-size: ", ";\n"])), function (props) { return props.theme.minimumSpacing; }, function (props) { return props.theme.minimumFontSize; });
exports.Label = Label;
var CompactLabel = styled_components_1.default(Label)(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n  width: 4em;\n"], ["\n  width: 4em;\n"])));
exports.CompactLabel = CompactLabel;
var SpacedToggleButton = styled_components_1.default(toggle_button_1.default)(templateObject_6 || (templateObject_6 = __makeTemplateObject(["\n  margin: 0;\n  margin-right: ", ";\n  font-size: ", ";\n  padding: 0 calc(", " / 2);\n  height: auto;\n"], ["\n  margin: 0;\n  margin-right: ", ";\n  font-size: ", ";\n  padding: 0 calc(", " / 2);\n  height: auto;\n"])), function (props) { return props.theme.minimumSpacing; }, function (props) { return props.theme.minimumFontSize; }, function (props) { return props.theme.minimumSpacing; });
exports.SpacedToggleButton = SpacedToggleButton;
var SpacedInputLabelRow = styled_components_1.default.label(templateObject_7 || (templateObject_7 = __makeTemplateObject(["\n  margin: 0;\n  padding: 0;\n  display: flex;\n  align-items: center;\n  margin-bottom: ", ";\n"], ["\n  margin: 0;\n  padding: 0;\n  display: flex;\n  align-items: center;\n  margin-bottom: ", ";\n"])), function (props) { return props.theme.minimumSpacing; });
exports.SpacedInputLabelRow = SpacedInputLabelRow;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7;
//# sourceMappingURL=common-styles.js.map