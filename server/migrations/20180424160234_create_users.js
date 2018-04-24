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
      table.string("password").notNull();
      table
        .timestamp("createdAt")
        .notNull()
        .defaultTo(knex.fn.now());
      table.timestamp("updatedAt").notNull();
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([knex.schema.dropTableIfExists("users")]);
};
