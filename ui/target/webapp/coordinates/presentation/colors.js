"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var polished_1 = require("polished");
var Black = function (props) {
    return polished_1.readableColor(props.theme.backgroundContent);
};
exports.Black = Black;
var Silver = function (props) { return polished_1.darken(0.2)(White(props)); };
exports.Silver = Silver;
var Grey = function (props) { return polished_1.darken(0.4)(White(props)); };
exports.Grey = Grey;
var White = function (props) { return props.theme.backgroundContent; };
exports.White = White;
var ButtonColor = function (props) { return props.theme.primaryColor; };
exports.ButtonColor = ButtonColor;
var SubmitButtonColor = function (props) { return props.theme.positiveColor; };
exports.SubmitButtonColor = SubmitButtonColor;
//# sourceMappingURL=colors.js.map