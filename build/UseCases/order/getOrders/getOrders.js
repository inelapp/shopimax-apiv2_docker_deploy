"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const neverthrow_1 = require("neverthrow");
const getOrdersErrors_1 = require("./getOrdersErrors");
const utils_1 = require("../../../utils");
const getOrdersRequestDto_1 = require("./getOrdersRequestDto");
const domain_1 = require("../../../domain");
class GetOrders {
    orderRepository;
    constructor(orderRepository) {
        this.orderRepository = orderRepository;
    }
    async execute(request, service) {
        try {
            const validRequestOrError = (0, utils_1.createInstanceOrError)(domain_1.getOrderFiltersSchema, request.orderFilters);
            if (validRequestOrError.isErr()) {
                return (0, neverthrow_1.err)(new getOrdersErrors_1.GetOrdersBadRequestError(validRequestOrError.error));
            }
            const orderFilter = this.getFilters(request);
            const result = await this.orderRepository.getOrders(orderFilter);
            return (0, neverthrow_1.ok)(result);
        }
        catch (error) {
            return (0, neverthrow_1.err)(new utils_1.UnexpectedError(error));
        }
    }
    getFilters(request) {
        const clientFilters = ['clientName', 'clientDocumentNumber', 'clientPhone', 'clientProvince'];
        const { orderFilters: { agency, agent, id, orderNumber, status, storeName, fromDate, toDate, ...restClientFilters }, ...restRequestParams } = request;
        const { fromDate: parseFromDate, toDate: parseToDate } = (0, utils_1.getDatefilters)(fromDate, toDate);
        const client = Object.keys(restClientFilters).reduce((acc, key) => {
            if (clientFilters.includes(key) && getOrdersRequestDto_1.ClientPropsTuple[key]) {
                const newKey = getOrdersRequestDto_1.ClientPropsTuple[key];
                acc[newKey] = restClientFilters[key];
            }
            return acc;
        }, {});
        return {
            ...restRequestParams,
            agency,
            agent,
            id,
            orderNumber,
            status,
            storeName,
            fromDate: parseFromDate,
            toDate: parseToDate,
            client: Object.keys(client).length ? client : undefined
        };
    }
}
exports.default = GetOrders;
