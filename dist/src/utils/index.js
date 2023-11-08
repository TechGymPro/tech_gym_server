"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatDate = void 0;
function formatDate(date) {
    var d = new Date(date);
    var final = d.toISOString().slice(0, 10);
    return final;
}
exports.formatDate = formatDate;
