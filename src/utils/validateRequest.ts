import Joi, { ValidationResult } from 'joi';
import { GenericFilters, GenericObject } from '../types';
import { err, ok, Result } from 'neverthrow';

function requestValidator<T>(schema: Joi.ObjectSchema<any>, data: GenericObject): ValidationResult<T> {
  return schema.validate(data, { abortEarly: false, convert: false });
}

function createInstanceOrError<T>(schema: Joi.ObjectSchema<any>, data: GenericObject): Result<T, string> {
  const { error } = requestValidator<T>(schema, data);
  if (error) {
    const errors = error.details.map((detail) => detail.message).join('. ');
    return err<T>(errors);
  }
  return ok<T>(data as T);
}

const dateInputPattern: RegExp = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]) ([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/;

const genericFiltersSchema = Joi.object<GenericFilters>({
  limit: Joi.number().integer().min(1).optional(),
  page: Joi.number().integer().min(1).optional(),
  createdAt: Joi.date().optional(),
  updatedAt: Joi.date().optional()
});

const dateInputSchema = Joi.object({
  toDate: Joi.string().regex(dateInputPattern).optional().messages({
    'string.pattern.base': 'Invalid date format, received {#value} and expected YYYY-MM-DD HH:mm:ss'
  }),
  fromDate: Joi.string().regex(dateInputPattern).optional().messages({
    'string.pattern.base': 'Invalid date format, received {#value} and expected YYYY-MM-DD HH:mm:ss'
  }),
  createdAt: Joi.date().optional(),
  updatedAt: Joi.date().optional()
});

export { createInstanceOrError, genericFiltersSchema, dateInputSchema };
