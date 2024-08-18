require("dotenv").config();
import {Sequelize} from "sequelize";
import {IDatabase} from "../interfaces/IDatabase";

/**
 * Database class that implements singleton pattern
 */
class Database implements IDatabase {
    private static instance: Database;
    public sequelize: Sequelize;

    /**
   * @constructor
   */
    private constructor() {
    // default will be local values
        let host: string = process.env.SQL_HOST_LOCAL as string;
        let port = Number(process.env.SQL_PORT_LOCAL);
        let logging: boolean | ((sql: string, timing?: number) => void) = false;
        let database: string = process.env.SQL_DATABASE_LOCAL_DEV as string;

        if (process.env.NODE_ENV === "production") {
            host = `/cloudsql/${process.env.SQL_HOST}`;
            port = Number(process.env.SQL_PORT);
            logging = console.log;
            database = process.env.SQL_DATABASE_PROD as string;
        } else if (process.env.NODE_ENV === "development") {
            host = `/cloudsql/${process.env.SQL_HOST_DEV}`;
            port = Number(process.env.SQL_PORT);
            logging = console.log;
            database = process.env.SQL_DATABASE_DEV as string;
        } else if (process.env.NODE_ENV === "test") {
            database = process.env.SQL_DATABASE_LOCAL_TEST as string;
        }

        this.sequelize = new Sequelize({
            host: host,
            username: process.env.SQL_USERNAME as string,
            password: process.env.SQL_PASSWORD as string,
            database: database,
            dialect: "postgres",
            port: port,
            logging: logging,
        });
    }

    /**
   * Method which returns either the existing instance or instantiates one
   * then returns only that preexisting instance
   * @return {Database}
   */
    public static GetInstance(): Database {
        if (!this.instance) {
            Database.instance = new Database();
        }
        return Database.instance;
    }

    /**
   * Utility method to make sure connection works as expected
   * @return {Promise<string>}
   */
    public static async TestConnection(): Promise<string> {
        try {
            await this.GetInstance().sequelize.authenticate();
            console.log("Connection has been established successfully.");
            return "Connection has been established successfully.";
        } catch (error) {
            console.error("Unable to connect to the database:", error);
            throw new Error(`Unable to connect to the database: ${error}`);
        }
    }
}

export {Database};
