import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { AuthService } from './app/auth/auth.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';

// Mock AuthService
class MockAuthService {
    isLoggedIn() {
        return true; // Default mock value for logged in
    }

    logout() {
        return of(null);
    }
}

// Mock Router
class MockRouter {
    navigate(path: string[]) { }
}

describe('AppComponent', () => {
    let component: AppComponent;
    let fixture: ComponentFixture<AppComponent>;
    let authService: AuthService;
    let router: Router;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [AppComponent],
            providers: [
                { provide: AuthService, useClass: MockAuthService },
                { provide: Router, useClass: MockRouter },
            ],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(AppComponent);
        component = fixture.componentInstance;
        authService = TestBed.inject(AuthService);
        router = TestBed.inject(Router);
        fixture.detectChanges();
    });

    describe('boundary', () => {
        it('should create the app component', () => {
            expect(component).toBeTruthy();
        });
    });
});
