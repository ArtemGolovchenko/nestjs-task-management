import { Table, Column, Model, HasMany } from 'sequelize-typescript';
import { DataTypes } from "sequelize";
import { Task } from 'src/tasks/task.entity';

@Table
export class User extends Model {
    @Column({
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
    })
    id: string;

    @Column
    first_name: string;

    @Column
    last_name: string;

    @Column
    email: string;    

    @HasMany(() => Task)
    tasks: Task[];
}