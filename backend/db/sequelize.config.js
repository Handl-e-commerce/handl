require("dotenv").config();

module.exports = {
    "local_dev": {
        "username": process.env.SQL_USERNAME,
        "password": process.env.SQL_PASSWORD,
        "database": process.env.SQL_DATABASE_LOCAL_DEV,
        "host": process.env.SQL_HOST_LOCAL,
        "port": process.env.SQL_PORT_LOCAL,
        "dialect": "postgres",
    },
    "test": {
        "username": process.env.SQL_USERNAME,
        "password": process.env.SQL_PASSWORD,
        "database": process.env.SQL_DATABASE_LOCAL_TEST,
        "host": process.env.SQL_HOST_LOCAL,
        "port": process.env.SQL_PORT_LOCAL,
        "dialect": "postgres",
    },
    "development": {
        "username": process.env.SQL_USERNAME,
        "password": process.env.SQL_PASSWORD_CLOUD,
        "database": process.env.SQL_DATABASE_DEV,
        "host": process.env.SQL_HOST_DEV,
        "port": process.env.SQL_PORT,
        "dialect": "postgres",
    },
    "production": {
        "username": process.env.SQL_USERNAME,
        "password": process.env.SQL_PASSWORD_CLOUD,
        "database": process.env.SQL_DATABASE_PROD,
        "host": process.env.SQL_HOST_PROD,
        "port": process.env.SQL_PORT,
        "dialect": "postgres",
    },h
};
