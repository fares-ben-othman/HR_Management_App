import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthentificationService } from '../authentification.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  role: string | null = null;
  dropdownOpen: boolean = false;
  constructor(private authService: AuthentificationService, private router: Router) {}

  ngOnInit(): void {
    // Assuming the role is stored in localStorage
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    this.role = user.role;
  }

  isLoggedIn(): boolean {
    return this.authService.getLoginStatus();
  }

  getUsername(): string | null {
    return this.authService.getUsername();
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
  toggleDropdown(): void {
    this.dropdownOpen = !this.dropdownOpen;
  }
}

