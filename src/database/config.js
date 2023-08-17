module.exports = {
    development: {
       dialect: 'postgres',
       host: 'localhost',
       port: 5432,
       username: 'postgres',
       password: '123456',
       database: 'recruitmentv2',
    },
    test: {
       dialect: 'postgres',
       host: 'localhost',
       port: 5432,
       username: 'roku',
       password: 'roku',
       database: 'test',
    },
    production: {
       dialect: 'postgres',
       host: 'localhost',
       port: 5432,
       username: 'roku',
       password: 'roku',
       database: 'prod',
    },
 }