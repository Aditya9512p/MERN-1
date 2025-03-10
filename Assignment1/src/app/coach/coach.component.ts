import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-coach',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatListModule, MatButtonModule],
  template: `
    <div class="coach-container">
      <mat-card class="coach-card">
        <mat-card-header>
          <mat-card-title>Coach Dashboard</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <h3>Assigned Students</h3>
          <mat-list>
            <mat-list-item *ngFor="let student of assignedStudents">
              {{ student.name }} - {{ student.batchTiming }}
            </mat-list-item>
          </mat-list>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .coach-container {
      padding: 2rem;
      display: flex;
      justify-content: center;
    }
    .coach-card {
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
export class CoachComponent implements OnInit {
  assignedStudents: any[] = [
    { name: 'John Doe', batchTiming: 'Morning' },
    { name: 'Jane Smith', batchTiming: 'Evening' }
  ];

  ngOnInit(): void {
    // TODO: Load assigned students from backend
  }
}
