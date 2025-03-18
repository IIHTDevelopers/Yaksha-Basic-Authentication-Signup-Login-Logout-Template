import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SignupComponent } from './signup.component';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';

// Mock AuthService
class MockAuthService {
  signup(username: string, password: string) {
    if (username === 'user1' && password === 'password1') {
      return of({ username, password });
    }
    return throwError('Signup failed');
  }
}

// Mock Router
class MockRouter {
  navigate(path: string[]) { }
}

describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;
  let authService: AuthService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [SignupComponent],
      providers: [
        { provide: AuthService, useClass: MockAuthService },
        { provide: Router, useClass: MockRouter },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  describe('boundary', () => {
    it('should create the component', () => {
      expect(component).toBeTruthy();
    });

    it('should initialize the signup form with empty fields', () => {
      expect(component.signupForm).toBeTruthy();
      expect(component.signupForm.controls['username'].value).toBe('');
      expect(component.signupForm.controls['password'].value).toBe('');
      expect(component.signupForm.controls['confirmPassword'].value).toBe('');
    });

    it('should invalidate the form when fields are empty', () => {
      component.signupForm.controls['username'].setValue('');
      component.signupForm.controls['password'].setValue('');
      component.signupForm.controls['confirmPassword'].setValue('');
      expect(component.signupForm.invalid).toBeTruthy();
    });

    it('should validate the form when fields are filled and passwords match', () => {
      component.signupForm.controls['username'].setValue('user1');
      component.signupForm.controls['password'].setValue('password1');
      component.signupForm.controls['confirmPassword'].setValue('password1');
      expect(component.signupForm.valid).toBeTruthy();
    });

    it('should show error message for failed signup', () => {
      jest.spyOn(router, 'navigate');
      component.signupForm.controls['username'].setValue('wronguser');
      component.signupForm.controls['password'].setValue('password1');
      component.signupForm.controls['confirmPassword'].setValue('password1');
      component.onSubmit();

      expect(component.errorMessage).toBe('Signup failed. Please try again.');
      expect(router.navigate).not.toHaveBeenCalled();
    });

    it('should call the signup method and navigate to login on successful signup', () => {
      jest.spyOn(router, 'navigate');
      component.signupForm.controls['username'].setValue('user1');
      component.signupForm.controls['password'].setValue('password1');
      component.signupForm.controls['confirmPassword'].setValue('password1');
      component.onSubmit();

      expect(router.navigate).toHaveBeenCalledWith(['/login']);
      expect(component.errorMessage).toBe('');
    });

    it('should not submit the form if it is invalid', () => {
      jest.spyOn(authService, 'signup');
      component.signupForm.controls['username'].setValue('');
      component.signupForm.controls['password'].setValue('');
      component.signupForm.controls['confirmPassword'].setValue('');
      component.onSubmit();

      expect(authService.signup).not.toHaveBeenCalled();
    });
  });
});
