import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthentificationService } from '../authentification.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  role: string = '';

  constructor(
    private router: Router,
    private authService: AuthentificationService
  ) {}

  ngOnInit(): void {
    if (history.state.role) {
      this.role = history.state.role;
      console.log('Role from history.state:', this.role); 
    } else if (this.authService.getLoginStatus()) {
      this.role = this.authService.getUserRole();
      console.log('Role from AuthService:', this.role); 
      if (!this.role) {
        console.error('Role is undefined or empty'); 
      }
    } else {
      this.router.navigate(['/login']);
    }
  }
}

