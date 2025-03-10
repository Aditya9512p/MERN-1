import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, RouterModule],
  template: `
    <div class="about-container">
      <mat-card class="about-card">
        <mat-card-header>
          <mat-card-title>About Elite Cricket Academy</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <section class="about-section">
            <h2>Our Mission</h2>
            <p>
              To nurture and develop cricket talent through world-class coaching, 
              state-of-the-art facilities, and a comprehensive training program 
              that focuses on both technical skills and mental strength.
            </p>
          </section>

          <section class="about-section">
            <h2>Our Facilities</h2>
            <ul>
              <li>Professional cricket ground with international standard pitch</li>
              <li>Indoor training facility with bowling machines</li>
              <li>Modern fitness center and gymnasium</li>
              <li>Video analysis room for technique improvement</li>
              <li>Swimming pool for recovery and fitness</li>
            </ul>
          </section>

          <section class="about-section">
            <h2>Our Coaches</h2>
            <p>
              Our coaching staff includes former international players and certified 
              coaches with extensive experience in developing cricket talent at all levels.
            </p>
          </section>

          <section class="about-section">
            <h2>Programs Offered</h2>
            <ul>
              <li>Junior Cricket Development (Age 8-15)</li>
              <li>Advanced Cricket Training (Age 16+)</li>
              <li>Professional Cricket Coaching</li>
              <li>Specialized Batting/Bowling Clinics</li>
              <li>Summer Cricket Camps</li>
            </ul>
          </section>
        </mat-card-content>
        <mat-card-actions>
          <button mat-raised-button color="primary" routerLink="/login">Join Now</button>
        </mat-card-actions>
      </mat-card>
    </div>
  `,
  styles: [`
    .about-container {
      padding: 2rem;
      display: flex;
      justify-content: center;
      background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
      min-height: calc(100vh - 64px);
    }
    .about-card {
      max-width: 800px;
      width: 100%;
      padding: 2rem;
    }
    .about-section {
      margin-bottom: 2rem;
    }
    h2 {
      color: #333;
      margin-bottom: 1rem;
    }
    p {
      line-height: 1.6;
      color: #666;
    }
    ul {
      list-style-type: none;
      padding: 0;
    }
    li {
      margin-bottom: 0.5rem;
      color: #666;
      padding-left: 1.5rem;
      position: relative;
    }
    li:before {
      content: "•";
      color: #3f51b5;
      font-weight: bold;
      position: absolute;
      left: 0;
    }
    mat-card-actions {
      display: flex;
      justify-content: center;
      padding: 1rem 0;
    }
  `]
})
export class AboutComponent {}
