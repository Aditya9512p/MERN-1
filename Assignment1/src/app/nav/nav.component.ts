import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule
  ],
  template: `
    <mat-toolbar color="primary">
      <span>Elite Cricket Academy</span>
      <span class="spacer"></span>
      
      <ng-container *ngIf="isLoggedIn">
        <button mat-button [matMenuTriggerFor]="userMenu">
          <mat-icon>account_circle</mat-icon>
          {{ currentUser?.fullName }}
        </button>
        <mat-menu #userMenu="matMenu">
          <button mat-menu-item (click)="logout()">
            <mat-icon>exit_to_app</mat-icon>
            <span>Logout</span>
          </button>
        </mat-menu>
      </ng-container>
    </mat-toolbar>

    <nav *ngIf="isLoggedIn" class="role-nav">
      <ng-container [ngSwitch]="currentUser?.role">
        <!-- Admin Navigation -->
        <div *ngSwitchCase="'admin'" class="nav-links">
          <a mat-button routerLink="/admin/students" routerLinkActive="active">
            <mat-icon>school</mat-icon>
            Students
          </a>
          <a mat-button routerLink="/admin/coaches" routerLinkActive="active">
            <mat-icon>sports_cricket</mat-icon>
            Coaches
          </a>
          <a mat-button routerLink="/admin/batches" routerLinkActive="active">
            <mat-icon>schedule</mat-icon>
            Batches
          </a>
        </div>

        <!-- Coach Navigation -->
        <div *ngSwitchCase="'coach'" class="nav-links">
          <a mat-button routerLink="/coach/students" routerLinkActive="active">
            <mat-icon>group</mat-icon>
            My Students
          </a>
          <a mat-button routerLink="/coach/schedule" routerLinkActive="active">
            <mat-icon>schedule</mat-icon>
            Schedule
          </a>
        </div>

        <!-- Student Navigation -->
        <div *ngSwitchCase="'student'" class="nav-links">
          <a mat-button routerLink="/student/profile" routerLinkActive="active">
            <mat-icon>person</mat-icon>
            Profile
          </a>
          <a mat-button routerLink="/student/schedule" routerLinkActive="active">
            <mat-icon>schedule</mat-icon>
            Schedule
          </a>
        </div>
      </ng-container>
    </nav>
  `,
  styles: [`
    .spacer {
      flex: 1 1 auto;
    }

    .role-nav {
      background-color: #f5f5f5;
      padding: 0.5rem 1rem;
      border-bottom: 1px solid #e0e0e0;
    }

    .nav-links {
      display: flex;
      gap: 1rem;
      justify-content: center;
    }

    .nav-links a {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .nav-links a.active {
      background-color: rgba(0, 0, 0, 0.05);
      color: #1976d2;
    }

    mat-icon {
      margin-right: 4px;
    }

    @media (max-width: 600px) {
      .nav-links {
        flex-direction: column;
        align-items: stretch;
      }

      .nav-links a {
        justify-content: flex-start;
      }
    }
  `]
})
export class NavComponent implements OnInit {
  isLoggedIn = false;
  currentUser: { fullName: string; role: string } | null = null;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.currentUser$.subscribe(user => {
      this.isLoggedIn = !!user;
      this.currentUser = user;
    });
  }

  logout(): void {
    this.authService.logout();
  }
} 