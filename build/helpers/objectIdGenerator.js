"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateMongoObjectId = generateMongoObjectId;
function generateMongoObjectId() {
    const timestamp = (new Date().getTime() / 1000 | 0).toString(16);
    return timestamp + 'xxxxxxxxxxxxxxxx'.replace(/[x]/g, function () {
        return (Math.random() * 16 | 0).toString(16);
    }).toLowerCase();
}
;
