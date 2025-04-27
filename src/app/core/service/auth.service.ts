import { Injectable } from '@angular/core';
import { HttpEndPointService } from './http-end-point.service';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { IUser } from '../IUser';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  api = 'https://api.escuelajs.co/api/v1/auth/login';
  authtoken: string = 'token';
  isLoggedInSubject$ = new BehaviorSubject<boolean>(false);
  constructor(private http: HttpEndPointService, private router: Router) {
    const localToken = localStorage.getItem(this.authtoken);
    if (localToken) {
      this.isLoggedInSubject$.next(true);
    }
  }

  login(email: string, password: string): Observable<IUser> {
    return this.http.post<IUser>(this.api, { email, password }).pipe(
      tap((res: IUser) => {
        if (res.access_token) {
          const acces_token = res.access_token;
          localStorage.setItem(this.authtoken, acces_token);
          this.http.setToken(acces_token);
          this.isLoggedInSubject$.next(true);
          this.router.navigate(['/layout']);
        }
      })
    );
  }

  isLoggedInValue(): boolean {
    return this.isLoggedInSubject$.getValue();
  }
}
