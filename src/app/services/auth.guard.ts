import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { CanActivate, Router } from '@angular/router'; // Import Router
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router // Inject Router
  ) {}

  canActivate(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      // Access localStorage only if in browser environment
      const token = localStorage.getItem('token');
      if (token) {
        return true;
      }
    }
    // Redirect to login if not in browser or no token found
    this.router.navigate(['/login']); // Redirect to /login
    return false;
  }
}