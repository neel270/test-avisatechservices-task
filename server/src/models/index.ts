import { Sequelize } from 'sequelize';
import { config } from '../config/env';
import { User, initUser } from './User';
import { Tasks, initTasks } from './Tasks';

const sequelize = new Sequelize(
  config.database.name,
  config.database.user,
  config.database.password,
  {
    host: config.database.host,
    port: config.database.port,
    dialect: 'mysql',
    logging: config.database.logging ? console.log : false,
  }
);

// Initialize models
initUser(sequelize);
initTasks(sequelize);

// Associations
// User 1..* Tasks
Tasks.belongsTo(User, { foreignKey: 'user_id', as: 'user' });
User.hasMany(Tasks, { foreignKey: 'user_id', as: 'tasks' });

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('MySQL connection established.');
    await sequelize.sync();
    console.log('Models synchronized.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    throw error;
  }
};

export { sequelize, connectDB, User, Tasks };
export default sequelize;