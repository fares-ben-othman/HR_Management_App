import { Component, OnInit } from '@angular/core';
import { LeaveService } from '../leave.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

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
    // Automatically populate the employee ID
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    this.leaveRequest.employe_id = user.id;
  }

  onSubmit(): void {
    console.log(this.leaveRequest);
    const employeId = this.leaveRequest.employe_id;

    this.leaveService.submitLeaveRequest(this.leaveRequest).subscribe(
      () => {
        // Show SweetAlert success notification
        Swal.fire({
          icon: 'success',
          title: 'Leave Request Submitted!',
          text: 'Your leave request has been submitted successfully.',
          confirmButtonText: 'OK'
        }).then(() => {
          this.leaveRequest = {
            employe_id: employeId,
            type: '',
            date_debut: '',
            date_fin: '',
            statut: 'Pending'
          }; // Reset form
          this.router.navigate(['/dashboard_reload']);
          this.router.navigate(['/dashboard']);
        });
      },
      (error) => {
        console.error('Error submitting leave request:', error);
        // Show SweetAlert error notification
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'An error occurred while submitting your leave request. Please try again.',
          confirmButtonText: 'OK'
        });
      }
    );
  }
}


