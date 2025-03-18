import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = '';  // Mock API URL for users
  public currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  constructor(private http: HttpClient, private router: Router) {
    // Get current user from local storage
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser')!));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  // Get current user value
  public get currentUserValue(): any {
    return this.currentUserSubject.value;
  }

  // Login method
  login(username: string, password: string): Observable<any> {
    return of(null);
  }

  // Signup method
  signup(username: string, password: string): Observable<any> {
    return of(null);
  }

  // Logout method
  logout(): void {
  }

  // Check if user is logged in
  isLoggedIn(): boolean {
    return false;
  }
}
