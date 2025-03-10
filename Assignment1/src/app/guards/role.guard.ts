import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const userRole = this.authService.getUserRole();
    const requiredRole = route.data['role'];

    if (!userRole || userRole !== requiredRole) {
      // If user is logged in but trying to access wrong role's route,
      // redirect to their appropriate dashboard
      if (userRole) {
        this.router.navigate([`/${userRole}`]);
      } else {
        this.router.navigate(['/login']);
      }
      return false;
    }

    return true;
  }
}
