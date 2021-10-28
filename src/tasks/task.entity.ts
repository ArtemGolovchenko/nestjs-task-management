import { Table, Column, Model } from 'sequelize-typescript';
import { TaskStatus } from './task-status.enum';
import { DataTypes } from "sequelize";

@Table
export class Task extends Model {
    @Column({
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
    })
    id: string;

    @Column
    title: string;

    @Column
    description: string;

    @Column
    status: TaskStatus;
}