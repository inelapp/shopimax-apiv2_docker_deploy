"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseDate = parseDate;
const tempo_1 = require("@formkit/tempo");
function parseDate(date, timeZone = 'America/Lima') {
    const zoneDate = (0, tempo_1.tzDate)(date, timeZone);
    return (0, tempo_1.format)(zoneDate, 'DD-MM-YYYY, HH:mm:ss a', 'en');
}
