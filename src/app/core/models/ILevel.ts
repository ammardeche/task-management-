import { ITask } from './ITask';

export interface ILevel {
  id: string;
  lvl: string;
  tasks: ITask[];
}

export const Levels: ILevel[] = [
  { id: '1', lvl: 'Low', tasks: [] },
  { id: '2', lvl: 'Medium', tasks: [] },
  { id: '3', lvl: 'High', tasks: [] },
  { id: '4', lvl: 'Critical', tasks: [] },
];
