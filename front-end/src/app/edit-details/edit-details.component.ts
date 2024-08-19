import { Component, OnInit } from '@angular/core';
import { AuthentificationService } from '../authentification.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-details',
  templateUrl: './edit-details.component.html',
  styleUrls: ['./edit-details.component.css']
})
export class EditDetailsComponent implements OnInit {

  user: any = {};

  constructor(
    private authService: AuthentificationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService.getEmployeeDetails().subscribe(data => {
      this.user = data;

      
      this.user.date_d_embauche = this.formatDate(this.user.date_d_embauche);
    });
  }

  onSubmit(): void {
    
    this.user.date_d_embauche = this.convertDateToISO(this.user.date_d_embauche);

    this.authService.updateEmployeeDetails(this.user).subscribe(() => {
      this.router.navigate(['/dashboard']); 
    });
  }

  
  private convertDateToISO(date: string): string {
    const dateObj = new Date(date);
    return dateObj.toISOString().split('T')[0]; 
  }

  
  private formatDate(date: string): string {
    const dateObj = new Date(date);
    return dateObj.toISOString().split('T')[0]; 
  }
}
