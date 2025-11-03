import { DataTypes, Model, Optional, Sequelize } from 'sequelize';

export interface UserAttributes {
  id: number;
  name: string;
  email: string;
  password: string;
  created_at?: Date;
  updated_at?: Date;
}

export type UserCreationAttributes = Optional<UserAttributes, 'id' | 'created_at' | 'updated_at'>;

export class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: number;
  public name!: string;
  public email!: string;
  public password!: string;
  public readonly created_at!: Date;
  public readonly updated_at!: Date;
}

export function initUser(sequelize: Sequelize) {
  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      created_at: DataTypes.DATE,
      updated_at: DataTypes.DATE,
    },
    {
      sequelize,
      tableName: 'users',
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    }
  );
}

export default User;