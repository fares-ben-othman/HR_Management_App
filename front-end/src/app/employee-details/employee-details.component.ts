import { Component, OnInit } from '@angular/core';
import { AuthentificationService } from '../authentification.service';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit {
  employee: any;

  constructor(private authService: AuthentificationService) {}

  ngOnInit(): void {
    this.authService.getEmployeeDetails().subscribe(
      data => {
        console.log(data);
        this.employee = data;
        
      },
      error => {
        console.error('Error fetching user details', error);
      }
    );
  }
  formatDate(dateString: string): string {
    return new Date(dateString).toISOString().slice(0, 10);
  }
}


