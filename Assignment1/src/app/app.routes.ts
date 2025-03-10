import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { StudentComponent } from './student/student.component';
import { CoachComponent } from './coach/coach.component';
import { RoleGuard } from './guards/role.guard';

export const routes: Routes = [
  { 
    path: '', 
    redirectTo: 'login', 
    pathMatch: 'full' 
  },
  { 
    path: 'login', 
    component: LoginComponent 
  },
  { 
    path: 'admin', 
    component: AdminComponent,
    canActivate: [RoleGuard],
    data: { role: 'admin' },
    children: [
      { path: '', redirectTo: 'students', pathMatch: 'full' },
      { path: 'students', component: AdminComponent },
      { path: 'coaches', component: AdminComponent },
      { path: 'batches', component: AdminComponent }
    ]
  },
  { 
    path: 'student', 
    component: StudentComponent,
    canActivate: [RoleGuard],
    data: { role: 'student' },
    children: [
      { path: '', redirectTo: 'profile', pathMatch: 'full' },
      { path: 'profile', component: StudentComponent },
      { path: 'schedule', component: StudentComponent }
    ]
  },
  { 
    path: 'coach', 
    component: CoachComponent,
    canActivate: [RoleGuard],
    data: { role: 'coach' },
    children: [
      { path: '', redirectTo: 'students', pathMatch: 'full' },
      { path: 'students', component: CoachComponent },
      { path: 'schedule', component: CoachComponent }
    ]
  },
  { 
    path: '**', 
    redirectTo: 'login' 
  }
];
