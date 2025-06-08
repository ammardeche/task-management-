import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { HttpEndPointService } from './http-end-point.service';
import { Router } from '@angular/router';
import { IUser } from '../models/IUser';
import { of } from 'rxjs';

describe('AuthService', () => {
  let service: AuthService;
  let httpSpy: jasmine.SpyObj<HttpEndPointService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    const httpMock = jasmine.createSpyObj('HttpEndPointService', [
      'post',
      'setToken',
    ]);
    const routerMock = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      providers: [
        AuthService,
        { provide: HttpEndPointService, useValue: httpMock },
        { provide: Router, useValue: routerMock },
      ],
    });

    service = TestBed.inject(AuthService);
    httpSpy = TestBed.inject(
      HttpEndPointService
    ) as jasmine.SpyObj<HttpEndPointService>;
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should log in and set token', () => {
    const mockResponse: IUser = { access_token: '12345' } as IUser;

    httpSpy.post.and.returnValue(of(mockResponse));

    service.login('test@mail.com', 'password').subscribe(() => {
      expect(localStorage.getItem('token')).toBe('12345');
      expect(httpSpy.setToken).toHaveBeenCalledWith('12345');
      expect(routerSpy.navigate).toHaveBeenCalledWith(['/layout']);
      expect(service.isLoggedInValue()).toBeTrue();
    });
  });

  it('should log out and clear token', () => {
    localStorage.setItem('token', 'fake-token');
    service.logout();
    expect(localStorage.getItem('token')).toBeNull();
    expect(service.isLoggedInValue()).toBeFalse();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/login']);
  });
});
