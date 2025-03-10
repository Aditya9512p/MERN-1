import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RoleGuard } from './guards/role.guard';
import { AdminComponent } from './admin/admin.component';
import { CoachComponent } from './coach/coach.component';
import { StudentComponent } from './student/student.component';
import { EmployeeComponent } from './employee/employee.component'; // Import Employee component
import { AboutComponent } from './about/about.component'; // Import About component

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'admin', component: AdminComponent, canActivate: [RoleGuard], data: { expectedRole: 'admin' } },
  { path: 'coach', component: CoachComponent, canActivate: [RoleGuard], data: { expectedRole: 'coach' } },
  { path: 'student', component: StudentComponent, canActivate: [RoleGuard], data: { expectedRole: 'student' } },
  { path: 'employee', component: EmployeeComponent }, // New route for Employee component
  { path: 'about', component: AboutComponent }, // New route for About component
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
