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

# generate migration => npx sequelize-cli migration:generate --name create-userRole

# 1. npx sequelize-cli db:migrate

# 2. npx sequelize db:migrate --name <file_name> ( up specific )

e.g. npx sequelize db:migrate --name 20230817044713-create-userRole.js

## The way to remove from db is to either undo all or specific file as below:

# 1. npx sequelize-cli db:migrate:undo (down the most recent migrations)

npx sequelize-cli db:migrate:undo ( down / remove all migrated tables )

https://fig.io/manual/sequelize/db:migrate:undo:all

# 2. npx sequelize db:migrate:undo --name <migration_file_name.js> ( down specific )

# npx sequelize-cli db:migrate:status (check status of migrations)

#### seeding

create seed : npx sequelize-cli seed:generate --name seed-roles

-- npx sequelize-cli db:seed --seed my-seeder-file.js (specifically seeding a file)

-- seed all : npx sequelize-cli db:seed:all ( all seeds )

-- npx sequelize-cli db:seed:undo:all
-- npx sequelize-cli db:seed:undo --seed 20230819040951-seed-jobs.js

https://dev.to/anayooleru/modifying-an-existing-sequelize-migration-1mnn

1 _ 10 - 10 = 0, 10
2 _ 20 - 10 = 10, 20
