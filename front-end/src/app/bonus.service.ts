// bonus.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BonusService {
  private apiUrl = 'http://localhost:3000/bonus';

  constructor(private http: HttpClient) {}

  getAllBonuses(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/getAllBonuses`);
  }

  addBonus(bonus: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/add`, bonus);
  }  

  updateBonus(id: number, bonus: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/updateBonus/${id}`, bonus);
  }

  deleteBonus(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/deleteBonus/${id}`);
  }
  getBonusesByEmployeeId(employeId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/getBonusesByEmployee/${employeId}`);
  }
  
}
