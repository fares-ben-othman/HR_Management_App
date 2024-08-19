import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-employee-management',
  templateUrl: './employee-management.component.html',
  styleUrls: ['./employee-management.component.css']
})
export class EmployeeManagementComponent implements OnInit {

  employees: any[] = [];
  filteredEmployees: any[] = [];
  selectedEmployee: any = null;
  searchTerm: string = '';

  constructor(private employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees(): void {
    this.employeeService.getEmployees().subscribe(
      data => {
        this.employees = data;
        this.filteredEmployees = data; 
      },
      error => console.error('Error fetching employees', error)
    );
  }

  searchEmployees(): void {
    const term = this.searchTerm.toLowerCase();

    this.filteredEmployees = this.employees.filter(employee => {
      const nameMatches = employee.nom.toLowerCase().includes(term);
      return  nameMatches;
    });
  }

  editEmployee(employee: any): void {
    this.selectedEmployee = { ...employee }; 
  }

  updateEmployee(): void {
    if (this.selectedEmployee) {
      this.employeeService.updateEmployee(this.selectedEmployee.id, this.selectedEmployee).subscribe(
        response => {
          console.log('Employee updated', response);
          this.loadEmployees(); 
          this.selectedEmployee = null; 
        },
        error => console.error('Error updating employee', error)
      );
    }
  }

  deleteEmployee(id: number): void {
    if (confirm('Are you sure you want to delete this employee?')) {
      this.employeeService.deleteEmployee(id).subscribe(
        response => {
          console.log('Employee deleted', response);
          this.loadEmployees(); 
        },
        error => console.error('Error deleting employee', error)
      );
    }
  }
}
