import { Component, OnInit } from '@angular/core';
import { BonusService } from '../bonus.service';

@Component({
  selector: 'app-bonus-history',
  templateUrl: './bonus-history.component.html',
  styleUrls: ['./bonus-history.component.css']
})
export class BonusHistoryComponent implements OnInit {
  bonusHistory: any[] = [];

  constructor(private bonusService: BonusService) {}

  ngOnInit(): void {
    this.loadBonusHistory();
  }

  loadBonusHistory(): void {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const employeId = user.id;

    this.bonusService.getBonusesByEmployeeId(employeId).subscribe(
      (data) => {
        this.bonusHistory = data;
      },
      (error) => {
        console.error('Error fetching bonus history:', error);
      }
    );
  }
}

