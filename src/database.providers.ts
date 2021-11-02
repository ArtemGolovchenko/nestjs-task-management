import { Sequelize } from "sequelize-typescript";
import { User } from "./auth/user.entity";
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
            sequelize.addModels([Task, User]);         
            await sequelize.sync();
            return sequelize;
        },
    },
];
