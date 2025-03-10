"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderMap = void 0;
const parseDate_1 = require("../helpers/parseDate");
class OrderMap {
    static fromDbToDomain(order) {
        return {
            id: order._id,
            orderNumber: order.orderNumber,
            storeName: order.storeName,
            agency: order.agency,
            agent: order.agent?.name?.trim() || '',
            origin: order.origin,
            client: {
                name: order.client.name,
                lastname: order.client.lastname,
                documentNumber: order.client.documentNumber,
                phone: order.client.phone,
                country: order.client.country,
                department: order.client.department,
                province: order.client.province,
                address: order.client.address,
                reference: order.client.reference,
                email: order.client.email
            },
            agencyCost: order.agencyCost,
            advancePayment: order.advancePayment,
            pendingPayment: order.pendingPayment,
            subTotal: order.subtotal,
            discount: order.discount,
            total: order.total,
            orderDetail: order?.orderDetail.map((detail) => detail._id) || [],
            deliveryType: order.deliveryType || '',
            paymentMethod: order.paymentMethod || '',
            observation: order.observation || '',
            contactedStatus: order.contactedStatus || '',
            registerStatus: order.registerStatus || '',
            status: order.status,
            comment: order.comment || '',
            creationDate: (0, parseDate_1.parseDate)(order.createdAt),
            updateDate: (0, parseDate_1.parseDate)(order.updatedAt)
        };
    }
    static fromDbToDomainDetail(order) {
        return {
            id: order._id.toString(),
            orderNumber: order.orderNumber,
            storeName: order.storeName,
            agency: order.agency,
            agent: order.agent?.name?.trim() || '',
            client: {
                name: order.client.name || '',
                lastname: order.client.lastname || '',
                documentNumber: order.client.documentNumber || '',
                phone: order.client.phone || '',
                country: order.client.country || '',
                department: order.client.department || '',
                province: order.client.province || '',
                address: order.client.address || '',
                reference: order.client.reference || '',
                email: order.client.email || ''
            },
            agencyCost: order.agencyCost,
            advancePayment: order.advancePayment,
            pendingPayment: order.pendingPayment,
            subtotal: order.subtotal,
            discount: order.discount,
            total: order.total,
            orderDetail: order?.orderDetail.map((detail) => {
                return {
                    orderDetailId: detail._id?.toString(),
                    productName: detail.product?.name || detail.customProduct?.name || '',
                    productPrice: detail.product?.price || detail.customProduct?.price || 0,
                    externalProductId: detail.product?.externalProductId || detail.customProduct?.externalProductId || null,
                    sku: detail.product?.sku || detail.customProduct?.sku || null,
                    quantity: detail.quantity,
                    comment: detail.comment || '',
                    review: detail.review || ''
                };
            }),
            deliveryType: order.deliveryType || '',
            paymentMethod: order.paymentMethod || '',
            observation: order.observation || '',
            contactedStatus: order.contactedStatus || '',
            registerStatus: order.registerStatus || '',
            status: order.status,
            comment: order.comment || '',
            creationDate: (0, parseDate_1.parseDate)(order.createdAt),
            updateDate: (0, parseDate_1.parseDate)(order.updatedAt)
        };
    }
}
exports.OrderMap = OrderMap;
