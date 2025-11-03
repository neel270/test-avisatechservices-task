/* eslint-disable @typescript-eslint/no-explicit-any */
import { QueryInterface } from 'sequelize';

module.exports = {
  async up(queryInterface: QueryInterface, Sequelize: any) {
    await queryInterface.createTable('tasks', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'users', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      due_date: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      priority: {
        type: Sequelize.TINYINT,
        allowNull: false,
        defaultValue: 1,
        comment: '1=>Low,2=>Medium,3=>High',
      },
      status: {
        type: Sequelize.TINYINT,
        allowNull: false,
        defaultValue: 1,
        comment: '1=>Pending,2=>In Progress,3=>Completed',
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
      },
    });
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.dropTable('tasks');
  },
};
