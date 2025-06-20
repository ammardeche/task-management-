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

@Injectable({
  providedIn: 'root',
})
export class DataService {
  apiUrl = 'https://shrimo.com/fake-api/todos';

  private TaskSubject$ = new BehaviorSubject<ITask[]>([]);
  constructor(private http: HttpEndPointService) {}
  addToPost = signal<ITask | null>(null);

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
  // add task using signals
  postTaskResource = resource({
    request: () => this.addToPost(),
    loader: ({ request }) => {
      if (!request) return Promise.resolve(null);
      return firstValueFrom(this.http.post(this.apiUrl, request));
    },
  });

  addTask(task: ITask) {
    this.addToPost.set(task);
  }

  get AddedTask() {
    return this.addToPost;
  }
}
