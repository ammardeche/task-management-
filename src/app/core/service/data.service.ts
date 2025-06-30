import { Injectable, resource, signal } from '@angular/core';
import { HttpEndPointService } from './http-end-point.service';
import {
  BehaviorSubject,
  catchError,
  firstValueFrom,
  Observable,
  tap,
  throwError,
} from 'rxjs';
import { ITask } from '../models/ITask';
import { ILevel, Levels } from '../models/ILevel';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  apiUrl = 'https://shrimo.com/fake-api/todos';
  private TaskSubject$ = new BehaviorSubject<ITask[]>([]);
  private _levels = signal<ILevel[]>(Levels); // avoid mutation of original constant
  private addToPost = signal<ITask | null>(null);

  readonly levels = this._levels.asReadonly();

  // ctor
  constructor(private http: HttpEndPointService) {}
  // fetch tasks from API
  getTasks(): void {
    this.http
      .get<ITask[]>(this.apiUrl)
      .pipe(
        tap((task) => this.TaskSubject$.next(task)),
        catchError((error) => {
          console.error('Error fetching tasks', error);
          return throwError(() => error);
        })
      )
      .subscribe();
  }

  getTasks$(): Observable<ITask[]> {
    return this.TaskSubject$.asObservable();
  }
  postTaskResource = resource({
    request: () => this.addToPost(),
    loader: ({ request }) => {
      if (!request) return Promise.resolve(null);
      return firstValueFrom(this.http.post(this.apiUrl, request));
    },
  });
  addTask(task: ITask) {
    this.addToPost.set(task);
    const levels = this._levels();

    const updatedLevels = levels.map((level) =>
      level.lvl === task.priority
        ? { ...level, tasks: [...level.tasks, task] }
        : level
    );

    this._levels.set(updatedLevels);
  }

  addTaskToLevel(levelId: string, task: ITask) {
    const updatedTask = this._levels().map((level) => {
      if (levelId === level.id) {
        return {
          ...level,
          task: [...level.tasks, task],
        };
      }
      return level;
    });
    this._levels.set(updatedTask);
  }
}
