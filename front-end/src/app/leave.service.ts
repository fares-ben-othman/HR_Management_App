import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LeaveService {

  private apiUrl = 'http://localhost:3000/leave'; // Adjust the URL to your backend endpoint

  constructor(private http: HttpClient) { }

  // Get all leave requests for an employee
  getLeaveRequests(employeeId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/getByEmployee/${employeeId}`);
  }

  // Get all pending leave requests (for admin or HR)
  getPendingRequests(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/getPendingRequests`);
  }
  
  getLeaveHistory(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/history/${userId}`);
  }
  // Submit a new leave request
  submitLeaveRequest(leave: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/create`, leave);
  }

  // Update a leave request
  updateLeaveRequest(leaveId: number, leave: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/update/${leaveId}`, leave);
  }

  // Delete a leave request
  deleteLeaveRequest(leaveId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/delete/${leaveId}`);
  }

  // Accept a leave request
  acceptLeaveRequest(leaveId: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/${leaveId}/accept`, {});
  }

  // Refuse a leave request
  refuseLeaveRequest(leaveId: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/${leaveId}/refuse`, {});
  }

  
  
}

