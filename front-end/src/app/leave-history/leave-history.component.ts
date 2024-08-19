import { Component, OnInit } from '@angular/core';
import { LeaveService } from '../leave.service';
import { AuthentificationService } from '../authentification.service';

@Component({
  selector: 'app-leave-history',
  templateUrl: './leave-history.component.html',
  styleUrls: ['./leave-history.component.css']
})
export class LeaveHistoryComponent implements OnInit {
  leaveHistory: any[] = [];

  constructor(private leaveService: LeaveService, private authentification : AuthentificationService) {}

  ngOnInit(): void {
    this.loadLeaveHistory();
  }
  loadLeaveHistory(): void {
    const userId = this.authentification.getUserId();
    if (userId) {
      this.leaveService.getLeaveHistory(Number(userId)).subscribe(
        data => this.leaveHistory = data,
        error => console.error('Error fetching leave history', error)
      );
    } else {
      console.error('User ID not found');
    }
  }
  formatDate(dateString: string): string {
    return new Date(dateString).toISOString().slice(0, 10);
  }
}
