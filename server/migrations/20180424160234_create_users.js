exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable("users", table => {
      table.increments("id").primary();
      table
        .string("username")
        .unique()
        .notNull();
      table
        .integer("phone")
        .unique()
        .notNull();
      table.timestamp("created_at").defaultTo(knex.fn.now());
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([knex.schema.dropTable("users")]);
};
