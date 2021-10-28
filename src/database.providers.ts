import { Sequelize } from "sequelize-typescript";
import { Task } from "./tasks/task.entity";

export const databaseProviders = [
    {
        provide: 'SEQUELIZE',
        useFactory: async () => {
            const sequelize = new Sequelize({
                dialect: 'postgres',
                define: {
                    timestamps: false
                  },
                host: 'localhost',
                port: 5432,
                username: 'postgres',
                password: 'postgres',
                database: 'task-management',
            });
            sequelize.addModels([Task]);
            await sequelize.sync();
            return sequelize;
        },
    },
];
