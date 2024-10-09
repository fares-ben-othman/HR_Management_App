import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InterfaceComponent } from './interface/interface.component';
import { FormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { AuthentificationService } from './authentification.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RegisterComponent } from './register/register.component';
import { EmployeeDetailsComponent } from './employee-details/employee-details.component';
import { BonusManagementComponent } from './bonus-management/bonus-management.component';
import { NavbarComponent } from './navbar/navbar.component';
import { EditDetailsComponent } from './edit-details/edit-details.component';
import { LeaveSubmitComponent } from './leave-submit/leave-submit.component';
import { LeaveRequestComponent } from './leave-request/leave-request.component';
import { LeaveHistoryComponent } from './leave-history/leave-history.component';
import { EmployeeManagementComponent } from './employee-management/employee-management.component';
import { BonusHistoryComponent } from './bonus-history/bonus-history.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
@NgModule({
  declarations: [
    AppComponent,
    InterfaceComponent,
    DashboardComponent,
    RegisterComponent,
    EmployeeDetailsComponent,
    BonusManagementComponent,
    NavbarComponent,
    EditDetailsComponent,
    LeaveSubmitComponent,
    LeaveRequestComponent,
    LeaveHistoryComponent,
    EmployeeManagementComponent,
    BonusHistoryComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,MatToolbarModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
  ],
  providers: [AuthentificationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
