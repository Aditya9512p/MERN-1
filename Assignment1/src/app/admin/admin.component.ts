import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDividerModule } from '@angular/material/divider';
import { MatTooltipModule } from '@angular/material/tooltip';
import { trigger, transition, style, animate } from '@angular/animations';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatTabsModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatDividerModule,
    MatTooltipModule
  ],
  animations: [
    trigger('fadeSlide', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-10px)' }),
        animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({ opacity: 0, transform: 'translateY(-10px)' }))
      ])
    ])
  ],
  template: `
    <div class="admin-container">
      <mat-card class="admin-card" [@fadeSlide]>
        <mat-card-header>
          <mat-card-title>Admin Dashboard</mat-card-title>
          <mat-card-subtitle>Manage Students, Coaches, and Batches</mat-card-subtitle>
        </mat-card-header>
        
        <mat-divider class="header-divider"></mat-divider>

        <mat-card-content>
          <mat-tab-group animationDuration="300ms" [(selectedIndex)]="selectedTabIndex">
            <!-- Students Tab -->
            <mat-tab label="Students">
              <div class="tab-content" [@fadeSlide]>
                <div class="action-bar">
                  <button mat-raised-button color="primary" (click)="showAddStudentForm = true" 
                          matTooltip="Add a new student">
                    <mat-icon>person_add</mat-icon>
                    Add New Student
                  </button>
                </div>

                <!-- Loading Spinner -->
                <div class="loading-spinner" *ngIf="loading">
                  <mat-spinner diameter="40"></mat-spinner>
                </div>

                <!-- Add Student Form -->
                <mat-card class="form-card" *ngIf="showAddStudentForm" [@fadeSlide]>
                  <mat-card-header>
                    <mat-card-title>Add New Student</mat-card-title>
                  </mat-card-header>
                  <mat-card-content>
                    <form #studentForm="ngForm" (ngSubmit)="addStudent()" class="form-grid">
                      <mat-form-field appearance="outline">
                        <mat-label>Username</mat-label>
                        <input matInput [(ngModel)]="newStudent.username" name="username" required>
                        <mat-icon matSuffix>person</mat-icon>
                      </mat-form-field>

                      <mat-form-field appearance="outline">
                        <mat-label>Password</mat-label>
                        <input matInput [type]="hidePassword ? 'password' : 'text'" 
                               [(ngModel)]="newStudent.password" name="password" required>
                        <mat-icon matSuffix (click)="hidePassword = !hidePassword">
                          {{hidePassword ? 'visibility_off' : 'visibility'}}
                        </mat-icon>
                      </mat-form-field>

                      <mat-form-field appearance="outline">
                        <mat-label>Full Name</mat-label>
                        <input matInput [(ngModel)]="newStudent.fullName" name="fullName" required>
                        <mat-icon matSuffix>badge</mat-icon>
                      </mat-form-field>

                      <mat-form-field appearance="outline">
                        <mat-label>Age</mat-label>
                        <input matInput type="number" [(ngModel)]="newStudent.age" name="age" required>
                        <mat-icon matSuffix>cake</mat-icon>
                      </mat-form-field>

                      <mat-form-field appearance="outline">
                        <mat-label>Email</mat-label>
                        <input matInput type="email" [(ngModel)]="newStudent.email" name="email" required>
                        <mat-icon matSuffix>email</mat-icon>
                      </mat-form-field>

                      <mat-form-field appearance="outline">
                        <mat-label>Phone Number</mat-label>
                        <input matInput [(ngModel)]="newStudent.phoneNumber" name="phoneNumber" required>
                        <mat-icon matSuffix>phone</mat-icon>
                      </mat-form-field>

                      <mat-form-field appearance="outline">
                        <mat-label>Batch Timing</mat-label>
                        <mat-select [(ngModel)]="newStudent.batchTiming" name="batchTiming" required>
                          <mat-option value="Morning (6:00 AM - 8:00 AM)">Morning (6:00 AM - 8:00 AM)</mat-option>
                          <mat-option value="Evening (4:00 PM - 6:00 PM)">Evening (4:00 PM - 6:00 PM)</mat-option>
                        </mat-select>
                        <mat-icon matSuffix>schedule</mat-icon>
                      </mat-form-field>

                      <mat-form-field appearance="outline">
                        <mat-label>Assign Coach</mat-label>
                        <mat-select [(ngModel)]="newStudent.coachAssigned" name="coachAssigned" required>
                          <mat-option *ngFor="let coach of coaches" [value]="coach._id">
                            {{coach.fullName}}
                          </mat-option>
                        </mat-select>
                        <mat-icon matSuffix>sports</mat-icon>
                      </mat-form-field>

                      <div class="form-actions">
                        <button mat-button (click)="cancelAddStudent()">
                          <mat-icon>close</mat-icon> Cancel
                        </button>
                        <button mat-raised-button color="primary" type="submit" 
                                [disabled]="!studentForm.form.valid || submitting">
                          <mat-icon>save</mat-icon> Add Student
                        </button>
                      </div>
                    </form>
                  </mat-card-content>
                </mat-card>

                <!-- Students List -->
                <div class="list-container" *ngIf="!loading">
                  <mat-card class="list-item" *ngFor="let student of students" [@fadeSlide]>
                    <div class="list-item-content">
                      <div class="list-item-info">
                        <h3>{{student.fullName}}</h3>
                        <p><mat-icon>schedule</mat-icon> {{student.batchTiming}}</p>
                        <p><mat-icon>email</mat-icon> {{student.email}}</p>
                        <p><mat-icon>phone</mat-icon> {{student.phoneNumber}}</p>
                      </div>
                      <div class="list-item-actions">
                        <button mat-icon-button color="primary" (click)="editStudent(student)"
                                matTooltip="Edit student">
                          <mat-icon>edit</mat-icon>
                        </button>
                        <button mat-icon-button color="warn" (click)="confirmDelete('student', student)"
                                matTooltip="Delete student">
                          <mat-icon>delete</mat-icon>
                        </button>
                      </div>
                    </div>
                  </mat-card>
                  
                  <div class="no-items" *ngIf="students.length === 0">
                    <mat-icon>sentiment_dissatisfied</mat-icon>
                    <p>No students found</p>
                  </div>
                </div>
              </div>
            </mat-tab>

            <!-- Coaches Tab -->
            <mat-tab label="Coaches">
              <div class="tab-content" [@fadeSlide]>
                <div class="action-bar">
                  <button mat-raised-button color="primary" (click)="showAddCoachForm = true"
                          matTooltip="Add a new coach">
                    <mat-icon>person_add</mat-icon>
                    Add New Coach
                  </button>
                </div>

                <!-- Loading Spinner -->
                <div class="loading-spinner" *ngIf="loading">
                  <mat-spinner diameter="40"></mat-spinner>
                </div>

                <!-- Add Coach Form -->
                <mat-card class="form-card" *ngIf="showAddCoachForm" [@fadeSlide]>
                  <mat-card-header>
                    <mat-card-title>Add New Coach</mat-card-title>
                  </mat-card-header>
                  <mat-card-content>
                    <form #coachForm="ngForm" (ngSubmit)="addCoach()" class="form-grid">
                      <mat-form-field appearance="outline">
                        <mat-label>Username</mat-label>
                        <input matInput [(ngModel)]="newCoach.username" name="username" required>
                        <mat-icon matSuffix>person</mat-icon>
                      </mat-form-field>

                      <mat-form-field appearance="outline">
                        <mat-label>Password</mat-label>
                        <input matInput [type]="hidePassword ? 'password' : 'text'" 
                               [(ngModel)]="newCoach.password" name="password" required>
                        <mat-icon matSuffix (click)="hidePassword = !hidePassword">
                          {{hidePassword ? 'visibility_off' : 'visibility'}}
                        </mat-icon>
                      </mat-form-field>

                      <mat-form-field appearance="outline">
                        <mat-label>Full Name</mat-label>
                        <input matInput [(ngModel)]="newCoach.fullName" name="fullName" required>
                        <mat-icon matSuffix>badge</mat-icon>
                      </mat-form-field>

                      <mat-form-field appearance="outline">
                        <mat-label>Specialization</mat-label>
                        <input matInput [(ngModel)]="newCoach.specialization" name="specialization" required>
                        <mat-icon matSuffix>sports_cricket</mat-icon>
                      </mat-form-field>

                      <mat-form-field appearance="outline">
                        <mat-label>Experience (years)</mat-label>
                        <input matInput type="number" [(ngModel)]="newCoach.experience" name="experience" required>
                        <mat-icon matSuffix>work</mat-icon>
                      </mat-form-field>

                      <mat-form-field appearance="outline">
                        <mat-label>Email</mat-label>
                        <input matInput type="email" [(ngModel)]="newCoach.email" name="email" required>
                        <mat-icon matSuffix>email</mat-icon>
                      </mat-form-field>

                      <mat-form-field appearance="outline">
                        <mat-label>Phone Number</mat-label>
                        <input matInput [(ngModel)]="newCoach.phoneNumber" name="phoneNumber" required>
                        <mat-icon matSuffix>phone</mat-icon>
                      </mat-form-field>

                      <div class="form-actions">
                        <button mat-button (click)="cancelAddCoach()">
                          <mat-icon>close</mat-icon> Cancel
                        </button>
                        <button mat-raised-button color="primary" type="submit" 
                                [disabled]="!coachForm.form.valid || submitting">
                          <mat-icon>save</mat-icon> Add Coach
                        </button>
                      </div>
                    </form>
                  </mat-card-content>
                </mat-card>

                <!-- Coaches List -->
                <div class="list-container" *ngIf="!loading">
                  <mat-card class="list-item" *ngFor="let coach of coaches" [@fadeSlide]>
                    <div class="list-item-content">
                      <div class="list-item-info">
                        <h3>{{coach.fullName}}</h3>
                        <p><mat-icon>sports_cricket</mat-icon> {{coach.specialization}}</p>
                        <p><mat-icon>work</mat-icon> {{coach.experience}} years</p>
                        <p><mat-icon>email</mat-icon> {{coach.email}}</p>
                        <p><mat-icon>phone</mat-icon> {{coach.phoneNumber}}</p>
                      </div>
                      <div class="list-item-actions">
                        <button mat-icon-button color="primary" (click)="editCoach(coach)"
                                matTooltip="Edit coach">
                          <mat-icon>edit</mat-icon>
                        </button>
                        <button mat-icon-button color="warn" (click)="confirmDelete('coach', coach)"
                                matTooltip="Delete coach">
                          <mat-icon>delete</mat-icon>
                        </button>
                      </div>
                    </div>
                  </mat-card>
                  
                  <div class="no-items" *ngIf="coaches.length === 0">
                    <mat-icon>sentiment_dissatisfied</mat-icon>
                    <p>No coaches found</p>
                  </div>
                </div>
              </div>
            </mat-tab>

            <!-- Batches Tab -->
            <mat-tab label="Batches">
              <div class="tab-content" [@fadeSlide]>
                <!-- Loading Spinner -->
                <div class="loading-spinner" *ngIf="loading">
                  <mat-spinner diameter="40"></mat-spinner>
                </div>

                <!-- Batches List -->
                <div class="list-container" *ngIf="!loading">
                  <mat-card class="list-item" *ngFor="let batch of batches" [@fadeSlide]>
                    <div class="list-item-content">
                      <div class="list-item-info">
                        <h3>{{batch.timing}}</h3>
                        <p><mat-icon>person</mat-icon> Coach: {{batch.coach}}</p>
                        <p><mat-icon>groups</mat-icon> Students: {{batch.studentCount}}/{{batch.maxStudents}}</p>
                      </div>
                      <div class="batch-capacity">
                        <mat-progress-spinner
                          [value]="(batch.studentCount / batch.maxStudents) * 100"
                          [color]="batch.studentCount >= batch.maxStudents ? 'warn' : 'primary'"
                          diameter="40"
                          mode="determinate">
                        </mat-progress-spinner>
                      </div>
                    </div>
                  </mat-card>
                  
                  <div class="no-items" *ngIf="batches.length === 0">
                    <mat-icon>sentiment_dissatisfied</mat-icon>
                    <p>No batches found</p>
                  </div>
                </div>
              </div>
            </mat-tab>
          </mat-tab-group>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .admin-container {
      padding: 2rem;
      display: flex;
      justify-content: center;
      min-height: calc(100vh - 4rem);
      background-color: #f5f5f5;
    }

    .admin-card {
      max-width: 1200px;
      width: 100%;
      margin-bottom: 2rem;
      border-radius: 8px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }

    .header-divider {
      margin: 1rem 0;
    }

    .tab-content {
      padding: 1rem 0;
    }

    .action-bar {
      margin: 1rem 0;
      display: flex;
      justify-content: flex-end;
    }

    .form-card {
      margin: 1rem 0;
      padding: 1.5rem;
      border-radius: 8px;
      background-color: #fff;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    }

    .form-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 1rem;
      align-items: start;
    }

    .form-actions {
      grid-column: 1 / -1;
      display: flex;
      gap: 1rem;
      justify-content: flex-end;
      margin-top: 1rem;
    }

    .list-container {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 1rem;
      padding: 1rem 0;
    }

    .list-item {
      border-radius: 8px;
      transition: transform 0.2s, box-shadow 0.2s;
    }

    .list-item:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }

    .list-item-content {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      padding: 1rem;
    }

    .list-item-info {
      flex: 1;
    }

    .list-item-info h3 {
      margin: 0 0 0.5rem 0;
      color: #1976d2;
    }

    .list-item-info p {
      margin: 0.25rem 0;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      color: #666;
    }

    .list-item-actions {
      display: flex;
      gap: 0.5rem;
    }

    .loading-spinner {
      display: flex;
      justify-content: center;
      padding: 2rem;
    }

    .no-items {
      grid-column: 1 / -1;
      text-align: center;
      padding: 2rem;
      color: #666;
    }

    .no-items mat-icon {
      font-size: 48px;
      width: 48px;
      height: 48px;
      margin-bottom: 1rem;
    }

    .batch-capacity {
      margin-left: 1rem;
    }

    mat-icon {
      vertical-align: middle;
    }

    ::ng-deep .mat-mdc-tab-body-wrapper {
      padding: 1rem 0;
    }
  `]
})
export class AdminComponent implements OnInit {
  students: any[] = [];
  coaches: any[] = [];
  batches: any[] = [];
  showAddStudentForm = false;
  showAddCoachForm = false;
  loading = false;
  submitting = false;
  hidePassword = true;
  selectedTabIndex = 0;

