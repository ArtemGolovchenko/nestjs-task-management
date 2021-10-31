import { Table, Column, Model, ForeignKey, BelongsTo, HasMany } from 'sequelize-typescript';
import { TaskStatus } from './task-status.enum';
import { DataTypes } from "sequelize";
import { User } from 'src/users/user.entity';

@Table
export class Task extends Model {
    @Column({
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
    })
    id: string;

    @ForeignKey(() => User)
    @Column({
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
    })
    user_id: string;

    @BelongsTo(() => User)
    user: User;

    @Column
    title: string;

    @Column
    description: string;

    @Column
    status: TaskStatus;    
}
