import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { UserService } from './user.service';

describe('UserService', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let userService: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService]
    });

    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
    userService = TestBed.get(UserService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  describe('#Login', () => {
    it('should include authorization headers', () => {
      const credentials = { username: 'user', password: 'secret' };
      userService.userInfo$.subscribe(userInfo => {
        expect(userInfo.authenticated).toBeTruthy();
      });

      userService.doLogin(credentials);

      let hashedCredentials = btoa(
        `${credentials.username}:${credentials.password}`
      );
      const req = httpTestingController.expectOne('http://localhost:8080/user');
      expect(req.request.method).toEqual('POST');

      expect(req.request.headers.get('Authorization')).toEqual(
        `Basic ${hashedCredentials}`
      );

      req.flush({
        username: 'user',
        authorities: [{ authority: 'ROLE_ADMIN' }]
      });
    });
  });

  describe('#Logout', () => {
    it('should logout user', () => {
      userService.userInfo$.subscribe(userInfo => {
        expect(userInfo.authenticated).toBeFalsy();
      });

      userService.doLogout();

      const req = httpTestingController.expectOne(
        'http://localhost:8080/logout'
      );
      expect(req.request.method).toEqual('POST');

      req.flush({});
    });
  });
});
