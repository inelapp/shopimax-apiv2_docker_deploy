"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDatefilters = exports.isValidDateString = void 0;
const tempo_1 = require("@formkit/tempo");
const isValidDateString = (value) => {
    if (typeof value !== 'string')
        return false;
    const dateFormat = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:[+-]\d{2}:\d{2}|Z)$/;
    if (!dateFormat.test(value))
        return false;
    const date = new Date(value);
    return !isNaN(date.getTime());
};
exports.isValidDateString = isValidDateString;
const formatDateToFilter = (date) => {
    return (0, tempo_1.format)({
        date,
        format: 'YYYY-MM-DDTHH:mm:ssZ',
        tz: 'America/Lima',
        locale: 'en'
    });
};
const getDatefilters = (fromDate, toDate, zone = 'America/Lima') => {
    let parsedFromDate = formatDateToFilter((0, tempo_1.monthStart)((0, tempo_1.tzDate)(new Date(), zone)));
    let parsedToDate = formatDateToFilter((0, tempo_1.dayEnd)((0, tempo_1.tzDate)(new Date(), zone)));
    if (fromDate && toDate) {
        parsedFromDate = formatDateToFilter((0, tempo_1.tzDate)(fromDate, zone));
        parsedToDate = formatDateToFilter((0, tempo_1.tzDate)(toDate, zone));
    }
    else if (fromDate) {
        parsedFromDate = formatDateToFilter((0, tempo_1.tzDate)(fromDate, zone));
    }
    else if (toDate) {
        parsedToDate = formatDateToFilter((0, tempo_1.tzDate)(toDate, zone));
    }
    return {
        fromDate: parsedFromDate,
        toDate: parsedToDate
    };
};
exports.getDatefilters = getDatefilters;
