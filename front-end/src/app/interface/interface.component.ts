import { Component } from '@angular/core';
import { AuthentificationService } from '../authentification.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-interface',
  templateUrl: './interface.component.html',
  styleUrls: ['./interface.component.css']
})
export class InterfaceComponent {
  email: string = '';
  password: string = '';
  role: string = '';

  constructor(public authService: AuthentificationService, private router: Router) { }

  onSubmit() {
    this.authService.login(this.email, this.password).subscribe(
      response => {
        this.role = response.role;
        this.router.navigate(['/dashboard'], { state: { role: this.role } });
      },
      error => {
        console.log('Login failed', error);
        alert('Invalid email or password');
      }
    );
  }

  login(email: string, password: string): Observable<any> {
    return this.authService.login(email, password).pipe(
      tap(user => {
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
          this.authService.isLoggedInStatus = true;
        }
      })
    );
  }
}

