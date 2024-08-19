import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {

  private url = 'http://localhost:3000/user';
  public isLoggedInStatus = false;

  constructor(private http: HttpClient) {
    // Initialize the login status based on localStorage
    this.isLoggedInStatus = !!localStorage.getItem('user');
  }
  getLoginStatus(): boolean {
    return this.isLoggedInStatus;
  }

  getUsername(): string | null {
    const user = localStorage.getItem('user');
    if (user) {
      const parsedUser = JSON.parse(user);
      return parsedUser.nom || null;
    }
    return null;
  }

  getUserRole(): string {
    const user = localStorage.getItem('user');
    if (user) {
      const parsedUser = JSON.parse(user);
      return parsedUser.role; 
    }
    return '';
  }

  getUserId(): string | null {
    const user = localStorage.getItem('user');
    if (user) {
      const parsedUser = JSON.parse(user);
      return parsedUser.id || null;
    }
    return null;
  }

  getEmail(): string | null {
    const user = localStorage.getItem('user');
    if (user) {
      const parsedUser = JSON.parse(user);
      return parsedUser.email || null;
    }
    return null;
  }

  logout(): void {
    localStorage.removeItem('user');
    this.isLoggedInStatus = false;
  }
  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.url}/login`, { email: email, mot_de_passe: password }).pipe(
      tap(user => {
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
          this.isLoggedInStatus = true;
        }
      })
    );
  }

  register(user: any): Observable<any> {
    return this.http.post<any>(`${this.url}/register`, user);
  }

  

  getEmployeeDetails(): Observable<any> {
    const userId = this.getUserId();
    return this.http.get<any>(`${this.url}/getById/${userId}`);
  }

  updateEmployeeDetails(user: any): Observable<any> {
    return this.http.put<any>(`${this.url}/update/${user.id}`, user);
  }
}





