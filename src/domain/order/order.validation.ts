import Joi, { ValidationResult } from 'joi';
import { IOrderProps } from './order';
import { BaseOriginSchema, GenericObject, ObjectIdPattern } from '../../types';
import { IOrderDetailProps } from './orderDetail';
import { GetOrderFilters } from '../../repositories/order.repository';
import { dateInputSchema } from '../../utils';

export interface ProcessOrderRequest {
  order: {
    name: string;
    date: string;
  };
  products: {
    product_id: number;
    name: string;
    quantity: string;
    price: string;
    sku: string;
  }[];
  client: {
    first_name: string;
    last_name: string;
    phone: string;
    country: string;
    city: string;
    address: string;
  };
  store: {
    app_id: number;
    name: string;
  };
}

const orderSchema = Joi.object<IOrderProps>({
  orderNumber: Joi.string().optional(),
  storeName: Joi.string().required(),
  agency: Joi.string().optional(),
  agent: Joi.string().optional(),
  client: Joi.object({
    name: Joi.string().required(),
    lastname: Joi.string().optional().allow(''),
    documentNumber: Joi.string().optional().allow(''),
    phone: Joi.string().optional().allow(''),
    country: Joi.string().optional().allow(''),
    department: Joi.string().optional().allow(''),
    province: Joi.string().optional().allow(''),
    address: Joi.string().optional().allow(''),
    reference: Joi.string().optional().allow(''),
    email: Joi.string().optional().allow('')
  }).required(),
  agencyCost: Joi.number().required(),
  advancePayment: Joi.number().required(),
  pendingPayment: Joi.number().required(),
  subTotal: Joi.number().required(),
  discount: Joi.number().required(),
  total: Joi.number().required(),
  orderDetail: Joi.array()
    .items(
      Joi.object({
        productId: Joi.string().optional().allow(''),
        name: Joi.string().required(),
        price: Joi.number().required().min(1),
        quantity: Joi.number().required().min(1),
        externalProductId: Joi.alternatives(Joi.string(), Joi.number()).optional().allow(''),
        sku: Joi.string().required().allow(''),
        comment: Joi.string().optional().allow('')
      })
    )
    .optional(),
  deliveryType: Joi.string().optional().allow(''),
  paymentMethod: Joi.string().optional().allow(''),
  observation: Joi.string().optional().allow(''),
  contactedStatus: Joi.string().optional().allow(''),
  ...BaseOriginSchema
});

const orderDetailValidation = Joi.object<IOrderDetailProps>({
  order: Joi.string().required().pattern(ObjectIdPattern),
  product: Joi.string().optional().pattern(ObjectIdPattern),
  quantity: Joi.number().required(),
  review: Joi.string().optional(),
  customProduct: Joi.object({
    name: Joi.string().required(),
    price: Joi.number().required(),
    externalProductId: Joi.string().optional(),
    sku: Joi.string().required()
  }).optional(),
  ...BaseOriginSchema,
  origin: Joi.string().optional()
}).messages({
  'pattern.base': 'Invalid Id, received {#value} and expected a valid ObjectId'
});

const processOrderSchema = Joi.object<ProcessOrderRequest>({
  order: Joi.object({
    name: Joi.string().required(),
    date: Joi.string().optional()
  }).required(),
  products: Joi.array()
    .items(
      Joi.object({
        product_id: Joi.number().required(),
        name: Joi.string().required(),
        quantity: Joi.string().required(),
        price: Joi.string().required(),
        sku: Joi.string().required()
      })
    )
    .required(),
  client: Joi.object({
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    phone: Joi.string().required(),
    country: Joi.string().required(),
    city: Joi.string().required(),
    address: Joi.string().required()
  }).required(),
  store: Joi.object({
    app_id: Joi.any().optional(),
    name: Joi.string().required()
  }).required()
});

const getOrderFiltersSchema = Joi.object<GetOrderFilters | GenericObject>({
  agency: Joi.string().optional().allow(''),
  agent: Joi.string().optional().allow(''),
  clientName: Joi.string().optional().allow(''),
  clientDocumentNumber: Joi.string().optional().allow(''),
  clientProvince: Joi.string().optional().allow(''),
  clientPhone: Joi.string().optional().allow(''),
  storeName: Joi.string().optional().allow(''),
  orderNumber: Joi.string().optional().allow(''),
  id: Joi.string().optional().allow(''),
  status: Joi.string().optional().allow('')
}).concat(dateInputSchema);

function validateOrder(props: Partial<IOrderProps>): ValidationResult<IOrderProps> {
  return orderSchema.validate(props, { abortEarly: false });
}

function validateOrderDetail(props: IOrderDetailProps): ValidationResult<IOrderDetailProps> {
  return orderDetailValidation.validate(props, { abortEarly: false });
}

export { validateOrder, validateOrderDetail, processOrderSchema, getOrderFiltersSchema };