  newStudent: any = {
    username: '',
    password: '',
    fullName: '',
    age: null,
    email: '',
    phoneNumber: '',
    batchTiming: '',
    coachAssigned: ''
  };

  newCoach: any = {
    username: '',
    password: '',
    fullName: '',
    specialization: '',
    experience: null,
    email: '',
    phoneNumber: ''
  };

  private apiUrl = 'http://localhost:5000/api';

  constructor(
    private http: HttpClient,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // Subscribe to route changes to update the selected tab
    this.route.url.subscribe(segments => {
      if (segments.length > 0) {
        switch (segments[0].path) {
          case 'students':
            this.selectedTabIndex = 0;
            break;
          case 'coaches':
            this.selectedTabIndex = 1;
            break;
          case 'batches':
            this.selectedTabIndex = 2;
            break;
        }
      }
      this.loadData();
    });
  }

  loadData(): void {
    this.loading = true;
    const token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    Promise.all([
      this.http.get(`${this.apiUrl}/students`, { headers }).toPromise(),
      this.http.get(`${this.apiUrl}/coaches`, { headers }).toPromise(),
      this.http.get(`${this.apiUrl}/batches`, { headers }).toPromise()
    ]).then(([students, coaches, batches]) => {
      this.students = students as any[];
      this.coaches = coaches as any[];
      this.batches = batches as any[];
      this.loading = false;
    }).catch(error => {
      console.error('Error loading data:', error);
      this.showError('Error loading data. Please try again.');
      this.loading = false;
    });
  }

