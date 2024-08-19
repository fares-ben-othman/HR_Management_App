import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InterfaceComponent } from './interface/interface.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RegisterComponent } from './register/register.component';
import { EmployeeDetailsComponent } from './employee-details/employee-details.component';
import { EditDetailsComponent } from './edit-details/edit-details.component';
import { LeaveSubmitComponent } from './leave-submit/leave-submit.component';
import { LeaveRequestComponent } from './leave-request/leave-request.component';
import { EmployeeManagementComponent } from './employee-management/employee-management.component';
import { BonusManagementComponent } from './bonus-management/bonus-management.component';
import { LeaveHistoryComponent } from './leave-history/leave-history.component';
import { BonusHistoryComponent } from './bonus-history/bonus-history.component';
const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'dashboard_reload', component: DashboardComponent },
  { path: 'register', component: RegisterComponent },
  { path: '', component: InterfaceComponent },
  { path: 'login', component: InterfaceComponent },
  { path: 'edit-details', component: EditDetailsComponent }, 
  { path: 'employee-details', component: EmployeeDetailsComponent },
  { path: 'employee-management', component: EmployeeManagementComponent },
  { path: 'leave-submit', component: LeaveSubmitComponent },
  { path: 'leave-request', component: LeaveRequestComponent },
  { path: 'leave-history', component: LeaveHistoryComponent },
  { path: 'bonus-management', component: BonusManagementComponent },
  { path: 'bonus-history', component: BonusHistoryComponent },

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
