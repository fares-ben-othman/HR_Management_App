import { Component, OnInit } from '@angular/core';
import { LeaveService } from '../leave.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-leave-submit',
  templateUrl: './leave-submit.component.html',
  styleUrls: ['./leave-submit.component.css']
})
export class LeaveSubmitComponent implements OnInit {
  leaveRequest: any = {
    employe_id: '',  // This should be populated with the logged-in user's ID
    type: '',
    date_debut: '',
    date_fin: '',
    statut: 'Pending'  // Default status
  };

  constructor(private leaveService: LeaveService, private router: Router) {}
  ngOnInit(): void {
    // If you want to automatically populate the employee ID
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    this.leaveRequest.employe_id = user.id;
  }

  onSubmit(): void {
    console.log(this.leaveRequest);
    const employeId = this.leaveRequest.employe_id;
    this.leaveService.submitLeaveRequest(this.leaveRequest).subscribe(
      () => {
        this.leaveRequest={employe_id:employeId,type:'',date_debut:'',date_fin:'',statut:'Pending'};
        this.router.navigate(['/dashboard_reload']);
        this.router.navigate(['/dashboard']);
      },
      (error) => {
        console.error('Error submitting leave request:', error);
      }
    );
  }
}

