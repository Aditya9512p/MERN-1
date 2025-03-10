import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, RouterModule],
  template: `
    <div class="home-container">
      <mat-card class="welcome-card">
        <mat-card-header>
          <mat-card-title>Welcome to Elite Cricket Academy</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <div class="hero-section">
            <h2>Transform Your Cricket Journey</h2>
            <p>Join the premier cricket academy that has produced numerous professional players and continues to shape the future of cricket.</p>
          </div>
          <div class="features-grid">
            <div class="feature">
              <h3>Expert Coaching</h3>
              <p>Learn from international players and certified coaches</p>
            </div>
            <div class="feature">
              <h3>Modern Facilities</h3>
              <p>State-of-the-art equipment and training grounds</p>
            </div>
            <div class="feature">
              <h3>Personalized Training</h3>
              <p>Custom programs tailored to your skill level</p>
            </div>
            <div class="feature">
              <h3>Performance Analysis</h3>
              <p>Advanced video analysis and feedback</p>
            </div>
          </div>
        </mat-card-content>
        <mat-card-actions>
          <button mat-raised-button color="primary" routerLink="/about">Learn More</button>
          <button mat-raised-button color="accent" routerLink="/login">Get Started</button>
        </mat-card-actions>
      </mat-card>
    </div>
  `,
  styles: [`
    .home-container {
      padding: 2rem;
      min-height: calc(100vh - 64px);
      background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .welcome-card {
      max-width: 1000px;
      width: 100%;
      padding: 2rem;
    }
    .hero-section {
      text-align: center;
      margin-bottom: 3rem;
    }
    .hero-section h2 {
      font-size: 2.5rem;
      color: #333;
      margin-bottom: 1rem;
    }
    .hero-section p {
      font-size: 1.2rem;
      color: #666;
      max-width: 600px;
      margin: 0 auto;
    }
    .features-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 2rem;
      margin: 2rem 0;
    }
    .feature {
      text-align: center;
      padding: 1.5rem;
      background: rgba(255, 255, 255, 0.5);
      border-radius: 8px;
      transition: transform 0.3s ease;
    }
    .feature:hover {
      transform: translateY(-5px);
    }
    .feature h3 {
      color: #333;
      margin-bottom: 0.5rem;
    }
    .feature p {
      color: #666;
    }
    mat-card-actions {
      display: flex;
      justify-content: center;
      gap: 1rem;
      padding: 1rem 0;
    }
    button {
      padding: 0.5rem 2rem;
    }
  `]
})
export class HomeComponent {}
