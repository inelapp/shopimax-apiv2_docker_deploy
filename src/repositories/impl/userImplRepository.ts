import { IUserProps, User } from "../../domain/auth";
import { IUserRepository, UserFilters } from "../user.repository";
import { agentModel, roleModel, userModel } from "../../db/mongo.schema";
import { getDataByFilters } from "../../helpers";
import { IUserDbDetails, UserDbResponseDetailMap, UserMap } from "../../mappers";

export class UserImplRepository implements IUserRepository {
    private readonly userModel: typeof userModel;
    private readonly roleModel: typeof roleModel;
    private readonly agentModel: typeof agentModel;

    constructor(){
        this.userModel = userModel
        this.roleModel = roleModel
        this.agentModel = agentModel
    }
    async getUser(filters?: UserFilters): Promise<UserDbResponseDetailMap | null> {
        try {
            const user = await getDataByFilters<User, UserFilters>(this.userModel, filters, [{ path: 'roles', select: 'name permissions description' }]);
            return user ? UserMap.fromDbToDomain(user as unknown as IUserDbDetails) : null;
        } catch (error) {
            throw error;
        }
    }

    async create(user: IUserProps): Promise<UserDbResponseDetailMap> {
        const session = await this.userModel.startSession();
        try {
            return await session.withTransaction(async () => {
                if(!user.roles) {
                    const defaultRole = await this.roleModel.findOne({ name: 'asesor' }, null, { session })
                    user.roles = [defaultRole?._id as string];
                }
                const newUser = new userModel(user, null, { session });
                const agentByEmail = await this.agentModel.findOne({ email: user.email }, null, { session });
                if(agentByEmail) {
                    await this.agentModel.findByIdAndUpdate(agentByEmail?._id, { user: newUser._id }, { session });
                }
                const { id } = await newUser.save({ session });
                const userById = await getDataByFilters<User, { id: string }>(this.userModel, { id }, [{ path: 'roles', select: 'name permissions description' }], session);
                return UserMap.fromDbToDomain(userById as unknown as IUserDbDetails);
            })
        } catch (error) {
            console.log('error in create User ==>', error);
            await session.abortTransaction();
            throw error;
        } finally {
            await session.endSession();
        }
    }
}