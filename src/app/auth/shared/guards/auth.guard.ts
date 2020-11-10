import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthModule } from '../../auth.module';
import { AuthService } from '../services/auth/auth.service';

@Injectable({
  providedIn: AuthModule
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.authService.authState.pipe(
      map((isLoggedIn) => {
        if (!isLoggedIn) {
          this.router.navigate(['/auth/login']);
        }
        return !!isLoggedIn;
      })
    );
  }

}
