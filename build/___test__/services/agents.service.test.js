"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
describe('Test del servicio AgentService', () => {
    it('Debe existir una ruta GET /agents y esta debe retornar un listado de asesores', async () => {
        const response = await axios_1.default.get('http://localhost:3002/api/v1/agents');
        const result = response.data.result;
        expect(result).toBeInstanceOf(Array);
    });
});
