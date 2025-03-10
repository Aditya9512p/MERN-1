import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-employee',
  imports: [MatCardModule],
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent {
  employee = {
    name: 'John Doe',
    position: 'Software Engineer',
    department: 'Development',
    joinDate: '2022-01-15'
  };
}
