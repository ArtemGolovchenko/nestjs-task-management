import { Table, Column, Model, Unique, HasMany } from 'sequelize-typescript';
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

    @Unique({ name: 'unique_username_err', msg:'Username already exists' })
    @Column
    username: string;

    @Column
    password: string;

    @HasMany(() => Task)
    tasks: Task[];
}