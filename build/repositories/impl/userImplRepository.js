"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserImplRepository = void 0;
const mongo_schema_1 = require("../../db/mongo.schema");
const helpers_1 = require("../../helpers");
const mappers_1 = require("../../mappers");
class UserImplRepository {
    userModel;
    roleModel;
    agentModel;
    constructor() {
        this.userModel = mongo_schema_1.userModel;
        this.roleModel = mongo_schema_1.roleModel;
        this.agentModel = mongo_schema_1.agentModel;
    }
    async getUser(filters) {
        try {
            const user = await (0, helpers_1.getDataByFilters)(this.userModel, filters, [{ path: 'roles', select: 'name permissions description' }]);
            return user ? mappers_1.UserMap.fromDbToDomain(user) : null;
        }
        catch (error) {
            throw error;
        }
    }
    async create(user) {
        const session = await this.userModel.startSession();
        try {
            return await session.withTransaction(async () => {
                if (!user.roles) {
                    const defaultRole = await this.roleModel.findOne({ name: 'asesor' }, null, { session });
                    user.roles = [defaultRole?._id];
                }
                const newUser = new mongo_schema_1.userModel(user, null, { session });
                const agentByEmail = await this.agentModel.findOne({ email: user.email }, null, { session });
                if (agentByEmail) {
                    await this.agentModel.findByIdAndUpdate(agentByEmail?._id, { user: newUser._id }, { session });
                }
                const { id } = await newUser.save({ session });
                const userById = await (0, helpers_1.getDataByFilters)(this.userModel, { id }, [{ path: 'roles', select: 'name permissions description' }], session);
                return mappers_1.UserMap.fromDbToDomain(userById);
            });
        }
        catch (error) {
            console.log('error in create User ==>', error);
            await session.abortTransaction();
            throw error;
        }
        finally {
            await session.endSession();
        }
    }
}
exports.UserImplRepository = UserImplRepository;
