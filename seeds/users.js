/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
    // first, delete all the rows
    await knex('users').del();
    // now, insert
    await knex('users').insert([
        {
            id: 1,
            firstName: 'john',
            lastName: 'johnson',
            email: 'john@gmail.com',
        },
        {
          id: 2,
          firstName: 'jane',
          lastName: 'johnson',
          email: 'jane@gmail.com',
      },
        
    ]);
};
