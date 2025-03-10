"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPaginateAndFilteredData = getPaginateAndFilteredData;
exports.getDataByFilters = getDataByFilters;
exports.getDataByFilterWithoutPagination = getDataByFilterWithoutPagination;
const mongoose_1 = require("mongoose");
const utils_1 = require("../utils");
async function getQueryToFilterData(filters) {
    const query = {};
    if (filters) {
        if (filters.$ne && typeof filters.$ne === 'object') {
            const neFilters = filters.$ne;
            Object.keys(neFilters).forEach((key) => {
                const value = neFilters[key];
                if (value !== undefined && value !== null) {
                    query[key] = { $ne: value };
                    // remove $ne key from query
                    delete neFilters[key];
                }
            });
        }
        Object.keys(filters).forEach((key) => {
            const value = filters[key];
            if (value !== undefined && value !== null) {
                if (typeof value === 'object' && !Array.isArray(value)) {
                    Object.keys(value).forEach((subKey) => {
                        const subValue = value[subKey];
                        if (subValue !== undefined && subValue !== null) {
                            const nestedKey = `${key}.${subKey}`;
                            if (typeof subValue === 'string' && !(0, mongoose_1.isValidObjectId)(subValue)) {
                                query[nestedKey] = { $regex: subValue, $options: 'i' };
                            }
                            else {
                                query[nestedKey] = subValue;
                            }
                        }
                    });
                }
                else if ((0, utils_1.isValidDateString)(value)) {
                    // @ts-ignore
                    const fromDate = filters.fromDate;
                    // @ts-ignore
                    const toDate = filters.toDate;
                    query.createdAt = { $gte: fromDate, $lte: toDate };
                }
                else if (typeof value === 'string' && key !== 'status' && !(0, mongoose_1.isValidObjectId)(value)) {
                    query[key] = { $regex: value, $options: 'i' };
                }
                else if ((0, mongoose_1.isValidObjectId)(value) && (key === 'id' || key === '_id')) {
                    query._id = value;
                }
                else {
                    query[key] = value;
                }
            }
        });
    }
    return query;
}
async function getPaginateAndFilteredData(page = 1, limit = 10, model, filters, populateOptions) {
    const query = await getQueryToFilterData(filters);
    console.log('query', query);
    const queryString = model.find(query);
    if (populateOptions && populateOptions.length > 0) {
        populateOptions.map((prop) => queryString.populate(prop));
    }
    const totalRecords = await model.countDocuments(query);
    const totalPages = Math.ceil(totalRecords / limit);
    const data = await queryString
        .skip((page - 1) * limit)
        .limit(limit)
        .sort({ createdAt: -1 });
    return {
        data,
        page,
        limit,
        totalRecords,
        totalPages
    };
}
async function getDataByFilterWithoutPagination(model, filters, populateOptions) {
    const query = await getQueryToFilterData(filters);
    const queryString = model.find(query);
    if (populateOptions && populateOptions.length > 0) {
        populateOptions.map((prop) => queryString.populate(prop));
    }
    const data = await queryString;
    return data;
}
async function getDataByFilters(model, filters, populateOptions, session) {
    const query = await getQueryToFilterData(filters);
    if (filters) {
        const orConditions = [];
        if (orConditions.length > 0) {
            query.$or = orConditions;
        }
    }
    console.log('query', JSON.stringify(query));
    const queryString = model.findOne(query, null, { session });
    if (populateOptions && populateOptions.length > 0) {
        populateOptions.map((prop) => queryString.populate(prop));
    }
    const response = await queryString;
    return response;
}