  addStudent(): void {
    if (this.submitting) return;
    
    this.submitting = true;
    const token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.http.post(`${this.apiUrl}/students`, this.newStudent, { headers }).subscribe({
      next: () => {
        this.showSuccess('Student added successfully');
        this.loadData();
        this.cancelAddStudent();
      },
      error: (error) => {
        console.error('Error adding student:', error);
        this.showError(error.error?.message || 'Error adding student');
      },
      complete: () => {
        this.submitting = false;
      }
    });
  }

  addCoach(): void {
    if (this.submitting) return;
    
    this.submitting = true;
    const token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.http.post(`${this.apiUrl}/coaches`, this.newCoach, { headers }).subscribe({
      next: () => {
        this.showSuccess('Coach added successfully');
        this.loadData();
        this.cancelAddCoach();
      },
      error: (error) => {
        console.error('Error adding coach:', error);
        this.showError(error.error?.message || 'Error adding coach');
      },
      complete: () => {
        this.submitting = false;
      }
    });
  }

  editStudent(student: any): void {
    // TODO: Implement edit functionality
    console.log('Edit student:', student);
  }

  editCoach(coach: any): void {
    // TODO: Implement edit functionality
    console.log('Edit coach:', coach);
  }

  confirmDelete(type: 'student' | 'coach', item: any): void {
    if (confirm(`Are you sure you want to delete this ${type}?`)) {
      const token = this.authService.getToken();
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

      this.http.delete(`${this.apiUrl}/${type}s/${item._id}`, { headers }).subscribe({
        next: () => {
          this.showSuccess(`${type} deleted successfully`);
          this.loadData();
        },
        error: (error) => {
          console.error(`Error deleting ${type}:`, error);
          this.showError(error.error?.message || `Error deleting ${type}`);
        }
      });
    }
  }

  cancelAddStudent(): void {
    this.showAddStudentForm = false;
    this.newStudent = {
      username: '',
      password: '',
      fullName: '',
      age: null,
      email: '',
      phoneNumber: '',
      batchTiming: '',
      coachAssigned: ''
    };
  }

  cancelAddCoach(): void {
    this.showAddCoachForm = false;
    this.newCoach = {
      username: '',
      password: '',
      fullName: '',
      specialization: '',
      experience: null,
      email: '',
      phoneNumber: ''
    };
  }

  private showSuccess(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      panelClass: ['success-snackbar']
    });
  }

  private showError(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 5000,
      panelClass: ['error-snackbar']
    });
  }
}
