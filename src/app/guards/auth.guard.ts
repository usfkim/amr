import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/auth/sign-in']);
      return false;
    }

    // Check role-based access
    const requiredRole = route.data?.['role'];
    const user = this.authService.getCurrentUser();
    
    if (requiredRole && user?.role !== requiredRole && user?.role !== 'global_admin') {
      // Redirect to appropriate portal based on user role
      this.redirectToUserPortal(user?.role);
      return false;
    }

    return true;
  }

  private redirectToUserPortal(role?: string): void {
    switch (role) {
      case 'practitioner':
        this.router.navigate(['/practitioner/dashboard']);
        break;
      case 'country_admin':
      case 'regulator':
        this.router.navigate(['/regulatory-platform']);
        break;
      case 'hospital':
        this.router.navigate(['/hospital-portal']);
        break;
      case 'insurer':
        this.router.navigate(['/insurer-portal']);
        break;
      case 'embassy':
        this.router.navigate(['/embassy-portal']);
        break;
      case 'observer':
        this.router.navigate(['/admin/dashboard']);
        break;
      default:
        this.router.navigate(['/']);
    }
  }
}