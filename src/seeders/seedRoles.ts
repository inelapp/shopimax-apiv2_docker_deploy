import { roleModel } from '../db/mongo.schema';
import rolesData from './data/roles.json'

export async function seedRoles() {
  try {
    const rolesToSave = rolesData.forEach(async (role) => {
      const roleById = await roleModel.findById(role._id);
      if (roleById) {
        return;
      }
      await roleModel.create(role);
    });
    await Promise.all([rolesToSave]);
    return;
  } catch (error) {
    console.log('Error seeding roles', error);
    return;
  }
}
