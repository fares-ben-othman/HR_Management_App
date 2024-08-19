import { Component, OnInit } from '@angular/core';
import { LeaveService } from '../leave.service';

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
        console.log(response);
        window.location.reload(); 
      },
      error => {
        console.error('Error accepting leave request:', error);
      }
    );
  }
  
  refuseLeaveRequest(leaveId: number): void {
    this.leaveService.refuseLeaveRequest(leaveId).subscribe(
      response => {
        console.log(response);
        window.location.reload(); 
      },
      error => {
        console.error('Error refusing leave request:', error);
      }
    );
  }
  formatDate(dateString: string): string {
    return new Date(dateString).toISOString().slice(0, 10);
  }
}