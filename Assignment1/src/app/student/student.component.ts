import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-student',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatListModule, MatButtonModule],
  template: `
    <div class="student-container">
      <mat-card class="student-card">
        <mat-card-header>
          <mat-card-title>Student Dashboard</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <h3>Your Schedule</h3>
          <mat-list>
            <mat-list-item>
              <strong>Batch Timing:</strong> {{ batchTiming }}
            </mat-list-item>
            <mat-list-item>
              <strong>Coach:</strong> {{ coachName }}
            </mat-list-item>
          </mat-list>
          
          <h3>Progress</h3>
          <mat-list>
            <mat-list-item *ngFor="let progress of progressItems">
              {{ progress.skill }}: {{ progress.level }}
            </mat-list-item>
          </mat-list>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .student-container {
      padding: 2rem;
      display: flex;
      justify-content: center;
    }
    .student-card {
      max-width: 800px;
      width: 100%;
    }
    mat-card-title {
      margin-bottom: 1rem;
    }
    h3 {
      margin: 1rem 0;
    }
  `]
})
export class StudentComponent implements OnInit {
  batchTiming: string = 'Morning (6:00 AM - 8:00 AM)';
  coachName: string = 'Coach Smith';
  progressItems: any[] = [
    { skill: 'Batting', level: 'Intermediate' },
    { skill: 'Bowling', level: 'Beginner' },
    { skill: 'Fielding', level: 'Advanced' }
  ];

  ngOnInit(): void {
    // TODO: Load student data from backend
  }
}
