import { boolean, number } from 'joi';
import { HOST, SWAGGER_SCHEMA } from '../../../config';

export default {
  swagger: '2.0',
  info: {
    version: '1.0.0',
    title: 'API shopimax',
    description: 'API Documentation'
  },
  host: HOST,
  basePath: '/api/v1',
  schemes: [SWAGGER_SCHEMA],
  consumes: ['application/json'],
  produces: ['application/json'],
  paths: {
    '/auth/roles':{
      get: {
        summary: 'Obtener todos los roles',
        tags: ['Auth'],
        responses: {
          '200': {
            description: 'Ok',
            schema: {
              type: 'object',
              properties: {
                success: {
                  type: 'boolean',
                  example: true
                },
                result: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      id: {
                        type: 'string',
                        example: '67cd3fc50c2034d6c427eff9'
                      },
                      name: {
                        type: 'string',
                        example: 'asesor'
                      },
                      description: {
                        type: 'string',
                        example: 'Asesor de ventas'
                      },
                      permissions: {
                        type: 'array',
                        items: {
                          type: 'string'
                        }
                      },
                      status: {
                        type: 'string',
                        example: 'active'
                      },
                      creationDate: {
                        type: 'string',
                        example: '09-03-2025, 00:00:00 am'
                      },
                      updateDate: {
                        type: 'string',
                        example: '09-03-2025, 00:00:00 am'
                      }
                    }
                  }
                }
              }
            }
          },
          '400': {
            description: 'Bad Request',
            schema: {
              $ref: '#/definitions/BadRequest'
            }
          }
        }
      }
    },
    '/auth/signup': {
      post: {
        summary: 'Registrar un nuevo usuario (asignar usuario a asesor)',
        tags: ['Auth'],
        parameters: [
          {
            name: 'body',
            in: 'body',
            required: true,
            schema: {
              type: 'object',
              properties: {
                username: { type: 'string', example: 'Jhon' },
                email: { type: 'string', example: 'jhon.doe@gmail.com' },
                password: { type: 'string', example: 'Password20025' },
                roles: { type: 'array', items: { type: 'string' }, example: ['67cd3fc50c2034d6c427eff9'] },
              }
            }
          }
        ],
        responses: {
          '200': {
            description: 'Ok',
            schema: {
              type: 'object',
              properties: {
                success: {
                  type: 'boolean'
                },
                result: {
                  $ref: '#/definitions/AuthSignupResponse'
                }
              }
            }
          },
          '400': {
            description: 'Bad Request',
            schema: {
              $ref: '#/definitions/BadRequest'
            }
          }
        }
      }
    },
    '/orders/{id}': {
      get: {
        summary: 'Obtener una orden por ID',
        tags: ['Order'],
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            type: 'string',
            description: 'ID de la orden'
          }
        ],
        responses: {
          '200': {
            description: 'Ok',
            schema: {
              type: 'object',
              properties: {
                success: {
                  type: 'boolean'
                },
                result: {
                  $ref: '#/definitions/Order'
                }
              }
            }
          },
          '400': {
            description: 'Bad Request',
            schema: {
              $ref: '#/definitions/BadRequest'
            }
          },
          '404': {
            description: 'Not Found',
            schema: {
              $ref: '#/definitions/NotFoundError'
            }
          }
        }
      }
    },
    '/orders': {
      get: {
        summary: 'Obtener todas las órdenes',
        tags: ['Order'],
        parameters: [
          {
            name: 'page',
            in: 'query',
            required: false,
            type: 'number',
            description: 'Número de página',
            example: 1
          },
          {
            name: 'limit',
            in: 'query',
            required: false,
            type: 'number',
            description: 'Límite de resultados por página',
            example: 10
          },
          {
            name: 'id',
            in: 'query',
            required: false,
            type: 'string',
            description: 'ID de la orden',
            example: '67c92b0f03c8afb1b5cab5a6'
          },
          {
            name: 'orderNumber',
            in: 'query',
            required: false,
            type: 'string',
            description: 'Código o número de la orden'
          },
          {
            name: 'storeName',
            in: 'query',
            required: false,
            type: 'string',
            description: 'Nombre de la tienda',
            example: 'shopimax'
          },
          {
            name: 'agency',
            in: 'query',
            required: false,
            type: 'string',
            description: 'Nombre de la agencia',
            example: 'SHALOM'
          },
          {
            name: 'agent',
            in: 'query',
            required: false,
            type: 'string',
            description: 'Id de asesor',
            example: '668719b8eee69c1a6c4fdafe'
          },
          {
            name: 'clientName',
            in: 'query',
            required: false,
            type: 'string',
            description: 'Nombre del cliente',
            example: 'CRHISTIAN FRAN'
          },
          {
            name: 'clientDocumentNumber',
            in: 'query',
            required: false,
            type: 'string',
            description: 'Número de documento del cliente',
            example: '48420166'
          },
          {
            name: 'clientPhone',
            in: 'query',
            required: false,
            type: 'string',
            description: 'Teléfono del cliente',
            example: '935229840'
          },
          {
            name: 'clientProvince',
            in: 'query',
            required: false,
            type: 'string',
            description: 'Provincia del cliente',
            example: 'HUANUCO'
          },
          {
            name: 'status',
            in: 'query',
            required: false,
            type: 'string',
            description: 'Estado de la orden',
            example: 'nuevo'
          },
          {
            name: 'fromDate',
            in: 'query',
            required: false,
            type: 'string',
            description: 'Fecha de inicio',
            example: '2025-03-01 00:00:00'
          },
          {
            name: 'toDate',
            in: 'query',
            required: false,
            type: 'string',
            description: 'Fecha de fin',
            example: '2025-03-06 18:00:00'
          }
        ],
        responses: {
          '200': {
            description: 'Ok',
            schema: {
              type: 'object',
              properties: {
                success: {
                  type: 'boolean',
                  example: true
                },
                result: {
                  type: 'object',
                  properties: {
                    data: {
                      type: 'array',
                      items: {
                        $ref: '#/definitions/Order'
                      }
                    },
                    page: {
                      type: 'number',
                      example: 1
                    },
                    limit: {
                      type: 'number',
                      example: 10
                    },
                    totalRecords: {
                      type: 'number',
                      example: 6
                    },
                    totalPages: {
                      type: 'number',
                      example: 6
                    }
                  }
                }
              }
            }
          },
          '400': {
            description: 'Bad Request',
            schema: {
              $ref: '#/definitions/BadRequest'
            }
          }
        }
      },
      post: {
        summary: 'Crear una nueva orden',
        tags: ['Order'],
        parameters: [
          {
            name: 'body',
            in: 'body',
            required: true,
            schema: {
              $ref: '#/definitions/CreateOrderRequestDto'
            }
          }
        ],
        responses: {
          '201': {
            description: 'Ok',
            schema: {
              type: 'object',
              properties: {
                success: {
                  type: 'boolean'
                },
                result: {
                  $ref: '#/definitions/Order'
                }
              }
            }
          },
          '400': {
            description: 'Bad Request',
            schema: {
              $ref: '#/definitions/BadRequest'
            }
          },
          '409': {
            description: 'Already Register',
            schema: {
              $ref: '#/definitions/AlreadyRegisterError'
            }
          }
        }
      }
    },
    '/orders/process-orders': {
      post: {
        summary: 'Procesar una orden (webhook)',
        tags: ['Order'],
        parameters: [
          {
            name: 'body',
            in: 'body',
            required: true,
            schema: {
              $ref: '#/definitions/ProcessOrderRequestDto'
            }
          }
        ],
        responses: {
          '201': {
            description: 'Ok',
            schema: {
              type: 'object',
              properties: {
                success: {
                  type: 'boolean'
                },
                result: {
                  $ref: '#/definitions/Order'
                }
              }
            }
          },
          '400': {
            description: 'Bad Request',
            schema: {
              $ref: '#/definitions/BadRequest'
            }
          }
        }
      }
    },
    '/agents/{id}': {
      get: {
        summary: 'Obtener un agente por ID',
        tags: ['Agent'],
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            type: 'string',
            description: 'ID del agente'
          }
        ],
        responses: {
          '200': {
            description: 'Ok',
            schema: {
              type: 'object',
              properties: {
                success: {
                  type: 'boolean'
                },
                result: {
                  $ref: '#/definitions/Agent'
                }
              }
            }
          },
          '400': {
            description: 'Bad Request',
            schema: {
              $ref: '#/definitions/BadRequest'
            }
          },
          '404': {
            description: 'Not Found',
            schema: {
              $ref: '#/definitions/NotFoundError'
            }
          }
        }
      },
      patch: {
        summary: 'Actualizar un agente por ID',
        tags: ['Agent'],
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            type: 'string',
            description: 'ID del agente'
          },
          {
            name: 'body',
            in: 'body',
            required: true,
            schema: {
              $ref: '#/definitions/UpdateAgentRequestDto'
            }
          }
        ],
        responses: {
          '200': {
            description: 'Ok',
            schema: {
              type: 'object',
              properties: {
                success: {
                  type: 'boolean'
                },
                result: {
                  $ref: '#/definitions/AgentUpdateResponse'
                }
              }
            }
          },
          '400': {
            description: 'Bad Request',
            schema: {
              $ref: '#/definitions/BadRequest'
            }
          },
          '404': {
            description: 'Not Found',
            schema: {
              $ref: '#/definitions/NotFoundError'
            }
          }
        }
      }
    },
    '/agents': {
      get: {
        summary: 'Obtener todos los agentes',
        tags: ['Agent'],
        responses: {
          '200': {
            description: 'Ok',
            schema: {
              type: 'object',
              properties: {
                success: {
                  type: 'boolean'
                },
                result: {
                  type: 'array',
                  items: {
                    $ref: '#/definitions/Agent'
                  }
                }
              }
            }
          },
          '400': {
            description: 'Bad Request',
            schema: {
              $ref: '#/definitions/BadRequest'
            }
          }
        }
      },
      post: {
        summary: 'Crear un nuevo agente',
        tags: ['Agent'],
        parameters: [
          {
            name: 'body',
            in: 'body',
            required: true,
            schema: {
              $ref: '#/definitions/CreateAgentRequestDto'
            }
          }
        ],
        responses: {
          '201': {
            description: 'Ok',
            schema: {
              type: 'object',
              properties: {
                success: {
                  type: 'boolean'
                },
                result: {
                  $ref: '#/definitions/Agent'
                }
              }
            }
          },
          '400': {
            description: 'Bad Request',
            schema: {
              $ref: '#/definitions/BadRequest'
            }
          },
          '409': {
            description: 'Already Register',
            schema: {
              $ref: '#/definitions/AlreadyRegisterError'
            }
          }
        }
      }
    },
    '/storages/{id}': {
      get: {
        summary: 'Obtener un almacenamiento por ID',
        tags: ['Storage'],
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            type: 'string',
            description: 'ID del almacenamiento'
          }
        ],
        responses: {
          '200': {
            description: 'Ok',
            schema: {
              type: 'object',
              properties: {
                success: {
                  type: 'boolean'
                },
                result: {
                  $ref: '#/definitions/Storage'
                }
              }
            }
          },
          '400': {
            description: 'Bad Request',
            schema: {
              $ref: '#/definitions/BadRequest'
            }
          },
          '404': {
            description: 'Not Found',
            schema: {
              $ref: '#/definitions/NotFoundError'
            }
          }
        }
      },
      delete: {
        summary: 'Eliminar un almacenamiento por ID',
        tags: ['Storage'],
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            type: 'string',
            description: 'ID del almacenamiento'
          }
        ],
        responses: {
          '200': {
            description: 'Ok',
            schema: {
              $ref: '#/definitions/DeleteResponseSuccess'
            }
          },
          '400': {
            description: 'Bad Request',
            schema: {
              $ref: '#/definitions/BadRequest'
            }
          },
          '404': {
            description: 'Not Found',
            schema: {
              $ref: '#/definitions/NotFoundError'
            }
          }
        }
      },
      patch: {
        summary: 'Actualizar un almacenamiento por ID',
        tags: ['Storage'],
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            type: 'string',
            description: 'ID del almacenamiento'
          },
          {
            name: 'body',
            in: 'body',
            required: true,
            schema: {
              $ref: '#/definitions/UpdateStorageRequestDto'
            }
          }
        ],
        responses: {
          '200': {
            description: 'Ok',
            schema: {
              type: 'object',
              properties: {
                success: {
                  type: 'boolean'
                },
                result: {
                  $ref: '#/definitions/Storage'
                }
              }
            }
          },
          '400': {
            description: 'Bad Request',
            schema: {
              $ref: '#/definitions/BadRequest'
            }
          },
          '404': {
            description: 'Not Found',
            schema: {
              $ref: '#/definitions/NotFoundError'
            }
          }
        }
      }
    },
    '/storages': {
      get: {
        summary: 'Obtener todos los almacenamientos',
        tags: ['Storage'],
        parameters: [
          {
            name: 'limit',
            in: 'query',
            required: false,
            type: 'number',
            description: 'Límite de resultados'
          },
          {
            name: 'page',
            in: 'query',
            required: false,
            type: 'number',
            description: 'Número de página'
          }
        ],
        responses: {
          '200': {
            description: 'Ok',
            schema: {
              type: 'object',
              properties: {
                success: {
                  type: 'boolean'
                },
                result: {
                  $ref: '#/definitions/GetStoragesResponse'
                }
              }
            }
          },
          '400': {
            description: 'Bad Request',
            schema: {
              $ref: '#/definitions/BadRequest'
            }
          }
        }
      },
      post: {
        summary: 'Crear un nuevo almacenamiento',
        tags: ['Storage'],
        parameters: [
          {
            name: 'body',
            in: 'body',
            required: true,
            schema: {
              $ref: '#/definitions/CreateStorageRequestDto'
            }
          }
        ],
        responses: {
          '201': {
            description: 'Ok',
            schema: {
              type: 'object',
              properties: {
                success: {
                  type: 'boolean'
                },
                result: {
                  $ref: '#/definitions/Storage'
                }
              }
            }
          },
          '400': {
            description: 'Bad Request',
            schema: {
              $ref: '#/definitions/BadRequest'
            }
          },
          '409': {
            description: 'Already Register',
            schema: {
              $ref: '#/definitions/AlreadyRegisterError'
            }
          }
        }
      }
    },
    '/providers': {
      post: {
        summary: 'Crear un nuevo proveedor',
        tags: ['Provider'],
        parameters: [
          {
            name: 'body',
            in: 'body',
            required: true,
            schema: {
              $ref: '#/definitions/CreateProviderRequestDto'
            }
          }
        ],
        responses: {
          '201': {
            description: 'Ok',
            schema: {
              type: 'object',
              properties: {
                success: {
                  type: 'boolean'
                },
                result: {
                  $ref: '#/definitions/Provider'
                }
              }
            }
          },
          '400': {
            description: 'Bad Request',
            schema: {
              $ref: '#/definitions/BadRequest'
            }
          }
        }
      },
      get: {
        summary: 'Obtener todos los proveedores',
        tags: ['Provider'],
        parameters: [
          {
            name: 'limit',
            in: 'query',
            required: false,
            type: 'number',
            description: 'Límite de resultados'
          },
          {
            name: 'page',
            in: 'query',
            required: false,
            type: 'number',
            description: 'Número de página'
          },
          {
            name: 'ruc',
            in: 'query',
            required: false,
            type: 'string',
            description: 'Ruc del proveedor'
          },
          {
            name: 'phone',
            in: 'query',
            required: false,
            type: 'string',
            description: 'Teléfono del proveedor'
          },
          {
            name: 'email',
            in: 'query',
            required: false,
            type: 'string',
            description: 'Correo del proveedor'
          }
        ],
        responses: {
          '200': {
            description: 'Ok',
            schema: {
              type: 'object',
              properties: {
                success: {
                  type: 'boolean'
                },
                result: {
                  type: 'array',
                  items: {
                    $ref: '#/definitions/Provider'
                  }
                }
              }
            }
          },
          '400': {
            description: 'Bad Request',
            schema: {
              $ref: '#/definitions/BadRequest'
            }
          }
        }
      }
    },
    '/providers/{id}': {
      get: {
        summary: 'Obtener un proveedor por ID',
        tags: ['Provider'],
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            type: 'string',
            description: 'ID del proveedor'
          }
        ],
        responses: {
          '200': {
            description: 'Ok',
            schema: {
              type: 'object',
              properties: {
                success: {
                  type: 'boolean'
                },
                result: {
                  $ref: '#/definitions/Provider'
                }
              }
            }
          },
          '400': {
            description: 'Bad Request',
            schema: {
              $ref: '#/definitions/BadRequest'
            }
          }
        }
      },
      patch: {
        summary: 'Actualizar un proveedor',
        tags: ['Provider'],
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            type: 'string',
            description: 'ID del proveedor'
          },
          {
            name: 'body',
            in: 'body',
            required: true,
            schema: {
              $ref: '#/definitions/UpdateProviderRequestDto'
            }
          }
        ],
        responses: {
          '200': {
            description: 'Ok',
            schema: {
              type: 'object',
              properties: {
                success: {
                  type: 'boolean'
                },
                result: {
                  $ref: '#/definitions/Provider'
                }
              }
            }
          },
          '400': {
            description: 'Bad Request',
            schema: {
              $ref: '#/definitions/BadRequest'
            }
          }
        }
      },
      delete: {
        summary: 'Eliminar un proveedor por ID',
        tags: ['Provider'],
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            type: 'string',
            description: 'ID del proveedor'
          }
        ],
        responses: {
          '200': {
            description: 'Ok',
            schema: {
              $ref: '#/definitions/DeleteResponseSuccess'
            }
          },
          '400': {
            description: 'Bad Request',
            schema: {
              $ref: '#/definitions/BadRequest'
            }
          }
        }
      }
    }
  },
  definitions: {
    CreateOrderRequestDto: {
      type: 'object',
      properties: {
        order: {
          type: 'object',
          properties: {
            storeName: { type: 'string', example: 'shopimax' },
            agency: { type: 'string', example: 'Agency X' },
            agent: { type: 'string', example: 'Agent Y' },
            agencyCost: { type: 'number', example: 100.0 },
            advancePayment: { type: 'number', example: 50.0 },
            pendingPayment: { type: 'number', example: 50.0 },
            subTotal: { type: 'number', example: 90.0 },
            discount: { type: 'number', example: 10.0 },
            total: { type: 'number', example: 100.0 },
            deliveryType: { type: 'string', example: 'Express' },
            paymentMethod: { type: 'string', example: 'Credit Card' },
            observation: { type: 'string', example: 'Handle with care' },
            contactedStatus: { type: 'string', example: 'Contacted' },
            comment: { type: 'string', example: 'Urgent delivery' }
          },
          required: ['storeName', 'agency', 'subTotal', 'total']
        },
        client: {
          type: 'object',
          properties: {
            name: { type: 'string', example: 'John' },
            lastname: { type: 'string', example: 'Doe' },
            documentNumber: { type: 'string', example: '12345678' },
            phone: { type: 'string', example: '987654321' },
            country: { type: 'string', example: 'USA' },
            department: { type: 'string', example: 'California' },
            province: { type: 'string', example: 'Los Angeles' },
            address: { type: 'string', example: '123 Main St' },
            reference: { type: 'string', example: 'Near the park' },
            email: { type: 'string', example: 'john.doe@example.com' }
          },
          required: ['name']
        },
        orderDetail: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              productId: { type: 'string', example: '61231e45r6e5465s65saa' },
              name: { type: 'string', example: 'Product A' },
              price: { type: 'number', example: 20.0 },
              quantity: { type: 'number', example: 2 },
              externalProductId: {
                oneOf: [{ type: 'string', example: '456' }, { type: 'number', example: 456 }, { type: 'null' }]
              },
              sku: { type: 'string', example: 'sku-789' }
            },
            required: ['name', 'price', 'quantity', 'sku']
          }
        }
      }
    },
    OrderDetail: {
      type: 'object',
      properties: {
        orderDetailId: {
          type: 'string'
        },
        productName: {
          type: 'string'
        },
        productPrice: {
          type: 'number'
        },
        externalProductId: {
          type: 'string'
        },
        sku: {
          type: 'string'
        },
        quantity: {
          type: 'number'
        }
      }
    },
    ProcessOrderRequestDto: {
      type: 'object',
      properties: {
        order: {
          type: 'object',
          properties: {
            name: { type: 'string', example: 'Order 1' },
            date: { type: 'string', example: '2023-10-01' }
          },
          required: ['name']
        },
        products: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              product_id: { type: 'number', example: 1 },
              name: { type: 'string', example: 'Product A' },
              quantity: { type: 'string', example: '2' },
              price: { type: 'string', example: '20.0' },
              sku: { type: 'string', example: 'sku-789' }
            },
            required: ['product_id', 'name', 'quantity', 'price', 'sku']
          }
        },
        client: {
          type: 'object',
          properties: {
            first_name: { type: 'string', example: 'John' },
            last_name: { type: 'string', example: 'Doe' },
            phone: { type: 'string', example: '987654321' },
            country: { type: 'string', example: 'USA' },
            city: { type: 'string', example: 'Los Angeles' },
            address: { type: 'string', example: '123 Main St' }
          },
          required: ['first_name', 'last_name', 'phone', 'country', 'city', 'address']
        },
        store: {
          type: 'object',
          properties: {
            app_id: { type: 'number', example: 123 },
            name: { type: 'string', example: 'Store A' }
          },
          required: ['app_id', 'name']
        }
      }
    },
    Order: {
      type: 'object',
      properties: {
        id: {
          type: 'string'
        },
        orderNumber: {
          type: 'string'
        },
        storeName: {
          type: 'string'
        },
        agency: {
          type: 'string'
        },
        agent: {
          type: 'string'
        },
        client: {
          type: 'object',
          properties: {
            name: {
              type: 'string'
            },
            lastname: {
              type: 'string'
            },
            documentNumber: {
              type: 'string'
            },
            phone: {
              type: 'string'
            },
            country: {
              type: 'string'
            },
            department: {
              type: 'string'
            },
            province: {
              type: 'string'
            },
            address: {
              type: 'string'
            },
            reference: {
              type: 'string'
            },
            email: {
              type: 'string'
            }
          }
        },
        agencyCost: {
          type: 'number'
        },
        advancePayment: {
          type: 'number'
        },
        pendingPayment: {
          type: 'number'
        },
        subtotal: {
          type: 'number'
        },
        discount: {
          type: 'number'
        },
        total: {
          type: 'number'
        },
        orderDetail: {
          type: 'array',
          items: {
            $ref: '#/definitions/OrderDetail'
          }
        },
        deliveryType: {
          type: 'string'
        },
        paymentMethod: {
          type: 'string'
        },
        observation: {
          type: 'string'
        },
        contactedStatus: {
          type: 'string'
        },
        registerStatus: {
          type: 'string'
        },
        status: {
          type: 'string'
        },
        comment: {
          type: 'string'
        },
        creationDate: {
          type: 'string'
        },
        updateDate: {
          type: 'string'
        }
      }
    },
    Agent: {
      type: 'object',
      properties: {
        id: {
          type: 'string'
        },
        user: {
          type: 'object',
          properties: {
            id: {
              type: 'string'
            },
            username: {
              type: 'string'
            },
            email: {
              type: 'string'
            },
            roles: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  name: {
                    type: 'string'
                  },
                  description: {
                    type: 'string'
                  },
                  permissions: {
                    type: 'array',
                    items: {
                      type: 'string'
                    }
                  }
                }
              }
            },
            status: {
              type: 'string'
            }
          }
        },
        name: {
          type: 'string'
        },
        lastname: {
          type: 'string'
        },
        startWorkingTime: {
          type: 'string'
        },
        endWorkingTime: {
          type: 'string'
        },
        address: {
          type: 'string'
        },
        documentNumber: {
          type: 'string'
        },
        email: {
          type: 'string'
        },
        phone: {
          type: 'string'
        },
        role: {
          type: 'string'
        },
        status: {
          type: boolean
        },
        registreStatus: {
          type: 'string'
        },
        assigned: {
          type: boolean
        }
      }
    },
    AgentUpdateResponse: {
      type: 'object',
      properties: {
        id: {
          type: 'string'
        },
        user: {
          type: 'string'
        },
        name: {
          type: 'string'
        },
        lastname: {
          type: 'string'
        },
        startWorkingTime: {
          type: 'string'
        },
        endWorkingTime: {
          type: 'string'
        },
        address: {
          type: 'string'
        },
        documentNumber: {
          type: 'string'
        },
        email: {
          type: 'string'
        },
        phone: {
          type: 'string'
        },
        role: {
          type: 'string'
        },
        status: {
          type: boolean
        },
        registreStatus: {
          type: 'string'
        },
        assigned: {
          type: boolean
        }
      }
    },
    Storage: {
      type: 'object',
      properties: {
        id: {
          type: 'string'
        },
        name: {
          type: 'string'
        },
        address: {
          type: 'string'
        },
        phone: {
          type: 'string'
        },
        email: {
          type: 'string'
        },
        capacity: {
          type: 'string'
        },
        status: {
          type: 'string'
        },
        creationDate: {
          type: 'string'
        },
        updateDate: {
          type: 'string'
        }
      }
    },
    SuccessResponse: {
      type: 'object',
      properties: {
        success: {
          type: 'boolean'
        },
        result: {
          type: 'object'
        }
      }
    },
    BadRequest: {
      type: 'object',
      properties: {
        success: {
          type: 'boolean',
          example: false
        },
        error: {
          type: 'string'
        },
        statusCode: {
          type: 'number',
          example: 400
        },
        type: {
          type: 'string',
          example: '<<Action>>BadRequestError'
        }
      }
    },
    NotFoundError: {
      type: 'object',
      properties: {
        success: {
          type: 'boolean',
          example: false
        },
        error: {
          type: 'string',
          example: '<<Model>> not found'
        },
        statusCode: {
          type: 'number',
          example: 404
        },
        type: {
          type: 'string',
          example: '<<Action>><<Model>>NotFoundError'
        }
      }
    },
    AlreadyRegisterError: {
      type: 'object',
      properties: {
        success: {
          type: 'boolean',
          example: false
        },
        error: {
          type: 'string',
          example: '<<Model>> already registered'
        },
        statusCode: {
          type: 'number',
          example: 409
        },
        type: {
          type: 'string',
          example: '<<Model>>AlreadyRegisteredError'
        }
      }
    },
    CreateAgentRequestDto: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          example: 'Juan'
        },
        lastname: {
          type: 'string',
          example: 'Perez'
        },
        startWorkingTime: {
          type: 'string',
          example: '08:00'
        },
        endWorkingTime: {
          type: 'string',
          example: '18:00'
        },
        address: {
          type: 'string',
          example: 'Av. Los Incas 123'
        },
        documentNumber: {
          type: 'string',
          example: '63846509'
        },
        email: {
          type: 'string',
          example: 'juanperez@mail.com'
        },
        phone: {
          type: 'string',
          example: '987654321'
        },
        role: {
          type: 'string',
          example: 'asesor'
        },
        status: {
          type: boolean,
          example: true
        },
        assigned: {
          type: boolean,
          example: true
        },
        registreStatus: {
          type: 'string',
          example: 'active'
        }
      }
    },
    UpdateAgentRequestDto: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          example: 'Juan'
        },
        lastname: {
          type: 'string',
          example: 'Perez'
        },
        documentNumber: {
          type: 'string',
          example: '63846509'
        },
        email: {
          type: 'string',
          example: 'juanperez@mail.com'
        },
        phone: {
          type: 'string',
          example: '987654321'
        }
      }
    },
    UpdateStorageRequestDto: {
      type: 'object',
      properties: {
        status: {
          type: 'string',
          example: 'active'
        }
      }
    },
    GetStoragesResponse: {
      type: 'object',
      properties: {
        data: {
          type: 'array',
          items: {
            $ref: '#/definitions/Storage'
          }
        },
        page: {
          type: 'number',
          example: 1
        },
        limit: {
          type: 'number',
          example: 10
        },
        totalRecords: {
          type: 'number',
          example: 1
        },
        totalPages: {
          type: 'number',
          example: 1
        }
      }
    },
    DeleteResponseSuccess: {
      type: 'object',
      properties: {
        success: {
          type: boolean,
          example: true
        },
        result: {
          message: {
            type: 'string',
            example: '<<Model>> deleted successfully'
          }
        }
      }
    },
    CreateStorageRequestDto: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          example: 'Almacen 1'
        },
        address: {
          type: 'string',
          example: 'Av. Los Incas 123'
        },
        phone: {
          type: 'string',
          example: '987654321'
        },
        capacity: {
          type: 'string',
          example: '1000'
        },
        status: {
          type: 'string',
          example: 'inactive'
        },
        email: {
          type: 'string',
          example: 'test3@email.com'
        }
      }
    },
    CreateProviderRequestDto: {
      type: 'object',
      properties: {
        name: { type: 'string', example: 'Provider A' },
        ruc: { type: 'string', example: '123456789' },
        phone: { type: 'string', example: '987654321' },
        addressLine: { type: 'string', example: '123 Main St' },
        email: { type: 'string', example: 'provider@example.com' },
        status: { type: 'string', example: 'active' },
        referencePhoneNumber: { type: 'string', example: '987654321' },
        referenceContactName: { type: 'string', example: 'Jane Doe' },
        accountNumber: { type: 'string', example: '1234567890' },
        businessCategory: { type: 'string', example: 'Retail' }
      },
      required: ['name', 'ruc', 'phone', 'addressLine', 'email', 'status']
    },
    UpdateProviderRequestDto: {
      type: 'object',
      properties: {
        name: { type: 'string', example: 'Provider A' },
        ruc: { type: 'string', example: '123456789' },
        phone: { type: 'string', example: '987654321' },
        addressLine: { type: 'string', example: '123 Main St' },
        email: { type: 'string', example: 'provider@example.com' },
        status: { type: 'string', example: 'active' },
        referencePhoneNumber: { type: 'string', example: '987654321' },
        referenceContactName: { type: 'string', example: 'Jane Doe' },
        accountNumber: { type: 'string', example: '1234567890' },
        businessCategory: { type: 'string', example: 'Retail' }
      },
      required: ['id', 'name', 'ruc', 'phone', 'addressLine', 'email', 'status']
    },
    Provider: {
      type: 'object',
      properties: {
        id: { type: 'string' },
        name: { type: 'string' },
        ruc: { type: 'string' },
        phone: { type: 'string' },
        addressLine: { type: 'string' },
        email: { type: 'string' },
        status: { type: 'string' },
        referencePhoneNumber: { type: 'string' },
        referenceContactName: { type: 'string' },
        accountNumber: { type: 'string' },
        businessCategory: { type: 'string' },
        creationDate: { type: 'string' },
        updateDate: { type: 'string' }
      }
    },
    AuthSignupResponse: {
      type: 'object',
      properties: {
        id: { type: 'string' },
        username: { type: 'string' },
        email: { type: 'string' },
        roles: {
          type: 'array',
          items: {
            type: 'string'
          }
        },
        status: { type: 'string' },
        creationDate: { type: 'string' },
        updateDate: { type: 'string' }
      }
    }
  }
};
