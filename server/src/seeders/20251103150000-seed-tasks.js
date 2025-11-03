'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Get all users first
    const users = await queryInterface.sequelize.query('SELECT id, name FROM users', {
      type: Sequelize.QueryTypes.SELECT,
    });

    const tasks = [];

    for (const user of users) {
      for (let i = 1; i <= 20; i++) {
        const dueDate = new Date();
        dueDate.setDate(dueDate.getDate() + Math.floor(Math.random() * 30) + 1); // Random due date within next 30 days

        tasks.push({
          user_id: user.id,
          title: `Task ${i} for ${user.name}`,
          description: `This is a sample task description for task ${i}. It includes some details about what needs to be done.`,
          due_date: dueDate.toISOString().split('T')[0], // Format as YYYY-MM-DD
          priority: Math.floor(Math.random() * 3) + 1, // 1, 2, or 3
          status: Math.floor(Math.random() * 3) + 1, // 1, 2, or 3
          created_at: new Date(),
          updated_at: new Date(),
        });
      }
    }

    await queryInterface.bulkInsert('tasks', tasks);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('tasks', null, {});
  }
};