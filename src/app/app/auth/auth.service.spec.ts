import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';

// Mock Router
class MockRouter {
  navigate(path: string[]) { }
}

// Mock HttpClient
class MockHttpClient {
  get() {
    return of([{ username: 'user1', password: 'password1', token: 'fake-jwt-token-123' }]);
  }

  post() {
    return of({ username: 'user1', password: 'password1', token: 'fake-jwt-token-123' });
  }
}

describe('AuthService', () => {
  let service: AuthService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [
        AuthService,
        { provide: Router, useClass: MockRouter },
        { provide: HttpClient, useClass: MockHttpClient },
      ]
    });

    service = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
  });

  describe('business', () => {
    it('should log in a user and store the user data in localStorage', () => {
      jest.spyOn(localStorage, 'setItem'); // Spy on localStorage.setItem
      jest.spyOn(service.currentUserSubject, 'next'); // Spy on next method to check for user data change

      service.login('user1', 'password1').subscribe((user) => {
        expect(user.username).toBe('user1');
        expect(localStorage.setItem).toHaveBeenCalledWith('currentUser', JSON.stringify(user));
        expect(service.currentUserSubject.next).toHaveBeenCalledWith(user);
      });
    });

    it('should create a new user and store the user data in localStorage', () => {
      jest.spyOn(localStorage, 'setItem'); // Spy on localStorage.setItem
      jest.spyOn(service.currentUserSubject, 'next'); // Spy on next method to check for user data change

      service.signup('newUser', 'newPassword').subscribe((user) => {
        expect(user.username).toBe('newUser');
        expect(localStorage.setItem).toHaveBeenCalledWith('currentUser', JSON.stringify(user));
        expect(service.currentUserSubject.next).toHaveBeenCalledWith(user);
      });
    });
  });
});
