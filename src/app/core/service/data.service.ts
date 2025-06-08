import { Injectable } from '@angular/core';
import { HttpEndPointService } from './http-end-point.service';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';
import { ITask } from '../models/ITask';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  apiUrl = 'https://shrimo.com/fake-api/todos';

  private TaskSubject$ = new BehaviorSubject<ITask[]>([]);
  constructor(private http: HttpEndPointService) {}

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
  updateTask(taskId: string, newState: string) {}
}
