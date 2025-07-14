import {inject, Injectable} from '@angular/core';
import {AuthService} from "./auth-service";
import {CanActivate, Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  private authService = inject(AuthService);
  private router = inject(Router);

  async canActivate(): Promise<boolean> {
    await this.authService.updateLoginState();
    const state = await this.authService.isLoggedIn();
    if (!state) { // navigate to login page, if user is not authenticated
      void this.router.navigate(['login']);
    }
    return state;
  }
}
