import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';

// Mock the AuthService and Router to avoid calling the real service or router during tests
class MockAuthService {
  login(username: string, password: string) {
    if (username === 'user1' && password === 'password1') {
      return of({ token: 'fake-jwt-token' });
    }
    return throwError('Invalid credentials');
  }
}

class MockRouter {
  navigate(path: string[]) { }
}

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: AuthService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [LoginComponent],
      providers: [
        { provide: AuthService, useClass: MockAuthService },
        { provide: Router, useClass: MockRouter },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  describe('boundary', () => {
    it('should initialize the login form with empty fields', () => {
      expect(component.loginForm).toBeTruthy();
      expect(component.loginForm.controls['username'].value).toBe('');
      expect(component.loginForm.controls['password'].value).toBe('');
    });

    it('should validate the form when fields are empty', () => {
      component.loginForm.controls['username'].setValue('');
      component.loginForm.controls['password'].setValue('');
      expect(component.loginForm.invalid).toBeTruthy();
    });

    it('should validate the form when fields are filled', () => {
      component.loginForm.controls['username'].setValue('user1');
      component.loginForm.controls['password'].setValue('password1');
      expect(component.loginForm.valid).toBeTruthy();
    });

    it('should show error message for invalid login', () => {
      jest.spyOn(router, 'navigate');
      component.loginForm.controls['username'].setValue('wronguser');
      component.loginForm.controls['password'].setValue('wrongpassword');
      component.onSubmit();

      expect(component.errorMessage).toBe('Invalid credentials. Please try again.');
      expect(router.navigate).not.toHaveBeenCalled();
    });

    it('should call the login method and navigate to home on successful login', () => {
      jest.spyOn(router, 'navigate');
      component.loginForm.controls['username'].setValue('user1');
      component.loginForm.controls['password'].setValue('password1');
      component.onSubmit();

      expect(router.navigate).toHaveBeenCalledWith(['/home']);
      expect(component.errorMessage).toBe('');
    });

    it('should not submit the form if it is invalid', () => {
      jest.spyOn(authService, 'login');
      component.loginForm.controls['username'].setValue('');
      component.loginForm.controls['password'].setValue('');
      component.onSubmit();

      expect(authService.login).not.toHaveBeenCalled();
    });
  });
});
