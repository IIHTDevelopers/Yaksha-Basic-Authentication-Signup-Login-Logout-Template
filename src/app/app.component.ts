import { Component } from '@angular/core';
import { AuthService } from './app/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = '';

  constructor(public authService: AuthService) { }

  // Method to logout directly from the app component if needed
  logout(): void {
  }
}
