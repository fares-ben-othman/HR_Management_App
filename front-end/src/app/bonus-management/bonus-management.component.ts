import { Component, OnInit } from '@angular/core';
import { BonusService } from '../bonus.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bonus-management',
  templateUrl: './bonus-management.component.html',
  styleUrls: ['./bonus-management.component.css']
})
export class BonusManagementComponent implements OnInit {
  bonus: any = {
    employe_id: '',
    type: '',
    montant: '',
    date_d_attribution: ''
  };

  constructor(private bonusService: BonusService, private router: Router) {}

  ngOnInit(): void {
    // Initialize with today's date if not set
    if (!this.bonus.date_d_attribution) {
      this.bonus.date_d_attribution = new Date().toISOString().split('T')[0];
    }
  }

  onSubmit(): void {
    console.log(this.bonus);
    this.bonusService.addBonus(this.bonus).subscribe(
      () => {
        console.log('Bonus saved successfully');
        console.log(this.bonus);
        this.bonus = { employe_id: '', type: '', montant: '', date_d_attribution: '' };
        this.router.navigate(['/dashboard_reload']);  
      },
      (error) => {
        console.error('Error saving bonus:', error);
      }
    );
  }
}

