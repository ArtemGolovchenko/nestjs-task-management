import { Table, Column, Model } from 'sequelize-typescript';
import { TaskStatus } from './task.model';

@Table
export class Task extends Model {
    @Column
    title: string;

    @Column
    description: string;

    @Column
    status: TaskStatus;
}