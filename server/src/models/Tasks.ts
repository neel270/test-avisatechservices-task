import { DataTypes, Model, Optional, Sequelize } from 'sequelize';

export interface TaskAttributes {
  id: number;
  user_id: number;
  title: string;
  description: string | null;
  due_date: string; // DATEONLY
  priority: number; // 1,2,3
  status: number; // 1,2,3
  created_at?: Date;
  updated_at?: Date;
}

export type TaskCreationAttributes = Optional<TaskAttributes, 'id' | 'description' | 'priority' | 'status' | 'created_at' | 'updated_at'>;

export class Tasks extends Model<TaskAttributes, TaskCreationAttributes> implements TaskAttributes {
  public id!: number;
  public user_id!: number;
  public title!: string;
  public description!: string | null;
  public due_date!: string;
  public priority!: number;
  public status!: number;
  public readonly created_at!: Date;
  public readonly updated_at!: Date;
}

export function initTasks(sequelize: Sequelize) {
  Tasks.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      due_date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      priority: {
        type: DataTypes.TINYINT,
        allowNull: false,
        defaultValue: 1,
        comment: '1=>Low,2=>Medium,3=>High',
      },
      status: {
        type: DataTypes.TINYINT,
        allowNull: false,
        defaultValue: 1,
        comment: '1=>Pending,2=>In Progress,3=>Completed',
      },
      created_at: DataTypes.DATE,
      updated_at: DataTypes.DATE,
    },
    {
      sequelize,
      tableName: 'tasks',
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    }
  );
}