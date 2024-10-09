import { Component, OnInit } from '@angular/core';
import { LeaveService } from '../leave.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-leave-request',
  templateUrl: './leave-request.component.html',
  styleUrls: ['./leave-request.component.css']
})
export class LeaveRequestComponent implements OnInit {

  leaveRequests: any[] = [];

  constructor(private leaveService: LeaveService) { }

  ngOnInit(): void {
    this.loadLeaveRequests();
  }

  loadLeaveRequests(): void {
    this.leaveService.getPendingRequests().subscribe(
      data => this.leaveRequests = data,
      error => console.error('Error fetching leave requests', error)
    );
  }

  acceptLeaveRequest(leaveId: number): void {
    this.leaveService.acceptLeaveRequest(leaveId).subscribe(
        response => {
            console.log('Leave accepted:', response);
            Swal.fire({
                icon: 'success',
                title: 'Success!',
                text: response.message,
                confirmButtonText: 'OK'
            }).then(() => {
                this.loadLeaveRequests(); // Load or update the leaves UI
            });
        },
        error => {
            console.error('Error accepting leave request:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: error.error.message || 'An error occurred. Please try again.',
                confirmButtonText: 'OK'
            });
        }
    );
}
  
refuseLeaveRequest(leaveId: number): void {
  this.leaveService.refuseLeaveRequest(leaveId).subscribe(
      response => {
          console.log('Leave refused:', response);
          Swal.fire({
              icon: 'success',
              title: 'Success!',
              text: response.message,
              confirmButtonText: 'OK'
          }).then(() => {
              this.loadLeaveRequests(); // Load or update the leaves UI
          });
      },
      error => {
          console.error('Error refusing leave request:', error);
          Swal.fire({
              icon: 'error',
              title: 'Error!',
              text: error.error.message || 'An error occurred. Please try again.',
              confirmButtonText: 'OK'
          });
      }
  );
}
  formatDate(dateString: string): string {
    return new Date(dateString).toISOString().slice(0, 10);
  }
}