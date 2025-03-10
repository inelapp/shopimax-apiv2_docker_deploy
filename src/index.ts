import app from './app';
import { dbConnection, PORT } from './config';
import { generateMongoObjectId } from './helpers';
import { seedAgents, seedRoles } from './seeders';

(async () => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
  await dbConnection.default();
  await Promise.all([seedAgents(), seedRoles()]);
})();
