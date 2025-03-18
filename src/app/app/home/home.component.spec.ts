import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';

// Mock AuthService
class MockAuthService {
  currentUserValue = { username: 'user1' }; // Mock a logged-in user

  logout() {
    // Mock logout method
    return of(null);
  }
}

// Mock Router
class MockRouter {
  navigate(path: string[]) { }
}

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let authService: AuthService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeComponent],
      providers: [
        { provide: AuthService, useClass: MockAuthService },
        { provide: Router, useClass: MockRouter },
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  describe('boundary', () => {
    it('should set the current user when the component initializes', () => {
      component.ngOnInit();
      expect(component.currentUser).toEqual({ username: 'user1' });
    });

    it('should display the username of the logged-in user', () => {
      component.ngOnInit();
      fixture.detectChanges();
      const compiled = fixture.nativeElement;
      expect(compiled.querySelector('h2').textContent).toContain('Welcome, user1!');
    });
  });
});
