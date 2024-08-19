import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private apiUrl = 'http://localhost:3000/user'; // Replace with your API URL

  constructor(private http: HttpClient) { }

  // Get all employees
  getEmployees(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/getall`);
  }

  // Get a single employee by ID
  getEmployeeById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/getById/${id}`);
  }

  // Update an employee
  updateEmployee(id: number, employee: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/update/${id}`, employee);
  }

  // Delete an employee
  deleteEmployee(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/delete/${id}`);
  }

  // Add a new employee (optional, based on your requirements)
  addEmployee(employee: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, employee);
  }
}
