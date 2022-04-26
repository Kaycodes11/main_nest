# npx knex init => makes "kexfile.js" at root level of the project that holds "database configurations" ↓
- NOTE: "npx knex init" makes "knex_migrations" and "knex_migration_lock" table

# npx knex migrate:make users => makes "migrations directory" at the root level of the project and then run "npx knex migrate:latest" to store "user" table on database

- NOTE: npx knex migrate:latest run all migrations


# SEEDING
1. npx knex seed:make users : makes "seeds" folder" at the root level e.g. seeds > users.js
2. npx knex seed:run


# to make "user" module, service , controller; just do as below:
- nest g mo users, nest g s users, nest g co users

[Quick_Knex_With_Next]: https://dev.to/tony133/knexjs-module-for-nestjs-7-x-framework-15g8
[Knex cheatsheet]: https://dev.to/hoanganhlam/knex-cheat-sheet-79o

