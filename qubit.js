"use strict";
exports.__esModule = true;
var q = require("@qramana/qramana");
var qubit = new q.Qubit({ value: "|0>" });
console.log(qubit.measure());
